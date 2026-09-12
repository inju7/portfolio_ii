import { useState, useEffect } from "react";
import "./main.css";

type Role = "fullstack" | "backend" | "ai";

/* ─── Data ──────────────────────────────────────────────────── */

const ROLES: { id: Role; label: string }[] = [
  { id: "fullstack", label: "Full Stack" },
  { id: "backend", label: "Backend" },
  { id: "ai", label: "AI / ML" },
];


interface Project {
  id: string;
  index: string;
  title: string;
  titleItalic?: string;
  year: string;
  type: string;
  roles: Role[];
  tagline: string;
  summary: string;
  impact: string[];
  stack: string[];
  image: string;
  imageAlt: string;
  live: string;
  repo: string;
  arch: string;
  api: string;
  db: string;
}

const PROJECTS: Project[] = [
  {
    id: "speech-rate",
    index: "01",
    title: "Real-Time Speech",
    titleItalic: "Feedback System",
    year: "2025",
    type: "AI · Full Stack",
    roles: ["ai", "fullstack"],
    tagline: "NLP + ML to measure tempo, pronunciation, fluency & emotion in real time.",
    summary:
      "Built a web app that uses NLP and machine learning to measure speech rate, pronunciation accuracy, fluency, and emotional tone. Self-learning models improve feedback accuracy over time. Integrated RxJS for reactive audio stream processing with Chart.js visualizations for per-session analytics.",
    impact: ["Real-time NLP feedback", "Self-learning model loop", "Multi-metric analysis"],
    stack: ["React", "TypeScript", "Node.js", "Express", "Chart.js", "RxJS", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=900&h=600&fit=crop&auto=format",
    imageAlt: "Waveform visualization representing audio analysis",
    live: "#",
    repo: "#",
    arch: "Audio stream → RxJS observable → Node.js NLP endpoint → sentiment + rate model → React state → Chart.js live render.",
    api: "POST /analyze { audioBlob } → Express → NLP processing → { tempo, fluency, emotion, score }. GET /history/:userId returns session logs.",
    db: "sessions(id, user_id, audio_url, tempo, fluency, emotion, score, created_at) · users(id, email, model_version).",
  },
  {
    id: "talk-twah",
    index: "02",
    title: "Talk.twah",
    titleItalic: "Data Collection App",
    year: "2025",
    type: "Full Stack",
    roles: ["fullstack"],
    tagline: "Streamlined speech data collection and annotation for thesis research.",
    summary:
      "Standalone web app built to simplify speech data collection for the thesis system. Uses the Web Audio API to record, label, and store audio clips directly in Supabase. Streamlined annotation workflows reduced collection time significantly while improving dataset quality.",
    impact: ["Browser-native recording", "Supabase real-time sync", "Annotation workflow"],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Supabase", "Web Audio API"],
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=900&h=600&fit=crop&auto=format",
    imageAlt: "Microphone and audio recording studio setup",
    live: "#",
    repo: "#",
    arch: "Browser Web Audio API → MediaRecorder → blob → Supabase Storage upload → metadata insert → annotator review queue.",
    api: "Supabase client SDK: insert recording row, upload audio to bucket, subscribe to annotation status updates via real-time channel.",
    db: "recordings(id, label, audio_url, annotated, created_at) · annotations(recording_id, annotator_id, rating, notes).",
  },
  {
    id: "redai",
    index: "03",
    title: "REDAI",
    titleItalic: "AI Humanizer",
    year: "2025",
    type: "AI · Full Stack",
    roles: ["ai", "fullstack"],
    tagline: "AI detection, humanization, grammar fix, and essay gen — all in one.",
    summary:
      "AI-powered web application that humanizes and enhances AI-generated content. Features AI detection scoring, plagiarism checking, grammar correction, essay generation, and integrated productivity tools. Built on GroqCloud for fast LLM inference and Convex for real-time data sync.",
    impact: ["Multi-model LLM pipeline", "AI detection + plagiarism", "Live at Vercel"],
    stack: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Radix", "Motion", "Convex", "Node.js", "GroqCloud API"],
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&h=600&fit=crop&auto=format",
    imageAlt: "Abstract AI neural network visualization",
    live: "https://redai-humanizer.vercel.app/",
    repo: "#",
    arch: "Input text → GroqCloud LLM chain (humanize → grammar → detection score) → Convex mutation → React UI update → result display.",
    api: "Convex actions call GroqCloud completions API with role-prompted chains. Results stored via Convex mutations. Real-time via Convex subscriptions.",
    db: "documents(id, original, humanized, score, created_at) · users(id, plan, usage_count) — all Convex tables.",
  },
  {
    id: "ytmp3",
    index: "04",
    title: "YTMP3",
    titleItalic: "Downloader",
    year: "2024",
    type: "Backend · Full Stack",
    roles: ["backend", "fullstack"],
    tagline: "Safe, ad-free YouTube → 192kbps MP3 conversion tool.",
    summary:
      "Personal full-stack tool to safely convert and download YouTube videos to 192 kbps MP3 audio. Flask backend orchestrates yt-dlp → FFmpeg transcoding pipeline. Eliminates reliance on ad-heavy third-party sites with a clean, fast UI.",
    impact: ["yt-dlp + FFmpeg pipeline", "192 kbps output quality", "Zero ads, self-hosted"],
    stack: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Python", "Flask", "yt-dlp", "FFmpeg"],
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&h=600&fit=crop&auto=format",
    imageAlt: "Headphones on a laptop representing audio download",
    live: "#",
    repo: "#",
    arch: "React UI → POST /download { url } → Flask → yt-dlp fetch → FFmpeg convert to mp3 → stream file response to browser.",
    api: "POST /download { youtubeUrl, quality } → 200 + audio/mpeg stream. GET /status/:jobId returns progress. Error returns 400 with reason.",
    db: "Stateless — no persistence. Temp files cleaned after stream. Optional: jobs(id, url, status, created_at) for queue mode.",
  },
  {
    id: "swingva",
    index: "05",
    title: "SwingVA",
    titleItalic: "Landing Page",
    year: "2024",
    type: "Full Stack",
    roles: ["fullstack"],
    tagline: "Led a 6-person freelance team delivering a client marketing site.",
    summary:
      "Led a 6-person freelance team delivering a marketing landing page for SwingVA's virtual assistant services. Handled project coordination, component architecture, and final delivery. Supported client branding and lead generation with a responsive, conversion-focused design.",
    impact: ["6-person team lead", "Responsive design", "Client delivery"],
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite", "shadcn/ui"],
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=600&fit=crop&auto=format",
    imageAlt: "Modern office environment representing virtual assistant services",
    live: "#",
    repo: "#",
    arch: "Static React SPA → Vite build → Vercel CDN. Component library via shadcn/ui. No backend — contact form uses Formspree.",
    api: "No custom API. Form submissions via Formspree webhook. Analytics via Vercel analytics script.",
    db: "No database. Static site. Lead data captured via Formspree and forwarded to client CRM via email.",
  },
  {
    id: "cyberwise",
    index: "06",
    title: "Cyberwise",
    titleItalic: "2D Pixel Game",
    year: "2024",
    type: "Game Dev",
    roles: ["fullstack"],
    tagline: "Commissioned top-down IAS security game for IT capstone.",
    summary:
      "Managed a small freelance game development team building a commissioned 2D top-down pixel game covering Information Assurance & Security topics. Contributed to game logic and UX design, coordinating asset production and scripting for the capstone client.",
    impact: ["Team lead + contributor", "GML scripting", "Client commissioned"],
    stack: ["GameMaker Studio 2"],
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900&h=600&fit=crop&auto=format",
    imageAlt: "Retro pixel game controller and screen",
    live: "#",
    repo: "#",
    arch: "GML room-based architecture. Player controller → collision system → NPC AI state machines → quiz trigger zones → score tracker.",
    api: "No external API. Local score persistence via GameMaker ds_map. Exported as Windows executable for client delivery.",
    db: "GameMaker save file (INI format): player_score, level_unlocked, quiz_results. Stateless between sessions unless save loaded.",
  },
  {
    id: "apex",
    index: "07",
    title: "Apex Home",
    titleItalic: "Services Site",
    year: "2024",
    type: "Full Stack",
    roles: ["fullstack"],
    tagline: "WordPress + Elementor service business site with custom PHP.",
    summary:
      "A WordPress + Elementor service-business website built with custom PHP shortcodes and responsive UI components. Developed reusable page builder blocks for the client's service listings and integrated a quote request form with PHP mail handling.",
    impact: ["Custom PHP shortcodes", "Elementor components", "Quote form integration"],
    stack: ["WordPress", "Elementor", "PHP", "CSS"],
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&h=600&fit=crop&auto=format",
    imageAlt: "Home services professional at work",
    live: "#",
    repo: "#",
    arch: "WordPress multipage site → Elementor page builder → custom PHP shortcodes → wp_mail() form handler → admin notification.",
    api: "PHP functions.php: custom shortcode [quote_form] → POST to admin-ajax.php → sanitize → wp_mail() → JSON response.",
    db: "WordPress MySQL: posts, pages, options tables. Custom meta for service listings. Contact submissions stored in custom quotes table.",
  },
];

const STACK_CATS = [
  {
    label: "Frontend",
    color: "#7C9CB0",
    skills: ["React 19", "TypeScript", "Angular", "Tailwind CSS v4", "Vite", "shadcn/ui", "Chart.js", "Framer Motion"],
  },
  {
    label: "Backend",
    color: "#9CB07C",
    skills: ["Node.js", "Express", "Python 3", "Flask", "PostgreSQL", "Supabase", "Firebase", "Convex"],
  },
  {
    label: "AI & ML",
    color: "#B07C9C",
    skills: ["NLP & ML models", "GroqCloud API", "OpenRouter", "Gemini API", "Ollama", "Web Audio API", "yt-dlp", "FFmpeg"],
  },
  {
    label: "Tooling",
    color: "#B09C7C",
    skills: ["GameMaker Studio 2", "WordPress", "Elementor", "PHP", "Git & GitHub", "Vercel", "Postman", "Figma"],
  },
];

/* ─── Sidebar ────────────────────────────────────────────────── */
function Sidebar({ active }: { active: string }) {
  return (
    <aside className="sidebar">
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Name */}
        <div style={{ marginBottom: "2.5rem" }}>
          <p className="serif" style={{ fontWeight: 600, fontSize: "0.9rem", lineHeight: 1.3, color: "var(--ink)" }}>
            Arian Allorde
          </p>
          <p className="mono" style={{ fontSize: 9, marginTop: 4, color: "var(--ink3)", letterSpacing: "0.1em" }}>
            SOFTWARE DEVELOPER
          </p>
        </div>

        {/* Nav */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "auto" }}>
          {[
            { href: "#intro", label: "Intro" },
            { href: "#work", label: "Work" },
            { href: "#stack", label: "Stack" },
            { href: "#contact", label: "Contact" },
          ].map((n) => (
            <a key={n.href} href={n.href} className={`nav-link ${active === n.href ? "active" : ""}`}>
              {n.label}
            </a>
          ))}
        </nav>

        {/* Social */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
          {[
            { label: "GitHub", href: "https://github.com/inju7" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/arianmta/" },
            { label: "Email", href: "mailto:allorde.arian@gmail.com" },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="nav-link">
              ↗ {s.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

/* ─── Mobile nav ─────────────────────────────────────────────── */
function MobileNav({ role, setRole }: { role: Role; setRole: (r: Role) => void }) {
  return (
    <div
      className="mobile-nav"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        alignItems: "center", justifyContent: "space-between",
        padding: "0 1.5rem", height: "56px",
        background: "rgba(13,11,9,0.96)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(12px)",
      }}
    >
      <span className="serif" style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--ink)" }}>
        Arian Allorde
      </span>
      <div style={{ display: "flex", gap: "4px" }}>
        {ROLES.map((r) => (
          <button key={r.id} onClick={() => setRole(r.id)} className={`role-pill ${role === r.id ? "active" : ""}`}>
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="intro" style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--border)" }}>
      <div className="amber-glow" style={{ top: "-120px", right: "-120px" }} />
      <div style={{ position: "relative" }}>
        {/* Status strip */}
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "1rem 2.5rem", borderBottom: "1px solid var(--border)",
          }}
        >
          <span className="section-label">01 / INTRO</span>
        </div>

        {/* Bento grid */}
        <div className="bento" style={{ gridTemplateColumns: "1fr" }}>
          {/* Headline */}
          <div style={{ padding: "3rem 2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between", borderRight: "1px solid var(--border)" }}>
            <div>
              <h1
                className="serif"
                style={{
                  fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: 300,
                  lineHeight: 1.1, marginBottom: "1.5rem", color: "var(--ink)",
                }}
              >
                Software{" "}
                <em style={{ color: "var(--amber)", fontStyle: "italic" }}>Developer</em>
                <br />
                for business problems
              </h1>
              <p style={{ color: "var(--ink2)", fontSize: "0.9rem", lineHeight: 1.85, maxWidth: "44ch" }}>
                I've sat inside procurement, operations, and bank support — so I build software that fits how the business actually runs, not just what the spec says.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Project row ────────────────────────────────────────────── */
function ProjectRow({ project, activeRole, reverse }: { project: Project; activeRole: Role; reverse: boolean }) {
  const [open, setOpen] = useState(false);
  const relevant = project.roles.includes(activeRole);

  return (
    <article style={{ borderBottom: "1px solid var(--border)", opacity: relevant ? 1 : 0.35, transition: "opacity 0.3s" }}>
      <div className={`proj-row ${reverse ? "reverse" : ""}`}>
        {/* Image */}
        <div className="proj-img-wrap" style={{ minHeight: 300 }}>
          <img src={project.image} alt={project.imageAlt} style={{ minHeight: 300 }} />
          <div
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.25rem",
              background: "linear-gradient(to top, rgba(13,11,9,0.85) 0%, transparent 100%)",
            }}
          >
            <p className="mono" style={{ fontSize: 10, color: "var(--ink3)", letterSpacing: "0.1em" }}>
              {project.index} · {project.type}
            </p>
          </div>
          {relevant && (
            <div
              className="mono"
              style={{
                position: "absolute", top: "1rem", left: "1rem",
                fontSize: 10, color: "var(--amber)",
                background: "var(--amber-bg)", border: "1px solid var(--amber-border)",
                padding: "3px 10px", letterSpacing: "0.08em",
              }}
            >
              RELEVANT
            </div>
          )}
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            padding: "2.5rem", background: "var(--ground)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <span className="section-label">{project.year}</span>
              <span className="mono" style={{ fontSize: 10, color: "var(--ink3)" }}>{project.type}</span>
            </div>
            <h3
              className="serif"
              style={{
                fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)", fontWeight: 300,
                lineHeight: 1.2, marginBottom: "0.5rem", color: "var(--ink)",
              }}
            >
              {project.title}
              <br />
              <em style={{ color: "var(--amber)", fontStyle: "italic" }}>{project.titleItalic}</em>
            </h3>
            <p className="mono" style={{ fontSize: 11, color: "var(--ink3)", marginBottom: "1.25rem" }}>
              {project.tagline}
            </p>
            <p style={{ color: "var(--ink2)", fontSize: "0.83rem", lineHeight: 1.8 }}>{project.summary}</p>

            {/* Impact pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "1.25rem" }}>
              {project.impact.map((imp) => (
                <span
                  key={imp}
                  className="mono"
                  style={{
                    fontSize: 10, color: "var(--amber2)",
                    background: "var(--amber-bg)", border: "1px solid var(--amber-border)",
                    padding: "4px 10px", letterSpacing: "0.04em",
                  }}
                >
                  {imp}
                </span>
              ))}
            </div>

            {/* Stack tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "1.25rem" }}>
              {project.stack.map((s) => (
                <span key={s} className="stag">{s}</span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div
            style={{
              marginTop: "1.75rem", paddingTop: "1.5rem",
              borderTop: "1px solid var(--border)",
              display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap",
            }}
          >
            {project.live !== "#" && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-amber" style={{ padding: "10px 20px", fontSize: 11 }}>
                Live Demo →
              </a>
            )}
            {project.repo !== "#" && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: "10px 20px", fontSize: 11 }}>
                GitHub
              </a>
            )}
            <button
              onClick={() => setOpen((v) => !v)}
              className="btn-ghost"
              style={{
                marginLeft: "auto", padding: "10px 20px", fontSize: 11,
                color: "var(--amber)", borderColor: "var(--amber-border)",
              }}
            >
              {open ? "Close ✕" : "Tech notes ↓"}
            </button>
          </div>
        </div>
      </div>

      {/* Arch drawer */}
      <div className="drawer" style={{ maxHeight: open ? "600px" : "0", opacity: open ? 1 : 0 }}>
        <div
          style={{
            display: "grid", gap: "1.5rem", padding: "2rem 2.5rem",
            background: "var(--surface)", borderTop: "1px solid var(--border)",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          {[
            { label: "Architecture", body: project.arch },
            { label: "API Flow", body: project.api },
            { label: "DB Schema", body: project.db },
          ].map((d) => (
            <div key={d.label}>
              <p className="section-label" style={{ color: "var(--amber)", marginBottom: "0.75rem" }}>{d.label}</p>
              <p className="mono" style={{ fontSize: 11, color: "var(--ink3)", lineHeight: 1.9 }}>{d.body}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ─── Work ───────────────────────────────────────────────────── */
function Work({ activeRole }: { activeRole: Role }) {
  const sorted = [...PROJECTS].sort(
    (a, b) => (a.roles.includes(activeRole) ? 0 : 1) - (b.roles.includes(activeRole) ? 0 : 1)
  );

  return (
    <section id="work" style={{ borderBottom: "1px solid var(--border)" }}>
      <div
        style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          padding: "1.5rem 2.5rem", borderBottom: "1px solid var(--border)",
        }}
      >
        <div>
          <p className="section-label" style={{ marginBottom: "0.5rem" }}>02 / WORK</p>
          <h2 className="serif" style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)", fontWeight: 300, color: "var(--ink)" }}>
            Selected <em style={{ color: "var(--amber)", fontStyle: "italic" }}>Projects</em>
          </h2>
        </div>
        <p className="mono" style={{ fontSize: 10, color: "var(--ink3)", display: "none" }} id="arch-hint">
          Click "Tech notes" to expand
        </p>
      </div>
      {sorted.map((p, i) => (
        <ProjectRow key={p.id} project={p} activeRole={activeRole} reverse={i % 2 !== 0} />
      ))}
    </section>
  );
}

/* ─── Stack ──────────────────────────────────────────────────── */
function Stack() {
  return (
    <section id="stack" style={{ borderBottom: "1px solid var(--border)" }}>
      <div
        style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          padding: "1.5rem 2.5rem", borderBottom: "1px solid var(--border)",
        }}
      >
        <div>
          <p className="section-label" style={{ marginBottom: "0.5rem" }}>03 / STACK</p>
          <h2 className="serif" style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)", fontWeight: 300, color: "var(--ink)" }}>
            Technical <em style={{ color: "var(--amber)", fontStyle: "italic" }}>Profile</em>
          </h2>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {STACK_CATS.map((cat, ci) => (
          <div
            key={cat.label}
            style={{
              padding: "2rem",
              borderRight: ci < STACK_CATS.length - 1 ? "1px solid var(--border)" : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.5rem" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: cat.color, display: "inline-block" }} />
              <p className="section-label">{cat.label}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {cat.skills.map((sk) => (
                <div
                  key={sk}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    paddingBottom: "10px", marginBottom: "10px",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--ink3)", flexShrink: 0, display: "inline-block" }} />
                  <span
                    className="mono"
                    style={{ fontSize: "0.78rem", color: "var(--ink2)", transition: "color 0.2s", cursor: "default" }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--amber2)"; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--ink2)"; }}
                  >
                    {sk}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Contact ────────────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div
        style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          padding: "1.5rem 2.5rem", borderBottom: "1px solid rgba(26,18,8,0.12)",
        }}
      >
        <div>
          <p className="section-label" style={{ marginBottom: "0.5rem", color: "rgba(26,18,8,0.4)" }}>04 / CONTACT</p>
          <h2 className="serif" style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)", fontWeight: 300, color: "#1A1208" }}>
            Let's work <em style={{ color: "#B06C1E", fontStyle: "italic" }}>together</em>
          </h2>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", minHeight: 400 }}>
        {/* Left */}
        <div style={{ padding: "2.5rem", borderRight: "1px solid rgba(26,18,8,0.1)" }}>
          <p style={{ color: "rgba(26,18,8,0.55)", fontSize: "0.88rem", lineHeight: 1.8, maxWidth: "36ch", marginBottom: "2.5rem" }}>
            Open for full-time roles, freelance projects, and business ventures.
            Happy to work remotely.
          </p>

          {/* Social links */}
          <div style={{ marginTop: "2rem" }}>
            {[
              { label: "GitHub", handle: "github.com/inju7", href: "https://github.com/inju7" },
              { label: "LinkedIn", handle: "linkedin.com/in/arianmta", href: "https://www.linkedin.com/in/arianmta/" },
              { label: "Email", handle: "allorde.arian@gmail.com", href: "https://mail.google.com/mail/?view=cm&fs=1&to=allorde.arian@gmail.com" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "1rem 0", borderBottom: "1px solid rgba(26,18,8,0.08)",
                  textDecoration: "none",
                }}
              >
                <span className="mono" style={{ fontSize: 10, color: "rgba(26,18,8,0.35)", letterSpacing: "0.1em" }}>{s.label}</span>
                <span
                  className="mono"
                  style={{ fontSize: 11, color: "rgba(26,18,8,0.55)", transition: "color 0.2s" }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#B06C1E"; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(26,18,8,0.55)"; }}
                >
                  {s.handle} →
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div style={{ padding: "2.5rem" }}>
          <form action="https://formspree.io/f/mqpkozew" method="POST" style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {/* Note: Replace YOUR_FORM_ID_HERE with a free ID from formspree.io to receive emails */}
            {[
              { key: "name", label: "Name", type: "text", ph: "Jane Smith", name: "name" },
              { key: "email", label: "Email", type: "email", ph: "jane@company.com", name: "email" },
            ].map((f) => (
              <div key={f.key}>
                <label className="section-label" style={{ display: "block", marginBottom: "0.5rem", color: "rgba(26,18,8,0.4)" }}>
                  {f.label}
                </label>
                <input
                  type={f.type}
                  name={f.name}
                  required
                  placeholder={f.ph}
                  className="c-input-light"
                />
              </div>
            ))}
            <div>
              <label className="section-label" style={{ display: "block", marginBottom: "0.5rem", color: "rgba(26,18,8,0.4)" }}>
                Message
              </label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="I'm looking for a developer who can..."
                className="c-input-light"
                style={{ resize: "none", display: "block" }}
              />
            </div>
            <button
              type="submit"
              className="btn-amber"
              style={{ alignSelf: "flex-start", background: "#B06C1E", borderColor: "#B06C1E", color: "#F2E8D8" }}
            >
              Send →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer
      style={{
        display: "flex", flexWrap: "wrap", alignItems: "center",
        justifyContent: "space-between", gap: "12px",
        padding: "1.75rem 2.5rem",
        borderTop: "1px solid var(--border)",
        background: "var(--ground)",
      }}
    >
      <span className="mono" style={{ fontSize: 10, color: "var(--ink3)", letterSpacing: "0.08em" }}>
        © 2025 ARIAN ALLORDE — BUILT WITH REACT · VITE · TAILWIND CSS
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6DBF7C", display: "inline-block" }} />
        <span className="mono" style={{ fontSize: 10, color: "var(--ink3)" }}>OPEN TO WORK</span>
      </div>
    </footer>
  );
}

/* ─── Root ───────────────────────────────────────────────────── */
export default function App() {
  const [role, setRole] = useState<Role>("fullstack");
  const [activeSection, setActiveSection] = useState("#intro");
  const [theme, setTheme] = useState(0);

  const themes = ["dark", "light", "midnight", "br-green", "burgundy"];

  // Theme switcher
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themes[theme]);
  }, [theme]);

  // Active section tracking
  useEffect(() => {
    const ids = ["#intro", "#work", "#stack", "#contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(`#${e.target.id}`);
        });
      },
      { threshold: 0.25 }
    );
    ids.forEach((id) => {
      const el = document.querySelector(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleViewWork = () => {
    setIsWorkListOpen(true);
  };

  return (
    <div style={{ background: "var(--ground)", minHeight: "100vh" }}>
      <Sidebar active={activeSection} />
      <MobileNav role={role} setRole={setRole} />

      <main className="main-content">
        {/* Mobile top offset */}
        <div style={{ height: 56, display: "block" }} className="lg:hidden" />
        <Hero />
        <Work activeRole={role} />
        <Stack />
        <Contact />
        <Footer />
      </main>

      {/* Floating theme switcher */}
      <button
        onClick={() => setTheme((prev) => (prev + 1) % themes.length)}
        className="theme-switcher"
        style={{
          position: "fixed", bottom: "2rem", right: "2rem",
          width: 44, height: 44,
          display: "flex", alignItems: "center", justifyContent: "center",
          borderRadius: "50%",
          border: "1px solid var(--border)",
          color: "var(--ink2)",
          backgroundColor: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(8px)",
          zIndex: 200,
          cursor: "pointer",
          transition: "transform 0.2s ease",
        }}
        title={`Current theme: ${themes[theme]}`}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1) rotate(15deg)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1) rotate(0deg)"; }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 6px var(--theme-icon-glow))" }}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" /><path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" /><path d="M22 12h2" />
          <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
        </svg>
      </button>
    </div>
  );
}
