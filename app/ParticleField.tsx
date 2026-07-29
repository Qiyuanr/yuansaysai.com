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
    const pointer = {
      x: 0,
      y: 0,
      velocityX: 0,
      velocityY: 0,
      active: false,
      pressed: false,
      burst: 0,
    };

    const createParticles = () => {
      const mobile = width < 720;
      const count = reducedMotion ? 54 : mobile ? 118 : 188;
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
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: index % 17 === 0 ? 4.2 : 1.15 + Math.random() * 1.45,
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
      context.globalCompositeOperation = "lighter";

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
          particle.vx += (homeX - particle.x) * 0.000085;
          particle.vy += (homeY - particle.y) * 0.000085;

          if (pointer.active) {
            const dx = pointer.x - particle.x;
            const dy = pointer.y - particle.y;
            const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 18);
            const burstStrength = Math.max(
              pointer.burst,
              pointer.pressed ? 1 : 0,
            );
            const influence = burstStrength > 0.02 ? 390 : 350;
            if (distance < influence) {
              const falloff = 1 - distance / influence;
              const force =
                falloff *
                falloff *
                (burstStrength > 0.02 ? -1.18 * burstStrength : 0.25);
              particle.vx += (dx / distance) * force;
              particle.vy += (dy / distance) * force;
              particle.vx += pointer.velocityX * falloff * 0.02;
              particle.vy += pointer.velocityY * falloff * 0.02;
            }
          }

          const speed = Math.sqrt(
            particle.vx * particle.vx + particle.vy * particle.vy,
          );
          if (speed > 6) {
            particle.vx = (particle.vx / speed) * 6;
            particle.vy = (particle.vy / speed) * 6;
          }

          particle.vx *= 0.977;
          particle.vy *= 0.977;
          particle.x += particle.vx;
          particle.y += particle.vy;
        }

        const speed = Math.hypot(particle.vx, particle.vy);
        if (speed > 0.28) {
          context.beginPath();
          context.moveTo(
            particle.x - particle.vx * 5.5,
            particle.y - particle.vy * 5.5,
          );
          context.lineTo(particle.x, particle.y);
          context.strokeStyle = particle.color;
          context.globalAlpha = Math.min(0.7, 0.16 + speed * 0.11);
          context.lineWidth = Math.max(0.8, particle.radius * 0.55);
          context.stroke();
        }

        for (
          let otherIndex = index + 1;
          otherIndex < particles.length;
          otherIndex += 1
        ) {
          const other = particles[otherIndex];
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 108) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `rgba(217, 255, 67, ${
              0.3 * (1 - distance / 108)
            })`;
            context.globalAlpha = 1;
            context.lineWidth = 0.85;
            context.stroke();
          }
        }

        if (pointer.active) {
          const pointerDistance = Math.hypot(
            pointer.x - particle.x,
            pointer.y - particle.y,
          );
          if (pointerDistance < 220) {
            context.beginPath();
            context.moveTo(pointer.x, pointer.y);
            context.lineTo(particle.x, particle.y);
            context.strokeStyle = `rgba(182, 241, 223, ${
              0.5 * (1 - pointerDistance / 220)
            })`;
            context.globalAlpha = 1;
            context.lineWidth = 1;
            context.stroke();
          }
        }

        context.beginPath();
        context.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2,
        );
        context.fillStyle = particle.color;
        context.globalAlpha = particle.radius > 3 ? 1 : 0.82;
        context.shadowColor = particle.color;
        context.shadowBlur = particle.radius > 3 ? 18 : 7;
        context.fill();
        context.shadowBlur = 0;
      }

      context.globalAlpha = 1;
      if (pointer.active) {
        const haloRadius = pointer.burst > 0.02 ? 116 : 68;
        const halo = context.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          haloRadius,
        );
        halo.addColorStop(
          0,
          pointer.burst > 0.02
            ? `rgba(255, 127, 92, ${0.2 * pointer.burst})`
            : "rgba(217, 255, 67, 0.055)",
        );
        halo.addColorStop(1, "rgba(217, 255, 67, 0)");
        context.beginPath();
        context.arc(pointer.x, pointer.y, haloRadius, 0, Math.PI * 2);
        context.fillStyle = halo;
        context.fill();

        context.beginPath();
        context.arc(pointer.x, pointer.y, 10, 0, Math.PI * 2);
        context.strokeStyle = "rgba(217, 255, 67, 0.32)";
        context.lineWidth = 1;
        context.stroke();

        if (pointer.burst > 0.02) {
          const burstProgress = 1 - pointer.burst;
          context.beginPath();
          context.arc(
            pointer.x,
            pointer.y,
            26 + burstProgress * 230,
            0,
            Math.PI * 2,
          );
          context.strokeStyle = `rgba(255, 127, 92, ${
            Math.min(0.76, pointer.burst * 0.9)
          })`;
          context.lineWidth = 2;
          context.stroke();
        }
      }

      pointer.velocityX *= 0.74;
      pointer.velocityY *= 0.74;
      pointer.burst *= 0.91;
      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    const updatePointer = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const nextX = event.clientX - bounds.left;
      const nextY = event.clientY - bounds.top;
      const inside =
        nextX >= 0 &&
        nextX <= bounds.width &&
        nextY >= 0 &&
        nextY <= bounds.height;

      if (inside) {
        pointer.velocityX = nextX - pointer.x;
        pointer.velocityY = nextY - pointer.y;
        pointer.x = nextX;
        pointer.y = nextY;
      }
      pointer.active = inside;

      if (reducedMotion) draw(performance.now());
    };
    const leavePointer = () => {
      pointer.active = false;
      pointer.pressed = false;
      if (reducedMotion) draw(performance.now());
    };
    const pressPointer = (event: PointerEvent) => {
      updatePointer(event);
      pointer.pressed = pointer.active;
      if (pointer.active) pointer.burst = 1;
    };
    const releasePointer = () => {
      pointer.pressed = false;
      if (reducedMotion) draw(performance.now());
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
    window.addEventListener("pointermove", updatePointer);
    window.addEventListener("pointerdown", pressPointer);
    window.addEventListener("pointerup", releasePointer);
    window.addEventListener("pointercancel", releasePointer);
    window.addEventListener("blur", leavePointer);
    media.addEventListener("change", updateMotion);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerdown", pressPointer);
      window.removeEventListener("pointerup", releasePointer);
      window.removeEventListener("pointercancel", releasePointer);
      window.removeEventListener("blur", leavePointer);
      media.removeEventListener("change", updateMotion);
    };
  }, []);

  return (
    <canvas
      className="particle-field"
      ref={canvasRef}
      aria-hidden="true"
    />
  );
}
