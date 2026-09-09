import { copy, event } from "../data/site";
import { useCountdown } from "../hooks/useCountdown";
import { Reveal } from "./Reveal";

const toArabicDigits = (n: number) =>
  String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);

export function Countdown() {
  const parts = useCountdown(event.startISO);

  return (
    <section className="section" id="countdown" aria-labelledby="cd-title">
      <div className="container">
        <Reveal className="section-head">
          <h2 className="section-title" id="cd-title">
            {copy.countdownTitle}
          </h2>
          <p className="section-lead">
            {event.dateFullAr} · {event.timeShortAr}
          </p>
        </Reveal>

        {parts.done ? (
          <p className="countdown__done">الفرحة بدأت… بارك الله لمصطفى ❤️</p>
        ) : (
          <Reveal>
            <div className="countdown" role="timer" aria-live="polite">
              <div className="countdown__cell">
                <span className="countdown__value">
                  {toArabicDigits(parts.days)}
                </span>
                <span className="countdown__label">أيام</span>
              </div>
              <div className="countdown__cell">
                <span className="countdown__value">
                  {toArabicDigits(parts.hours)}
                </span>
                <span className="countdown__label">ساعات</span>
              </div>
              <div className="countdown__cell">
                <span className="countdown__value">
                  {toArabicDigits(parts.minutes)}
                </span>
                <span className="countdown__label">دقائق</span>
              </div>
              <div className="countdown__cell">
                <span className="countdown__value">
                  {toArabicDigits(parts.seconds)}
                </span>
                <span className="countdown__label">ثوانٍ</span>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
