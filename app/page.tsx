import { ParticleField } from "./ParticleField";

const notes = [
  {
    index: "01",
    title: "不会写提示词？先别背公式",
    description:
      "先说清楚你要什么、给谁用、什么算做好。三个问题，比套万能模板更有用。",
    meta: "教程 / 5 min",
  },
  {
    index: "02",
    title: "AI 总是答非所问，怎么治",
    description:
      "从补上下文、拆小任务到要求自检，逐步找到模型跑偏的原因。",
    meta: "急诊 / 6 min",
  },
  {
    index: "03",
    title: "普通人最值得先学的 5 个 AI 功能",
    description:
      "总结资料、整理思路、改写表达、分析表格、生成初稿，从每天都用得上的地方开始。",
    meta: "清单 / 7 min",
  },
];

const experiments = [
  [
    "01",
    "读懂复杂内容",
    "上传一篇长文或一份报告，让 AI 先讲重点，再解释你没看懂的部分。",
  ],
  [
    "02",
    "把想法变清楚",
    "把零散念头交给 AI 整理成大纲、计划或一段能直接使用的表达。",
  ],
  [
    "03",
    "解决具体问题",
    "遇到报错、不会设置或工具选不对时，用排查步骤一步步找到原因。",
  ],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="予安的 AI 偏方首页">
          <span className="brand-mark">Y</span>
          <span>予安的 AI 偏方</span>
        </a>
        <nav aria-label="主导航">
          <a href="#notes">教程</a>
          <a href="#experiments">功能</a>
          <a href="#about">关于</a>
        </nav>
        <a className="header-cta" href="mailto:hi@yuansaysai.com">
          有问题？ <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="top">
        <ParticleField />
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" />
            AI remedies for everyday people
          </p>
          <h1>
            让普通人，
            <br />
            <span>也能用懂 AI。</span>
          </h1>
          <p className="hero-intro">
            这里是予安的 AI 偏方：分享真正好用的 AI 功能、看得懂的使用教程，
            <br className="desktop-break" />
            也专治提示词失灵、工具不会选、结果不靠谱等疑难杂症。
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#notes">
              从教程开始 <span aria-hidden="true">↓</span>
            </a>
            <a className="button button-quiet" href="#experiments">
              查看 AI 工具箱
            </a>
          </div>
        </div>

        <div className="interaction-hint" aria-hidden="true">
          <span className="mouse-icon" />
          移动光标，吸附灵感；点击，打散重来
        </div>
        <div className="hero-number" aria-hidden="true">
          AI / 01
        </div>
      </section>

      <section className="manifesto" aria-label="宣言">
        <p>
          AI should feel useful.
          <br />
          <em>Not intimidating.</em>
        </p>
        <span>AI 不该让人焦虑，它应该帮普通人解决问题。</span>
      </section>

      <section className="notes section-shell" id="notes">
        <div className="section-heading">
          <p className="section-kicker">AI CLINIC / 疑难杂症</p>
          <h2>先把问题治好</h2>
          <p>从真实卡点出发的教程与解法。</p>
        </div>
        <div className="notes-list">
          {notes.map((note) => (
            <article className="note-card" key={note.index}>
              <span className="note-index">{note.index}</span>
              <div>
                <h3>{note.title}</h3>
                <p>{note.description}</p>
              </div>
              <div className="note-meta">
                <span>{note.meta}</span>
                <span className="round-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="experiments section-shell" id="experiments">
        <div className="section-heading experiment-heading">
          <p className="section-kicker">TOOLBOX / 好用功能</p>
          <h2>
            不追热点，
            <br />
            只分享真正有用的 AI。
          </h2>
        </div>
        <div className="experiment-grid">
          {experiments.map(([index, title, copy]) => (
            <article className="experiment-card" key={index}>
              <span>{index}</span>
              <div className="experiment-orbit" aria-hidden="true">
                <i />
              </div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about section-shell" id="about">
        <p className="section-kicker">ABOUT / 关于</p>
        <div className="about-grid">
          <h2>
            不卖焦虑，
            <br />
            <span>只讲人话。</span>
          </h2>
          <div className="about-copy">
            <p>
              我是予安。我会把自己真正用过、验证过的 AI
              方法，拆成普通人看得懂、跟着能做的步骤。
            </p>
            <p>
              这里不堆术语，也不追每一个新模型。只分享好用功能、AI
              使用教程，以及使用过程中那些常见却没人讲清楚的疑难杂症。
            </p>
            <a href="mailto:hi@yuansaysai.com">
              hi@yuansaysai.com <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark">Y</span>
          <span>予安的 AI 偏方</span>
        </a>
        <p>Useful AI, explained simply.</p>
        <div>
          <span>© {new Date().getFullYear()} 予安</span>
          <a href="#top">回到顶部 ↑</a>
        </div>
      </footer>
    </main>
  );
}
