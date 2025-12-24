export default function App() {
  return (
    <>
      <header className="topbar cream">
        <button className="burger" aria-label="القائمة">☰</button>

        <div className="brand">
          <div className="brandText">
            <div className="brandName">سلاسة البن</div>
            <div className="brandTag">بن أخضر فاخر • سلسلة توريد موثوقة</div>
          </div>
          <img className="logo" src="/assets/images/logo.png" alt="سلاسة البن" />
        </div>
      </header>

      <main className="page cream">
        {/* HERO */}
        <section className="hero2">
          <div className="hero2Inner">
            <h1 className="heroTitle">
              اختياراتك <span className="accent">تصنع الفرق</span>
            </h1>
            <p className="heroSub">
              حيث الجودة تلتقي بالشغف، نقدم بنًا أخضر مختارًا بعناية وتجربة توريد موثوقة.
            </p>

            <a className="btnGold" href="#contact">تواصل معنا</a>

            <div className="collage">
              <div className="shot2 s1" style={{ backgroundImage: "url(/assets/images/farm-1.jpg)" }} />
              <div className="shot2 s2" style={{ backgroundImage: "url(/assets/images/farm-2.jpg)" }} />
              <div className="shot2 s3" style={{ backgroundImage: "url(/assets/images/farm-3.jpg)" }} />
              <div className="shot2 s4" style={{ backgroundImage: "url(/assets/images/farm-4.jpg)" }} />
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section">
          <h2 className="sectionTitle">نبذة عنا</h2>
          <p className="prose">
            نوفر بنًا أخضر بمعايير جودة عالية، مع التركيز على تلبية احتياجات السوق
            المحلي والإقليمي وبناء شراكات طويلة الأمد.
          </p>
        </section>

        {/* STATS */}
        <section className="section stats">
          <div className="stat"><strong>+250</strong><span>عميل</span></div>
          <div className="stat"><strong>+350</strong><span>نوع محصول</span></div>
          <div className="stat"><strong>+40</strong><span>شريك</span></div>
          <div className="stat"><strong>+10</strong><span>سنوات خبرة</span></div>
        </section>

        {/* SERVICES */}
        <section className="section">
          <h2 className="sectionTitle">خدماتنا المتكاملة</h2>

          <div className="services">
            <div className="service">
              <div className="icon">👁️</div>
              <div>
                <h3>متابعة مسار الحصص</h3>
                <p>متابعة وفحص الجودة مع عملائنا للوصول لأفضل نتيجة.</p>
              </div>
            </div>

            <div className="service">
              <div className="icon">📦</div>
              <div>
                <h3>وساطة الاستيراد</h3>
                <p>أنواع متعددة من البن الأخضر لتلبية احتياجات السوق.</p>
              </div>
            </div>

            <div className="service">
              <div className="icon">🚚</div>
              <div>
                <h3>الخدمات اللوجستية</h3>
                <p>توصيل محلي وخارجي بسلاسل تبريد للحفاظ على الجودة.</p>
              </div>
            </div>

            <div className="service">
              <div className="icon">💬</div>
              <div>
                <h3>استشارات مهنية</h3>
                <p>دعم مهني في الشراء والتقييم وإدارة السلسلة.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section contact" id="contact">
          <h2 className="sectionTitle">التواصل الاستثماري</h2>
          <p className="prose">
            نرحب بالتواصل مع المستثمرين والجهات المهتمة لمناقشة فرص الشراكة والتوسع.
          </p>
          <a className="btnGold" href="mailto:info@sukalat-albun.com">طلب تواصل</a>
        </section>
      </main>
    </>
  );
}