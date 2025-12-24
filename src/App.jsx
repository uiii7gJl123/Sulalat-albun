const Stat = ({ n, t }) => (
  <div className="stat">
    {/* حل مشكلة + في RTL: نخلي الرقم LTR */}
    <div className="statN" dir="ltr">{n}</div>
    <div className="statT">{t}</div>
  </div>
);

const Feature = ({ icon, title, text }) => (
  <div className="feature">
    <div className="featureIcon" aria-hidden="true">{icon}</div>
    <div className="featureBody">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  </div>
);

export default function App() {
  return (
    <div className="site" dir="rtl">
      {/* Header: شعار كبير لوحده */}
      <header className="header">
        <img className="brandLogo" src="/assets/images/logo.png" alt="سلالة البن" />
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="heroInner">
          <div className="heroText">
            <h1>
              سلالة البن… <span className="accent">رحلة جودة</span> تبدأ من المزرعة
            </h1>

            {/* نص من ملف الملاحظات */}
            <p>
              تمثّل سلالة البن مفهومًا متكاملًا يتجاوز فكرة استيراد البن الأخضر؛
              رحلة تبدأ من أجود المزارع في أمريكا اللاتينية، وتمتد إلى فنجان يحمل
              توقيع الجودة، والهوية، والتميّز.
            </p>

            <div className="heroCtas">
              <a className="btnGold" href="#contact">تواصل معنا</a>
              <a className="btnGhost" href="#services">استعرض الخدمات</a>
            </div>
          </div>

          {/* كولاج صور مائل (مشابه للمرجع) */}
          <div className="collage">
            <div className="tile t1" style={{ backgroundImage: "url(/assets/images/farm-1.jpg)" }} />
            <div className="tile t2" style={{ backgroundImage: "url(/assets/images/farm-2.jpg)" }} />
            <div className="tile t3" style={{ backgroundImage: "url(/assets/images/farm-3.jpg)" }} />
            <div className="tile t4" style={{ backgroundImage: "url(/assets/images/farm-4.jpg)" }} />
          </div>
        </div>
      </section>

      {/* STRIP */}
      <section className="strip">
        <div className="stripInner">
          <div className="stripTitle">سلاسة في التوريد</div>
          <div className="stripText">
            جودة ثابتة • معايير واضحة • توريد موثوق • تعامل مهني
          </div>
        </div>
      </section>

      {/* ABOUT (من ملف الـ docx بعد حذف المستثمرين) */}
      <section className="section" id="about">
        <h2 className="sectionTitle">نبذة مختصرة</h2>
        <p className="prose">
          سلالة البن علامة متخصصة في استيراد البن الأخضر عالي الجودة، انطلقت من شغف
          حقيقي بالقهوة ورغبة في تقديم منتج يُختار بعناية وفق معايير دقيقة تشمل الجودة،
          والاستدامة، وثبات الإنتاج.
        </p>
      </section>

      {/* SERVICES */}
      <section className="section" id="services">
        <h2 className="sectionTitle">منتجاتنا وخدماتنا</h2>
        <p className="sectionSub">
          نقدم حلول توريد تدعم احتياجات المحامص ومتاجر القهوة المختصة.
        </p>

        <div className="features">
          <Feature
            icon="🌿"
            title="بن أخضر عالي الجودة"
            text="توريد بن غير محمّص مختار بعناية وفق معايير ثابتة."
          />
          <Feature
            icon="🔥"
            title="تحميص عند الطلب"
            text="خدمة تحميص احترافية حسب الاحتياج وبمخرجات ثابتة."
          />
          <Feature
            icon="🏪"
            title="توريد مخصص"
            text="توريد مخصص للكافيهات والمحمصات حسب الكميات والجدولة."
          />
          <Feature
            icon="🤝"
            title="شراكات توريد طويلة الأمد"
            text="علاقات توريد مستقرة تضمن استمرارية وتخطيط أفضل."
          />
        </div>
      </section>

      {/* WHY */}
      <section className="section">
        <h2 className="sectionTitle">لماذا سلالة البن؟</h2>
        <div className="features">
          <Feature icon="✅" title="استيراد مباشر من المصدر" text="وصول أفضل للأصناف ومعايير اختيار أوضح." />
          <Feature icon="📌" title="جودة ثابتة" text="معايير واضحة لضمان ثبات التجربة عبر الشحنات." />
          <Feature icon="📈" title="قابلية للتوسع" text="نموذج تشغيل مرن قابل للتوسع مع احتياج السوق." />
          <Feature icon="🔍" title="شفافية بالتعامل" text="تواصل واضح وخطوات توريد منظمة." />
        </div>
      </section>

      {/* STATS (بدون + في البداية) */}
      <section className="section stats">
        <Stat n="250+" t="عميل" />
        <Stat n="350+" t="نوع بن" />
        <Stat n="40+" t="شريك" />
        <Stat n="10+" t="سنوات خبرة" />
      </section>

      {/* Sustainability + Vision (من docx بدون المستثمرين) */}
      <section className="section">
        <h2 className="sectionTitle">الاستدامة والمسؤولية</h2>
        <p className="prose">
          نلتزم بممارسات زراعية وأخلاقية مسؤولة من خلال دعم الموردين وبناء سلسلة توريد
          شفافة تضمن استدامة الجودة والأثر الإيجابي.
        </p>
      </section>

      <section className="section">
        <h2 className="sectionTitle">رؤيتنا</h2>
        <p className="prose">
          نسعى لأن نكون مرجعًا موثوقًا في توريد البن الأخضر لقطاع القهوة المختصة، عبر
          توسيع نطاق الخيارات وبناء علامة قوية ترتبط بالجودة والتميّز.
        </p>
      </section>

      {/* CONTACT */}
      <section className="section contact" id="contact">
        <h2 className="sectionTitle">تواصل</h2>
        <p className="prose">
          ارسل احتياجك وسنعود لك بأقرب وقت بالخيارات المناسبة والكميات المتاحة.
        </p>

        <div className="contactCard">
          <div className="contactRow">
            <div className="k">واتساب</div>
            <div className="v">+966XXXXXXXXX</div>
          </div>
          <div className="contactRow">
            <div className="k">البريد</div>
            <div className="v">info@example.com</div>
          </div>

          <a className="btnGold wide" href="mailto:info@example.com">طلب تواصل</a>
        </div>

        <footer className="footer">© سلالة البن</footer>
      </section>
    </div>
  );
}