"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ImageCarousel({
  images = [],
  interval = 4000,
  auto = true,
  showDots = true,
  showArrows = true,
  className = "",
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const touchRef = useRef({ x: 0, y: 0 });

  const go = (n) => setIndex((prev) => (prev + n + images.length) % images.length);
  const goTo = (i) => setIndex(((i % images.length) + images.length) % images.length);

  useEffect(() => {
    if (!auto || paused || images.length <= 1) return;
    timerRef.current = setInterval(() => go(1), interval);
    return () => clearInterval(timerRef.current);
  }, [auto, paused, interval, images.length]);

  const onTouchStart = (e) => {
    const t = e.touches?.[0];
    if (!t) return;
    touchRef.current = { x: t.clientX, y: t.clientY };
    setPaused(true);
  };
  const onTouchEnd = (e) => {
    const t = e.changedTouches?.[0];
    if (!t) { setPaused(false); return; }
    const dx = t.clientX - touchRef.current.x;
    const dy = t.clientY - touchRef.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
      go(dx < 0 ? 1 : -1);
    }
    setPaused(false);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-stone-200 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides (crossfade) */}
      <div className="relative h-64 md:h-96">
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
            aria-hidden={i !== index}
          >
            <Image
              src={img.src}
              alt={img.alt || ""}
              fill
              className="object-cover"
              priority={i === 0}
            />
            {/* Légende & crédits */}
            {(img.caption || img.credit) && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent p-3 text-white text-xs">
                {img.caption && <div className="font-medium drop-shadow">{img.caption}</div>}
                {img.credit && (
                  <div className="opacity-80">
                    © {img.credit}{img.license ? ` — ${img.license}` : ""}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Flèches */}
      {showArrows && images.length > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Image précédente"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 text-white p-2 hover:bg-black/50"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Image suivante"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 text-white p-2 hover:bg-black/50"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </>
      )}

      {/* Points */}
      {showDots && images.length > 1 && (
        <div className="absolute left-0 right-0 bottom-2 flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Aller à l’image ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2.5 w-2.5 rounded-full border transition ${
                i === index ? "bg-white border-white" : "bg-white/50 border-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
