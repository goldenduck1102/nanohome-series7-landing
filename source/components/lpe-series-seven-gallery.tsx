"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./lpe-series-seven.module.css";

export function LpeSeriesSevenGallery({ images, imageLabel, viewLabel, closeLabel }: { images: string[]; imageLabel: string; viewLabel: string; closeLabel: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  function open(index: number) {
    setSelected(index);
    dialog.current?.showModal();
  }
  return <>
    <div className={styles.galleryGrid} data-testid="lpe-lifestyle-gallery">
      {[0, 2, 4].map(start => <div className={styles.galleryColumn} key={start}>
        {[start, start + 1].map(index => <button className={styles.galleryPhoto} key={images[index]} type="button" aria-label={`${viewLabel} ${index + 1}`} onClick={() => open(index)}>
          <Image unoptimized src={images[index]} alt={`${imageLabel} ${index + 1}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 45vw, 33vw" />
        </button>)}
      </div>)}
    </div>
    <dialog ref={dialog} className={styles.lightbox} aria-label={`${imageLabel} ${selected + 1}`} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className={styles.lightboxContent}>
        <button type="button" className={styles.close} autoFocus aria-label={closeLabel} onClick={() => dialog.current?.close()}>×</button>
        <Image unoptimized src={images[selected]} alt={`${imageLabel} ${selected + 1}`} fill sizes="90vw" />
      </div>
    </dialog>
  </>;
}
