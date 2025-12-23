import Scene from "./three/Scene.jsx";

const Card = ({ title, text }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
);

export default function App() {
  return (
    <>
      <Scene />

      <header className="topbar">
        <div className="brand">
          <img className="logo" src="/assets/images/logo.png" alt="سلاسة البن" />
          <div>
            <div className="brandName">سلاسة البن</div>
            <div className="brandTag">بن أخضر فاخر • سلسلة توريد موثوقة</div>
          </div>
        </div>

        <nav className="nav">
          <a href="#origin">السلالة</a>
          <a href="#story">القصة</a>
          <a href="#quality">الجودة</a>
          <a href="#invest">للمستثمرين</a>
          <a href="#contact">تواصل</a>
        </nav>
      </header>

      <main className="page">
        <section className="hero" id="top">
          <div className="heroGrid">
            <div className="heroText">
              <div className="pill">بن أخضر • سلاسة توريد • شفافية</div>
              <h1>
                سلاسة البن
                <span> بن أخضر فاخر بمعايير واضحة</span>
              </h1>
              <p>
                نركز على بن أخضر مختار بعناية من مزارع موثوقة، مع توثيق ومسار واضح للجودة
                من المصدر إلى العميل.
              </p>

              <div className="ctaRow">
                <a className="btn" href="#invest">ملف المستثمرين</a>
                <a className="btn ghost" href="#origin">استكشف السلالة</a>
              </div>

              <div className="hint">اسحب باللمس/الماوس لتحريك المجسم • سكروول للتنقل</div>
            </div>

            <div className="heroSide">
              <div className="stat">
                <div className="statNum">بن أخضر</div>
                <div className="statLabel">Raw Green Coffee</div>
              </div>
              <div className="stat">
                <div className="statNum">توريد</div>
                <div className="statLabel">سلس + قابل للتوسع</div>
              </div>
              <div className="stat">
                <div className="statNum">شفافية</div>
                <div className="statLabel">تتبع ومعايير واضحة</div>
              </div>
            </div>
          </div>

          <div className="filmstrip">
            <div className="shot" style={{ backgroundImage: "url(/assets/images/farm-1.jpg)" }} />
            <div className="shot" style={{ backgroundImage: "url(/assets/images/farm-2.jpg)" }} />
            <div className="shot" style={{ backgroundImage: "url(/assets/images/farm-3.jpg)" }} />
          </div>
        </section>

        <section className="block" id="origin">
          <div className="blockHead">
            <h2>السلالة</h2>
            <p>مصادر مختارة بعناية، وهدفنا ثبات الجودة قبل أي شيء.</p>
          </div>
          <div className="grid3">
            <Card title="اختيار المصدر" text="نعتمد على موردين/مزارع موثوقة وبمواصفات واضحة للبن الأخضر." />
            <Card title="تصنيف وفرز" text="فرز بصري ومعايير ثابتة لتقليل التفاوت وتحسين الاتساق." />
            <Card title="جاهزية للتوسع" text="نموذج توريد يسمح بتوسيع الكميات بدون التضحية بالجودة." />
          </div>
        </section>

        <section className="block" id="story">
          <div className="blockHead">
            <h2>القصة</h2>
            <p>من المزرعة إلى السوق… رحلة مختصرة وواضحة.</p>
          </div>

          <div className="timeline">
            <div className="step">
              <div className="dot" />
              <div>
                <h3>المصدر</h3>
                <p>تحديد مصدر البن الأخضر وفق مواصفات جودة قابلة للقياس.</p>
              </div>
            </div>
            <div className="step">
              <div className="dot" />
              <div>
                <h3>الفحص</h3>
                <p>التأكد من سلامة الشحنة والالتزام بالمعايير المتفق عليها.</p>
              </div>
            </div>
            <div className="step">
              <div className="dot" />
              <div>
                <h3>الإمداد</h3>
                <p>تجهيز توريد مستمر لقطاع التحميص/التوزيع وفق اتفاقيات واضحة.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="block" id="quality">
          <div className="blockHead">
            <h2>الجودة</h2>
            <p>الجودة عندنا “نظام”، مو مجرد كلام.</p>
          </div>

          <div className="grid2">
            <div className="panel">
              <h3>معايير واضحة</h3>
              <p>مواصفات قابلة للتوثيق، وتحديد درجات/تصنيفات حسب احتياج العملاء.</p>
            </div>
            <div className="panel">
              <h3>ثبات التجربة</h3>
              <p>هدفنا تقليل التذبذب بين الشحنات قدر الإمكان، لمنتج ثابت يعتمد عليه.</p>
            </div>
          </div>
        </section>

        <section className="block" id="invest">
          <div className="blockHead">
            <h2>للمستثمرين</h2>
            <p>قسم مختصر وواضح. تقدر تربطه لاحقًا بملف PDF/Doc أو صفحة مفصلة.</p>
          </div>

          <div className="investBox">
            <div>
              <h3>فرصة نمو</h3>
              <p>
                نموذج يعتمد على توريد بن أخضر بمعايير ثابتة وشفافية، مع قابلية للتوسع
                في السوق المستهدف.
              </p>
              <ul>
                <li>قيمة: جودة + توريد + وضوح</li>
                <li>تشغيل: سلسلة بسيطة قابلة للتكرار</li>
                <li>توسع: شحنات/عملاء/قنوات توزيع</li>
              </ul>
            </div>

            <div className="investCTA">
              <div className="badge">الخطوة التالية</div>
              <p className="small">
                إذا تبغى، أجهّز لك زر تنزيل/عرض “ملف المستثمرين” داخل الموقع.
              </p>
              <a className="btn" href="#contact">طلب تواصل</a>
            </div>
          </div>
        </section>

        <section className="block" id="contact">
          <div className="blockHead">
            <h2>تواصل</h2>
            <p>اكتب بيانات العميل هنا (واتساب/إيميل/موقع).</p>
          </div>

          <div className="contactRow">
            <div className="panel">
              <h3>واتساب</h3>
              <p>+966XXXXXXXXX</p>
            </div>
            <div className="panel">
              <h3>إيميل</h3>
              <p>info@example.com</p>
            </div>
            <div className="panel">
              <h3>المدينة</h3>
              <p>السعودية</p>
            </div>
          </div>

          <footer className="footer">
            <div>© سلاسة البن</div>
            <div className="small">Credits: 3D model (CC BY) – ضع نص Credits هنا من Sketchfab</div>
          </footer>
        </section>
      </main>
    </>
  );
}