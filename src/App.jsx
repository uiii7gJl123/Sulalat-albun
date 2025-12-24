import { useEffect, useMemo, useState } from "react";
import "./style.css";

const LOGO_DARK = "/assets/brand/logo-dark.png";   // نص أبيض
const LOGO_LIGHT = "/assets/brand/logo-light.png"; // نص أسود (الجديد)

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";
  const logoSrc = useMemo(() => (isDark ? LOGO_DARK : LOGO_LIGHT), [isDark]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

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

          <img className="topLogo" src={logoSrc} alt="سلالة البن الفاخر" />
        </div>
      </header>

      <main className="page">
        {/* خلي محتوى موقعك الحالي كما هو تحت هنا */}
        {/* إذا عندك Sections موجودة مسبقًا لا تحذفها، فقط خليك تستخدم نفس JSX القديم داخل <main> */}
      </main>
    </>
  );
}