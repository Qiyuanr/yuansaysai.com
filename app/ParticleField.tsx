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

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
};

const COLORS = ["#d9ff43", "#b6f1df", "#f4f0e8"];
const SPARK_COLORS = ["#ff7f5c", "#d9ff43", "#b6f1df", "#f4f0e8"];

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
    let sparks: Spark[] = [];

    const pointer = {
      x: 0,
      y: 0,
      velocityX: 0,
      velocityY: 0,
      active: false,
      burst: 0,
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
      targetFrameLength = 1000 / (mobile || lowPowerDevice ? 45 : 60);
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        mobile ? 1.25 : 1.5,
      );

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      sparks = [];
      createParticles();
    };

    const render = (time: number, deltaScale: number) => {
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";

      particles.forEach((particle) => {
        if (!reducedMotion) {
          const driftX = Math.cos(particle.phase + time * 0.00022) * 12;
          const driftY =
            Math.sin(particle.phase * 1.6 + time * 0.00018) * 10;
          particle.vx +=
            (particle.homeX + driftX - particle.x) * 0.0028 * deltaScale;
          particle.vy +=
            (particle.homeY + driftY - particle.y) * 0.0028 * deltaScale;

          if (pointer.active) {
            const dx = pointer.x - particle.x;
            const dy = pointer.y - particle.y;
            const distance = Math.max(Math.hypot(dx, dy), 14);
            const influence = pointer.burst > 0.02 ? 240 : 175;

            if (distance < influence) {
              const falloff = 1 - distance / influence;
              const force =
                pointer.burst > 0.02
                  ? -0.48 * pointer.burst * falloff
                  : -0.075 * falloff;
              particle.vx += (dx / distance) * force * deltaScale;
              particle.vy += (dy / distance) * force * deltaScale;
              particle.vx += pointer.velocityX * falloff * 0.006;
              particle.vy += pointer.velocityY * falloff * 0.006;
            }
          }

          const speed = Math.hypot(particle.vx, particle.vy);
          if (speed > 3.2) {
            particle.vx = (particle.vx / speed) * 3.2;
            particle.vy = (particle.vy / speed) * 3.2;
          }

          particle.vx *= Math.pow(0.94, deltaScale);
          particle.vy *= Math.pow(0.94, deltaScale);
          particle.x += particle.vx * deltaScale;
          particle.y += particle.vy * deltaScale;
        }
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
          .filter(({ distance }) => distance < 190 ** 2)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 7);

        nearby.forEach(({ index, distance }) => {
          const particle = particles[index];
          const normalizedDistance = Math.sqrt(distance) / 190;
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
        if (speed > 0.75) {
          context.beginPath();
          context.moveTo(
            particle.x - particle.vx * 3.2,
            particle.y - particle.vy * 3.2,
          );
          context.lineTo(particle.x, particle.y);
          context.strokeStyle = "rgba(182, 241, 223, 0.22)";
          context.lineWidth = 0.75;
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

      if (!reducedMotion) {
        sparks = sparks.filter((spark) => {
          spark.x += spark.vx * deltaScale;
          spark.y += spark.vy * deltaScale;
          spark.vx *= Math.pow(0.965, deltaScale);
          spark.vy *= Math.pow(0.965, deltaScale);
          spark.life -= 0.02 * deltaScale;
          return spark.life > 0;
        });
      }

      context.globalCompositeOperation = "lighter";
      sparks.forEach((spark) => {
        const trailLength = 3.5 + (1 - spark.life) * 4.5;
        context.beginPath();
        context.moveTo(
          spark.x - spark.vx * trailLength,
          spark.y - spark.vy * trailLength,
        );
        context.lineTo(spark.x, spark.y);
        context.strokeStyle = spark.color;
        context.globalAlpha = Math.min(0.82, spark.life * 0.95);
        context.lineWidth = Math.max(0.8, spark.size * 0.7);
        context.stroke();

        context.beginPath();
        context.arc(
          spark.x,
          spark.y,
          spark.size * (0.55 + spark.life * 0.45),
          0,
          Math.PI * 2,
        );
        context.fillStyle = spark.color;
        context.globalAlpha = Math.min(1, spark.life * 1.25);
        context.fill();
      });
      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
    };

    const draw = (time: number) => {
      if (
        reducedMotion ||
        document.hidden ||
        !canvasVisible
      ) {
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
      pointer.burst *= 0.9;
      frame = requestAnimationFrame(draw);
    };

    const startAnimation = () => {
      if (
        frame ||
        reducedMotion ||
        document.hidden ||
        !canvasVisible
      ) {
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

      if (inside) {
        if (pointer.active) {
          pointer.velocityX = nextX - pointer.x;
          pointer.velocityY = nextY - pointer.y;
        }
        pointer.x = nextX;
        pointer.y = nextY;
      }
      pointer.active = inside;

      if (reducedMotion) render(performance.now(), 0);
    };

    const pressPointer = (event: PointerEvent) => {
      updatePointer(event);
      if (!pointer.active) return;

      pointer.burst = 1;
      const sparkCount = mobile ? 14 : 20;
      const rotation = Math.random() * Math.PI * 2;
      sparks = Array.from({ length: sparkCount }, (_, index) => {
        const angle =
          rotation +
          (index / sparkCount) * Math.PI * 2 +
          (Math.random() - 0.5) * 0.16;
        const speed = 2.4 + Math.random() * 3.4;
        return {
          x: pointer.x,
          y: pointer.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0.82 + Math.random() * 0.18,
          size: 1.05 + Math.random() * 1.35,
          color: SPARK_COLORS[index % SPARK_COLORS.length],
        };
      });

      if (reducedMotion) render(performance.now(), 0);
    };

    const updateMotion = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      cancelAnimationFrame(frame);
      frame = 0;
      createParticles();
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
    window.addEventListener("pointerdown", pressPointer, { passive: true });
    document.addEventListener("visibilitychange", updateVisibility);
    motionPreference.addEventListener("change", updateMotion);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerdown", pressPointer);
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
