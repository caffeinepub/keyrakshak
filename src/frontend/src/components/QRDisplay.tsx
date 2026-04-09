import { cn } from "@/lib/utils";
import QRCode from "qrcode";
import { useEffect, useRef } from "react";

interface QRDisplayProps {
  keyId: string;
  size?: number;
  className?: string;
  showLabel?: boolean;
}

export function QRDisplay({
  keyId,
  size = 180,
  className,
  showLabel = true,
}: QRDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const finderUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/found/${keyId}`
      : `/found/${keyId}`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    QRCode.toCanvas(canvas, finderUrl, {
      width: size,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });
  }, [finderUrl, size]);

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div
        className="qr-frame p-3"
        style={{ width: size + 32, height: size + 32 }}
      >
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="rounded"
          aria-label={`QR code for key ${keyId}`}
        />
      </div>
      {showLabel && (
        <span className="text-sm font-mono font-semibold text-primary tracking-wider">
          {keyId}
        </span>
      )}
    </div>
  );
}
