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

export default function App() {
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const logoSrc = useMemo(() => (theme === "light" ? LOGO_LIGHT : LOGO_DARK), [theme]);

  // ✅ تحكم قطعي بحجم الشعار (يغلب CSS) — واضح وكبير بدون تضخيم البار
  const logoStyle = useMemo(
    () => ({
      height: "100px",
      width: "auto",
      maxHeight: "none",
      maxWidth: "none",
      display: "block",
      objectFit: "contain",
    }),
    []
  );

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

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbarInner">
          {/* يمين: الشعار */}
          <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
            <img className="brandLogo" src={logoSrc} alt="شعار سلالة البن الفاخر" style={logoStyle} />
          </a>

          {/* يسار: الأزرار */}
          <div className="topbarActions">
            <button
              className="themeBtn"
              aria-label="تبديل الثيم"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            >
              <span className="themeIcon" />
            </button>

            <button className="menuBtn" aria-label="القائمة" onClick={() => setMenuOpen((v) => !v)}>
              <span />
              <span />
              <span />
            </button>
          </div>

          {/* قائمة (تظهر ديسكتوب + تنفتح بالموبايل) */}
          <nav className={`nav ${menuOpen ? "open" : ""}`}>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              نبذة
            </a>
            <a href="#services" onClick={() => setMenuOpen(false)}>
              خدماتنا
            </a>
            <a href="#quality" onClick={() => setMenuOpen(false)}>
              الجودة
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              تواصل
            </a>
          </nav>
        </div>
      </header>

      <main id="home" className="page">
        {/* HERO */}
        <section className="hero">
          <div className="wrap heroGrid">
            <div className="heroText" data-reveal>
              <div className="kicker">بن أخضر فاخر • سلسلة توريد موثوقة</div>
              <h1>
                سلالة البن الفاخر
                <span>توريد بن أخضر بجودة ثابتة وخيارات متنوعة تلائم مختلف الأذواق.</span>
              </h1>

              <div className="ctaRow">
                <a className="btn ghost" href="#services">
                  استعرض الخدمات
                </a>
              </div>

              <div className="miniNotes">
                <div className="pill">تغليف آمن</div>
                <div className="pill">توريد واضح</div>
                <div className="pill">استمرارية</div>
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
                <h2>نبذة عنا</h2>
                <p>
                  سلالة البن علامة متخصصة في توريد البن الأخضر، تركّز على ثبات الجودة ووضوح سلسلة التوريد وتعدد
                  الخيارات بما يخدم محامص ومتاجر القهوة المختصة.
                </p>
              </div>

              <div className="bullets">
                <div className="bullet">
                  <span className="bDot" />
                  <div>
                    <div className="bTitle">وضوح الخيارات</div>
                    <div className="bText">أصناف مناسبة لأهداف التحميص ومختلف الأذواق.</div>
                  </div>
                </div>
                <div className="bullet">
                  <span className="bDot" />
                  <div>
                    <div className="bTitle">ثبات الجودة</div>
                    <div className="bText">تركيز على الاستمرارية من الشحنة إلى الشحنة.</div>
                  </div>
                </div>
                <div className="bullet">
                  <span className="bDot" />
                  <div>
                    <div className="bTitle">تجربة عملية</div>
                    <div className="bText">آلية تواصل وتنفيذ واضحة وسريعة.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="splitMedia" data-reveal>
              <div className="mediaFrame" style={{ backgroundImage: `url(${IMG(storyImages.about)})` }} />
              <div className="mediaCaption">لقطات من المصدر والعناية بالمحصول</div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section soft">
          <div className="wrap split reverse">
            <div className="splitText" data-reveal>
              <div className="sectionHead">
                <h2>خدماتنا المتكاملة</h2>
                <p>مجموعة خدمات تلبي احتياج محامص ومتاجر القهوة المختصة بشكل عملي وواضح.</p>
              </div>

              <div className="cards3 compact">
                <div className="card">
                  <h3>وساطة الاستيراد</h3>
                  <p>توفير خيارات بن أخضر متنوعة مع التركيز على الأصناف المناسبة للسوق.</p>
                </div>

                <div className="card">
                  <h3>الخدمات اللوجستية</h3>
                  <p>تنسيق الشحن والتسليم بما يحافظ على جودة البن وسلامة الشحنة.</p>
                </div>

                <div className="card">
                  <h3>استشارات مهنية</h3>
                  <p>مساندة في اختيار الأصناف وبناء قائمة توريد مناسبة حسب هدف المحمصة.</p>
                </div>

                {/* ✅ الخدمة الجديدة */}
                <div className="card">
                  <h3>التحميص عند الطلب</h3>
                  <p>
                    نوفر خدمة تحميص احترافية عند الطلب، تعتمد على فهم دقيق لسلوك البن، وبروفايلات تحميص مصممة لتناسب:
                  </p>
                  <ul className="cardList">
                    <li>القهوة المختصة</li>
                    <li>الإسبريسو</li>
                    <li>القهوة المفلترة</li>
                    <li>الاستخدام التجاري عالي الجودة</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="splitMedia" data-reveal>
              <div className="mediaFrame tall" style={{ backgroundImage: `url(${IMG(storyImages.services)})` }} />
              <div className="mediaCaption">حلول تنفيذية تدعم التشغيل اليومي للمحمصة</div>
            </div>
          </div>
        </section>

        {/* QUALITY */}
        <section id="quality" className="section">
          <div className="wrap split">
            <div className="splitText" data-reveal>
              <div className="sectionHead">
                <h2>نهجنا في الجودة</h2>
                <p>نلتزم بوضوح المعايير وسهولة التشغيل واستمرارية التوريد.</p>
              </div>

              <div className="steps" data-reveal>
                <div className="step">
                  <div className="dot" />
                  <div>
                    <h3>وضوح التوريد</h3>
                    <p>معلومات واضحة عن الشحنة وخيارات متعددة بحسب احتياج العميل.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="dot" />
                  <div>
                    <h3>ثبات الجودة</h3>
                    <p>تغليف مناسب وضبط جودة لتصل الشحنة بحالة ممتازة.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="dot" />
                  <div>
                    <h3>استمرارية التشغيل</h3>
                    <p>سلسلة مرنة قابلة للتكرار لتغطية الاحتياج التشغيلي للمحامص.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="splitMedia" data-reveal>
              <div className="mediaFrame" style={{ backgroundImage: `url(${IMG(storyImages.quality)})` }} />
              <div className="mediaCaption">معايير ثابتة • تشغيل أسهل • نتائج أوضح</div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section soft">
          <div className="wrap">
            <div className="contactBox" data-reveal style={{ gridTemplateColumns: "1fr" }}>
              <div>
                <h2>تواصل معنا</h2>

                <div className="ctaRow">
                  <a className="btn" href="https://wa.me/966000000000" target="_blank" rel="noreferrer">
                    واتساب
                  </a>

                  <a className="btn ghost" href="mailto:info@sulalatalbun.com">
                    بريد إلكتروني
                  </a>
                </div>
              </div>
            </div>

            <footer className="footer">
              <div>© {new Date().getFullYear()} سلالة البن الفاخر</div>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}