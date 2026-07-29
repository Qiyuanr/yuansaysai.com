import { ParticleField } from "./ParticleField";

const notes = [
  {
    index: "01",
    title: "AI 不是答案，是新的提问方式",
    description:
      "当模型能力快速增长，真正稀缺的不是更多输出，而是把模糊问题变清楚的判断力。",
    meta: "思考 / 6 min",
  },
  {
    index: "02",
    title: "一人公司的产品实验",
    description:
      "用小团队的方法做个人项目：更短的反馈回路、更少的依赖，以及真正属于自己的节奏。",
    meta: "实践 / 8 min",
  },
  {
    index: "03",
    title: "保持人的手感",
    description:
      "效率工具越来越聪明之后，品味、好奇心和对细节的感知反而变得更重要。",
    meta: "随笔 / 4 min",
  },
];

const experiments = [
  ["01", "AI 工作流", "把重复劳动交给机器，把注意力留给判断。"],
  ["02", "独立产品", "从一个真实的小问题开始，快速做出可用版本。"],
  ["03", "公开写作", "记录尚未成熟的想法，也记录它们如何变化。"],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Yuan Says AI 首页">
          <span className="brand-mark">Y</span>
          <span>YUAN SAYS AI</span>
        </a>
        <nav aria-label="主导航">
          <a href="#notes">笔记</a>
          <a href="#experiments">实验</a>
          <a href="#about">关于</a>
        </nav>
        <a className="header-cta" href="mailto:hi@yuansaysai.com">
          联系我 <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="top">
        <ParticleField />
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" />
            Exploring intelligence &amp; making
          </p>
          <h1>
            把复杂的未来，
            <br />
            <span>说得简单一点。</span>
          </h1>
          <p className="hero-intro">
            我是 Yuan。这里记录我对 AI、产品与独立创造的观察——
            <br className="desktop-break" />
            不是预测未来，而是亲手做几个版本看看。
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#notes">
              阅读最新笔记 <span aria-hidden="true">↓</span>
            </a>
            <a className="button button-quiet" href="#about">
              认识我
            </a>
          </div>
        </div>

        <div className="interaction-hint" aria-hidden="true">
          <span className="mouse-icon" />
          移动光标，扰动想法
        </div>
        <div className="hero-number" aria-hidden="true">
          Y / 01
        </div>
      </section>

      <section className="manifesto" aria-label="宣言">
        <p>
          Technology moves fast.
          <br />
          <em>Clarity</em> moves us forward.
        </p>
        <span>技术不断向前，清晰让我们真正前进。</span>
      </section>

      <section className="notes section-shell" id="notes">
        <div className="section-heading">
          <p className="section-kicker">FIELD NOTES / 思考现场</p>
          <h2>最近在想</h2>
          <p>一些仍在生长中的答案。</p>
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
          <p className="section-kicker">CURRENTLY / 正在发生</p>
          <h2>
            先做起来，
            <br />
            再慢慢想明白。
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
            好奇心是我的
            <br />
            <span>长期主义。</span>
          </h2>
          <div className="about-copy">
            <p>
              我关注人如何与新技术一起工作，也喜欢把抽象的想法变成能被触摸、使用和讨论的东西。
            </p>
            <p>
              这个网站是一间开放的数字工作室：放笔记、放实验，也放那些还没有名字的念头。
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
          <span>YUAN SAYS AI</span>
        </a>
        <p>Ideas, tools, and a little bit of wonder.</p>
        <div>
          <span>© {new Date().getFullYear()} Yuan</span>
          <a href="#top">回到顶部 ↑</a>
        </div>
      </footer>
    </main>
  );
}
