"use client";

import { useRef, useState, type ReactNode } from "react";
import styles from "./lpe-series-seven.module.css";

export function LpeSeriesSevenSpaces({ children, labels }: { children: ReactNode; labels: readonly string[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  return <div>
    <div ref={rail} className={styles.spaces} data-testid="lpe-spaces" onScroll={() => {
      const el = rail.current;
      if (!el) return;
      const cards = Array.from(el.children) as HTMLElement[];
      const first = cards[0]?.offsetLeft ?? 0;
      const nearest = cards.reduce((best, card, i) => Math.abs(card.offsetLeft - first - el.scrollLeft) < Math.abs(cards[best].offsetLeft - first - el.scrollLeft) ? i : best, 0);
      setActive(nearest);
    }}>{children}</div>
    <div className={styles.spacePagination}>
      {labels.map((label, i) => <button key={label} type="button" aria-label={label} aria-pressed={active === i} onClick={() => {
        const el = rail.current;
        if (!el) return;
        const card = el.children[i] as HTMLElement;
        const first = el.children[0] as HTMLElement;
        el.scrollTo({ left: card.offsetLeft - first.offsetLeft, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      }}><span /></button>)}
    </div>
  </div>;
}
