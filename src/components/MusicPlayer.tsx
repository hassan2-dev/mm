import type { useMusicPlayer } from "../hooks/useMusicPlayer";

type PlayerApi = ReturnType<typeof useMusicPlayer>;

type Props = {
  visible: boolean;
  player: PlayerApi;
};

export function MusicPlayer({ visible, player }: Props) {
  if (!visible) return null;

  return (
    <aside className="player" aria-label="مشغّل الموسيقى">
      <button
        type="button"
        className="player__btn"
        onClick={player.toggle}
        aria-label={player.playing ? "إيقاف" : "تشغيل"}
      >
        {player.playing ? "❚❚" : "▶"}
      </button>
      <div className="player__meta">
        <span className="player__label">الآن</span>
        <span className="player__title">{player.song?.title ?? "—"}</span>
        <span className="player__artist">{player.song?.artist ?? ""}</span>
        {player.error && <span className="player__hint">{player.error}</span>}
      </div>
      <button
        type="button"
        className="player__btn player__btn--ghost"
        onClick={player.toggleMute}
        aria-label={player.muted ? "إلغاء الكتم" : "كتم"}
      >
        {player.muted ? "صامت" : "صوت"}
      </button>
    </aside>
  );
}
