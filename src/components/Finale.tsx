import { copy, event, hero } from "../data/site";
import { Reveal } from "./Reveal";

export function Finale() {
  return (
    <section className="finale" id="finale" aria-label="ختام الدعوة">
      <div className="finale__media">
        <img
          src={hero.image}
          alt={hero.alt}
          loading="lazy"
          decoding="async"
        />
        <div className="finale__veil" />
      </div>
      <Reveal className="finale__content" y={20}>
        <p className="finale__line1">{copy.finaleLine1}</p>
        <p className="finale__line2">{copy.finaleLine2}</p>
        <div className="ornament" aria-hidden>
          ✦
        </div>
        <p className="finale__date">
          {event.dateFullAr} · {event.timeShortAr}
          <br />
          {event.venue} — {event.locationShort}
        </p>
      </Reveal>
    </section>
  );
}
