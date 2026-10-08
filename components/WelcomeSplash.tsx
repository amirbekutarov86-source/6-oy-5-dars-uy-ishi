"use client";

import { useEffect, useState, type CSSProperties } from "react";

const TITLE = "Xush kelibsiz!";

function greeting(): string {
  const h = new Date().getHours();
  if (h < 5) return "Xayrli tun";
  if (h < 12) return "Xayrli tong";
  if (h < 18) return "Xayrli kun";
  return "Xayrli kech";
}

export default function WelcomeSplash() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const [hello, setHello] = useState("");

  useEffect(() => {
    setHello(greeting());
    const t1 = setTimeout(() => setLeaving(true), 2600);
    const t2 = setTimeout(() => setGone(true), 3300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  return (
    <div className={leaving ? "splash out" : "splash"} onClick={() => setLeaving(true)} role="status" aria-label="Welcome">
      <span className="orb o1" />
      <span className="orb o2" />
      <div className="splash-inner">
        <div className="wave" aria-hidden="true">👋</div>
        <h2 className="welcome-title" aria-label={TITLE}>
          {TITLE.split("").map((ch, i) => (
            <span key={i} className="letter" style={{ "--n": i } as CSSProperties} aria-hidden="true">
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h2>
        <p className="splash-sub">{hello ? `${hello}! Bugungi vazifalaringiz sizni kutmoqda.` : "\u00A0"}</p>
        <p className="splash-skip">O&apos;tkazib yuborish uchun bosing</p>
      </div>
    </div>
  );
}
