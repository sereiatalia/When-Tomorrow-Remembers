"use client";

import { useMemo, useState } from "react";
import { useEffect } from "react";
import { supabase } from "./supabase";
import { storySections } from "./storyContent";

type Mode = "present" | "past";

const chapters = [
  ["Prologue", "The First Rule", "1998 · Quezon City", "Tomas Reyes"],
  ["01", "December 25, 2017", "2017 · Manila Airport", "Aurelia · Adrian"],
  ["02", "The Boy at the Airport", "2017 · Manila Airport", "Adrian"],
  ["03", "A Customer Who Wanted Yesterday", "—", "Aurelia"],
  ["04", "Adrian’s Code", "—", "Aurelia · Adrian"],
  ["05", "The Woman Who Wanted to Be Forgotten", "—", "A customer"],
  ["06", "The Game Developer", "2027 · Makati", "Aurelia"],
  ["07", "The Object That Returned Wrong", "—", "Aurelia"],
  ["08", "Christmas in Makati", "—", "Aurelia · Adrian"],
  ["09", "The Wrong Goodbye", "—", "Aurelia"],
  ["10", "The Modern Machine", "2027 · Laboratory", "Grandma"],
  ["11", "The Analyst", "—", "Adrian"],
  ["12", "The Child Who Remembered Tomorrow", "—", "Aurelia"],
  ["13", "The AV Necklace", "—", "Aurelia · Adrian"],
  ["14", "The Rule About Two", "—", "Aurelia"],
  ["15", "The Person Who Should Not Be There", "—", "Aurelia"],
  ["16", "The Cost of Staying", "—", "Aurelia · Grandma"],
  ["17", "A Visit Without a Customer", "2017 · Makati", "Aurelia · Adrian"],
  ["18", "The Return Point", "—", "Aurelia · Grandma"],
  ["19", "The Woman in the Photograph", "—", "Aurelia"],
  ["20", "When Tomorrow Remembers", "2030 · Manila", "Aurelia · Adrian"],
];

const yearProfiles: Record<string, { location: string; date: string; mode: Mode; interface: string; signal: string }> = {
  "1998": { location: "QUEZON CITY", date: "JUN 14", mode: "past", interface: "LEGACY TERMINAL", signal: "RETURN SIGNAL ............... WAITING" },
  "2017": { location: "MANILA AIRPORT", date: "DEC 25", mode: "past", interface: "ARCHIVE TERMINAL", signal: "RETURN POINT ............... CREATED" },
  "2027": { location: "HIDDEN LABORATORY", date: "JUN 14", mode: "present", interface: "QUANTUM INTERFACE", signal: "RETURN POINT ............... STABLE" },
  "2030": { location: "MANILA", date: "DEC 25", mode: "present", interface: "FUTURE ARCHIVE", signal: "RETURN POINT ............... STABLE" },
};

const characters = [
  { name: "Aurelia Veyne", role: "The traveler", detail: "22–25 · Game developer · Laguna", quote: "Every journey leaves something behind." },
  { name: "Adrian Aurex", role: "The analyst", detail: "22 in 2017 · IT analyst · Makati", quote: "Saved game files matter." },
  { name: "Grandma / Adrelia", role: "The guardian", detail: "Aurelia’s grandmother · Hidden laboratory", quote: "Be careful with what you do not know." },
  { name: "Lucian Vale", role: "The mentor", detail: "Professor · Quantum theory and machines", quote: "A machine follows the rules you give it." },
  { name: "Customers", role: "The reason to travel", detail: "Private requests · Past and future", quote: "The machine can give answers. It cannot always give peace." },
];

const rules = [
  "Never change an event that does not belong to you.",
  "Never leave an object from the future in the past.",
  "Only two people can jump at the same time.",
  "A traveler cannot interfere with their own origin.",
  "Every jump must have a stable return point.",
  "Information cannot be used to control history.",
  "Births, deaths, relationships, and existence cannot be manipulated.",
  "If the timeline shows impossible results, return immediately.",
];

