import React, { useEffect, useMemo, useState } from "react";

const IMG = (n) => `/assets/images/farm-${n}.jpg`;
const LOGO = `/assets/images/logo.png`;

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

  const gallery = useMemo(() => [1, 2, 3, 4, 5, 6], []);

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbarInner">
          <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
            <img className="brandLogo" src={LOGO} alt="شعار سلالة البن الفاخر" />
          </a>

          <button
            className="menuBtn"
            aria-label="القائمة"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`nav ${menuOpen ? "open" : ""}`}>
            <a href="#about" onClick={() => setMenuOpen(false)}>نبذة</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>خدماتنا</a>
            <a href="#quality" onClick={() => setMenuOpen(false)}>الجودة</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>تواصل</a>
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
                <a className="btn" href="#contact">تواصل معنا</a>
                <a className="btn ghost" href="#services">استعرض الخدمات</a>
              </div>

              <div className="miniNotes">
                <div className="pill">تغليف آمن</div>
                <div className="pill">توريد واضح</div>
                <div className="pill">استمرارية</div>
              </div>
            </div>

            <div className="heroMosaic" data-reveal>
              <div className="tile t1" style={{ backgroundImage: `url(${IMG(1)})` }} />
              <div className="tile t2" style={{ backgroundImage: `url(${IMG(2)})` }} />
              <div className="tile t3" style={{ backgroundImage: `url(${IMG(3)})` }} />
              <div className="tile t4" style={{ backgroundImage: `url(${IMG(4)})` }} />
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section">
          <div className="wrap">
            <div className="sectionHead" data-reveal>
              <h2>نبذة عنا</h2>
              <p>
                سلالة البن علامة متخصصة في توريد البن الأخضر، تركّز على ثبات الجودة ووضوح سلسلة التوريد
                وتعدد الخيارات بما يخدم محامص ومتاجر القهوة المختصة.
              </p>
            </div>

            <div className="stats" data-reveal>
              <div className="statCard">
                <div className="statNum">+250</div>
                <div className="statLbl">عميل</div>
              </div>
              <div className="statCard">
                <div className="statNum">+40</div>
                <div className="statLbl">شريك حول العالم</div>
              </div>
              <div className="statCard">
                <div className="statNum">+10</div>
                <div className="statLbl">سنوات خبرة</div>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="section soft">
          <div className="wrap">
            <div className="sectionHead" data-reveal>
              <h2>من المزرعة إلى الجودة</h2>
              <p>لقطات من مصدر البن وسياق الحصاد والعناية — لتعكس روح العلامة.</p>
            </div>

            <div className="gallery" data-reveal>
              {gallery.map((n) => (
                <div
                  key={n}
                  className={`shot s${n}`}
                  style={{ backgroundImage: `url(${IMG(n)})` }}
                  role="img"
                  aria-label={`صورة مزرعة ${n}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section">
          <div className="wrap">
            <div className="sectionHead" data-reveal>
              <h2>خدماتنا المتكاملة</h2>
              <p>مجموعة خدمات تلبي احتياج محامص ومتاجر القهوة المختصة بشكل عملي وواضح.</p>
            </div>

            <div className="cards3" data-reveal>
              <div className="card">
                <h3>وساطة الاستيراد</h3>
                <p>توفير خيارات بن أخضر متنوعة مع التركيز على الجودة والأصناف المناسبة للسوق.</p>
              </div>
              <div className="card">
                <h3>الخدمات اللوجستية</h3>
                <p>تنسيق الشحن والتسليم بأسلوب يضمن سلامة الشحنة والحفاظ على جودة البن.</p>
              </div>
              <div className="card">
                <h3>استشارات مهنية</h3>
                <p>مساندة في اختيار الأصناف وبناء قائمة توريد مناسبة حسب هدف المحمصة.</p>
              </div>
            </div>
          </div>
        </section>

        {/* QUALITY */}
        <section id="quality" className="section soft">
          <div className="wrap">
            <div className="sectionHead" data-reveal>
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
                  <p>تركيز على جودة ثابتة وتغليف مناسب لضمان وصول البن بحالة ممتازة.</p>
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
        </section>

        {/* CONTACT */}
        <section id="contact" className="section">
          <div className="wrap">
            <div className="contactBox" data-reveal>
              <div>
                <h2>تواصل معنا</h2>
                <p>
                  ارسل طلبك وسنرد عليك بأقرب وقت. (بدّل الروابط بالواتساب/الإيميل الفعلي للعميل).
                </p>

                <div className="ctaRow">
                  <a className="btn" href="https://wa.me/966000000000" target="_blank" rel="noreferrer">
                    واتساب
                  </a>
                  <a className="btn ghost" href="mailto:info@sulalatalbun.com">
                    بريد إلكتروني
                  </a>
                </div>
              </div>

              <div className="contactMini">
                <div className="miniCard">
                  <div className="miniTitle">الموقع</div>
                  <div className="miniText">الرياض – المملكة العربية السعودية</div>
                </div>
                <div className="miniCard">
                  <div className="miniTitle">ساعات العمل</div>
                  <div className="miniText">يوميًا 9ص – 9م</div>
                </div>
                <div className="miniCard">
                  <div className="miniTitle">الرد</div>
                  <div className="miniText">خلال 24 ساعة</div>
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