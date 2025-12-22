import Scene from "./three/Scene";

export default function App() {
  return (
    <>
      <Scene />

      <main style={{ position: "relative", zIndex: 1 }}>
        <section>
          <h1>سلاسة البن</h1>
          <p>بن أخضر يحترم أصله… ويعبّر عن سلالته</p>
        </section>

        <section>
          <h2>القصة تبدأ من الأرض</h2>
          <p>
            نؤمن أن القهوة ليست منتجًا، بل رحلة تبدأ من المزارع وتُصقل
            بالخبرة حتى تصل إلى الفنجان.
          </p>
        </section>

        <section>
          <h2>السلالة والجودة</h2>
          <p>
            نختار بننا من أمريكا اللاتينية وفق معايير دقيقة في الارتفاع
            والمعالجة لضمان هوية نكهة واضحة.
          </p>
        </section>

        <section>
          <h2>للمستثمرين</h2>
          <p>
            سلاسة البن فرصة استثمارية في قطاع القهوة المختصة بنمو مستدام.
          </p>
          <a className="button" href="/assets/investors.pdf" target="_blank">
            تحميل ملف المستثمرين
          </a>
        </section>

        <section>
          <h2>تواصل معنا</h2>
          <p>للاستفسارات والشراكات</p>
        </section>
      </main>
    </>
  );
}