const objects = [
  ["CONTROL PANEL", "It is held together by equal parts precision, tape, and stubbornness."],
  ["TIME MACHINE RINGS", "Two silver rings. Twenty-seven rules. One very small margin for error."],
  ["AURELIA’S NOTEBOOK", "More diagrams than readable sentences. The margins contain tiny robots."],
  ["COMPUTER", "A cartoon robot is walking into a wall. Aurelia calls it exploration."],
  ["COFFEE CUP", "Cold enough to be historical. Still somehow essential to the calculations."],
  ["TOOL BOX", "Screwdrivers, wires, and one mystery key that opens nothing she owns."],
  ["AV NECKLACE", "A small engraved charm. The file is ordinary. The feeling is not."],
  ["LOCKED CABINET", "This file is not available in Book 1."],
];

export default function Home() {
  const [mode, setMode] = useState<Mode>("present");
  const [sound, setSound] = useState(false);
  const [activeRule, setActiveRule] = useState(0);
  const [activeObject, setActiveObject] = useState<string | null>(null);
  const [choice, setChoice] = useState<string | null>(null);
  const [year, setYear] = useState("2027");
  const [openCharacter, setOpenCharacter] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [readerOpen, setReaderOpen] = useState(false);
  const [readerChapter, setReaderChapter] = useState("Prologue");
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authUsername, setAuthUsername] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [signedInEmail, setSignedInEmail] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [warpActive, setWarpActive] = useState(false);
  const supabaseReady = Boolean(supabase);
  const visibleChapters = useMemo(() => filter === "available" ? chapters.slice(0, 3) : filter === "future" ? chapters.slice(3) : chapters, [filter]);
  const activeStory = storySections.find(section => section.key === readerChapter || section.title === readerChapter) ?? storySections[0];
  const yearProfile = yearProfiles[year];
  const storyCheckpoint = activeStory.key === "Prologue" ? "PROLOGUE" : activeStory.key.toUpperCase();

  function previewWarp() {
    setWarpActive(true);
    window.setTimeout(() => setWarpActive(false), 1150);
  }

  function toggleSound() {
    const next = !sound;
    setSound(next);
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const audio = new AudioContextClass();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = next ? 560 : 180;
    gain.gain.setValueAtTime(0.0001, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.035, audio.currentTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.16);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start();
    oscillator.stop(audio.currentTime + 0.17);
    oscillator.addEventListener("ended", () => { void audio.close(); });
  }

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSignedInEmail(data.session?.user.email ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setSignedInEmail(session?.user.email ?? null));
    return () => listener.subscription.unsubscribe();
  }, []);

  async function submitAuth() {
    setAuthMessage("");
    if (!supabase) { setAuthMessage("Connect the Supabase publishable key in your environment first."); return; }
    if (authMode === "signup") {
      const { error } = await supabase.auth.signUp({ email: authEmail, password: authPassword, options: { data: { username: authUsername }, emailRedirectTo: window.location.origin } });
      setAuthMessage(error ? (error.message.toLowerCase().includes("database error saving new user") ? "Supabase rejected this signup in the database. Run the profile migration, then check Supabase Auth Logs for any existing trigger error." : error.message) : "Check your email for the confirmation link, then return here to sign in.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
      setAuthMessage(error ? error.message : "Signed in. Your reader progress is now ready to sync.");
    }
  }

  async function saveProgress() {
    if (!supabase) { setReaderOpen(false); return; }
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) await supabase.from("reader_progress").upsert({ user_id: data.session.user.id, username: authUsername || data.session.user.user_metadata?.username || null, book_number: 1, chapter_key: readerChapter, progress_percent: 0, updated_at: new Date().toISOString() });
    setReaderOpen(false);
  }

  return (
    <main className={mode === "past" ? "site past-mode" : "site"}>
      <nav className="nav shell"><a className="brand" href="#top" aria-label="When Tomorrow Remembers home"><span className="brand-mark">◌</span><span>W.T.R. / ARCHIVE</span></a><div className="nav-links"><a href="#story">Story</a><a href="#characters">Files</a><a href="#simulator">Simulator</a><a href="#chapters">Chapters</a></div><div className="nav-actions"><button className="sound-toggle" onClick={toggleSound} aria-label="Toggle sound"><span className="sound-label">{sound ? "SOUND ON" : "SOUND OFF"}</span><span className={sound ? "toggle on" : "toggle"}><i /></span></button><button className="account-button" onClick={() => setAuthOpen(true)}>ACCOUNT <span>↗</span></button></div></nav>

      <section id="top" className="hero shell"><div className="hero-copy"><p className="eyebrow"><span className="status-dot" /> PRIVATE ARCHIVE · BOOK 01</p><h1>When<br /><em>Tomorrow</em><br />Remembers</h1><p className="hero-intro">A secret laboratory. An impossible request. A date that refuses to stay in the past.</p><div className="hero-actions"><a className="button primary" href="#read" onClick={() => { setReaderOpen(true); setReaderChapter("Prologue"); }}>Start the story <span>↗</span></a><a className="text-link" href="#story">Explore the archive <span>↓</span></a></div><div className="hero-meta"><span>SCIENCE FICTION</span><span>TIME-TRAVEL MYSTERY</span><span>SLOW-BURN ROMANCE</span></div></div><div className="hero-visual" aria-hidden="true"><div className="orbit orbit-one"><span /></div><div className="orbit orbit-two"><span /></div><div className="orbit orbit-three"><span /></div><div className="core"><div className="core-grid" /><span className="core-label">TEMPORAL<br />CORE</span><b>2027</b></div><div className="data-chip chip-a">RETURN POINT<br /><strong>STABLE</strong></div><div className="data-chip chip-b">QUANTUM LOAD<br /><strong>08.42%</strong></div><div className="data-chip chip-c">COORDINATES<br /><strong>14°10′N</strong></div></div></section>
      <div className="ticker"><div className="shell ticker-inner"><span>EVERY JOURNEY LEAVES SOMETHING BEHIND</span><span>◌</span><span>EVERY JOURNEY LEAVES SOMETHING BEHIND</span><span>◌</span><span>EVERY JOURNEY LEAVES SOMETHING BEHIND</span></div></div>

      <section id="story" className="section shell story-grid"><div><p className="section-kicker">01 / THE PREMISE</p><h2>Some people visit the past for answers.</h2></div><div className="story-copy"><p>In 2027, Aurelia Veyne secretly operates a quantum time machine while working as a game developer and handling private requests from people who wish to visit the past or future.</p><p>Every journey teaches her something about grief, choices, and the consequences of interfering with time. Then one impossible request leads her toward a mystery connected to a date she can never forget.</p><div className="quote">“The machine could give them answers.<br /><i>It could not always give them peace.</i>”</div></div></section>

      <section id="read" className="section shell read-section"><div className="section-heading"><div><p className="section-kicker">01A / STORY READER</p><h2>Begin at<br /><em>the beginning.</em></h2></div><p className="section-note">PUBLIC READING ROOM<br />PROGRESS SYNC READY</p></div><div className="reader-launch"><div><span className="reader-status"><i /> NOW READING / {readerChapter.toUpperCase()}</span><h3>Prologue: The First Rule</h3><p>Aurelia Veyne has twenty-seven rules for time travel, although she often tells her customers there are only three.</p><button className="button primary" onClick={() => setReaderOpen(true)}>Open the reader <span>↗</span></button></div><div className="reader-page"><span>PAGE 001</span><p>Never change an event that does not belong to you.</p><small>— The first rule</small></div></div></section>

      <section id="characters" className="section shell"><div className="section-heading"><div><p className="section-kicker">02 / PERSONNEL FILES</p><h2>People crossing<br /><em>through time.</em></h2></div><span className="section-note">PUBLIC ACCESS<br />LEVEL 01</span></div><div className="character-grid">{characters.map((c, i) => <article className={openCharacter === c.name ? "character-card active" : "character-card"} key={c.name} onClick={() => setOpenCharacter(openCharacter === c.name ? null : c.name)}><div className="card-top"><span className="file-no">FILE 0{i + 1}</span><span className="card-arrow">↗</span></div><div className="avatar">{i === 0 ? "AV" : i === 1 ? "AA" : i === 2 ? "G" : i === 3 ? "LV" : "?"}</div><p className="card-role">{c.role}</p><h3>{c.name}</h3><p className="card-detail">{c.detail}</p>{openCharacter === c.name && <div className="card-reveal"><p>KNOWN INTERESTS</p><strong>{c.quote}</strong><span>LOCKED INFORMATION · FILE UNAVAILABLE</span></div>}</article>)}</div></section>

      <section id="timeline" className="section timeline-section"><div className="shell"><div className="section-heading"><div><p className="section-kicker">03 / CHRONOLOGY</p><h2>The visible<br /><em>timeline.</em></h2></div><p className="section-note">SAFE PUBLIC RECORD<br />NO FIXED EVENTS ALTERED</p></div><div className="timeline"><div className="timeline-line" />{[["2017", "The year everything disappeared", "Aurelia is 12 · Adrian is 22"], ["2027", "The machine goes private", "Aurelia works as a game developer"], ["2028—30", "Requests continue", "Aurelia keeps the return point stable"]].map((item, i) => <div className="timeline-item" key={item[0]}><span className="timeline-year">{item[0]}</span><div className={i === 1 ? "timeline-node active" : "timeline-node"} /><div><h3>{item[1]}</h3><p>{item[2]}</p></div></div>)}</div></div></section>

      <section id="simulator" className="section shell simulator-section"><div className="section-heading"><div><p className="section-kicker">04 / INTERFACE SIMULATOR</p><h2>Choose a year.<br /><em>Watch it change.</em></h2></div><p className="section-note">A SAFE SIMULATION<br />NO SECRETS WITHIN</p></div><div className={warpActive ? "simulator warp-active" : "simulator"}><div className="sim-top"><div className="mode-tabs"><button className={mode === "present" ? "active" : ""} onClick={() => setMode("present")}>PRESENT MODE</button><button className={mode === "past" ? "active" : ""} onClick={() => setMode("past")}>PAST MODE</button></div><span className="sim-status"><i /> {warpActive ? "WARP SEQUENCE" : mode === "present" ? "SYSTEM STABLE" : "LEGACY SYSTEM"}</span></div><div className="sim-body"><div className="sim-readout"><span className="mini-label">DESTINATION YEAR</span><strong>{year}</strong><div className="year-buttons">{["1998", "2017", "2027", "2030"].map(y => <button key={y} className={year === y ? "selected" : ""} onClick={() => { setYear(y); setMode(yearProfiles[y].mode); setWarpActive(false); }}>{y}</button>)}</div><div className="sim-checkpoint"><span>STORY CHECKPOINT</span><strong>{storyCheckpoint}</strong><p>{activeStory.title}</p></div><p>{yearProfile.interface} / {yearProfile.location} / {mode === "present" ? "HOLOGRAPHIC CALCULATIONS" : "MECHANICAL RETURN SEQUENCE"}</p></div><div className="sim-console"><div className="console-header"><span>◌ {yearProfile.interface}</span><span>00:00:{year === "2027" ? "27" : year === "2030" ? "30" : year === "2017" ? "17" : "98"}</span></div><div className="console-screen"><div className="scanlines" /><div className="warp-lines" /><div className="particle-field" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div><p>{warpActive ? ">>> FOLDING TEMPORAL SPACE" : mode === "present" ? "> INITIALIZING TEMPORAL MAP" : ">> LOADING ARCHIVE COORDINATES"}</p><strong>{year} / {yearProfile.date}</strong><p>{warpActive ? ">>> CHECKPOINT LOCKED / RETURNING" : yearProfile.signal}</p><div className="console-ring" /><div className="console-core" /></div><div className="console-buttons"><i /><i /><i /><button onClick={previewWarp} disabled={warpActive}>{warpActive ? "◉ WARPING..." : "◉ TRAVEL PREVIEW"}</button></div></div></div></div></section>

      <section id="rules" className="section rules-section"><div className="shell"><div className="section-heading"><div><p className="section-kicker">05 / THE FIRST RULE</p><h2>History is not<br /><em>a playground.</em></h2></div><p className="section-note">27 RULES ON FILE<br />8 SHOWN HERE</p></div><div className="rules-layout"><div className="rule-list">{rules.map((rule, i) => <button key={rule} className={activeRule === i ? "active" : ""} onClick={() => setActiveRule(i)}><span>0{i + 1}</span>{rule}<b>↗</b></button>)}</div><div className="rule-detail"><span>RULE {String(activeRule + 1).padStart(2, "0")} / ACTIVE</span><h3>{rules[activeRule]}</h3><p>{activeRule === 0 ? "Aurelia can observe, listen, and understand. She cannot take ownership of a moment simply because she wishes it had gone differently." : "A stable return point is part of every safe jump. If the timeline begins showing impossible results, the traveler must return immediately."}</p><div className="access-denied">ACCESS DENIED: HISTORY MUST REMAIN UNCHANGED.</div></div></div></div></section>

      <section id="chapters" className="section shell archive-section"><div className="section-heading"><div><p className="section-kicker">06 / CHAPTER ARCHIVE</p><h2>Recorded in<br /><em>sequence.</em></h2></div><p className="section-note">BOOK 01 · 21 SECTIONS<br />CURRENTLY RECORDING</p></div><div className="filter-row">{[["all", "ALL FILES"], ["available", "AVAILABLE"], ["future", "LOCKED FILES"]].map(([key, label]) => <button className={filter === key ? "active" : ""} key={key} onClick={() => setFilter(key)}>{label}</button>)}<span>{visibleChapters.length.toString().padStart(2, "0")} / 21</span></div><div className="chapter-list">{visibleChapters.map(([number, title, location, cast], i) => <article className={i < 3 ? "chapter-row available" : "chapter-row"} key={number + title} onClick={() => { if (i < 3) { setReaderChapter(title); setReaderOpen(true); } }}><span className="chapter-number">{number}</span><div><h3>{title}</h3><p>{location} · {cast}</p></div><span className="chapter-status">{i < 3 ? "OPEN FILE ↗" : "LOCKED FILE · BOOK 1"}</span></article>)}</div></section>

      <section id="lab" className="section shell lab-section"><div className="section-heading"><div><p className="section-kicker">07 / HIDDEN LABORATORY</p><h2>Touch nothing<br /><em>important.</em></h2></div><p className="section-note">INTERACTIVE OBJECTS<br />NO TIMELINES HARMED</p></div><div className="lab-grid"><div className="lab-stage"><div className="lab-rings" /><div className="lab-table" /><div className="lab-machine"><span>AV</span></div>{objects.map(([name], i) => <button className={`lab-object object-${i + 1}`} key={name} onClick={() => setActiveObject(activeObject === name ? null : name)} aria-label={`Inspect ${name}`}>{i === 0 ? "⌘" : i === 1 ? "◌" : i === 2 ? "▤" : i === 3 ? "▣" : i === 4 ? "●" : i === 5 ? "◇" : i === 6 ? "✧" : "▥"}<small>{name}</small></button>)}</div><div className="object-panel">{activeObject ? <><span>OBJECT INSPECTION / 0{objects.findIndex(([name]) => name === activeObject) + 1}</span><h3>{activeObject}</h3><p>{objects.find(([name]) => name === activeObject)?.[1]}</p></> : <><span>SELECT AN OBJECT</span><h3>The room remembers<br />what you touch.</h3><p>Explore the laboratory. The locked cabinet is the only thing that refuses to answer.</p></>}<div className="choice-box"><span>READER INPUT</span><p>Would you visit the past for closure?</p><div>{["YES", "NO", "I’M NOT SURE"].map(x => <button className={choice === x ? "selected" : ""} onClick={() => setChoice(x)} key={x}>{x}</button>)}</div>{choice && <small>RESPONSE LOGGED · {choice}</small>}</div></div></div></section>

      {readerOpen && <div className="reader-modal" role="dialog" aria-modal="true" aria-label="Story reader"><div className="reader-modal-card"><button className="modal-close" onClick={() => setReaderOpen(false)} aria-label="Close reader">×</button><div className="reader-modal-top"><span>W.T.R. / STORY READER</span><span>{signedInEmail ? "SYNC READY" : "GUEST READING"}</span></div><div className="reader-modal-body"><aside><p className="section-kicker">BOOK 01</p>{chapters.slice(0, 3).map(([number, title]) => <button className={readerChapter === title || (readerChapter === "Prologue" && number === "Prologue") ? "selected" : ""} key={title} onClick={() => setReaderChapter(title)}>{number}<span>{title}</span></button>)}<div className="reader-locked">LOCKED CHAPTERS<br /><small>UNLOCK AS THEY ARE RECORDED</small></div></aside><article className="reading-page"><span className="reading-kicker">{activeStory.key === "Prologue" ? "PROLOGUE" : activeStory.key.toUpperCase()}</span><h2>{activeStory.title}</h2><div className="reading-copy">{activeStory.paragraphs.map((paragraph, index) => <p className={paragraph.startsWith("Never change") || paragraph.startsWith("Never leave") || paragraph.startsWith("Only two people") ? "reading-quote" : ""} key={`${activeStory.key}-${index}`}>{paragraph}</p>)}</div><button className="next-reading" onClick={saveProgress}>Save your place <span>↗</span></button></article></div></div></div>}
      {authOpen && <div className="reader-modal" role="dialog" aria-modal="true" aria-label="Account access"><div className="account-modal"><button className="modal-close" onClick={() => setAuthOpen(false)} aria-label="Close account panel">×</button><span className="section-kicker">ACCOUNT ACCESS / SUPABASE</span><h2>{authMode === "signup" ? <>Create your<br /><em>archive key.</em></> : <>Return to your<br /><em>archive.</em></>}</h2>{signedInEmail ? <><p>You are signed in as <strong>{signedInEmail}</strong>. Your reading progress can sync across devices.</p><button className="button primary" onClick={async () => { await supabase?.auth.signOut(); setAuthOpen(false); }}>Sign out <span>↗</span></button></> : <><div className="auth-tabs"><button className={authMode === "signin" ? "active" : ""} onClick={() => { setAuthMode("signin"); setAuthMessage(""); }}>SIGN IN</button><button className={authMode === "signup" ? "active" : ""} onClick={() => { setAuthMode("signup"); setAuthMessage(""); }}>SIGN UP</button></div>{!supabaseReady && <div className="auth-setup"><span>SUPABASE CONNECTION REQUIRED</span><p>Add the publishable key to <code>.env.local</code>, then restart the local server to enable account creation and progress sync.</p><a href="https://supabase.com/dashboard/project/odvghccltuybbacaxufl/settings/api" target="_blank" rel="noreferrer">Open Supabase API settings ↗</a></div>}{authMode === "signup" && <input className="auth-input" placeholder="Username" value={authUsername} onChange={e => setAuthUsername(e.target.value)} disabled={!supabaseReady} /> }<input className="auth-input" type="email" placeholder="Email address" value={authEmail} onChange={e => setAuthEmail(e.target.value)} disabled={!supabaseReady} /><div className="password-field"><input className="auth-input" type={showPassword ? "text" : "password"} placeholder="Password" value={authPassword} onChange={e => setAuthPassword(e.target.value)} disabled={!supabaseReady} /><button className="password-toggle" type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"} disabled={!supabaseReady}>{showPassword ? "HIDE" : "SHOW"}</button></div><button className="button primary auth-submit" onClick={submitAuth} disabled={!supabaseReady}>{authMode === "signup" ? "Create account" : "Sign in"} <span>↗</span></button>{authMessage && <p className="auth-message">{authMessage}</p>}<small className="auth-note">{authMode === "signup" ? "A confirmation email will be sent before your first sign-in." : "Use the email and password from your archive account."}</small></>}</div></div>}
      <footer className="footer shell"><div className="footer-mark">◌</div><div><p>WHEN TOMORROW REMEMBERS</p><span>Book 1 is still being recorded.<br />Some files may remember more than they should.</span></div><a href="#top">RETURN TO TOP ↑</a></footer>
    </main>
  );
}

