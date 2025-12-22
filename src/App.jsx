import Scene from "./three/Scene";

export default function App() {
  return (
    <>
      <Scene />
      <main>
        <section>
          <div className="wrap">
            <div className="badge">بن أخضر • أمريكا اللاتينية</div>
            <h1>سلاسة البن</h1>
            <p>
              بن أخضر يحترم أصله… ويعبّر عن سلالته. توريد موثوق للمحمصات
              والكافيهات بمعايير ثابتة وهوية نكهة واضحة.
            </p>
            <a className="button" href="#contact">تواصل معنا</a>
            <div className="small" style={{ marginTop: "1rem" }}>
              اسحب للأسفل لاستكشاف الرحلة
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="badge">القصة</div>
            <h2>القصة تبدأ من الأرض</h2>
            <p>
              نؤمن أن القهوة ليست منتجًا نهائيًا، بل رحلة تبدأ من المزرعة،
              تمر بالمزارع والمعالجة والتقييم، حتى تصل إلى المختصين الذين
              يمنحونها شكلها الأخير.
            </p>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="badge">السلالة والجودة</div>
            <h2>هوية نكهة لا تُساوم</h2>
            <p>
              نختار محاصيلنا وفق الارتفاع والتربة والظروف المناخية وطرق
              المعالجة، مع تقييمات صارمة لضمان ثبات المستوى وتوافقه مع
              القهوة المختصة.
            </p>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="badge">الخدمات</div>
            <h2>منتجات وخيارات</h2>
            <p>
              بن أخضر عالي الجودة + خدمة تحميص عند الطلب بروفايلات مصممة
              للإسبريسو والقهوة المفلترة والاستخدام التجاري عالي الجودة.
            </p>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="badge">للمستثمرين</div>
            <h2>فرصة نمو في سوق متنامٍ</h2>
            <p>
              نموذج عمل مرن قابل للتوسع، يستند إلى طلب متزايد على القهوة
              المختصة وسلسلة توريد موثوقة.
            </p>
            <a className="button" href="/assets/investors.pdf" target="_blank" rel="noreferrer">
              تحميل ملف المستثمرين
            </a>
          </div>
        </section>

        <section id="contact">
          <div className="wrap">
            <div className="badge">تواصل</div>
            <h2>تواصل معنا</h2>
            <p>للشراكات وطلبات التوريد والاستفسارات.</p>
            <p className="small" style={{ marginTop: "1.2rem" }}>
              البريد: example@email.com<br />
              واتساب: 05xxxxxxxx<br />
            </p>
          </div>
        </section>
      </main>
    </>
  );
}