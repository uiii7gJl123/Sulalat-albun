import React, { useEffect, useMemo, useState } from "react";

const IMG = (n) => `/assets/images/farm-${n}.jpeg`;

// شعارات مختلفة حسب الثيم
const LOGO_DARK = `/assets/images/logo-dark.png`;
const LOGO_LIGHT = `/assets/images/logo-light.png`;

// بيانات التواصل (من العميل)
const PHONE_LOCAL = "0577503090";
const PHONE_E164 = "966577503090"; // تحويل 0 -> +966
const EMAIL = "info@sullalat.com";
const INSTAGRAM_URL = "https://www.instagram.com/sullala.b?igsh=emE4eDQ3d253Nzc3";
const SAUDI_BIZ_URL = "https://qr.saudibusiness.gov.sa/viewcr?nCrNumber=jDEFOlJqu4oHR2alp8WZ0A==";

// أيقونات (SVG خفيفة بنفس ستايل الموقع)
const IconWhatsApp = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...p}>
    <path
      fill="currentColor"
      d="M12.04 2C6.58 2 2.16 6.42 2.16 11.88c0 1.94.56 3.75 1.53 5.27L2 22l4.98-1.63a9.8 9.8 0 0 0 5.06 1.38h.01c5.46 0 9.88-4.42 9.88-9.88C21.93 6.42 17.5 2 12.04 2Zm5.74 14.36c-.24.67-1.38 1.25-1.91 1.33-.49.07-1.12.1-1.8-.12-.42-.14-.95-.31-1.64-.61-2.88-1.24-4.76-4.08-4.9-4.27-.13-.19-1.17-1.55-1.17-2.96 0-1.41.74-2.1 1-2.38.27-.28.58-.35.78-.35h.56c.18 0 .42-.07.66.5.24.58.82 2 .9 2.15.07.15.12.34.02.54-.1.2-.15.34-.3.52-.15.18-.32.4-.46.54-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.02 1.12.99 2.07 1.3 2.37 1.44.3.15.48.12.66-.07.18-.2.76-.88.96-1.18.2-.3.4-.25.67-.15.27.1 1.72.81 2.01.96.3.15.49.22.56.35.07.12.07.72-.17 1.39Z"
    />
  </svg>
);

const IconInstagram = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...p}>
    <path
      fill="currentColor"
      d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4Zm-4.5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-2.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
    />
  </svg>
);

const IconMail = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...p}>
    <path
      fill="currentColor"
      d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Zm2.24-.5 5.33 4.2c.26.2.62.2.88 0L17.76 6H6.24ZM18 8.06l-4.93 3.88a2.5 2.5 0 0 1-3.14 0L5 8.06V17.5c0 .28.22.5.5.5h11c.28 0 .5-.22.5-.5V8.06Z"
    />
  </svg>
);

