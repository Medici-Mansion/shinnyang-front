"use client";
import { HLContainer } from "@/lib/HLContainer";
import React, { HTMLAttributes, useEffect, useRef } from "react";

interface ParticlesProps extends HTMLAttributes<HTMLCanvasElement> {}

const Particles = ({ ...props }: ParticlesProps) => {
  const container = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fps = 60;
    const interval = 1000 / fps;
    let running = false;
    let intervalId: number;
    if (container.current) {
      const hlContainer = new HLContainer(container.current);
      let now, delta;
      let then = Date.now();
      const update = () => {
        if (running) {
          hlContainer.update();
          hlContainer.render();
        }
      };
      const frame = () => {
        intervalId = requestAnimationFrame(frame);
        now = Date.now();
        delta = now - then;
        if (delta < interval) return;
        update();
        then = now - (delta % interval);
        running = true;
      };
      frame();
    }

    return () => {
      cancelAnimationFrame(intervalId);
    };
  }, []);
  return <canvas ref={container} {...props}></canvas>;
};

export default Particles;
