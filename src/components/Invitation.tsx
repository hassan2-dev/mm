import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { event, invitationImage, copy } from "../data/site";
import { Reveal } from "./Reveal";

type Props = {
  onOpenCard: () => void;
};

function downloadCalendar() {
  const text = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Mustafa Wedding//AR",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:mustafa-20260913-wedding",
    `DTSTAMP:${event.calendarStamp}`,
    `DTSTART:${event.startUTC}`,
    `SUMMARY:${event.name}`,
    `LOCATION:${event.locationLine}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(
    new Blob([text], { type: "text/calendar;charset=utf-8" })
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = "mustafa-wedding.ics";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function Invitation({ onOpenCard }: Props) {
  const envelopeRef = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = envelopeRef.current;
    if (!el) return;

    if (reduce) {
      setOpened(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpened(true);
          io.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <section className="section" id="invitation" aria-labelledby="invite-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="kicker">{copy.inviteKicker}</p>
          <h2 className="section-title" id="invite-title">
            {copy.inviteTitle}
          </h2>
          <p className="section-lead">{copy.inviteSub}</p>
        </Reveal>

        <div className="invite-wrap">
          <div className="envelope" ref={envelopeRef} data-open={opened || undefined}>
            <div className="envelope__pocket" aria-hidden>
              <div className="envelope__inner" />
            </div>

            <motion.div
              className="envelope__flap"
              aria-hidden
              initial={false}
              animate={
                opened
                  ? { rotateX: 178, zIndex: 1 }
                  : { rotateX: 0, zIndex: 4 }
              }
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.div
              className="envelope__card"
              initial={false}
              animate={
                reduce
                  ? { y: "-58%", opacity: 1 }
                  : opened
                    ? { y: "-58%", opacity: 1 }
                    : { y: "28%", opacity: 0.9 }
              }
              transition={{
                duration: 1.05,
                delay: opened && !reduce ? 0.35 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="invite-card">
                <div className="invite-card__frame">
                  <button
                    type="button"
                    onClick={onOpenCard}
                    aria-label="تكبير بطاقة العرس"
                    style={{ display: "block", width: "100%", padding: 0 }}
                  >
                    <img
                      className="invite-card__img"
                      src={invitationImage.src}
                      alt={invitationImage.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                </div>
                <p
                  className="kicker"
                  style={{ textAlign: "center", marginTop: "0.85rem" }}
                >
                  المس البطاقة للتكبير
                </p>
              </div>
            </motion.div>

            <div className="envelope__front" aria-hidden>
              <span className="envelope__seal">♥</span>
            </div>
          </div>

          <Reveal delay={0.08}>
            <div className="invite-meta">
              <div className="invite-meta__box">
                <span>الموعد</span>
                <strong>{event.dateFullAr}</strong>
                <p>{event.timeAr}</p>
              </div>
              <div className="invite-meta__box">
                <span>نلتقي في</span>
                <strong>{event.venue}</strong>
                <p>{event.locationShort}</p>
              </div>
              <div className="invite-actions">
                <a
                  className="btn btn-primary"
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  📍 موقع الحفل
                </a>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={downloadCalendar}
                >
                  أضف الموعد للتقويم
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
