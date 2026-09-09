import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { hero, couple } from "../data/site";

type Props = {
  open: boolean;
  onOpen: () => void;
  onSkip: () => void;
};

export function Gate({ open, onOpen, onSkip }: Props) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          className="gate"
          initial={{ opacity: 1 }}
          exit={
            reduce
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.04, filter: "blur(8px)" }
          }
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          aria-label="شاشة البداية"
        >
          <div className="gate__media">
            <motion.img
              src={hero.image}
              alt={hero.alt}
              initial={reduce ? false : { scale: 1.12 }}
              animate={{ scale: 1.04 }}
              transition={{ duration: 12, ease: "linear" }}
              fetchPriority="high"
            />
            <div className="gate__veil" />
          </div>

          <motion.div
            className="gate__content"
            initial={reduce ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="gate__eyebrow">{couple.inviteLine}</p>
            <p className="gate__date" style={{ marginBottom: "0.35rem", opacity: 0.85 }}>
              {couple.memoryLine}
            </p>
            <h1 className="gate__name">{couple.name}</h1>
            <div className="ornament" aria-hidden>
              ✦
            </div>
            <p className="gate__tagline">{couple.tagline}</p>
            <p className="gate__date">{hero.dateLine}</p>
            <button type="button" className="btn btn-gold" onClick={onOpen}>
              {hero.cta}
            </button>
            <button type="button" className="gate__skip" onClick={onSkip}>
              شوف الدعوة مباشرة
            </button>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
