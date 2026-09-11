import { useEffect, useRef } from "react";

// Cheap animated grain: redraws a small noise tile every other frame and lets
// CSS scale it up. Cheaper than a full-res canvas noise loop.
export default function GrainOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const size = 128;
    canvas.width = size;
    canvas.height = size;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    let raf;

    const draw = () => {
      const imageData = ctx.createImageData(size, size);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const v = Math.random() * 255;
        imageData.data[i] = v;
        imageData.data[i + 1] = v;
        imageData.data[i + 2] = v;
        imageData.data[i + 3] = 22;
      }
      ctx.putImageData(imageData, 0, 0);
      if (!prefersReduced) {
        frame++;
        raf = requestAnimationFrame(() => {
          if (frame % 3 === 0) draw();
          else raf = requestAnimationFrame(draw);
        });
      }
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="grain-overlay w-full h-full"
      style={{ imageRendering: "pixelated" }}
      aria-hidden="true"
    />
  );
}
