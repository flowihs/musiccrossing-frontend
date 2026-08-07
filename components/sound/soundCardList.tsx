"use client";

import { useRef, useState, MouseEvent } from "react";
import "./sound.css";
import { SoundCard } from "@/components/sound/soundCard";

interface props {
  title: string;
}

export function SoundCardList({ title }: props) {
  const listRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!listRef.current) return;
    isDown.current = true;
    startX.current = e.pageX - listRef.current.offsetLeft;
    scrollLeft.current = listRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    isDown.current = false;
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDown.current || !listRef.current) {
      return;
    }
    e.preventDefault();

    if (!isDragging) {
      setIsDragging(true);
    }

    const x = e.pageX - listRef.current.offsetLeft;
    const walk = (x - startX.current) * 2.0;
    listRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const musics = [
    { id: 1, name: "stringf", author: "stringfdsfdsfds", image: "string" },
    { id: 2, name: "stringf", author: "stringfdsfdsfds", image: "string" },
    { id: 3, name: "stringf", author: "stringfdsfdsfds", image: "string" },
    { id: 4, name: "stringf", author: "stringfdsfdsfds", image: "string" },
    { id: 5, name: "stringf", author: "stringfdsfdsfds", image: "string" },
    { id: 6, name: "stringf", author: "stringfdsfdsfds", image: "string" },
    { id: 7, name: "stringf", author: "stringfdsfdsfds", image: "string" },
    { id: 8, name: "stringf", author: "stringfdsfdsfds", image: "string" },
    { id: 9, name: "stringf", author: "stringfdsfdsfds", image: "string" },
    { id: 10, name: "stringf", author: "stringfdsfdsfds", image: "string" },
    { id: 11, name: "stringf", author: "stringfdsfdsfds", image: "string" },
    { id: 12, name: "stringf", author: "stringfdsfdsfds", image: "string" },
    { id: 13, name: "stringf", author: "stringfdsfdsfds", image: "string" },
  ];

  return (
    <div className="SoundCardList">
      <p className="SoundCardListTitle">{title}</p>

      <div
        className={`SoundCardListContainer ${isDragging ? "is-dragging" : ""}`}
        ref={listRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ userSelect: "none" }}
      >
        {musics.map((sound) => (
          <SoundCard
            key={sound.id}
            name={sound.name}
            author={sound.author}
            image={sound.image}
          />
        ))}
      </div>
    </div>
  );
}
