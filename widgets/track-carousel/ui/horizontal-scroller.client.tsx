"use client";

import { useRef, useState } from "react";

import styles from "./track-carousel.module.css";

interface HorizontalScrollerProps {
  children: React.ReactNode;
}

export function HorizontalScroller({ children }: HorizontalScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const initialScrollLeft = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    container.setPointerCapture(event.pointerId);
    startX.current = event.clientX;
    initialScrollLeft.current = container.scrollLeft;
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container || !isDragging) {
      return;
    }

    const distance = event.clientX - startX.current;
    container.scrollLeft = initialScrollLeft.current - distance;
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (container?.hasPointerCapture(event.pointerId)) {
      container.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.scroller} ${isDragging ? styles.dragging : ""}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      {children}
    </div>
  );
}