const IconBiz = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M7 4h10a2 2 0 0 1 2 2v14H5V6a2 2 0 0 1 2-2Zm0 2v12h10V6H7Zm2 2h6v2H9V8Zm0 4h6v2H9v-2Z" />
  </svg>
);

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) e.target.classList.add("is-in");
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function App() {
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "ar");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang === "ar" ? "ar" : "en");
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    localStorage.setItem("lang", lang);
  }, [lang]);

  const logoSrc = useMemo(() => (theme === "light" ? LOGO_LIGHT : LOGO_DARK), [theme]);

  // تحكم قطعي بحجم الشعار
  const logoStyle = useMemo(
    () => ({
      height: "180px",
      width: "auto",
      maxHeight: "none",
      maxWidth: "none",
      display: "block",
      objectFit: "contain",
    }),
    []
  );

  const storyImages = useMemo(
    () => ({
      hero: [1, 2, 3, 4],
      about: 5,
      services: 6,
      quality: 2,
    }),
    []
  );

  const t = useMemo(() => {
    const dict = {
      ar: {
        nav: { about: "نبذة", services: "خدماتنا", quality: "الجودة", contact: "تواصل" },
        heroKicker: "بن أخضر فاخر • سلسلة توريد موثوقة",
        heroTitle: "سلالة البن الفاخر",
        heroSub: "توريد بن أخضر بجودة ثابتة وخيارات متنوعة تلائم مختلف الأذواق.",
        ctaServices: "استعرض الخدمات",
        pills: ["تغليف آمن", "توريد واضح", "استمرارية"],
        aboutTitle: "نبذة عنا",
        aboutText:
          "سلالة البن علامة متخصصة في توريد البن الأخضر، تركّز على ثبات الجودة ووضوح سلسلة التوريد وتعدد الخيارات بما يخدم محامص ومتاجر القهوة المختصة.",
        bullets: [
          { title: "وضوح الخيارات", text: "أصناف مناسبة لأهداف التحميص ومختلف الأذواق." },
          { title: "ثبات الجودة", text: "تركيز على الاستمرارية من الشحنة إلى الشحنة." },
          { title: "تجربة عملية", text: "آلية تواصل وتنفيذ واضحة وسريعة." },
        ],
        aboutCap: "لقطات من المصدر والعناية بالمحصول",
        servicesTitle: "خدماتنا المتكاملة",
        servicesText: "مجموعة خدمات تلبي احتياج محامص ومتاجر القهوة المختصة بشكل عملي وواضح.",
        cards: [
          { h: "وساطة الاستيراد", p: "توفير خيارات بن أخضر متنوعة مع التركيز على الأصناف المناسبة للسوق." },
          { h: "الخدمات اللوجستية", p: "تنسيق الشحن والتسليم بما يحافظ على جودة البن وسلامة الشحنة." },
          { h: "استشارات مهنية", p: "مساندة في اختيار الأصناف وبناء قائمة توريد مناسبة حسب هدف المحمصة." },
          {
            h: "التحميص عند الطلب",
            p: "نوفر خدمة تحميص احترافية عند الطلب، تعتمد على فهم دقيق لسلوك البن، وبروفايلات تحميص مصممة لتناسب:",
            list: ["القهوة المختصة", "الإسبريسو", "القهوة المفلترة", "الاستخدام التجاري عالي الجودة"],
          },
        ],
        servicesCap: "حلول تنفيذية تدعم التشغيل اليومي للمحمصة",
        qualityTitle: "نهجنا في الجودة",
        qualityText: "نلتزم بوضوح المعايير وسهولة التشغيل واستمرارية التوريد.",
        steps: [
          { h: "وضوح التوريد", p: "معلومات واضحة عن الشحنة وخيارات متعددة بحسب احتياج العميل." },
          { h: "ثبات الجودة", p: "تغليف مناسب وضبط جودة لتصل الشحنة بحالة ممتازة." },
          { h: "استمرارية التشغيل", p: "سلسلة مرنة قابلة للتكرار لتغطية الاحتياج التشغيلي للمحامص." },
        ],
        qualityCap: "معايير ثابتة • تشغيل أسهل • نتائج أوضح",
        contactTitle: "تواصل معنا",
        contactLinksTitle: "روابط التواصل",
        contactItems: {
          wa: "واتساب",
          ig: "إنستغرام",
          email: "البريد",
          biz: "المركز السعودي للأعمال",
        },
      },
      en: {
        nav: { about: "About", services: "Services", quality: "Quality", contact: "Contact" },
        heroKicker: "Premium Green Coffee • Trusted Supply Chain",
        heroTitle: "Sullalat Al-Bun",
        heroSub: "Green coffee sourcing with consistent quality and options tailored to different tastes.",
        ctaServices: "View services",
        pills: ["Secure Packaging", "Clear Supply", "Consistency"],
        aboutTitle: "About us",
        aboutText:
          "Sullalat Al-Bun specializes in green coffee sourcing, focusing on consistent quality, transparent supply chain, and diverse options for specialty roasters and coffee retailers.",
        bullets: [
          { title: "Clear Options", text: "Varieties aligned with roasting goals and taste profiles." },
          { title: "Consistent Quality", text: "Stability from shipment to shipment." },
          { title: "Practical Experience", text: "Fast, clear communication and execution." },
        ],
        aboutCap: "From origin to careful crop handling",
        servicesTitle: "Our services",
        servicesText: "Practical services that support specialty roasters and coffee retailers.",
        cards: [
          { h: "Import Mediation", p: "Access to diverse green coffee options aligned with the market." },
          { h: "Logistics", p: "Shipping and delivery coordination to preserve quality and safety." },
          { h: "Professional Consulting", p: "Support in selecting origins and building a supply plan." },
          {
            h: "Roasting on Demand",
            p: "On-demand professional roasting with profiles designed for:",
            list: ["Specialty coffee", "Espresso", "Filter coffee", "High-quality commercial use"],
          },
        ],
        servicesCap: "Execution-focused solutions for daily operations",
        qualityTitle: "Quality approach",
        qualityText: "We commit to clear standards, smooth operations, and reliable supply.",
        steps: [
          { h: "Supply Transparency", p: "Clear shipment details and options based on client needs." },
          { h: "Quality Consistency", p: "Proper packaging and checks to ensure top condition." },
          { h: "Operational Continuity", p: "Repeatable supply flow to meet ongoing demand." },
        ],
        qualityCap: "Clear standards • Easier ops • Better results",
        contactTitle: "Contact",
        contactLinksTitle: "Contact links",
        contactItems: {
          wa: "WhatsApp",
          ig: "Instagram",
          email: "Email",
          biz: "Saudi Business Center",
        },
      },
    };
    return dict[lang] || dict.ar;
  }, [lang]);

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbarInner">
          <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
            <img className="brandLogo" src={logoSrc} alt="Sullalat Al-Bun Logo" style={logoStyle} />
          </a>

          <div className="topbarActions">
            <button
              className="langBtn"
              aria-label="Language"
              onClick={() => setLang((v) => (v === "ar" ? "en" : "ar"))}
              title={lang === "ar" ? "English" : "العربية"}
            >
              <span className="langText">{lang === "ar" ? "EN" : "AR"}</span>
            </button>

            <button className="themeBtn" aria-label="تبديل الثيم" onClick={() => setTheme((tt) => (tt === "dark" ? "light" : "dark"))}>
              <span className="themeIcon" />
            </button>

            <button className="menuBtn" aria-label="القائمة" onClick={() => setMenuOpen((v) => !v)}>
              <span />
              <span />
              <span />
            </button>
          </div>

          <nav className={`nav ${menuOpen ? "open" : ""}`}>
            <a href="#about" onClick={() => setMenuOpen(false)}>{t.nav.about}</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>{t.nav.services}</a>
            <a href="#quality" onClick={() => setMenuOpen(false)}>{t.nav.quality}</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</a>
          </nav>
        </div>
      </header>

      <main id="home" className="page">
        {/* HERO */}
        <section className="hero">
          <div className="wrap heroGrid">
            <div className="heroText" data-reveal>
              <div className="kicker">{t.heroKicker}</div>
              <h1>
                {t.heroTitle}
                <span>{t.heroSub}</span>
              </h1>

              <div className="ctaRow">
                <a className="btn ghost" href="#services">{t.ctaServices}</a>
              </div>

              <div className="miniNotes">
                {t.pills.map((x) => (
                  <div key={x} className="pill">{x}</div>
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
                <h2>{t.aboutTitle}</h2>
                <p>{t.aboutText}</p>
              </div>

              <div className="bullets">
                {t.bullets.map((b) => (
                  <div className="bullet" key={b.title}>
                    <span className="bDot" />
                    <div>
                      <div className="bTitle">{b.title}</div>
                      <div className="bText">{b.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="splitMedia" data-reveal>
              <div className="mediaFrame" style={{ backgroundImage: `url(${IMG(storyImages.about)})` }} />
              <div className="mediaCaption">{t.aboutCap}</div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section soft">
          <div className="wrap split reverse">
            <div className="splitText" data-reveal>
              <div className="sectionHead">
                <h2>{t.servicesTitle}</h2>
                <p>{t.servicesText}</p>
              </div>

              <div className="cards3 compact">
                {t.cards.map((c) => (
                  <div className="card" key={c.h}>
                    <h3>{c.h}</h3>
                    <p>{c.p}</p>
                    {c.list ? (
                      <ul className="cardList">
                        {c.list.map((li) => <li key={li}>{li}</li>)}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="splitMedia" data-reveal>
              <div className="mediaFrame tall" style={{ backgroundImage: `url(${IMG(storyImages.services)})` }} />
              <div className="mediaCaption">{t.servicesCap}</div>
            </div>
          </div>
        </section>

        {/* QUALITY */}
        <section id="quality" className="section">
          <div className="wrap split">
            <div className="splitText" data-reveal>
              <div className="sectionHead">
                <h2>{t.qualityTitle}</h2>
                <p>{t.qualityText}</p>
              </div>

              <div className="steps" data-reveal>
                {t.steps.map((s) => (
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
              <div className="mediaCaption">{t.qualityCap}</div>
            </div>
          </div>
        </section>

        {/* ✅ هنا المكان الصحيح: تحت (معايير ثابتة...) مباشرة */}
        <section className="afterQualityStrip">
          <div className="wrap afterQualityInner" data-reveal>
            <a className="iconBtn afterQualityBtn" href={SAUDI_BIZ_URL} target="_blank" rel="noreferrer">
              <span className="iconCircle"><IconBiz /></span>
              <span className="iconText">{t.contactItems.biz}</span>
            </a>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section soft">
          <div className="wrap">
            <div className="contactBox" data-reveal style={{ gridTemplateColumns: "1fr" }}>
              <div>
                <h2>{t.contactTitle}</h2>

                <div className="contactLinksWrap">
                  <div className="contactLinksHead">{t.contactLinksTitle}</div>

                  <div className="contactLinks">
                    <a className="iconBtn" href={`https://wa.me/${PHONE_E164}`} target="_blank" rel="noreferrer">
                      <span className="iconCircle"><IconWhatsApp /></span>
                      <span className="iconText">{t.contactItems.wa}</span>
                    </a>

                    <a className="iconBtn" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                      <span className="iconCircle"><IconInstagram /></span>
                      <span className="iconText">{t.contactItems.ig}</span>
                    </a>

                    <a className="iconBtn" href={`mailto:${EMAIL}`}>
                      <span className="iconCircle"><IconMail /></span>
                      <span className="iconText">{t.contactItems.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <footer className="footer">
              <div>© {new Date().getFullYear()} {lang === "ar" ? "سلالة البن الفاخر" : "Sullalat Al-Bun"}</div>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}