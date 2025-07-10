import { useState, useRef } from "react";
import $ from "./ImageSlider.module.scss";

type ImageSliderProps = {
  images: string[];
};

export default function ImageSlider({ images }: ImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const startX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const goToSlide = (index: number) => {
    if (index < 0) {
      setCurrent(images.length - 1);
    } else if (index >= images.length) {
      setCurrent(0);
    } else {
      setCurrent(index);
    }
  };

  // 모바일 터치
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const diffX = startX.current - endX;
    if (diffX > 50) {
      goToSlide(current + 1);
    } else if (diffX < -50) {
      goToSlide(current - 1);
    }
    startX.current = null;
  };

  // 마우스 드래그
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current || startX.current === null) return;
    const endX = e.clientX;
    const diffX = startX.current - endX;
    if (diffX > 50) {
      goToSlide(current + 1);
    } else if (diffX < -50) {
      goToSlide(current - 1);
    }
    isDragging.current = false;
    startX.current = null;
  };

  if (images.length === 0) return null;

  return (
    <div
      className={$.slider}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <img src={images[current]} alt={`slide-${current}`} className={$.image} />

      <div className={$.bullets}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${$.bullet} ${index === current ? $.active : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
