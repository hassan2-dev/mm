import { useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { getSiteUrl, copy, couple } from "../data/site";
import { Reveal } from "./Reveal";

export function QRShare() {
  const [toast, setToast] = useState<string | null>(null);
  const siteUrl = useMemo(() => getSiteUrl(), []);

  async function share() {
    const payload = {
      title: `دعوة زفاف ${couple.name} ❤️`,
      text: "شاركونا أجمل أيام العمر",
      url: siteUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(payload);
        return;
      }
    } catch {
      /* user cancelled */
      return;
    }

    try {
      await navigator.clipboard.writeText(siteUrl);
      setToast("تم نسخ رابط الدعوة");
      window.setTimeout(() => setToast(null), 2200);
    } catch {
      setToast(siteUrl);
      window.setTimeout(() => setToast(null), 3500);
    }
  }

  return (
    <section className="section" id="qr" aria-labelledby="qr-title">
      <div className="container">
        <Reveal>
          <div className="qr-block">
            <p className="kicker">للمشاركة والطباعة</p>
            <h2 className="section-title" id="qr-title" style={{ fontSize: "1.8rem" }}>
              دعوة مصطفى
            </h2>
            <div className="qr-frame">
              <QRCodeSVG
                value={siteUrl || "https://example.com"}
                size={220}
                level="H"
                marginSize={2}
                bgColor="#ffffff"
                fgColor="#2a2118"
                title={copy.qrCaption}
              />
            </div>
            <p className="qr-caption">{copy.qrCaption}</p>
            <div className="qr-actions">
              <button type="button" className="btn btn-primary" onClick={share}>
                {copy.shareLabel}
              </button>
              <a className="btn btn-ghost" href={siteUrl} target="_blank" rel="noreferrer">
                فتح الرابط
              </a>
            </div>
          </div>
        </Reveal>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </section>
  );
}
