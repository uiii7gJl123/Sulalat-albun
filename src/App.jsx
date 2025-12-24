import { useEffect, useMemo, useState } from "react";
import "./style.css";

// ✅ الشعارات داخل: public/assets/images
const LOGO_DARK = "/assets/images/logo-dark.png";   // نص أبيض
const LOGO_LIGHT = "/assets/images/logo-light.png"; // نص أسود

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const logoSrc = useMemo(() => (isDark ? LOGO_DARK : LOGO_LIGHT), [isDark]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // ✅ صور المزرعة: ضعها داخل public/assets/images بهذه الأسماء
  const farmShots = [
    "/assets/images/farm-1.jpg",
    "/assets/images/farm-2.jpg",
    "/assets/images/farm-3.jpg",
    "/assets/images/farm-4.jpg",
    "/assets/images/farm-5.jpg",
    "/assets/images/farm-6.jpg",
  ];

  return (
    <>
      <header className="topbar">
        <button className="menuBtn" aria-label="القائمة">
          <span className="menuLine" />
          <span className="menuLine" />
          <span className="menuLine" />
        </button>

        <div className="topbarRight">
          <button className="themeBtn" onClick={toggleTheme} aria-label="تغيير الثيم">
            {isDark ? "فاتح" : "داكن"}
          </button>

          <img
            className="topLogo"
            src={logoSrc}
            alt="سلالة البن الفاخر"
            onError={(e) => {
              // fallback لو واحد من الملفين اسمه/مساره غلط
              e.currentTarget.src = isDark ? LOGO_LIGHT : LOGO_DARK;
            }}
          />
        </div>
      </header>

      <main className="page">
        {/* HERO */}
        <section className="hero">
          <div className="heroGrid">
            <div>
              <span className="pill">توريد بن أخضر فاخر • جودة • التزام</span>
              <h1>
                سلالة البن الفاخر
                <span>نختار المصدر بعناية، ونوصل لك بن أخضر بمعايير ثابتة.</span>
              </h1>

              <div className="ctaRow">
                <a className="btn" href="#contact">طلب تواصل</a>
                <a className="btn ghost" href="#services">استعرض الخدمات</a>
              </div>

              <div className="hint">تصفح الأقسام بالتمرير • تصميم خفيف على الجوال</div>
            </div>

            <div className="heroSide">
              <div className="panel">
                <h3>ما الذي نقدمه؟</h3>
                <p>
                  توريد بن أخضر للمحامص ومتاجر القهوة المختصة مع متابعة واضحة للمواصفات
                  وتنسيق عمليات التوريد حسب احتياجك.
                </p>
              </div>

              <div className="panel">
                <h3>لماذا نحن؟</h3>
                <ul className="bullets">
                  <li>اختيارات مدروسة</li>
                  <li>تواصل سريع وواضح</li>
                  <li>تجهيز للتوريد والتسليم</li>
                </ul>
              </div>
            </div>
          </div>

          {/* صور تحت الهيرو */}
          <div className="filmstrip">
            {farmShots.slice(0, 3).map((src, i) => (
              <div key={i} className="shot" style={{ backgroundImage: `url(${src})` }} />
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="block">
          <div className="blockHead">
            <h2>نبذة مختصرة</h2>
            <p>
              سلالة البن الفاخر علامة متخصصة في توريد البن الأخضر، هدفنا تقديم خيارات مستقرة
              تناسب احتياجات المحامص ومتاجر القهوة المختصة.
            </p>
          </div>

          <div className="grid2">
            <div className="card">
              <h3>تركيز على الجودة</h3>
              <p>نختار محاصيل مناسبة ومواصفات واضحة لضمان تجربة متسقة.</p>
            </div>

            <div className="card">
              <h3>مرونة في التوريد</h3>
              <p>تنسيق الكميات والتسليم بما يتوافق مع احتياج العميل وجدولة العمل.</p>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="block">
          <div className="blockHead">
            <h2>خدماتنا المتكاملة</h2>
            <p>مجموعة خدمات شاملة تلبي احتياجات متاجر القهوة والمحمصة.</p>
          </div>

          <div className="grid3">
            <div className="card iconCard">
              <div className="iconBubble">👁️</div>
              <h3>متابعة واضحة</h3>
              <p>مشاركة التفاصيل الأساسية والمواصفات المطلوبة بشكل منظم.</p>
            </div>

            <div className="card iconCard">
              <div className="iconBubble">📦</div>
              <h3>توريد بن أخضر</h3>
              <p>توفير خيارات مناسبة بمستوى جودة ثابت حسب احتياج العميل.</p>
            </div>

            <div className="card iconCard">
              <div className="iconBubble">🚚</div>
              <h3>تنسيق التسليم</h3>
              <p>تنسيق عمليات التسليم والجدولة لضمان وصول الطلبات بسلاسة.</p>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="block">
          <div className="blockHead">
            <h2>صور من المصدر</h2>
            <p>لمحات من المزارع ومراحل المحصول.</p>
          </div>

          <div className="masonry">
            {farmShots.map((src, i) => (
              <div key={i} className="mCard">
                <div className="mImg" style={{ backgroundImage: `url(${src})` }} />
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="block">
          <div className="blockHead">
            <h2>تواصل معنا</h2>
            <p>اترك بياناتك وسنتواصل معك.</p>
          </div>

          <div className="contactRow">
            <div className="card">
              <h3>واتساب</h3>
              <p className="small">ضع رابط الواتساب هنا</p>
              <a className="btn" href="#">فتح واتساب</a>
            </div>

            <div className="card">
              <h3>اتصال</h3>
              <p className="small">ضع رقم الاتصال هنا</p>
              <a className="btn ghost" href="#">اتصال</a>
            </div>

            <div className="card">
              <h3>بريد</h3>
              <p className="small">ضع البريد هنا</p>
              <a className="btn ghost" href="#">إرسال بريد</a>
            </div>
          </div>

          <div className="footer">
            <span className="small">© {new Date().getFullYear()} سلالة البن الفاخر</span>
            <span className="small">تصميم متوافق مع الجوال</span>
          </div>
        </section>
      </main>
    </>
  );
}