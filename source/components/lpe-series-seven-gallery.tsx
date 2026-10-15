"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./lpe-series-seven.module.css";

export function LpeSeriesSevenGallery({ images, imageLabel, viewLabel, closeLabel }: { images: string[]; imageLabel: string; viewLabel: string; closeLabel: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [originalSources, setOriginalSources] = useState<Set<string>>(() => new Set());
  const [selected, setSelected] = useState<number | null>(null);
  function open(index: number) {
    setSelected(index);
    dialog.current?.showModal();
  }
  return <>
    <div className={styles.galleryGrid} data-testid="lpe-lifestyle-gallery">
      {[0, 2, 4].map(start => <div className={styles.galleryColumn} key={start}>
        {[start, start + 1].map(index => <button className={styles.galleryPhoto} key={images[index]} type="button" aria-label={`${viewLabel} ${index + 1}`} onClick={() => open(index)}>
          <Image src={images[index]} alt={`${imageLabel} ${index + 1}`} fill sizes="(max-width: 700px) 45vw, (min-width: 1440px) 432px, 33vw"
            unoptimized={originalSources.has(images[index])}
            onError={() => setOriginalSources(previous => {
              if (previous.has(images[index])) return previous;
              return new Set(previous).add(images[index]);
            })} />
        </button>)}
      </div>)}
    </div>
    <dialog ref={dialog} className={styles.lightbox} onClose={() => setSelected(null)} aria-label={`${imageLabel} ${(selected ?? 0) + 1}`} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className={styles.lightboxContent}>
        <button type="button" className={styles.close} autoFocus aria-label={closeLabel} onClick={() => dialog.current?.close()}>×</button>
        {selected !== null && <Image unoptimized src={images[selected]} alt={`${imageLabel} ${(selected ?? 0) + 1}`} fill sizes="90vw" />}
      </div>
    </dialog>
  </>;
}
