import { couple, copy, event } from "../data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <strong>
        {couple.name} ❤️
      </strong>
      <p>{copy.footerThanks}</p>
      <p>
        {copy.footerNote} · {event.year}
      </p>
    </footer>
  );
}
