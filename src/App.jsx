import React, { useEffect, useMemo, useState } from "react";

const IMG = (n) => `/assets/images/farm-${n}.jpeg`;

// شعارات مختلفة حسب الثيم
const LOGO_DARK = `/assets/images/logo-dark.png`;
const LOGO_LIGHT = `/assets/images/logo-light.png`;

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("is-in");
        }
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Icon({ name }) {
  // inline SVG icons (بدون ملفات إضافية)
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none" };
  const stroke = { stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

  if (name === "whatsapp") {
    return (
      <svg {...common} aria-hidden="true">
        <path {...stroke} d="M20.3 11.5a8.3 8.3 0 0 1-12 7.4L4 20l1.2-4A8.3 8.3 0 1 1 20.3 11.5Z" />
        <path
          {...stroke}
          d="M9.2 9.3c.2-.4.4-.4.7-.4h.6c.2 0 .4 0 .6.4l.8 1.8c.1.3.1.6-.1.8l-.4.4c-.2.2-.2.4-.1.6.3.7 1.2 2 2.7 2.7.2.1.4.1.6-.1l.4-.4c.2-.2.5-.2.8-.1l1.8.8c.4.2.4.4.4.6v.6c0 .3 0 .5-.4.7-.7.4-2 .7-3.5.1-1.5-.6-4.2-2.6-5.8-5.8-.6-1.5-.3-2.8.1-3.5Z"
        />
      </svg>
    );
  }

  if (name === "email") {
    return (
      <svg {...common} aria-hidden="true">
        <path {...stroke} d="M4 6h16v12H4z" />
        <path {...stroke} d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg {...common} aria-hidden="true">
        <rect {...stroke} x="4" y="4" width="16" height="16" rx="5" />
        <path {...stroke} d="M16 11.9a4 4 0 1 1-7.9 1.2 4 4 0 0 1 7.9-1.2Z" />
        <path {...stroke} d="M17.5 6.5h.01" />
      </svg>
    );
  }

  // saudi business center
  return (
    <svg {...common} aria-hidden="true">
      <path {...stroke} d="M4 7h16v13H4z" />
      <path {...stroke} d="M8 7V5h8v2" />
      <path {...stroke} d="M8 12h8" />
      <path {...stroke} d="M8 16h6" />
    </svg>
  );
}

export default function App() {
  useReveal();

  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "ar"); // ar | en

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const isAr = lang === "ar";
    document.documentElement.lang = isAr ? "ar" : "en";
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    localStorage.setItem("lang", lang);
  }, [lang]);

  const logoSrc = useMemo(() => (theme === "light" ? LOGO_LIGHT : LOGO_DARK), [theme]);

  // صور موزعة على الأقسام
  const storyImages = useMemo(
    () => ({
      hero: [1, 2, 3, 4],
      about: 5,
      services: 6,
      quality: 2,
    }),
    []
  );

  const T = useMemo(() => {
    const ar = {
      nav: { about: "نبذة", services: "خدماتنا", quality: "الجودة", contact: "تواصل" },
      heroKicker: "بن أخضر فاخر • سلسلة توريد موثوقة",
      heroTitle: "سلالة البن الفاخر",
      heroSub: "توريد بن أخضر بجودة ثابتة وخيارات متنوعة تلائم مختلف الأذواق.",
      heroBtn: "استعرض الخدمات",
      pills: ["تغليف آمن", "توريد واضح", "استمرارية"],

      aboutTitle: "نبذة عنا",
      aboutDesc:
        "سلالة البن علامة متخصصة في توريد البن الأخضر، تركّز على ثبات الجودة ووضوح سلسلة التوريد وتعدد الخيارات بما يخدم محامص ومتاجر القهوة المختصة.",
      aboutBullets: [
        { t: "وضوح الخيارات", d: "أصناف مناسبة لأهداف التحميص ومختلف الأذواق." },
        { t: "ثبات الجودة", d: "تركيز على الاستمرارية من الشحنة إلى الشحنة." },
        { t: "تجربة عملية", d: "آلية تواصل وتنفيذ واضحة وسريعة." },
      ],
      aboutCap: "لقطات من المصدر والعناية بالمحصول",

      servicesTitle: "خدماتنا المتكاملة",
      servicesDesc: "مجموعة خدمات تلبي احتياج محامص ومتاجر القهوة المختصة بشكل عملي وواضح.",
      servicesCards: [
        { h: "وساطة الاستيراد", p: "توفير خيارات بن أخضر متنوعة مع التركيز على الأصناف المناسبة للسوق." },
        { h: "الخدمات اللوجستية", p: "تنسيق الشحن والتسليم بما يحافظ على جودة البن وسلامة الشحنة." },
        { h: "استشارات مهنية", p: "مساندة في اختيار الأصناف وبناء قائمة توريد مناسبة حسب هدف المحمصة." },
      ],
      roast: {
        h: "التحميص عند الطلب",
        p: "نوفر خدمة تحميص احترافية عند الطلب، تعتمد على فهم دقيق لسلوك البن، وبروفايلات تحميص مصممة لتناسب:",
        list: ["القهوة المختصة", "الإسبريسو", "القهوة المفلترة", "الاستخدام التجاري عالي الجودة"],
      },
      servicesCap: "حلول تنفيذية تدعم التشغيل اليومي للمحمصة",

      qualityTitle: "نهجنا في الجودة",
      qualityDesc: "نلتزم بوضوح المعايير وسهولة التشغيل واستمرارية التوريد.",
      qualitySteps: [
        { h: "وضوح التوريد", p: "معلومات واضحة عن الشحنة وخيارات متعددة بحسب احتياج العميل." },
        { h: "ثبات الجودة", p: "تغليف مناسب وضبط جودة لتصل الشحنة بحالة ممتازة." },
        { h: "استمرارية التشغيل", p: "سلسلة مرنة قابلة للتكرار لتغطية الاحتياج التشغيلي للمحامص." },
      ],
      qualityCap: "معايير ثابتة • تشغيل أسهل • نتائج أوضح",

      contactTitle: "تواصل معنا",
      contactDesc: "اختر وسيلة التواصل المناسبة، وسنرد عليك بأقرب وقت.",
      contactItems: {
        whatsapp: "واتساب",
        email: "البريد الإلكتروني",
        instagram: "إنستغرام",
        sbbc: "المركز السعودي للأعمال",
      },
      footer: "سلالة البن الفاخر",
      langBtn: "EN",
    };

    const en = {
      nav: { about: "About", services: "Services", quality: "Quality", contact: "Contact" },
      heroKicker: "Premium Green Coffee • Reliable Supply Chain",
      heroTitle: "Sulalat Al Bun",
      heroSub: "Supplying premium green coffee with consistent quality and options that fit different roasting goals.",
      heroBtn: "View Services",
      pills: ["Safe Packaging", "Clear Supply", "Consistency"],

      aboutTitle: "About Us",
      aboutDesc:
        "Sulalat Al Bun specializes in green coffee supply, focusing on consistent quality, transparent sourcing, and diverse options for specialty roasters and coffee businesses.",
      aboutBullets: [
        { t: "Clear Options", d: "Selections that match roasting goals and flavor preferences." },
        { t: "Consistent Quality", d: "Continuity from shipment to shipment." },
        { t: "Practical Experience", d: "Fast, clear communication and execution." },
      ],
      aboutCap: "From origin to careful handling",

      servicesTitle: "Our Services",
      servicesDesc: "Practical services designed for specialty roasters and coffee businesses.",
      servicesCards: [
        { h: "Import Brokerage", p: "Curated green coffee options focused on what fits the market." },
        { h: "Logistics", p: "Coordinated shipping and delivery to keep quality protected." },
        { h: "Professional Consulting", p: "Support in selecting lots and building a supply plan." },
      ],
      roast: {
        h: "Roasting On Demand",
        p: "We provide professional roasting on demand, built on deep understanding of coffee behavior and profiles tailored for:",
        list: ["Specialty Coffee", "Espresso", "Filter Coffee", "High-quality commercial use"],
      },
      servicesCap: "Operational solutions that support day-to-day roasting",

      qualityTitle: "Our Quality Approach",
      qualityDesc: "Clear standards, easier operations, and consistent supply.",
      qualitySteps: [
        { h: "Transparent Supply", p: "Clear shipment info and options based on your needs." },
        { h: "Quality Consistency", p: "Proper packaging and quality control to ensure excellent arrival." },
        { h: "Operational Continuity", p: "A repeatable, flexible chain that supports ongoing demand." },
      ],
      qualityCap: "Stable standards • Easier operations • Better outcomes",

      contactTitle: "Contact",
      contactDesc: "Choose the best channel—We’ll respond as soon as possible.",
      contactItems: {
        whatsapp: "WhatsApp",
        email: "Email",
        instagram: "Instagram",
        sbbc: "Saudi Business Center",
      },
      footer: "Sulalat Al Bun",
      langBtn: "AR",
    };

    return lang === "ar" ? ar : en;
  }, [lang]);

  // روابط التواصل (منك)
  const links = useMemo(
    () => ({
      whatsapp: "https://wa.me/966577503090",
      email: "mailto:info@sullalat.com",
      instagram: "https://www.instagram.com/sullala.b?igsh=emE4eDQ3d253Nzc3",
      sbbc: "https://qr.saudibusiness.gov.sa/viewcr?nCrNumber=jDEFOlJqu4oHR2alp8WZ0A==",
      phoneText: "0577503090",
      emailText: "info@sullalat.com",
    }),
    []
  );

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbarInner">
          {/* يمين/يسار حسب dir تلقائياً */}
          <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
            <img className="brandLogo" src={logoSrc} alt="Sulalat Al Bun Logo" />
          </a>

          <div className="topbarActions">
            {/* Language toggle */}
            <button className="langBtn" aria-label="Language" onClick={() => setLang((v) => (v === "ar" ? "en" : "ar"))}>
              {T.langBtn}
            </button>

            <button className="themeBtn" aria-label="Theme" onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}>
              <span className="themeIcon" />
            </button>

            <button className="menuBtn" aria-label="Menu" onClick={() => setMenuOpen((v) => !v)}>
              <span />
              <span />
              <span />
            </button>
          </div>

          <nav className={`nav ${menuOpen ? "open" : ""}`}>
            <a href="#about" onClick={() => setMenuOpen(false)}>{T.nav.about}</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>{T.nav.services}</a>
            <a href="#quality" onClick={() => setMenuOpen(false)}>{T.nav.quality}</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>{T.nav.contact}</a>
          </nav>
        </div>
      </header>

      <main id="home" className="page">
        {/* HERO */}
        <section className="hero">
          <div className="wrap heroGrid">
            <div className="heroText" data-reveal>
              <div className="kicker">{T.heroKicker}</div>
              <h1>
                {T.heroTitle}
                <span>{T.heroSub}</span>
              </h1>

              <div className="ctaRow">
                <a className="btn ghost" href="#services">{T.heroBtn}</a>
              </div>

              <div className="miniNotes">
                {T.pills.map((p) => (
                  <div className="pill" key={p}>{p}</div>
                ))}
              </div>
            </div>

            <div className="heroMosaic" data-reveal>
              <div className="tile t1" style={{ backgroundImage: `url(${IMG(storyImages.hero[0])})` }} />
              <div className="tile t2" style={{ backgroundImage: `url(${IMG(storyImages.hero[1])})` }} />
              <div className="tile t3" style={{ backgroundImage: `url(${IMG(storyImages.hero[2])})` }} />
              <div className="tile t4" style={{ backgroundImage: `url(${IMG(storyImages.hero[3])})` }} />
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section">
          <div className="wrap split">
            <div className="splitText" data-reveal>
              <div className="sectionHead">
                <h2>{T.aboutTitle}</h2>
                <p>{T.aboutDesc}</p>
              </div>

              <div className="bullets">
                {T.aboutBullets.map((b) => (
                  <div className="bullet" key={b.t}>
                    <span className="bDot" />
                    <div>
                      <div className="bTitle">{b.t}</div>
                      <div className="bText">{b.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="splitMedia" data-reveal>
              <div className="mediaFrame" style={{ backgroundImage: `url(${IMG(storyImages.about)})` }} />
              <div className="mediaCaption">{T.aboutCap}</div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section soft">
          <div className="wrap split reverse">
            <div className="splitText" data-reveal>
              <div className="sectionHead">
                <h2>{T.servicesTitle}</h2>
                <p>{T.servicesDesc}</p>
              </div>

              <div className="cards3 compact">
                {T.servicesCards.map((c) => (
                  <div className="card" key={c.h}>
                    <h3>{c.h}</h3>
                    <p>{c.p}</p>
                  </div>
                ))}

                {/* الخدمة الجديدة */}
                <div className="card">
                  <h3>{T.roast.h}</h3>
                  <p>{T.roast.p}</p>
                  <ul className="cardList">
                    {T.roast.list.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="splitMedia" data-reveal>
              <div className="mediaFrame tall" style={{ backgroundImage: `url(${IMG(storyImages.services)})` }} />
              <div className="mediaCaption">{T.servicesCap}</div>
            </div>
          </div>
        </section>

        {/* QUALITY */}
        <section id="quality" className="section">
          <div className="wrap split">
            <div className="splitText" data-reveal>
              <div className="sectionHead">
                <h2>{T.qualityTitle}</h2>
                <p>{T.qualityDesc}</p>
              </div>

              <div className="steps" data-reveal>
                {T.qualitySteps.map((s) => (
                  <div className="step" key={s.h}>
                    <div className="dot" />
                    <div>
                      <h3>{s.h}</h3>
                      <p>{s.p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="splitMedia" data-reveal>
              <div className="mediaFrame" style={{ backgroundImage: `url(${IMG(storyImages.quality)})` }} />
              <div className="mediaCaption">{T.qualityCap}</div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section soft">
          <div className="wrap">
            <div className="contactBox" data-reveal style={{ gridTemplateColumns: "1fr" }}>
              <div>
                <h2>{T.contactTitle}</h2>
                <p className="contactDesc">{T.contactDesc}</p>

                <div className="contactLinks">
                  <a className="iconBtn" href={links.whatsapp} target="_blank" rel="noreferrer">
                    <span className="icon"><Icon name="whatsapp" /></span>
                    <span className="label">
                      {T.contactItems.whatsapp}
                      <small>{links.phoneText}</small>
                    </span>
                  </a>

                  <a className="iconBtn" href={links.email}>
                    <span className="icon"><Icon name="email" /></span>
                    <span className="label">
                      {T.contactItems.email}
                      <small>{links.emailText}</small>
                    </span>
                  </a>

                  <a className="iconBtn" href={links.instagram} target="_blank" rel="noreferrer">
                    <span className="icon"><Icon name="instagram" /></span>
                    <span className="label">{T.contactItems.instagram}</span>
                  </a>

                  <a className="iconBtn" href={links.sbbc} target="_blank" rel="noreferrer">
                    <span className="icon"><Icon name="sbbc" /></span>
                    <span className="label">{T.contactItems.sbbc}</span>
                  </a>
                </div>
              </div>
            </div>

            <footer className="footer">
              <div>© {new Date().getFullYear()} {T.footer}</div>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}