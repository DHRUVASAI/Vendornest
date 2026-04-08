import type { Product } from "@/lib/types";
import { X, Move } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export function ARModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pos, setPos] = useState({ x: 200, y: 200 });
  const [dragging, setDragging] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = product.image;
    img.onload = () => {
      imgRef.current = img;
      draw();
    };
  }, [product.image]);

  useEffect(() => {
    draw();
  }, [pos]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Simulated room background
    ctx.fillStyle = "#f0ece3";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Floor
    ctx.fillStyle = "#d4c9b0";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height * 0.6);
    ctx.lineTo(canvas.width, canvas.height * 0.55);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fill();

    // Grid lines
    ctx.strokeStyle = "#c4b99955";
    ctx.lineWidth = 1;
    for (let i = 0; i < 10; i++) {
      const y = canvas.height * 0.6 + (canvas.height * 0.4 / 10) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y - 5);
      ctx.stroke();
    }

    // Shadow
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.beginPath();
    ctx.ellipse(pos.x, pos.y + 60, 50, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Product image
    if (imgRef.current) {
      const size = 120;
      ctx.drawImage(imgRef.current, pos.x - size / 2, pos.y - size / 2, size, size);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const touch = e.touches[0];
    setPos({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4" onClick={onClose}>
      <div className="relative w-full max-w-2xl rounded-lg bg-card shadow-xl animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-2">
            <Move className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">AR Preview — Drag to reposition</span>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-muted"><X className="h-5 w-5" /></button>
        </div>
        <canvas
          ref={canvasRef}
          className="w-full h-96 cursor-move"
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        />
        <div className="p-3 text-center text-xs text-muted-foreground border-t border-border">
          Simulated AR environment • {product.title}
        </div>
      </div>
    </div>
  );
}
