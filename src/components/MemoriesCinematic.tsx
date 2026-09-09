import { copy, memories } from "../data/site";
import { Reveal } from "./Reveal";

export function MemoriesCinematic() {
  return (
    <section className="section" id="memories" aria-labelledby="mem-title">
      <div className="container">
        <Reveal className="section-head">
          <h2 className="section-title" id="mem-title">
            {copy.memoriesTitle}
          </h2>
          <p className="section-lead">{copy.memoriesLead}</p>
        </Reveal>

        <div className="memory-strip">
          {memories.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.06} className="memory-card">
              <img src={m.src} alt={m.alt} loading="lazy" decoding="async" />
              <div className="memory-card__shade" />
              <div className="memory-card__text">
                <h3>{m.title}</h3>
                <p>{m.caption}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
