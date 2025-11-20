"use client";
import { useEffect, useMemo, useRef, useState } from "react";

/** Carrousel léger (scroll-snap) + flèches + pastilles */
export default function PhotoCarousel({
  images = [],
  className = "",
  autoPlay = true,
  interval = 4000,
  rounded = "rounded-3xl",
  heightClass = "h-56 md:h-72",
}) {
  const list = useMemo(() => images.filter(Boolean), [images]);
  const wrapRef = useRef(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth;
      const i = Math.round(el.scrollLeft / (w || 1));
      setIdx(i);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!autoPlay || list.length <= 1) return;
    const el = wrapRef.current;
    if (!el) return;
    const id = setInterval(() => {
      const w = el.clientWidth;
      const next = (idx + 1) % list.length;
      el.scrollTo({ left: next * w, behavior: "smooth" });
    }, interval);
    return () => clearInterval(id);
  }, [autoPlay, interval, idx, list.length]);

  const go = (to) => {
    const el = wrapRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const target = Math.max(0, Math.min(list.length - 1, to));
    el.scrollTo({ left: target * w, behavior: "smooth" });
  };

  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`}>
      <div
        ref={wrapRef}
        className={`flex overflow-x-auto scroll-smooth snap-x snap-mandatory ${heightClass}`}
        style={{ scrollbarWidth: "none" }}
      >
        {list.map((img, i) => (
          <div key={i} className="min-w-full snap-start relative bg-stone-200">
            <img
              src={img.src}
              alt={img.alt || "Photo"}
              className="w-full h-full object-cover select-none pointer-events-none"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {list.length > 1 && (
        <>
          <button
            onClick={() => go(idx - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white shadow px-2 py-1 rounded-full"
            aria-label="Précédent"
          >
            ‹
          </button>
          <button
            onClick={() => go(idx + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white shadow px-2 py-1 rounded-full"
            aria-label="Suivant"
          >
            ›
          </button>
        </>
      )}

      {list.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {list.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === idx ? "bg-white shadow ring-1 ring-black/10" : "bg-white/60 hover:bg-white"
              }`}
              aria-label={`Aller à la photo ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
