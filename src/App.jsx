const Stat = ({ num, label, text }) => (
  <div className="statRow">
    <div className="statNum">{num}</div>
    <div className="statMeta">
      <div className="statLabel">{label}</div>
      <div className="statText">{text}</div>
    </div>
  </div>
);

const Service = ({ icon, title, text }) => (
  <div className="serviceRow">
    <div className="serviceIcon" aria-hidden="true">{icon}</div>
    <div className="serviceBody">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  </div>
);

const RegionCard = ({ title, img }) => (
  <div className="regionCard">
    <div
      className="regionMap"
      style={{ backgroundImage: `url(${img})` }}
      role="img"
      aria-label={title}
    />
    <div className="regionTitle">{title}</div>
  </div>
);

export default function App() {
  return (
    <div className="app" dir="rtl">
      {/* Header */}
      <header className="topbar">
        <button className="burger" aria-label="القائمة">☰</button>

        <div className="brand">
          <div className="brandText">
            <div className="brandAr">سلاسة البن</div>
            <div className="brandEn">Salsat Al-Bun</div>
          </div>
          <img className="logo" src="/assets/images/logo.png" alt="سلاسة البن" />
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="heroInner">
          <h1 className="heroTitle">
            اختياراتك <span className="accent">يصنع الفرق</span>!
          </h1>
          <p className="heroSubtitle">
            حيث الجودة تلتقي بالشغف، نقدم بنًا أخضر مختارًا بعناية وتجربة توريد موثوقة لا تُنسى.
          </p>

          <a className="btnGold" href="#contact">تواصل معنا</a>

          <div className="collage">
            <div className="tile t1" style={{ backgroundImage: "url(/assets/images/farm-1.jpg)" }} />
            <div className="tile t2" style={{ backgroundImage: "url(/assets/images/farm-2.jpg)" }} />
            <div className="tile t3" style={{ backgroundImage: "url(/assets/images/farm-3.jpg)" }} />
            <div className="tile t4" style={{ backgroundImage: "url(/assets/images/farm-4.jpg)" }} />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section">
        <h2 className="sectionTitle">نبذة عنا</h2>
        <div className="prose">
          سلاسة البن علامة متخصصة في توريد البن الأخضر بجودة عالية، مع التركيز على تلبية احتياجات
          السوق المحلي والإقليمي. نعمل بمعايير واضحة، وشراكات طويلة الأمد مع الموردين لضمان ثبات الجودة
          وقابلية التوسع.
        </div>
      </section>

      {/* Stats (مثل اللي بالصورة: أرقام كبيرة ومساحات) */}
      <section className="section stats">
        <Stat num="+250" label="عميل" text="نفخر بكوننا شركاء نجاح لأكثر من 200 عميل محلي وإقليمي." />
        <Stat num="+350" label="نوعًا من المحاصيل المميزة" text="نقدم خيارات واسعة لتلبية مختلف الأذواق." />
        <Stat num="+40" label="شريك حول العالم" text="شراكات ممتدة مع مزارعين وموردين في مناطق متعددة." />
        <Stat num="+10" label="سنوات" text="خبرة عملية في مجال البن الأخضر والاستشارات المهنية." />
      </section>

      {/* Regions (كروت خرائط مثل الصورة) */}
      <section className="section">
        <h2 className="sectionTitle">تنوع النكهات حول العالم</h2>
        <p className="sectionSub">استكشف محاصيلنا المميزة حسب المناطق.</p>

        <div className="regions">
          <RegionCard title="أفريقيا" img="/assets/images/map-africa.png" />
          <RegionCard title="أمريكا الوسطى" img="/assets/images/map-central-america.png" />
          <RegionCard title="أمريكا الجنوبية" img="/assets/images/map-south-america.png" />
        </div>
      </section>

      {/* Services (أيقونات داخل دوائر + نص تحتها/جنبها) */}
      <section className="section">
        <h2 className="sectionTitle">خدماتنا المتكاملة</h2>
        <p className="sectionSub">مجموعة خدمات شاملة تلبي احتياجات محامص ومتاجر القهوة.</p>

        <div className="services">
          <Service
            icon="👁"
            title="متابعة مسار الحصص"
            text="متابعة وفحص الجودة مع العملاء لضمان أفضل نتيجة ضمن معايير واضحة."
          />
          <Service
            icon="👥"
            title="المرونة العالية في التعامل"
            text="فريق خدمة عملاء محترف لتجربة مميزة لكل عميل وتلبية الحلول المناسبة."
          />
          <Service
            icon="📦"
            title="وساطة الاستيراد"
            text="توفير أنواع متعددة من البن الأخضر مع التركيز على الجودة والأصناف المميزة."
          />
          <Service
            icon="🚚"
            title="الخدمات اللوجستية"
            text="توصيل محلي وخارجي عبر شركاء شحن، مع حلول مناسبة للحفاظ على جودة البن."
          />
          <Service
            icon="💬"
            title="استشارات مهنية"
            text="دعم مهني في بناء خطة مشتريات، وتقييم الخيارات، وتحسين سلسلة الإمداد."
          />
        </div>
      </section>

      {/* Contact */}
      <section className="section contact" id="contact">
        <h2 className="sectionTitle">التواصل</h2>
        <div className="prose">
          نرحب بالتواصل مع العملاء والجهات المهتمة لمناقشة فرص التوريد أو الشراكة.
        </div>

        <div className="contactBox">
          <div className="contactItem">
            <div className="contactLabel">واتساب</div>
            <div className="contactValue">+966XXXXXXXXX</div>
          </div>
          <div className="contactItem">
            <div className="contactLabel">البريد</div>
            <div className="contactValue">info@example.com</div>
          </div>
          <a className="btnGold wide" href="mailto:info@example.com">طلب تواصل</a>
        </div>

        <footer className="footer">
          © سلاسة البن
        </footer>
      </section>
    </div>
  );
}