import type { Metadata } from "next";
import { VibeHubExplorer } from "./VibeHubExplorer";
import styles from "./VibeHub.module.css";

export const metadata: Metadata = {
  title: "Vibe Coding 术语图鉴",
  description:
    "面向普通人的 Vibe Coding 术语入口：搜索前端、后端、产品、技术栈、AI、Git 与设计风格术语，并在站内查看通俗解释。",
  alternates: { canonical: "/vibe-hub" },
};

const taxonomy = [
  { id: "frontend", label: "前端", count: 122, note: "界面、组件、布局与交互" },
  { id: "backend", label: "后端", count: 32, note: "接口、数据、权限与上线" },
  { id: "product", label: "产品", count: 11, note: "需求、规划与验证" },
  { id: "technology", label: "技术栈", count: 25, note: "工具、测试、语言与框架" },
  { id: "ai", label: "AI", count: 24, note: "上下文、Agent、输出与成本" },
  { id: "git", label: "Git", count: 12, note: "版本、分支、提交与协作" },
  { id: "design", label: "设计风格", count: 24, note: "视觉语言与界面气质" },
];

const companionEntries = [
  {
    eyebrow: "PRACTICE",
    title: "边做边练",
    copy: "用场景题判断术语边界，避免只记名字却不会在真实项目里使用。",
    href: "https://vibe-hub.org/practice",
  },
  {
    eyebrow: "ANTI AI FLAVOR",
    title: "减少 AI 味",
    copy: "从排版、文案和交互细节入手，让生成页面更像经过真实设计判断。",
    href: "https://vibe-hub.org/anti-ai-flavor",
  },
  {
    eyebrow: "SKILL",
    title: "把术语装进 Agent",
    copy: "让 Agent 主动把模糊描述改写成更准确、可以直接执行的需求。",
    href: "https://vibe-hub.org/vibehub-skill",
  },
];

export default function VibeHubPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className="brand" href="/" aria-label="返回予安的 AI 偏方首页">
          <span className="brand-mark">Y</span>
          <span>予安的 AI 偏方</span>
        </a>
        <nav aria-label="术语图鉴导航">
          <a href="#taxonomy">分类</a>
          <a href="#explorer">搜索</a>
          <a href="#companion">延伸</a>
        </nav>
        <a
          className={styles.sourceLink}
          href="https://vibe-hub.org/"
          target="_blank"
          rel="noreferrer"
        >
          访问源站 <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className={styles.hero} id="top">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p className="section-kicker">NEW SECTION / VIBE CODING</p>
          <h1>
            把“我想要那种感觉”
            <br />
            <em>说成 Agent 听得懂的话。</em>
          </h1>
          <p>
            这是一个面向普通人的 Vibe Coding 术语入口。你不必先学会写代码，
            只需要找到准确的名字，再把需求说明白。
          </p>
          <a className="button button-primary" href="#explorer">
            搜索一个术语 <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className={styles.heroStats} aria-label="术语图鉴规模">
          <div>
            <strong>250</strong>
            <span>个术语</span>
          </div>
          <div>
            <strong>7</strong>
            <span>大分类</span>
          </div>
          <div>
            <strong>LIVE</strong>
            <span>实时读取</span>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.taxonomy}`} id="taxonomy">
        <div className={styles.sectionHeading}>
          <div>
            <p className="section-kicker">TAXONOMY / 分类地图</p>
            <h2>先确定问题在哪一层</h2>
          </div>
          <p>术语不是为了显得专业，而是帮助你缩小问题范围、减少与 Agent 来回猜测。</p>
        </div>
        <div className={styles.taxonomyGrid}>
          {taxonomy.map((item, index) => (
            <a href="#catalog" className={styles.taxonomyCard} key={item.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.label}</h3>
                <p>{item.note}</p>
              </div>
              <strong>{item.count}</strong>
            </a>
          ))}
        </div>
      </section>

      <VibeHubExplorer />

      <section className={`${styles.section} ${styles.companion}`} id="companion">
        <div className={styles.sectionHeading}>
          <div>
            <p className="section-kicker">GO FURTHER / 延伸入口</p>
            <h2>术语之外，还要会判断</h2>
          </div>
          <p>下面三个入口由 VibeHub 原站维护，会在新标签页打开。</p>
        </div>
        <div className={styles.companionGrid}>
          {companionEntries.map((entry) => (
            <a href={entry.href} target="_blank" rel="noreferrer" key={entry.title}>
              <span>{entry.eyebrow}</span>
              <h3>{entry.title}</h3>
              <p>{entry.copy}</p>
              <i aria-hidden="true">↗</i>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.provenance} aria-label="内容来源说明">
        <p>
          本板块是独立的信息入口，不复制 VibeHub 的视觉设计或整站正文。
          术语搜索与详情由其公开 API 实时返回，内容版权归原站；页面保留原文链接。
        </p>
        <a href="https://vibe-hub.org/" target="_blank" rel="noreferrer">
          vibe-hub.org ↗
        </a>
      </section>

      <footer className={styles.footer}>
        <a className="brand footer-brand" href="/">
          <span className="brand-mark">Y</span>
          <span>予安的 AI 偏方</span>
        </a>
        <p>Vibe Coding, explained simply.</p>
        <a href="#top">回到顶部 ↑</a>
      </footer>
    </main>
  );
}
