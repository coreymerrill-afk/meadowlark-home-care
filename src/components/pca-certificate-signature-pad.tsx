"use client";

import { useEffect, useRef, type PointerEvent } from "react";

import { Button } from "@/components/ui/button";

type Point = { x: number; y: number };

export function PcaCertificateSignaturePad({
  value,
  onChange,
}: {
  value: string;
  onChange: (dataUrl: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<Point | null>(null);
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const setup = (restoreFrom: string) => {
      const ratio = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      const context = canvas.getContext("2d");
      if (!context) {
        return;
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.lineCap = "round";
      context.lineJoin = "round";
      context.strokeStyle = "#1d2a2e";
      context.lineWidth = 2;
      if (!restoreFrom) {
        return;
      }
      const image = new Image();
      image.onload = () => {
        context.drawImage(image, 0, 0, width, height);
      };
      image.src = restoreFrom;
    };

    setup(valueRef.current);
    const onResize = () => setup(valueRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function pointFromEvent(event: PointerEvent<HTMLCanvasElement>): Point {
    const canvas = canvasRef.current;
    if (!canvas) {
      return { x: 0, y: 0 };
    }
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function persist() {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    onChange(canvas.toDataURL("image/png"));
  }

  function handlePointerDown(event: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }
    drawingRef.current = true;
    canvas.setPointerCapture(event.pointerId);
    lastPointRef.current = pointFromEvent(event);
  }

  function handlePointerMove(event: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const last = lastPointRef.current;
    if (!drawingRef.current || !canvas || !context || !last) {
      return;
    }
    const next = pointFromEvent(event);
    context.beginPath();
    context.moveTo(last.x, last.y);
    context.lineTo(next.x, next.y);
    context.stroke();
    lastPointRef.current = next;
  }

  function handlePointerUp(event: PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) {
      return;
    }
    drawingRef.current = false;
    lastPointRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
    persist();
  }

  function clear() {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    onChange("");
  }

  return (
    <div className="space-y-2">
      <canvas
        ref={canvasRef}
        className="h-28 w-full touch-none rounded-lg border border-input bg-card"
        aria-label="Nurse supervisor signature"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          Optional. A signature line still prints if you skip this.
        </p>
        {value ? (
          <Button type="button" variant="ghost" onClick={clear}>
            Clear signature
          </Button>
        ) : null}
      </div>
    </div>
  );
}
