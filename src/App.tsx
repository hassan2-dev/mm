import { useEffect, useState } from "react";
import { Gate } from "./components/Gate";
import { MusicPlayer } from "./components/MusicPlayer";
import { StoryTimeline } from "./components/StoryTimeline";
import { Invitation } from "./components/Invitation";
import { Countdown } from "./components/Countdown";
import { Gallery, useGalleryLightbox } from "./components/Gallery";
import { MemoriesCinematic } from "./components/MemoriesCinematic";
import { Finale } from "./components/Finale";
import { QRShare } from "./components/QRShare";
import { Footer } from "./components/Footer";
import { songs } from "./data/site";
import { useMusicPlayer } from "./hooks/useMusicPlayer";

export default function App() {
  const [gateOpen, setGateOpen] = useState(true);
  const [entered, setEntered] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const lightbox = useGalleryLightbox();
  const player = useMusicPlayer({ songs, enabled: musicOn });

  useEffect(() => {
    document.body.classList.toggle("is-locked", gateOpen);
  }, [gateOpen]);

  // song1 من البداية، وsong2 عند الوصول لقسم الدعوة
  useEffect(() => {
    if (!entered || !musicOn) return;

    const invite = document.getElementById("invitation");
    if (!invite) return;

    const syncTrack = () => {
      const top = invite.getBoundingClientRect().top;
      const reachedInvite = top < window.innerHeight * 0.55;
      player.goTo(reachedInvite ? 1 : 0);
    };

    syncTrack();
    window.addEventListener("scroll", syncTrack, { passive: true });
    window.addEventListener("resize", syncTrack);
    return () => {
      window.removeEventListener("scroll", syncTrack);
      window.removeEventListener("resize", syncTrack);
    };
  }, [entered, musicOn, player.goTo]);

  function enter(withMusic: boolean) {
    setMusicOn(withMusic);
    setGateOpen(false);
    window.setTimeout(() => {
      setEntered(true);
      document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
    }, 350);
  }

  function openInvitationOnly() {
    setMusicOn(false);
    setGateOpen(false);
    window.setTimeout(() => {
      setEntered(true);
      document
        .getElementById("invitation")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 350);
  }

  return (
    <>
      <Gate
        open={gateOpen}
        onOpen={() => enter(true)}
        onSkip={openInvitationOnly}
      />

      <div className={`app-shell${entered || !gateOpen ? " is-ready" : ""}`}>
        <StoryTimeline />
        <Invitation
          onOpenCard={() => {
            const inviteIndex = 4;
            lightbox.onOpen(inviteIndex);
          }}
        />
        <Countdown />
        <Gallery {...lightbox} />
        <MemoriesCinematic />
        <Finale />
        <QRShare />
        <Footer />
      </div>

      <MusicPlayer visible={entered} player={player} />
    </>
  );
}
