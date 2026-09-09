import { useCallback, useEffect, useRef, useState } from "react";
import type { Song } from "../data/site";

type Options = {
  songs: Song[];
  enabled: boolean;
};

export function useMusicPlayer({ songs, enabled }: Options) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const song = songs[index] ?? songs[0];

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audio.loop = true;
    audioRef.current = audio;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audioRef.current = null;
    };
  }, [songs.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song) return;

    let cancelled = false;
    setError(null);
    setReady(false);
    audio.src = song.src;
    audio.load();

    const startAt = song.startAt ?? 0;

    const onCanPlay = () => {
      if (cancelled) return;
      if (startAt > 0 && audio.currentTime < startAt) {
        audio.currentTime = startAt;
      }
      setReady(true);
    };
    const onError = () => {
      if (!cancelled) {
        setReady(false);
        setError("أضف ملفات MP3 في مجلد music");
      }
    };
    const onSeekedLoop = () => {
      // عند تكرار الأغنية، ابدأ من startAt بدل الثانية 0
      if (startAt > 0 && audio.currentTime < startAt) {
        audio.currentTime = startAt;
      }
    };

    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("error", onError);
    audio.addEventListener("seeked", onSeekedLoop);

    return () => {
      cancelled = true;
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("seeked", onSeekedLoop);
    };
  }, [song?.src, song?.startAt]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song) return;

    const startAt = song.startAt ?? 0;
    if (startAt <= 0) return;

    // مع loop الأصلي، الرجوع لـ 0 يتجاوز startAt — نعيد التموضع
    const onTimeUpdate = () => {
      if (audio.loop && audio.currentTime < startAt && audio.currentTime < 0.35) {
        audio.currentTime = startAt;
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    return () => audio.removeEventListener("timeupdate", onTimeUpdate);
  }, [song?.src, song?.startAt]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
  }, [muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !enabled || !ready) return;
    audio.play().catch(() => setError("اضغط ▶ لتشغيل الموسيقى"));
  }, [enabled, ready, index]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => setError("تعذّر التشغيل — تأكد من ملفات MP3"));
    } else {
      audio.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => !m);
  }, []);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % Math.max(songs.length, 1));
  }, [songs.length]);

  const goTo = useCallback(
    (i: number) => {
      const len = Math.max(songs.length, 1);
      const nextIndex = ((i % len) + len) % len;
      setIndex((prev) => (prev === nextIndex ? prev : nextIndex));
    },
    [songs.length]
  );

  return {
    song,
    index,
    playing,
    muted,
    ready,
    error,
    toggle,
    toggleMute,
    next,
    goTo,
  };
}
