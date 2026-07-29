import type { Metadata } from "next";
import { notFound } from "next/navigation";

const articles = {
  "prompt-basics": {
    index: "01",
    category: "教程",
    readTime: "5 min",
    title: "不会写提示词？先别背公式",
    description:
      "先说清楚你要什么、给谁用、什么算做好。三个问题，比套万能模板更有用。",
    content: (
      <>
        <section>
          <p>
            提示词不是咒语，也没有一套必须背下来的万能公式。AI
            回答得好不好，通常取决于你有没有把任务讲清楚。
          </p>
          <p>
            下一次打开 AI，不妨先别急着输入一大段要求。花十秒回答下面三个问题。
          </p>
        </section>

        <section>
          <h2>先回答三个问题</h2>
          <ol className="article-steps">
            <li>
              <strong>你要什么？</strong>
              <span>是一个标题、一份计划、一段解释，还是几个可比较的方案？</span>
            </li>
            <li>
              <strong>给谁用？</strong>
              <span>告诉 AI 读者是谁，它才知道该用什么语气和难度。</span>
            </li>
            <li>
              <strong>什么算做好？</strong>
              <span>说明长度、格式、必须包含的内容，以及你不想看到什么。</span>
            </li>
          </ol>
        </section>

        <section>
          <h2>把答案拼成一句话</h2>
          <div className="prompt-box">
            请帮我完成「任务」，内容是给「使用对象」看的。请满足「完成标准」，并避免「不希望出现的内容」。
          </div>
          <p>
            这不是固定模板，只是一副脚手架。熟练以后，你完全可以按任务增减信息。
          </p>
        </section>

        <section>
          <h2>同一个需求，差别在哪里</h2>
          <div className="example-grid">
            <div>
              <span>说得模糊</span>
              <p>帮我写一段活动介绍。</p>
            </div>
            <div>
              <span>说得清楚</span>
              <p>
                帮我写一段 120 字以内的线下读书会介绍，读者是第一次参加的上班族。语气轻松，不要使用夸张口号，最后补一句报名提醒。
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2>发送前，检查这四项</h2>
          <ul className="article-checklist">
            <li>任务有没有具体到一种输出？</li>
            <li>必要的背景有没有交代？</li>
            <li>格式、长度和语气有没有说明？</li>
            <li>有没有告诉 AI 什么不能做？</li>
          </ul>
        </section>
      </>
    ),
  },
  "ai-off-topic": {
    index: "02",
    category: "急诊",
    readTime: "6 min",
    title: "AI 总是答非所问，怎么治",
    description:
      "从补上下文、拆小任务到要求自检，逐步找到模型跑偏的原因。",
    content: (
      <>
        <section>
          <p>
            AI 答非所问，很多时候不是它完全不会，而是任务里缺了关键线索，或者一次塞进去的事情太多。别急着重开对话，先按顺序排查。
          </p>
        </section>

        <section>
          <h2>第一步：确认它理解了什么</h2>
          <p>先让 AI 用一句话复述任务，不要马上让它重新回答。</p>
          <div className="prompt-box">
            先不要执行。请用一句话复述你理解的任务目标，并列出你还缺少哪些信息。
          </div>
          <p>
            如果复述已经偏了，问题通常出在目标不清；如果它列出很多缺失信息，就先把最关键的两三项补齐。
          </p>
        </section>

        <section>
          <h2>第二步：一次只解决一件事</h2>
          <ol className="article-steps">
            <li>
              <strong>先要结构</strong>
              <span>让 AI 先列提纲或步骤，不要直接生成最终答案。</span>
            </li>
            <li>
              <strong>再补内容</strong>
              <span>逐段确认，发现方向不对时可以及时纠正。</span>
            </li>
            <li>
              <strong>最后统一润色</strong>
              <span>内容正确之后，再调整语气、长度和格式。</span>
            </li>
          </ol>
        </section>

        <section>
          <h2>第三步：给它一个自检标准</h2>
          <div className="prompt-box">
            回答前请检查：是否直接回应了我的问题；是否使用了我提供的背景；是否满足格式要求。若有任何一项不满足，请先修正再输出。
          </div>
        </section>

        <section>
          <h2>一条急救提示词</h2>
          <div className="article-callout">
            <strong>当对话已经跑偏时：</strong>
            <p>
              忽略上一条回答。我们的目标是「目标」。请只完成「当前这一步」，使用「必要背景」，并按「输出格式」给出结果。若信息不足，先向我提问。
            </p>
          </div>
        </section>
      </>
    ),
  },
  "five-ai-functions": {
    index: "03",
    category: "清单",
    readTime: "7 min",
    title: "普通人最值得先学的 5 个 AI 功能",
    description:
      "总结资料、整理思路、改写表达、分析表格、生成初稿，从每天都用得上的地方开始。",
    content: (
      <>
        <section>
          <p>
            入门 AI 不需要先学复杂概念。最好的起点，是从每天已经在做、但总觉得费时间的任务里挑一个。
          </p>
        </section>

        <section>
          <h2>五个最容易立刻见效的功能</h2>
          <ol className="article-steps article-function-list">
            <li>
              <strong>总结资料</strong>
              <span>把长文、会议记录或报告压缩成重点、结论和待办事项。</span>
            </li>
            <li>
              <strong>整理思路</strong>
              <span>把零散想法归类，找出重复、矛盾和还没想清楚的地方。</span>
            </li>
            <li>
              <strong>改写表达</strong>
              <span>让一段话更简洁、更礼貌，或改成适合不同读者的版本。</span>
            </li>
            <li>
              <strong>分析表格</strong>
              <span>解释数据变化、发现异常，并把数字翻译成容易理解的结论。</span>
            </li>
            <li>
              <strong>生成初稿</strong>
              <span>先得到邮件、方案或演示文稿的骨架，再由你补判断和细节。</span>
            </li>
          </ol>
        </section>

        <section>
          <h2>不要一次学五个</h2>
          <p>
            选一个你每周都会遇到的任务，连续使用三次。每次记录：哪里省了时间、哪里仍需要人工判断、下次应该补充什么要求。
          </p>
          <div className="article-callout">
            <strong>最小练习</strong>
            <p>
              找一段你今天必须阅读的内容，让 AI 输出：三条重点、一个你容易忽略的风险、两个下一步行动。
            </p>
          </div>
        </section>

        <section>
          <h2>最后记住一条边界</h2>
          <p>
            涉及隐私、合同、医疗、财务或重要决策时，不要直接把 AI
            的回答当成最终结论。它适合帮助你理解和准备，不替你承担判断。
          </p>
        </section>
      </>
    ),
  },
} as const;

type ArticleSlug = keyof typeof articles;

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!(slug in articles)) return {};
  const article = articles[slug as ArticleSlug];

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/notes/${slug}` },
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(slug in articles)) notFound();
  const article = articles[slug as ArticleSlug];

  return (
    <main className="article-page">
      <header className="article-header">
        <a className="brand" href="/" aria-label="返回予安的 AI 偏方首页">
          <span className="brand-mark">Y</span>
          <span>予安的 AI 偏方</span>
        </a>
        <a className="article-back" href="/#notes">
          ← 返回教程
        </a>
      </header>

      <article className="article-shell">
        <div className="article-meta">
          <span>{article.index}</span>
          <span>{article.category}</span>
          <span>{article.readTime}</span>
        </div>
        <h1>{article.title}</h1>
        <p className="article-lead">{article.description}</p>
        <div className="article-content">{article.content}</div>
        <div className="article-footer">
          <p>把问题讲清楚，AI 才能真正帮上忙。</p>
          <a href="/#notes">继续看其他教程 →</a>
        </div>
      </article>
    </main>
  );
}
