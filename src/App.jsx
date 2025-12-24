const Stat = ({ n, t }) => (
  <div className="stat">
    <div className="statN">{n}</div>
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
              بن أخضر <span className="accent">مختار بعناية</span>
            </h1>
            <p>
              توريد موثوق لمحامص ومتاجر القهوة المختصة. جودة ثابتة، خيارات متعددة،
              وتجربة تعامل مهنية من أول تواصل حتى الاستلام.
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

      {/* STRIP (جملة قصيرة بشكل رسمي) */}
      <section className="strip">
        <div className="stripInner">
          <div className="stripTitle">سلاسة في التوريد</div>
          <div className="stripText">
            معايير واضحة • تواصل سريع • حلول مرنة • شراكات توريد طويلة الأمد
          </div>
        </div>
      </section>

      {/* ABOUT (مختصر وواضح) */}
      <section className="section" id="about">
        <h2 className="sectionTitle">نبذة مختصرة</h2>
        <p className="prose">
          سلالة البن علامة متخصصة في توريد البن الأخضر، نركز على ثبات الجودة وتنوع
          الخيارات لتناسب مختلف الأذواق. هدفنا خدمة عملاء القهوة المختصة بعملية توريد
          مريحة وواضحة من البداية للنهاية.
        </p>
      </section>

      {/* STATS (أرقام كبيرة مثل المرجع) */}
      <section className="section stats">
        <Stat n="+250" t="عميل" />
        <Stat n="+350" t="نوع بن" />
        <Stat n="+40" t="شريك" />
        <Stat n="+10" t="سنوات خبرة" />
      </section>

      {/* SERVICES (تصميم جديد: بطاقات نظيفة بدل قائمة طويلة) */}
      <section className="section" id="services">
        <h2 className="sectionTitle">خدماتنا</h2>
        <p className="sectionSub">
          مجموعة خدمات تدعم احتياجات المحامص والمتاجر المختصة.
        </p>

        <div className="features">
          <Feature
            icon="📦"
            title="توريد البن الأخضر"
            text="أصناف متعددة بجودة ثابتة لتلبية احتياجاتك."
          />
          <Feature
            icon="🧪"
            title="دعم التقييم والاختيار"
            text="مساعدة في اختيار الأنسب حسب الذوق والهدف."
          />
          <Feature
            icon="🚚"
            title="حلول لوجستية"
            text="تنسيق الشحن والتسليم وفق خيارات مرنة."
          />
          <Feature
            icon="🤝"
            title="علاقات توريد مستمرة"
            text="استمرارية وتخطيط أفضل للشحنات القادمة."
          />
        </div>
      </section>

      {/* CONTACT (بدون مستثمرين) */}
      <section className="section contact" id="contact">
        <h2 className="sectionTitle">تواصل</h2>
        <p className="prose">
          راسلنا وسنعود لك بأسرع وقت لتحديد احتياجك وتقديم الخيارات المناسبة.
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