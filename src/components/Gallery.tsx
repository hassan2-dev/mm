import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { copy, gallery } from "../data/site";
import { Reveal } from "./Reveal";

type Props = {
  openIndex: number | null;
  onOpen: (index: number) => void;
  onClose: () => void;
};

export function Gallery({ openIndex, onOpen, onClose }: Props) {
  return (
    <section className="section" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <Reveal className="section-head">
          <h2 className="section-title" id="gallery-title">
            {copy.galleryTitle}
          </h2>
          <p className="section-lead">{copy.galleryLead}</p>
        </Reveal>

        <div className="gallery-grid">
          {gallery.map((item, i) => (
            <Reveal key={item.src + item.label} delay={i * 0.04}>
              <button
                type="button"
                className="gallery-item"
                onClick={() => onOpen(i)}
                aria-label={`فتح ${item.label}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                />
                <span className="gallery-item__label">{item.label}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Lightbox
        index={openIndex}
        onClose={onClose}
        onChange={onOpen}
      />
    </section>
  );
}

function Lightbox({
  index,
  onClose,
  onChange,
}: {
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        onChange((index + 1) % gallery.length);
      if (e.key === "ArrowRight")
        onChange((index - 1 + gallery.length) % gallery.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, onClose, onChange]);

  const item = index !== null ? gallery[index] : null;

  return (
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={item.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="lightbox__top">
            <span>
              {item.label} · {index + 1}/{gallery.length}
            </span>
            <button type="button" className="lightbox__btn" onClick={onClose}>
              إغلاق ×
            </button>
          </div>
          <div className="lightbox__stage">
            <motion.img
              key={item.src}
              src={item.src}
              alt={item.alt}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
            />
          </div>
          <div className="lightbox__nav">
            <button
              type="button"
              className="lightbox__btn"
              onClick={() =>
                onChange((index - 1 + gallery.length) % gallery.length)
              }
            >
              السابق
            </button>
            <button
              type="button"
              className="lightbox__btn"
              onClick={() => onChange((index + 1) % gallery.length)}
            >
              التالي
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function useGalleryLightbox() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return {
    openIndex,
    onOpen: (i: number) => setOpenIndex(i),
    onClose: () => setOpenIndex(null),
  };
}
