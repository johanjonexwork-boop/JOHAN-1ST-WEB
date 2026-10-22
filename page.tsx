"use client";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { profile, experience, works, filters, software, Work } from "@/data/content";

const sections = [
  { id: "profile", label: "Profile" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "software", label: "Software" },
  { id: "contact", label: "Contact" },
];
const bars = ["#e6e6e6", "#e0d34a", "#3cc8d0", "#4ac45a", "#c050c0", "#d6403a", "#3a58c8"];

function Timecode() {
  const [t, setT] = useState("00:00:00:00");
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const ms = Date.now() - start;
      const p = (n: number) => String(n).padStart(2, "0");
      setT(`${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)}:${p(Math.floor((ms % 1000) / 40))}`);
    }, 40);
    return () => clearInterval(id);
  }, []);
  return <span className="tc">{t}</span>;
}

function Count({ n, suffix }: { n: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const s = performance.now();
      const tick = (now: number) => {
        const k = Math.min((now - s) / 1200, 1);
        setV(Math.round(n * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [n]);
  return <span ref={ref}>{v}{suffix}</span>;
}

export default function Home() {
  const [active, setActive] = useState("home");
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<Work | null>(null);
  const [photoOk, setPhotoOk] = useState(true);
  const progRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      progRef.current?.style.setProperty("transform", `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`);
      const tl = tlRef.current;
      if (tl) {
        const r = tl.getBoundingClientRect();
        const p = Math.min(Math.max((window.innerHeight * 0.6 - r.top) / r.height, 0), 1);
        tl.style.setProperty("--p", String(p));
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["home", ...sections.map((s) => s.id)].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const list = works.filter((w) => filter === "All" || w.cat === filter);
  const isVideo = (s?: string) => !!s && /\.(mp4|webm|mov)$/i.test(s);

  return (
    <>
      <header className="nav">
        <div className="prog" ref={progRef} />
        <button className="brand" onClick={() => go("home")} aria-label="Back to top">JJ</button>
        <nav className={menu ? "links open" : "links"} aria-label="Sections">
          {sections.map((s) => (
            <button key={s.id} className={active === s.id ? "on" : ""} onClick={() => go(s.id)}>{s.label}</button>
          ))}
        </nav>
        <button className="burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)}><i /><i /></button>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="bars" aria-hidden>{bars.map((c, i) => <span key={c} style={{ background: c, animationDelay: `${i * 90}ms` }} />)}</div>
          <div className="wrap hero-grid">
            <div>
              <div className="live"><span className="dot" />On air <Timecode /></div>
              <h1 className="h-name"><span>Johan</span><span>J Jonex</span></h1>
              <p className="lower"><b>{profile.role}</b><span>Live streaming, switching, drone, editing</span></p>
              <div className="cta">
                <button className="btn solid" onClick={() => go("work")}>View my work</button>
                <a className="btn" href={profile.resume} download>Download resume</a>
              </div>
            </div>
            <div className="frame">
              {photoOk ? <img src={profile.photo} alt="Johan J Jonex" onError={() => setPhotoOk(false)} /> : <div className="ph">JJ</div>}
              <span className="rec"><i />REC</span>
            </div>
          </div>
          <button className="scroll" onClick={() => go("profile")} aria-label="Scroll to profile">Scroll</button>
        </section>

        <section id="profile" className="sec">
          <div className="wrap two">
            <Reveal><h2>Professional profile</h2></Reveal>
            <div>
              <Reveal delay={80}><p className="lead">{profile.summary}</p></Reveal>
              <div className="stats">
                {profile.stats.map((s, i) => (
                  <Reveal key={s.label} delay={i * 80}><div className="stat"><strong><Count n={s.n} suffix={s.suffix} /></strong><span>{s.label}</span></div></Reveal>
                ))}
              </div>
              <Reveal delay={120}>
                <p className="meta"><b>{profile.education.school}</b><br />{profile.education.degree}, {profile.education.year}</p>
                <p className="meta"><b>Languages</b><br />{profile.languages.join(", ")}</p>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="experience" className="sec alt">
          <div className="wrap">
            <Reveal><h2>Experience</h2></Reveal>
            <ol className="timeline" ref={tlRef}>
              {experience.map((e, i) => (
                <li key={e.org}>
                  <Reveal delay={(i % 3) * 60}>
                    <span className="node" />
                    <div className="time">{e.time}</div>
                    <h3>{e.org}</h3>
                    <p className="role">{e.role}</p>
                    <p>{e.text}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="work" className="sec">
          <div className="wrap">
            <Reveal><h2>Work</h2></Reveal>
            <div className="tabs" role="tablist">
              {filters.map((f) => (
                <button key={f} role="tab" aria-selected={filter === f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
            <div className="grid">
              {list.map((w, i) => (
                <Reveal key={w.title} delay={(i % 3) * 70}>
                  <button className="card" onClick={() => (w.href ? window.open(w.href, "_blank", "noopener") : w.src && setOpen(w))}>
                    <div className="thumb">
                      {w.src && !isVideo(w.src) && <img src={w.src} alt={w.title} loading="lazy" />}
                      {w.src && isVideo(w.src) && <video src={w.src} muted playsInline preload="metadata" />}
                      {!w.src && <span className="soon">{w.cat}</span>}
                      {(isVideo(w.src) || w.href) && <span className="play" />}
                    </div>
                    <div className="cap"><h3>{w.title}</h3><p>{w.note}</p></div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="software" className="sec alt">
          <div className="wrap two">
            <Reveal><h2>Software</h2></Reveal>
            <div className="sw">
              {software.map((g, i) => (
                <Reveal key={g.group} delay={i * 80}>
                  <h3>{g.group}</h3>
                  <div className="chips">{g.items.map((s) => <span key={s}>{s}</span>)}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="sec">
          <div className="wrap">
            <Reveal><h2 className="big">Let us work together.</h2></Reveal>
            <Reveal delay={100}>
              <div className="contact">
                <a href={`mailto:${profile.email}`}><small>Email</small>{profile.email}</a>
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`}><small>Phone</small>{profile.phone}</a>
                <a href={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noopener noreferrer"><small>Instagram</small>@{profile.instagram}</a>
                <a href={`https://wa.me/${profile.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"><small>WhatsApp</small>Message me</a>
              </div>
            </Reveal>
            <p className="foot">{profile.location}. {new Date().getFullYear()} {profile.name}.</p>
          </div>
        </section>
      </main>

      {open && (
        <div className="lb" role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)}>
          <button className="x" aria-label="Close">Close</button>
          <div onClick={(e) => e.stopPropagation()}>
            {isVideo(open.src) ? <video src={open.src} controls autoPlay playsInline /> : <img src={open.src} alt={open.title} />}
            <p>{open.title}</p>
          </div>
        </div>
      )}
    </>
  );
}
