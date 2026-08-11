"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { vibeTerms } from "./catalog";
import { interactiveDemoGroups, TermDemo } from "./TermDemos";
import styles from "./VibeHub.module.css";

const API_BASE = "https://vibe-hub.org/api/agent/v1";

type SearchResult = {
  id: string;
  title: string;
  secondaryTitle?: string | null;
  category?: string;
  macroCategory?: string;
  tagline?: string;
  url: string;
};

type FlowStep = {
  id: string;
  label: string;
  owner?: string;
  detail?: string;
  focused?: boolean;
};

type Lesson = SearchResult & {
  description?: string;
  aliases?: string[];
  distinctions?: Array<
    | string
    | {
        title?: string;
        description?: string;
        label?: string;
        explanation?: string;
        target?: { id?: string; title?: string; url?: string };
      }
  >;
  usage?: {
    use?: string[];
    avoid?: string[];
    scenarios?: string[];
  };
  boundary?: string | null;
  agentPrompt?: string | null;
  flowLesson?: {
    title?: string;
    boundary?: string;
    agentPrompt?: string;
    steps?: FlowStep[];
  } | null;
  lessonPractice?: {
    title: string;
    options: Array<{ label: string; feedback: string; correct: boolean }>;
  } | null;
  references?: Array<{ title: string; source?: string; url: string }>;
};

const quickTerms = [
  { id: "frontend", title: "前端", secondaryTitle: "Frontend", note: "用户直接看到和操作的界面层" },
  { id: "api", title: "接口", secondaryTitle: "API", note: "不同程序交换请求与结果的约定" },
  { id: "state", title: "状态", secondaryTitle: "State", note: "页面在某一时刻保存的信息" },
  { id: "tooltip", title: "文字提示", secondaryTitle: "Tooltip", note: "悬停或聚焦时出现的短说明" },
  { id: "responsive-design", title: "响应式设计", secondaryTitle: "Responsive Design", note: "让布局适应不同尺寸的屏幕" },
  { id: "context-window", title: "上下文窗口", secondaryTitle: "Context Window", note: "模型一次能够参考的信息范围" },
  { id: "branch", title: "分支", secondaryTitle: "Branch", note: "与主线隔离的一条代码修改路线" },
  { id: "design-token", title: "设计令牌", secondaryTitle: "Design Token", note: "统一管理颜色、间距和圆角等规则" },
];

const macroFilters = [
  { id: "all", label: "全部", count: 250 },
  { id: "frontend", label: "前端", count: 122 },
  { id: "backend", label: "后端", count: 32 },
  { id: "product", label: "产品", count: 11 },
  { id: "technology", label: "技术栈", count: 25 },
  { id: "ai", label: "AI", count: 24 },
  { id: "git", label: "Git", count: 12 },
  { id: "design", label: "设计风格", count: 24 },
];

function readableItem(
  value:
    | string
    | {
        title?: string;
        description?: string;
        label?: string;
        explanation?: string;
      },
) {
  if (typeof value === "string") return value;
  return [value.title || value.label, value.description || value.explanation]
    .filter(Boolean)
    .join("：");
}

