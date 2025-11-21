"use client";
import { useEffect, useMemo, useRef, useState } from "react";

/** Carrousel léger (scroll-snap) + flèches + pastilles */
export default function PhotoCarousel({
  images = [],
  className = "",
  autoPlay = true,
  interval = 4000,
  rounded = "rounded-3xl",
  heightClass = "h-56 sm:h-64 md:h-80",
}) {
  const list = useMemo(() => images.filter(Boolean), [images]);
  const wrapRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(null);

  // sync index avec le scroll
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onScroll = () => {
      const w = el.clientWidth || 1;
      const i = Math.round(el.scrollLeft / w);
      setIdx(i);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // autoplay
  useEffect(() => {
    if (!autoPlay || paused || list.length <= 1) return;
    const el = wrapRef.current;
    if (!el) return;

    const id = setInterval(() => {
      const w = el.clientWidth || 1;
      const next = (idx + 1) % list.length;
      el.scrollTo({ left: next * w, behavior: "smooth" });
    }, interval);

    return () => clearInterval(id);
  }, [autoPlay, paused, interval, idx, list.length]);

  const go = (to) => {
    const el = wrapRef.current;
    if (!el) return;
    const w = el.clientWidth || 1;
    const max = list.length - 1;
    const target = Math.max(0, Math.min(max, to));
    el.scrollTo({ left: target * w, behavior: "smooth" });
  };

  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => setPaused(false);

  const handleTouchStart = (e) => {
    const t = e.touches?.[0];
    if (!t) return;
    touchStart.current = { x: t.clientX, y: t.clientY };
    setPaused(true);
  };

  const handleTouchEnd = (e) => {
    const t = e.changedTouches?.[0];
    if (!t || !touchStart.current) {
      setPaused(false);
      return;
    }
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;

    // swipe horizontal uniquement, avec un petit seuil
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
      go(dx < 0 ? idx + 1 : idx - 1);
    }
    setPaused(false);
    touchStart.current = null;
  };

  // Fallback si aucune image
  if (!list.length) {
    return (
      <div
        className={`relative overflow-hidden ${rounded} bg-stone-100/70 flex items-center justify-center h-40 sm:h-48 ${className}`}
      >
        <span className="text-xs sm:text-sm text-stone-500">
          Aucune photo disponible pour le moment
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={wrapRef}
        className={`flex overflow-x-auto scroll-smooth snap-x snap-mandatory ${heightClass} touch-pan-y`}
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
      >
        {list.map((img, i) => (
          <div
            key={i}
            className="min-w-full snap-start relative bg-stone-200"
            aria-hidden={i !== idx}
          >
            <img
              src={img.src}
              alt={img.alt || "Photo"}
              className="w-full h-full object-cover select-none pointer-events-none"
              draggable={false}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {list.length > 1 && (
        <>
          {/* Flèches */}
          <button
            type="button"
            onClick={() => go(idx - 1)}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white shadow px-2 py-1.5 rounded-full text-sm"
            aria-label="Photo précédente"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => go(idx + 1)}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white shadow px-2 py-1.5 rounded-full text-sm"
            aria-label="Photo suivante"
          >
            ›
          </button>

          {/* Pastilles */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {list.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                className={`h-2.5 w-2.5 rounded-full transition focus:outline-none focus:ring-2 focus:ring-white/80 ${
                  i === idx
                    ? "bg-white shadow ring-1 ring-black/10"
                    : "bg-white/60 hover:bg-white"
                }`}
                aria-label={`Aller à la photo ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
