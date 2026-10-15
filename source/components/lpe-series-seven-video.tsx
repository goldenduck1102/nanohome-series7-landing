"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Locale } from "@/i18n/routing";
import styles from "./lpe-series-seven.module.css";

const labels = {
  vi: { play: "Phát video", pause: "Tạm dừng video", mute: "Tắt âm thanh", sound: "Bật âm thanh", error: "Video chưa tải được. Thử phát lại." },
  en: { play: "Play video", pause: "Pause video", mute: "Mute video", sound: "Enable sound", error: "Video could not load. Try playing again." },
  ko: { play: "동영상 재생", pause: "동영상 일시 정지", mute: "음소거", sound: "소리 켜기", error: "동영상을 불러올 수 없습니다. 다시 재생하세요." },
};

export function LpeSeriesSevenVideo({ locale, children, explore, destination }: { locale: Locale; children: ReactNode; explore: string; destination: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);
  const c = labels[locale];

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    video.defaultMuted = true;
    video.muted = true;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const conserveData = connection?.saveData || ["slow-2g", "2g"].includes(connection?.effectiveType ?? "");
    video.autoplay = !motion.matches && !conserveData;
    let visible = true;
    const sync = () => {
      if (!visible || document.hidden || motion.matches || conserveData || manuallyPaused.current) video.pause();
      else void video.play().catch(() => setPlaying(false));
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.15 });
    observer.observe(video);
    sync();
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); motion.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (!video.paused) { manuallyPaused.current = true; video.pause(); }
    else {
      manuallyPaused.current = false;
      if (failed) { video.load(); setFailed(false); }
      void video.play().catch((error: unknown) => { if (!(error instanceof DOMException && error.name === "AbortError")) setFailed(true); });
    }
  };

  const controls = (<div className={styles.filmControls}>
        <button type="button" onClick={toggle} aria-label={playing ? c.pause : c.play}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{playing ? <path d="M8 5v14M16 5v14" /> : <path d="m7 4 14 8-14 8Z" />}</svg></button>
        <button type="button" onClick={() => setMuted(!muted)} aria-label={muted ? c.sound : c.mute}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4Z" />{muted ? <path d="m16 9 6 6m0-6-6 6" /> : <path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" />}</svg></button>

      </div>);

  return <><div className={styles.videoHeroCopy}>{children}<div className={styles.heroActions}><a className={styles.videoCta} href={destination}>{explore}<span aria-hidden="true">→</span></a>{controls}</div></div><div className={styles.film} data-testid="series-seven-film">
    <video ref={ref} poster="/images/campaigns/lpe-series7/series7-film-poster.webp" muted={muted} loop playsInline preload="none" aria-label="Series 7 Tailored — Fritz Hansen" onPlay={() => { setPlaying(true); setFailed(false); }} onPause={() => setPlaying(false)} onError={() => setFailed(true)}>
      <source media="(max-width: 700px)" src="https://embed-ssl.wistia.com/deliveries/49d829f5e35f246bac450f07f88f55a49e1b46f6.bin" type="video/mp4" />
      <source src="https://embed-ssl.wistia.com/deliveries/75cf3d42d7d98ed7951c728444639f59ea2777cb.bin" type="video/mp4" />
    </video>
    <div className={styles.filmFooter}>
      {controls}
    </div>
  </div></>;
}