export function VibeHubExplorer() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [activeMacro, setActiveMacro] = useState("all");
  const [activeDemoGroup, setActiveDemoGroup] = useState("button-link");
  const [practiceChoice, setPracticeChoice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [message, setMessage] = useState("输入中文、英文或一句口语描述，每次返回最相关的 5 个术语。");

  async function loadLesson(id: string) {
    setDetailLoading(true);
    setPracticeChoice(null);
    setMessage("");
    try {
      const response = await fetch(`${API_BASE}/lessons/${encodeURIComponent(id)}`);
      if (!response.ok) throw new Error("详情暂时不可用");
      const payload = await response.json();
      setLesson(payload.data as Lesson);
      window.setTimeout(() => {
        document.getElementById("lesson-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    } catch {
      setMessage("暂时无法读取术语详情，请稍后重试或访问原站。 ");
    } finally {
      setDetailLoading(false);
    }
  }

  async function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = query.trim();
    if (!normalized) {
      setResults([]);
      setMessage("请先输入一个术语或一句需求描述。");
      return;
    }

    setLoading(true);
    setLesson(null);
    setMessage("");
    try {
      const params = new URLSearchParams({ q: normalized, limit: "5" });
      const response = await fetch(`${API_BASE}/search?${params.toString()}`);
      if (!response.ok) throw new Error("搜索暂时不可用");
      const payload = await response.json();
      const nextResults = (payload.data?.results || []) as SearchResult[];
      setResults(nextResults);
      setMessage(nextResults.length ? "" : "没有找到明确匹配，试试更短的关键词。 ");
    } catch {
      setResults([]);
      setMessage("VibeHub 接口暂时不可用，请稍后重试。 ");
    } finally {
      setLoading(false);
    }
  }

  const usageGroups = lesson
    ? [
        ["适合使用", lesson.usage?.use],
        ["不适合使用", lesson.usage?.avoid],
        ["常见场景", lesson.usage?.scenarios],
      ].filter(([, items]) => Array.isArray(items) && items.length)
    : [];

  const catalogQuery = query.trim().toLocaleLowerCase();
  const currentDemoGroup =
    interactiveDemoGroups.find((group) => group.id === activeDemoGroup) || interactiveDemoGroups[0];
  const visibleTerms = vibeTerms.filter((term) => {
    const matchesMacro = activeMacro === "all" || term.macro === activeMacro;
    const matchesQuery =
      !catalogQuery ||
      term.title.toLocaleLowerCase().includes(catalogQuery) ||
      term.secondaryTitle.toLocaleLowerCase().includes(catalogQuery);
    return matchesMacro && matchesQuery;
  });

  return (
    <section className={`${styles.section} ${styles.explorer}`} id="explorer">
      <div className={styles.sectionHeading}>
        <div>
          <p className="section-kicker">LIVE EXPLORER / 实时查询</p>
          <h2>从一句模糊描述开始</h2>
        </div>
        <p>搜索与详情由 VibeHub 官方公开接口实时返回，不在本站保存对方整站内容。</p>
      </div>

      <form className={styles.searchForm} onSubmit={search} role="search">
        <label htmlFor="vibe-query">你想做什么，或者这个东西叫什么？</label>
        <div>
          <input
            id="vibe-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例如：按钮旁边浮出一行小字"
            autoComplete="off"
          />
          <button type="submit" disabled={loading}>
            {loading ? "正在查找…" : "查术语"}
          </button>
        </div>
      </form>

      <div className={styles.quickTerms} aria-label="常用术语快捷入口">
        {quickTerms.map((item) => (
          <button type="button" onClick={() => loadLesson(item.id)} key={item.id}>
            <span>{item.secondaryTitle}</span>
            <strong>{item.title}</strong>
            <small>{item.note}</small>
          </button>
        ))}
      </div>

      <div className={styles.demoGallery} id="interactive-demos">
        <div className={styles.demoGalleryHeader}>
          <div>
            <span>PLAYGROUND / 可操作组件图鉴</span>
            <h3>不只解释，直接动手试</h3>
          </div>
          <p>按钮、输入框、弹窗等控件都能现场操作；演示只改变当前页面状态，不会提交或保存真实数据。</p>
        </div>
        <div className={styles.demoGroupTabs} role="tablist" aria-label="交互组件分类">
          {interactiveDemoGroups.map((group) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeDemoGroup === group.id}
              onClick={() => setActiveDemoGroup(group.id)}
              key={group.id}
            >
              {group.label}
              <small>{group.terms.length}</small>
            </button>
          ))}
        </div>
        <div className={styles.demoGalleryGrid} role="tabpanel">
          {currentDemoGroup.terms.map((term) => (
            <article className={styles.demoCard} key={term.id}>
              <div className={styles.demoCardTitle}>
                <span>{term.secondaryTitle}</span>
                <button type="button" onClick={() => loadLesson(term.id)}>
                  {term.title} <i aria-hidden="true">↘</i>
                </button>
              </div>
              <p>{term.prompt}</p>
              <TermDemo termId={term.id} compact />
            </article>
          ))}
        </div>
      </div>

      <div className={styles.catalog} id="catalog">
        <div className={styles.catalogHeader}>
          <div>
            <span>FULL INDEX / 完整目录</span>
            <h3>浏览全部 250 个术语</h3>
          </div>
          <strong>{visibleTerms.length} 个结果</strong>
        </div>
        <div className={styles.macroFilters} aria-label="术语大类筛选">
          {macroFilters.map((filter) => (
            <button
              type="button"
              aria-pressed={activeMacro === filter.id}
              onClick={() => setActiveMacro(filter.id)}
              key={filter.id}
            >
              <span>{filter.label}</span>
              <small>{filter.count}</small>
            </button>
          ))}
        </div>
        <div className={styles.catalogGrid}>
          {visibleTerms.map((term) => (
            <button type="button" onClick={() => loadLesson(term.id)} key={term.id}>
              <span>{term.macroLabel}</span>
              <strong>{term.title}</strong>
              <small>{term.secondaryTitle || "—"}</small>
            </button>
          ))}
        </div>
      </div>

      {message ? <p className={styles.statusMessage}>{message}</p> : null}

      {results.length ? (
        <div className={styles.results} aria-live="polite">
          {results.map((result) => (
            <button type="button" onClick={() => loadLesson(result.id)} key={result.id}>
              <span>{result.macroCategory} / {result.category}</span>
              <h3>
                {result.title}
                {result.secondaryTitle ? <small>{result.secondaryTitle}</small> : null}
              </h3>
              <p>{result.tagline}</p>
              <i aria-hidden="true">→</i>
            </button>
          ))}
        </div>
      ) : null}

      {detailLoading ? <p className={styles.statusMessage}>正在读取术语详情…</p> : null}

      {lesson ? (
        <article className={styles.lesson} id="lesson-detail" aria-labelledby="lesson-title">
          <div className={styles.lessonTopline}>
            <span>{lesson.macroCategory} / {lesson.category}</span>
            <a href={lesson.url} target="_blank" rel="noreferrer">查看原文 ↗</a>
          </div>
          <h2 id="lesson-title">
            {lesson.title}
            {lesson.secondaryTitle ? <small>{lesson.secondaryTitle}</small> : null}
          </h2>
          <p className={styles.lessonLead}>{lesson.tagline}</p>
          {lesson.description ? <p className={styles.lessonDescription}>{lesson.description}</p> : null}

          <TermDemo termId={lesson.id} />

          {lesson.lessonPractice?.options?.length ? (
            <section className={styles.practice} aria-labelledby="practice-title">
              <span>JUDGMENT PRACTICE / 选择题</span>
              <h3 id="practice-title">{lesson.lessonPractice.title}</h3>
              <div>
                {lesson.lessonPractice.options.map((option, index) => {
                  const selected = practiceChoice === index;
                  return (
                    <button
                      type="button"
                      aria-pressed={selected}
                      data-result={selected ? (option.correct ? "correct" : "wrong") : undefined}
                      onClick={() => setPracticeChoice(index)}
                      key={`${lesson.id}-practice-${index}`}
                    >
                      <i>{String.fromCharCode(65 + index)}</i>
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>
              {practiceChoice !== null ? (
                <p className={styles.practiceFeedback} aria-live="polite">
                  <strong>{lesson.lessonPractice.options[practiceChoice].correct ? "回答正确" : "再想一步"}</strong>
                  {lesson.lessonPractice.options[practiceChoice].feedback}
                </p>
              ) : null}
            </section>
          ) : null}

          {lesson.flowLesson?.steps?.length ? (
            <section className={styles.flow}>
              <h3>{lesson.flowLesson.title || "它在流程里的位置"}</h3>
              <ol>
                {lesson.flowLesson.steps.map((step) => (
                  <li className={step.focused ? styles.focusedStep : undefined} key={step.id}>
                    <span>{step.owner || "步骤"}</span>
                    <div>
                      <strong>{step.label}</strong>
                      {step.detail ? <p>{step.detail}</p> : null}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {usageGroups.length ? (
            <section className={styles.usageGrid}>
              {usageGroups.map(([title, items]) => (
                <div key={title as string}>
                  <h3>{title as string}</h3>
                  <ul>
                    {(items as string[]).map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </section>
          ) : null}

          {lesson.distinctions?.length ? (
            <section className={styles.distinctions}>
              <h3>容易混淆的边界</h3>
              <ul>
                {lesson.distinctions.map((item, index) => (
                  <li key={`${lesson.id}-distinction-${index}`}>{readableItem(item)}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {lesson.boundary || lesson.flowLesson?.boundary ? (
            <aside className={styles.boundary}>
              <strong>边界提醒</strong>
              <p>{lesson.boundary || lesson.flowLesson?.boundary}</p>
            </aside>
          ) : null}

          {lesson.agentPrompt || lesson.flowLesson?.agentPrompt ? (
            <section className={styles.agentPrompt}>
              <span>可以直接发给 Agent</span>
              <blockquote>{lesson.agentPrompt || lesson.flowLesson?.agentPrompt}</blockquote>
            </section>
          ) : null}

          {lesson.references?.length ? (
            <section className={styles.references}>
              <h3>延伸阅读</h3>
              <div>
                {lesson.references.map((reference) => (
                  <a href={reference.url} target="_blank" rel="noreferrer" key={reference.url}>
                    {reference.title} {reference.source ? `· ${reference.source}` : ""} ↗
                  </a>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      ) : null}
    </section>
  );
}
