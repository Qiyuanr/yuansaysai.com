"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  color: string;
  accent: boolean;
};

const COLORS = ["#d9ff43", "#b6f1df", "#f4f0e8"];

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let reducedMotion = motionPreference.matches;
    let width = 0;
    let height = 0;
    let mobile = false;
    let targetFrameLength = 1000 / 60;
    let lastFrameTime = 0;
    let frame = 0;
    let canvasVisible = true;
    let particles: Particle[] = [];
    let links: Array<[number, number]> = [];

    const pointer = {
      x: 0,
      y: 0,
      velocityX: 0,
      velocityY: 0,
      active: false,
    };

    const createParticles = () => {
      const lowPowerDevice =
        typeof navigator.hardwareConcurrency === "number" &&
        navigator.hardwareConcurrency <= 4;
      const count = reducedMotion
        ? 34
        : mobile
          ? lowPowerDevice
            ? 42
            : 56
          : lowPowerDevice
            ? 68
            : 92;
      const centerX = width * (mobile ? 0.53 : 0.68);
      const centerY = height * (mobile ? 0.4 : 0.5);
      const spreadX = width * (mobile ? 0.44 : 0.34);
      const spreadY = height * (mobile ? 0.25 : 0.35);

      particles = Array.from({ length: count }, (_, index) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.sqrt(Math.random());
        const homeX =
          centerX + Math.cos(angle) * spreadX * distance;
        const homeY =
          centerY + Math.sin(angle) * spreadY * distance;

        return {
          x: homeX,
          y: homeY,
          homeX,
          homeY,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
          radius: index % 13 === 0 ? 3.15 : 1.2 + Math.random() * 1.05,
          phase: Math.random() * Math.PI * 2,
          color: COLORS[index % COLORS.length],
          accent: index % 13 === 0,
        };
      });

      const linkKeys = new Set<string>();
      const nextLinks: Array<[number, number]> = [];

      particles.forEach((particle, index) => {
        const nearest = particles
          .map((other, otherIndex) => ({
            otherIndex,
            distance:
              (other.homeX - particle.homeX) ** 2 +
              (other.homeY - particle.homeY) ** 2,
          }))
          .filter(({ otherIndex }) => otherIndex !== index)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, index % 3 === 0 ? 2 : 1);

        nearest.forEach(({ otherIndex, distance }) => {
          if (distance > 170 ** 2) return;
          const start = Math.min(index, otherIndex);
          const end = Math.max(index, otherIndex);
          const key = `${start}:${end}`;
          if (linkKeys.has(key)) return;
          linkKeys.add(key);
          nextLinks.push([start, end]);
        });
      });

      links = nextLinks;
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      mobile = width < 720;
      const lowPowerDevice =
        typeof navigator.hardwareConcurrency === "number" &&
        navigator.hardwareConcurrency <= 4;
      targetFrameLength =
        1000 / (reducedMotion ? 30 : mobile || lowPowerDevice ? 45 : 60);
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        mobile ? 1.25 : 1.5,
      );

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const render = (time: number, deltaScale: number) => {
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";

      particles.forEach((particle) => {
        const driftScale = reducedMotion ? 0.34 : 1;
        const interactionScale = reducedMotion ? 0.82 : 1;
        const driftX =
          Math.cos(particle.phase + time * 0.00022) * 12 * driftScale;
        const driftY =
          Math.sin(particle.phase * 1.6 + time * 0.00018) * 10 * driftScale;
        particle.vx +=
          (particle.homeX + driftX - particle.x) * 0.004 * deltaScale;
        particle.vy +=
          (particle.homeY + driftY - particle.y) * 0.004 * deltaScale;

        if (pointer.active) {
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const distance = Math.max(Math.hypot(dx, dy), 14);
          const influence = mobile ? 220 : 270;

          if (distance < influence) {
            const falloff = 1 - distance / influence;
            const force =
              -0.46 * Math.pow(falloff, 1.25) * interactionScale;
            particle.vx += (dx / distance) * force * deltaScale;
            particle.vy += (dy / distance) * force * deltaScale;
            particle.vx +=
              pointer.velocityX * falloff * 0.032 * interactionScale;
            particle.vy +=
              pointer.velocityY * falloff * 0.032 * interactionScale;
          }
        }

        const speed = Math.hypot(particle.vx, particle.vy);
        const maximumSpeed = reducedMotion ? 3.4 : 5;
        if (speed > maximumSpeed) {
          particle.vx = (particle.vx / speed) * maximumSpeed;
          particle.vy = (particle.vy / speed) * maximumSpeed;
        }

        particle.vx *= Math.pow(0.91, deltaScale);
        particle.vy *= Math.pow(0.91, deltaScale);
        particle.x += particle.vx * deltaScale;
        particle.y += particle.vy * deltaScale;
      });

      links.forEach(([startIndex, endIndex]) => {
        const start = particles[startIndex];
        const end = particles[endIndex];
        const distance = Math.hypot(end.x - start.x, end.y - start.y);
        if (distance > 190) return;
        const alpha = 0.12 + 0.23 * (1 - distance / 190);

        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.strokeStyle =
          (startIndex + endIndex) % 4 === 0
            ? `rgba(182, 241, 223, ${alpha * 0.9})`
            : `rgba(217, 255, 67, ${alpha})`;
        context.lineWidth = 1.05;
        context.stroke();
      });

      if (pointer.active) {
        const nearby = particles
          .map((particle, index) => ({
            index,
            distance:
              (particle.x - pointer.x) ** 2 +
              (particle.y - pointer.y) ** 2,
          }))
          .filter(({ distance }) => distance < 270 ** 2)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 12);

        nearby.forEach(({ index, distance }) => {
          const particle = particles[index];
          const normalizedDistance = Math.sqrt(distance) / 270;
          context.beginPath();
          context.moveTo(pointer.x, pointer.y);
          context.lineTo(particle.x, particle.y);
          context.strokeStyle = `rgba(182, 241, 223, ${
            0.17 + 0.42 * (1 - normalizedDistance)
          })`;
          context.lineWidth = 1.05;
          context.stroke();
        });
      }

      particles.forEach((particle) => {
        const speed = Math.hypot(particle.vx, particle.vy);
        if (speed > 0.3) {
          context.beginPath();
          context.moveTo(
            particle.x - particle.vx * 6,
            particle.y - particle.vy * 6,
          );
          context.lineTo(particle.x, particle.y);
          context.strokeStyle = "rgba(182, 241, 223, 0.42)";
          context.lineWidth = 0.95;
          context.stroke();
        }

        if (particle.accent) {
          context.beginPath();
          context.arc(
            particle.x,
            particle.y,
            particle.radius + 4,
            0,
            Math.PI * 2,
          );
          context.fillStyle = "rgba(217, 255, 67, 0.1)";
          context.fill();
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
        context.globalAlpha = particle.accent ? 0.96 : 0.74;
        context.fill();
        context.globalAlpha = 1;
      });
    };

    const draw = (time: number) => {
      if (document.hidden || !canvasVisible) {
        frame = 0;
        return;
      }

      const elapsed = time - lastFrameTime;
      if (elapsed < targetFrameLength) {
        frame = requestAnimationFrame(draw);
        return;
      }

      const deltaScale = Math.min(elapsed / (1000 / 60), 2);
      lastFrameTime = time;
      render(time, deltaScale);

      pointer.velocityX *= 0.68;
      pointer.velocityY *= 0.68;
      frame = requestAnimationFrame(draw);
    };

    const startAnimation = () => {
      if (frame || document.hidden || !canvasVisible) {
        return;
      }
      lastFrameTime = performance.now();
      frame = requestAnimationFrame(draw);
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
      const wasActive = pointer.active;
      let moveX = 0;
      let moveY = 0;

      if (inside) {
        if (wasActive) {
          moveX = Math.max(-36, Math.min(36, nextX - pointer.x));
          moveY = Math.max(-36, Math.min(36, nextY - pointer.y));
          pointer.velocityX = moveX;
          pointer.velocityY = moveY;

          const directInfluence = mobile ? 220 : 270;
          particles.forEach((particle) => {
            const dx = nextX - particle.x;
            const dy = nextY - particle.y;
            const distance = Math.max(Math.hypot(dx, dy), 14);
            if (distance >= directInfluence) return;

            const falloff = 1 - distance / directInfluence;
            const directPush = 3.4 * Math.pow(falloff, 1.2);
            particle.x -= (dx / distance) * directPush;
            particle.y -= (dy / distance) * directPush;
            particle.x += moveX * falloff * 0.24;
            particle.y += moveY * falloff * 0.24;
          });
        }
        pointer.x = nextX;
        pointer.y = nextY;
      }
      pointer.active = inside;
    };

    const updateMotion = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      cancelAnimationFrame(frame);
      frame = 0;
      resize();
      render(0, 0);
      startAnimation();
    };

    const updateVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else {
        startAnimation();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        canvasVisible = entry.isIntersecting;
        if (!canvasVisible) {
          cancelAnimationFrame(frame);
          frame = 0;
        } else {
          startAnimation();
        }
      },
      { threshold: 0.02 },
    );

    resize();
    render(0, 0);
    startAnimation();
    observer.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    document.addEventListener("visibilitychange", updateVisibility);
    motionPreference.addEventListener("change", updateMotion);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
      document.removeEventListener("visibilitychange", updateVisibility);
      motionPreference.removeEventListener("change", updateMotion);
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
