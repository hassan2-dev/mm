import { useEffect, useRef, useState } from "react";
import { copy, memories } from "../data/site";
import { Reveal } from "./Reveal";

export function StoryTimeline() {
  return (
    <section className="section" id="story" aria-labelledby="story-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="kicker">{copy.albumKicker}</p>
          <h2 className="section-title" id="story-title">
            {copy.storyTitle}
          </h2>
          <p className="section-lead">{copy.storyLead}</p>
        </Reveal>

        <div className="timeline">
          {memories.map((m, i) => (
            <StoryItem key={m.id} index={i} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryItem({
  era,
  title,
  caption,
  alt,
  src,
  index,
}: (typeof memories)[number] & { index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting && e.intersectionRatio > 0.35),
      { threshold: [0.35, 0.55] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Reveal delay={index * 0.05}>
      <article
        ref={ref}
        className={`story-item${inView ? " is-inview" : ""}`}
      >
        <span className="story-item__dot" aria-hidden />
        <div className="story-item__media">
          <img src={src} alt={alt} loading="lazy" decoding="async" />
        </div>
        <div className="story-item__copy">
          <p className="story-item__era">{era}</p>
          <h3 className="story-item__title">{title}</h3>
          <p className="story-item__caption">{caption}</p>
        </div>
      </article>
    </Reveal>
  );
}
