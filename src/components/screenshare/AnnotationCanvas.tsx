import React, { useEffect, useRef, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';

interface Point {
  x: number;
  y: number;
  color: string;
  size: number;
}

export function AnnotationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ff0000');
  const [size, setSize] = useState(5);
  const socket = useSocket();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas size to match parent
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Handle received drawing data
    socket?.on('draw-line', (data: { start: Point; end: Point }) => {
      drawLine(context, data.start, data.end);
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      socket?.off('draw-line');
    };
  }, [socket]);

  const drawLine = (
    context: CanvasRenderingContext2D,
    start: Point,
    end: Point
  ) => {
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.strokeStyle = start.color;
    context.lineWidth = start.size;
    context.lineCap = 'round';
    context.stroke();
  };

  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    const context = canvas.getContext('2d');
    if (context) {
      context.beginPath();
      context.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const start = {
      x: context.getLineDash()[0] || x,
      y: context.getLineDash()[1] || y,
      color,
      size
    };

    const end = { x, y, color, size };

    drawLine(context, start, end);
    socket?.emit('draw', { start, end });

    context.setLineDash([x, y]);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (context) {
      context.setLineDash([]);
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-auto"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-2 flex items-center space-x-4">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer"
        />
        <input
          type="range"
          min="1"
          max="20"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="w-32"
        />
      </div>
    </div>
  );
}