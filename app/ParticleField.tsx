"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  color: string;
};

const COLORS = ["#d9ff43", "#b6f1df", "#ff7f5c", "#f4f0e8"];

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = media.matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let particles: Particle[] = [];
    let pointer = { x: 0, y: 0, active: false, pressed: false };

    const createParticles = () => {
      const mobile = width < 720;
      const count = reducedMotion ? 36 : mobile ? 72 : 132;
      const centerX = width * (mobile ? 0.58 : 0.7);
      const centerY = height * (mobile ? 0.47 : 0.5);
      const spreadX = width * (mobile ? 0.44 : 0.29);
      const spreadY = height * (mobile ? 0.25 : 0.37);

      particles = Array.from({ length: count }, (_, index) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.pow(Math.random(), 0.6);
        return {
          x: centerX + Math.cos(angle) * spreadX * distance,
          y: centerY + Math.sin(angle) * spreadY * distance,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          radius: index % 19 === 0 ? 2.8 : 0.7 + Math.random() * 1.2,
          phase: Math.random() * Math.PI * 2,
          color: COLORS[index % COLORS.length],
        };
      });
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        const homeX =
          width * (width < 720 ? 0.58 : 0.7) +
          Math.cos(particle.phase + time * 0.00008) *
            width *
            (width < 720 ? 0.31 : 0.2);
        const homeY =
          height * (width < 720 ? 0.47 : 0.5) +
          Math.sin(particle.phase * 1.7 + time * 0.00011) * height * 0.25;

        if (!reducedMotion) {
          particle.vx += (homeX - particle.x) * 0.00006;
          particle.vy += (homeY - particle.y) * 0.00006;

          if (pointer.active) {
            const dx = pointer.x - particle.x;
            const dy = pointer.y - particle.y;
            const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 24);
            if (distance < 210) {
              const force = (1 - distance / 210) * (pointer.pressed ? -0.18 : 0.055);
              particle.vx += (dx / distance) * force;
              particle.vy += (dy / distance) * force;
            }
          }

          particle.vx *= 0.985;
          particle.vy *= 0.985;
          particle.x += particle.vx;
          particle.y += particle.vy;
        }

        for (let otherIndex = index + 1; otherIndex < particles.length; otherIndex += 1) {
          const other = particles[otherIndex];
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 82) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `rgba(217, 255, 67, ${0.085 * (1 - distance / 82)})`;
            context.lineWidth = 0.6;
            context.stroke();
          }
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = particle.color;
        context.globalAlpha = particle.radius > 2 ? 0.92 : 0.42;
        context.fill();
      }

      context.globalAlpha = 1;
      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    const updatePointer = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
    };
    const leavePointer = () => {
      pointer.active = false;
      pointer.pressed = false;
    };
    const pressPointer = (event: PointerEvent) => {
      updatePointer(event);
      pointer.pressed = true;
    };
    const releasePointer = () => {
      pointer.pressed = false;
    };
    const updateMotion = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      cancelAnimationFrame(frame);
      createParticles();
      draw(0);
    };

    resize();
    draw(0);
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", updatePointer);
    canvas.addEventListener("pointerleave", leavePointer);
    canvas.addEventListener("pointerdown", pressPointer);
    window.addEventListener("pointerup", releasePointer);
    media.addEventListener("change", updateMotion);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", updatePointer);
      canvas.removeEventListener("pointerleave", leavePointer);
      canvas.removeEventListener("pointerdown", pressPointer);
      window.removeEventListener("pointerup", releasePointer);
      media.removeEventListener("change", updateMotion);
    };
  }, []);

  return (
    <canvas
      className="particle-field"
      ref={canvasRef}
      aria-label="可交互的粒子星云：移动或按下指针可以改变粒子运动"
      role="img"
    />
  );
}
