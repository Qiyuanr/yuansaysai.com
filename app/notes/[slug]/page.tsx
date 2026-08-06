import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

type MediaItem = {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt?: string;
};

type Article = {
  index: string;
  category: string;
  readTime: string;
  title: string;
  description: string;
  content: ReactNode;
  source?: string;
};

const image = (src: string, alt = "文章配图"): MediaItem => ({
  type: "image",
  src,
  alt,
});

const video = (src: string, poster?: string): MediaItem => ({
  type: "video",
  src,
  poster,
});

const obsidianMedia: MediaItem[] = [
  image("https://pbs.twimg.com/media/HO9KoEHaEAA8dYh?format=jpg&name=900x900", "Obsidian 与 AI 工作流封面"),
  image("https://pbs.twimg.com/media/HO9KgdHbsAAFQYw?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO9JxeGbUAEuBRe?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO9J0N8acAAYSxa?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO9J2nwaYAAc2Rq?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO9J4uPbsAEjpxh?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO9J60nbUAALq1d?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO9J8PtaYAArosF?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO9J-XNbMAAqbYo?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO9J_f8bsAATtPL?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO9KBjNbsAAOFsW?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO9KC2yaAAAuMH2?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO9KE00boAEyLFu?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO9KF9iaUAAUTF7?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO9KGzraAAAcjCk?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO9KIDFa4AAS2tK?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO9KGO_a4AA9V5v?format=jpg&name=900x900"),
  video("https://video.twimg.com/tweet_video/HO9JvqebgAAYCSy.mp4", "https://pbs.twimg.com/tweet_video_thumb/HO9JvqebgAAYCSy.jpg"),
];

const ipIllustrationMedia: MediaItem[] = [
  image("https://pbs.twimg.com/media/HO8fIICaUAEnMOx?format=jpg&name=900x900", "个人 IP 插图工作流配图"),
  image("https://pbs.twimg.com/media/HO8fJbkaAAAZ6AS?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO8fKZ6bUAA8cRz?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO8fLeSbcAEoAi0?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO8fMoKbIAA75hz?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO8fNzracAA6MCl?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO8fPMLbUAAb5WH?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO8fNJ0bcAACxSK?format=jpg&name=medium"),
];

const vibeCodingMedia: MediaItem[] = [
  image("https://pbs.twimg.com/media/HO5XU4RaYAACNGA?format=jpg&name=900x900", "Vibe Coding 视觉词典配图"),
  image("https://pbs.twimg.com/media/HO5am5Va0AAADu7?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO5nXVWakAAqk4J?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO5n8nVbwAAuyWs?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO5nwebbcAAhjck?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO5oMbRbgAA66-N?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO5oUOyaYAAuGkB?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO5oYGdbMAAJkx0?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO5oeGabwAAPNt5?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO5olRCbQAAIhDv?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO5ormKbAAAL2Ev?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO5oziMacAASTHD?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO5pyBLa8AAFWiu?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO5p50Wa4AAQDFk?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO5p_G_bQAA3H4t?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO5qD9UawAATHmX?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO5qIqKa0AArIgE?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO5qOA1aQAApN49?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO5qTMRawAAYDVF?format=jpg&name=900x900"),
];

const fdeMedia: MediaItem[] = [
  image("https://pbs.twimg.com/media/HO7gcJpbUAAUKaG?format=jpg&name=900x900", "FDE 与企业 AI 落地配图"),
  image("https://pbs.twimg.com/media/HO7j2RdaUAA1pRT?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO7kWXUaQAAyTZ9?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO7kwkVaUAAUhmV?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO7k8p_a4AAQUXI?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO7lHoNa0AIG0Bh?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO7lbhDbwAETV1q?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HO7lhKmakAE-nR3?format=jpg&name=900x900"),
];

const boomMonitorMedia: MediaItem[] = [
  image("https://pbs.twimg.com/media/HO2Z2bqbcAAR5oa?format=jpg&name=900x900", "内容监控系统配图"),
  image("https://pbs.twimg.com/media/HOy3Tfaa0AAg6lW?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HOy4MyTbgAA2NwR?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HOy4hS9aUAE9GEk?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HOy_T9AbYAEH8e2?format=jpg&name=900x900"),
];

const githubMedia: MediaItem[] = [
  image("https://pbs.twimg.com/media/HMehUv_bcAABF6b?format=jpg&name=900x900", "GitHub 入门教程配图"),
  image("https://pbs.twimg.com/media/HMd4_SFbUAAOael?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HMd8A9PbQAAIPbG?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HMd84C4bEAAKQ69?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HMd9wlda0AAt93u?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HMd5Cc4bEAEr9ox?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HMeVwLiaYAA3mGI?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HMd5DKsasAAhEby?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HMeYBKubcAI0ItW?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HMd5EX6bAAA0XMX?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HMeblxHa0AAUyrK?format=jpg&name=900x900"),
  image("https://pbs.twimg.com/media/HMd5C85aQAAou8I?format=jpg&name=900x900"),
];

const articles: Record<string, Article> = {
  "prompt-basics": {
    index: "01",
    category: "教程",
    readTime: "5 min",
    title: "不会写提示词？先别背公式",
    description: "先说清楚你要什么、给谁用、什么算做好。三个问题，比套万能模板更有用。",
    content: (
      <>
        <section>
          <p>提示词不是咒语，也没有一套必须背下来的万能公式。AI 回答得好不好，通常取决于你有没有把任务讲清楚。</p>
          <p>下一次打开 AI，不妨先别急着输入一大段要求。花十秒回答下面三个问题。</p>
        </section>
        <section>
          <h2>先回答三个问题</h2>
          <ol className="article-steps">
            <li><strong>你要什么？</strong><span>是一个标题、一份计划、一段解释，还是几个可比较的方案？</span></li>
            <li><strong>给谁用？</strong><span>告诉 AI 读者是谁，它才知道该用什么语气和难度。</span></li>
            <li><strong>什么算做好？</strong><span>说明长度、格式、必须包含的内容，以及你不想看到什么。</span></li>
          </ol>
        </section>
        <section>
          <h2>把答案拼成一句话</h2>
          <div className="prompt-box">请帮我完成「任务」，内容是给「使用对象」看的。请满足「完成标准」，并避免「不希望出现的内容」。</div>
          <p>这不是固定模板，只是一副脚手架。熟练以后，你完全可以按任务增减信息。</p>
        </section>
        <section>
          <h2>同一个需求，差别在哪里</h2>
          <div className="example-grid">
            <div><span>说得模糊</span><p>帮我写一段活动介绍。</p></div>
            <div><span>说得清楚</span><p>帮我写一段 120 字以内的线下读书会介绍，读者是第一次参加的上班族。语气轻松，不要使用夸张口号，最后补一句报名提醒。</p></div>
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
    description: "从补上下文、拆小任务到要求自检，逐步找到模型跑偏的原因。",
    content: (
      <>
        <section><p>AI 答非所问，很多时候不是它完全不会，而是任务里缺了关键线索，或者一次塞进去的事情太多。别急着重开对话，先按顺序排查。</p></section>
        <section>
          <h2>第一步：确认它理解了什么</h2>
          <p>先让 AI 用一句话复述任务，不要马上让它重新回答。</p>
          <div className="prompt-box">先不要执行。请用一句话复述你理解的任务目标，并列出你还缺少哪些信息。</div>
          <p>如果复述已经偏了，问题通常出在目标不清；如果它列出很多缺失信息，就先把最关键的两三项补齐。</p>
        </section>
        <section>
          <h2>第二步：一次只解决一件事</h2>
          <ol className="article-steps">
            <li><strong>先要结构</strong><span>让 AI 先列提纲或步骤，不要直接生成最终答案。</span></li>
            <li><strong>再补内容</strong><span>逐段确认，发现方向不对时可以及时纠正。</span></li>
            <li><strong>最后统一润色</strong><span>内容正确之后，再调整语气、长度和格式。</span></li>
          </ol>
        </section>
        <section>
          <h2>第三步：给它一个自检标准</h2>
          <div className="prompt-box">回答前请检查：是否直接回应了我的问题；是否使用了我提供的背景；是否满足格式要求。若有任何一项不满足，请先修正再输出。</div>
        </section>
        <section>
          <h2>一条急救提示词</h2>
          <div className="article-callout"><strong>当对话已经跑偏时：</strong><p>忽略上一条回答。我们的目标是「目标」。请只完成「当前这一步」，使用「必要背景」，并按「输出格式」给出结果。若信息不足，先向我提问。</p></div>
        </section>
      </>
    ),
  },
  "five-ai-functions": {
    index: "03",
    category: "清单",
    readTime: "7 min",
    title: "普通人最值得先学的 5 个 AI 功能",
    description: "总结资料、整理思路、改写表达、分析表格、生成初稿，从每天都用得上的地方开始。",
    content: (
      <>
        <section><p>入门 AI 不需要先学复杂概念。最好的起点，是从每天已经在做、但总觉得费时间的任务里挑一个。</p></section>
        <section>
          <h2>五个最容易立刻见效的功能</h2>
          <ol className="article-steps article-function-list">
            <li><strong>总结资料</strong><span>把长文、会议记录或报告压缩成重点、结论和待办事项。</span></li>
            <li><strong>整理思路</strong><span>把零散想法归类，找出重复、矛盾和还没想清楚的地方。</span></li>
            <li><strong>改写表达</strong><span>让一段话更简洁、更礼貌，或改成适合不同读者的版本。</span></li>
            <li><strong>分析表格</strong><span>解释数据变化、发现异常，并把数字翻译成容易理解的结论。</span></li>
            <li><strong>生成初稿</strong><span>先得到邮件、方案或演示文稿的骨架，再由你补判断和细节。</span></li>
          </ol>
        </section>
        <section>
          <h2>不要一次学五个</h2>
          <p>选一个你每周都会遇到的任务，连续使用三次。每次记录：哪里省了时间、哪里仍需要人工判断、下次应该补充什么要求。</p>
          <div className="article-callout"><strong>最小练习</strong><p>找一段你今天必须阅读的内容，让 AI 输出：三条重点、一个你容易忽略的风险、两个下一步行动。</p></div>
        </section>
        <section>
          <h2>最后记住一条边界</h2>
          <p>涉及隐私、合同、医疗、财务或重要决策时，不要直接把 AI 的回答当成最终结论。它适合帮助你理解和准备，不替你承担判断。</p>
        </section>
      </>
    ),
  },
  "obsidian-ai-workflow": {
    index: "04",
    category: "工作流",
    readTime: "10 min",
    title: "Obsidian + AI：把本地笔记库变成可调用的知识库",
    description: "从本地 Markdown 笔记、基础插件到 AI 接入和跨设备同步，搭一套可持续维护的知识库。",
    source: "https://x.com/xilo2991/status/2084967640498614588",
    content: (
      <>
        <section>
          <p>Obsidian 的核心是一个本地文件夹：笔记保存为 Markdown 文件，图片、PDF、音频等附件以普通文件保存。只要授权，支持文件访问的 AI 工具就能直接读取、整理和修改这些内容。</p>
          <p>这让知识库可以成为 AI 的长期上下文，而不是每次对话都重新解释背景。</p>
        </section>
        <ArticleMedia items={obsidianMedia.slice(0, 2)} inline startIndex={0} />
        <section>
          <h2>一、安装与创建知识库</h2>
          <p>从<a href="https://obsidian.md/download.html" target="_blank" rel="noreferrer">官方页面下载 Obsidian</a>。第一次打开时创建一个 Vault。Vault 本质上就是电脑上的一个文件夹，笔记和附件都会保存在里面。</p>
          <ul className="article-checklist">
            <li>选择一个容易备份的位置。</li>
            <li>为知识库使用独立文件夹。</li>
            <li>先记住 Cmd+P 或 Ctrl+P 命令面板。</li>
            <li>同步方案等实际使用后再决定。</li>
          </ul>
        </section>
        <ArticleMedia items={obsidianMedia.slice(2, 4)} inline startIndex={2} />
        <section>
          <h2>二、先掌握这几种 Markdown</h2>
          <pre><code>{"# 一级标题\n## 二级标题\n\n- 无序列表\n1. 有序列表\n\n**粗体**\n*斜体*\n\n[[另一篇笔记]]"}</code></pre>
          <p>刚开始不需要学习完整语法。标题、列表、强调文字和双向链接，已经足够建立基本知识库。</p>
        </section>
        <ArticleMedia items={obsidianMedia.slice(4, 6)} inline startIndex={4} />
        <section>
          <h2>三、插件按需求安装</h2>
          <ol className="article-steps">
            <li><strong>Web Clipper</strong><span>从浏览器保存网页和资料，具体媒体能力以当前版本为准。</span></li>
            <li><strong>Calendar</strong><span>管理日记、复盘和按日期整理的笔记。</span></li>
            <li><strong>Editing Toolbar</strong><span>用工具栏快速插入 Markdown 格式。</span></li>
            <li><strong>Omnisearch</strong><span>搜索笔记正文，而不仅是文件名。</span></li>
            <li><strong>QuickAdd</strong><span>快速记录灵感，并自动写入指定文件。</span></li>
          </ol>
          <p>社区插件会运行第三方代码，安装前应检查维护状态、权限和代码来源。可参考<a href="https://obsidian.md/help/community-plugins" target="_blank" rel="noreferrer">官方插件说明</a>。</p>
        </section>
        <ArticleMedia items={obsidianMedia.slice(6, 10)} inline startIndex={6} />
        <section>
          <h2>四、把 Obsidian 接入 AI</h2>
          <p>最简单的方式，是让 Codex、Claude Code 等工具打开 Vault 文件夹。AI 可以读取已有笔记、整理重复内容、生成初稿，并把结果写回 Markdown 文件。</p>
          <div className="article-callout"><strong>推荐工作流</strong><p>素材收集 → 知识库归档 → AI 检索 → 生成初稿 → 人工审核 → 回写笔记</p></div>
          <p>第一次使用时先只开放读取权限，确认 AI 能正确理解文件结构后，再允许它修改内容。</p>
        </section>
        <ArticleMedia items={obsidianMedia.slice(10, 14)} inline startIndex={10} />
        <section>
          <h2>五、选择同步方式</h2>
          <ul className="article-checklist">
            <li>Obsidian Sync：官方同步服务，支持跨设备同步和端到端加密。</li>
            <li>iCloud：适合 Apple 设备之间同步。</li>
            <li>OneDrive、Dropbox、坚果云：把 Vault 放入同步目录。</li>
            <li>Git + GitHub：适合需要查看完整修改历史的人。</li>
            <li>Syncthing：适合希望自行管理同步服务的人。</li>
          </ul>
          <p>同步前要注意同时编辑冲突、附件同步范围，以及移动端能否访问同步后的本地文件夹。官方价格和套餐可能变化，使用前查看<a href="https://obsidian.md/pricing.html" target="_blank" rel="noreferrer">官方价格页面</a>。</p>
        </section>
        <ArticleMedia items={obsidianMedia.slice(14, 18)} inline startIndex={14} />
        <section>
          <h2>六、最小上手路径</h2>
          <ol className="article-steps">
            <li><strong>建立 Vault</strong><span>先用本地文件夹保存笔记和附件。</span></li>
            <li><strong>练习 Markdown</strong><span>掌握标题、列表、强调和双向链接。</span></li>
            <li><strong>安装少量插件</strong><span>从收集资料和全文搜索开始。</span></li>
            <li><strong>让 AI 先读后写</strong><span>先测试读取一个小型知识库，再扩大权限。</span></li>
            <li><strong>最后再同步</strong><span>根据设备和备份需求选择方案。</span></li>
          </ol>
        </section>
      </>
    ),
  },
  "ip-illustration-skills": {
    index: "05",
    category: "视觉工作流",
    readTime: "8 min",
    title: "个人 IP 插图工作流：先固定人物，再建立画风",
    description: "用两层参考资料让 AI 保持人物一致，并让配图真正服务于文章观点。",
    source: "https://x.com/jinchenma_ai/status/2084920438799630581",
    content: (
      <>
        <section><p>一套可复用的个人 IP 插图工作流，可以拆成两个独立部分：人物设定和文章插图。前者解决“画的是谁”，后者解决“画面表达什么”。</p><p>把两部分分开，文章主题变化时只调整场景和动作，人物的核心特征与整体视觉仍能保持稳定。</p></section>
        <ArticleMedia items={ipIllustrationMedia.slice(0, 2)} inline startIndex={0} />
        <section>
          <h2>一、先建立人物参考</h2>
          <p>选择一张人物清晰、轮廓明确的照片，要求 AI 生成正面、侧面和背面三视图，并记录需要长期保留的特征。</p>
          <ul className="article-checklist">
            <li>发型、脸部特征和整体比例。</li>
            <li>服装、鞋子、眼镜或其他配件。</li>
            <li>最容易被识别的颜色和气质。</li>
            <li>人物设定的参考图与文字说明。</li>
          </ul>
          <p>三视图可以补足单张照片没有展示的角度。以后人物转身、行走或背对读者时，AI 有统一参考，不需要每次重新猜测人物外观。</p>
        </section>
        <ArticleMedia items={ipIllustrationMedia.slice(2, 4)} inline startIndex={2} />
        <section>
          <h2>二、把个人审美写成画风规则</h2>
          <p>收集几张喜欢的参考图，让 AI 分析它们在构图、色彩、线条、留白和氛围上的共同点。真正需要提炼的是可重复的规则，而不是照搬某一张图。</p>
          <p>可以先确定画面比例、背景明暗、颜色数量、人物比例、元素密度和抽象程度。规则越具体，后续生成越容易保持一致。</p>
        </section>
        <ArticleMedia items={ipIllustrationMedia.slice(4, 6)} inline startIndex={4} />
        <section>
          <h2>三、让人物参与观点表达</h2>
          <p>先让 AI 读完整篇文章，再决定哪些观点值得变成图片。每张图只表达一个主要意思，人物动作、物件和构图都围绕这个意思安排。</p>
          <ol className="article-steps">
            <li><strong>核心观点</strong><span>优先选择核心结论、转折和抽象概念。</span></li>
            <li><strong>人物动作</strong><span>让人物观察、触发、承受或改变画面中的关系。</span></li>
            <li><strong>控制数量</strong><span>相邻段落表达同一件事时，可以合并为一张图。</span></li>
          </ol>
        </section>
        <section>
          <h2>四、用迭代建立可复用模板</h2>
          <p>画风不必一次确定。把规则用于真实文章后，记录哪些留白、动作、颜色和构图有效；画面过于复杂就减少物件，表达不清就重新调整人物动作和视觉关系。</p>
          <p>每轮把有效做法写回风格说明，几轮之后，个人审美就会变成可以重复调用的视觉语言。</p>
        </section>
        <ArticleMedia items={ipIllustrationMedia.slice(6, 7)} inline startIndex={6} />
        <section>
          <h2>五、相关 Skill 资源</h2>
          <p>原文提供了一个包含两个 Skill 的仓库：<a href="https://github.com/jinchenma94/jinchenma-ip-skills" target="_blank" rel="noreferrer">jinchenma-ip-skills</a>。其中一个用于建立人物三视图和设定，另一个用于读取文章并生成插图。</p>
          <p>安装前仍应查看仓库 README、许可证、依赖和当前维护状态；不要把照片或私人资料交给未经确认的工具。</p>
        </section>
        <ArticleMedia items={ipIllustrationMedia.slice(7, 8)} inline startIndex={7} />
      </>
    ),
  },
  "vibe-coding-visual-dictionary": {
    index: "07",
    category: "网页设计",
    readTime: "12 min",
    title: "Vibe Coding 视觉词典：滚动、反馈、风格与高级效果",
    description: "把模糊的“高级感”拆成可描述的网页行为、视觉语言和可复制提示词。",
    source: "https://x.com/AdrianPunk115/status/2084932520953753985",
    content: (
      <>
        <section><p>让 AI 做网页时，只说“高级、简洁、有设计感”通常不够。更有效的方式，是把需求拆成概念说明、适用场景、交互边界和可访问性要求。</p><p>以下词典适合当作网页需求清单。一次选少量效果，并明确移动端、键盘操作、性能和减少动态模式下的降级方案。</p></section>
        <section>
          <h2>一、滚动与动作</h2>
          <ol className="article-steps">
            <li><strong>Scroll Reveal</strong><span>元素进入视口时淡入或轻微上移，用来建立阅读节奏。</span></li>
            <li><strong>Parallax</strong><span>前景、中景和背景以不同速度移动，适合局部 Hero，不宜整页晃动。</span></li>
            <li><strong>Scroll Progress</strong><span>用顶部细线或侧边刻度显示长文阅读进度。</span></li>
            <li><strong>Scroll Snap</strong><span>让横向卡片或全屏章节停在预设位置，但不要劫持整个页面滚动。</span></li>
            <li><strong>Horizontal Scroll</strong><span>用于作品集、时间线和画廊，并提供方向提示和键盘焦点。</span></li>
            <li><strong>Infinite Scroll</strong><span>适合连续内容流；要配合加载、失败重试和滚动位置保存。</span></li>
            <li><strong>Marquee</strong><span>用 CSS 做缓慢信息带，关闭动画时仍要能阅读。</span></li>
            <li><strong>Hover Micro-interaction</strong><span>用轻微上移、边框变化和箭头移动确认可点击性。</span></li>
            <li><strong>Staggered Animation</strong><span>同组元素错峰出现，间隔要短，避免页面变慢。</span></li>
            <li><strong>Scroll-driven Animation</strong><span>让动画进度与滚动位置对应，并提供不支持浏览器的降级方案。</span></li>
          </ol>
        </section>
        <ArticleMedia items={vibeCodingMedia.slice(0, 5)} inline startIndex={0} />
        <section>
          <h2>二、提示与加载状态</h2>
          <ul className="article-checklist">
            <li>Skeleton：占位结构尽量与最终内容尺寸一致，避免布局跳动。</li>
            <li>Lazy Loading：首屏以外的图片、视频和 iframe 延迟加载，并提前设置尺寸。</li>
            <li>Spinner：适合短请求；可计算的任务使用 Progress Bar。</li>
            <li>Loading Button：提交后禁用重复点击，并保留按钮宽度。</li>
            <li>Empty State：说明为什么为空，并给出下一步行动。</li>
            <li>Error / Retry：说明影响范围，提供重试和返回路径。</li>
            <li>Optimistic UI：只用于低风险操作，失败时必须恢复状态。</li>
            <li>Inline Validation：在字段附近给出具体错误，不要只显示“表单有问题”。</li>
          </ul>
        </section>
        <ArticleMedia items={vibeCodingMedia.slice(5, 9)} inline startIndex={5} />
        <section>
          <h2>三、选择视觉风格</h2>
          <ol className="article-steps">
            <li><strong>Minimalism</strong><span>用留白、字体层级和少量重点内容建立秩序。</span></li>
            <li><strong>Editorial</strong><span>借鉴杂志排版，强调大标题、图文比例、栏目节奏和引语。</span></li>
            <li><strong>Swiss Style</strong><span>用网格、无衬线字体、清晰对齐和有限颜色建立系统感。</span></li>
            <li><strong>Glassmorphism</strong><span>使用半透明面板和模糊，但必须保证文字对比度。</span></li>
            <li><strong>Neo-brutalism</strong><span>粗边框、高对比和硬阴影，适合实验型创作者网站。</span></li>
            <li><strong>Dark Mode</strong><span>重新设计对比度、边框、图片和原生控件，不是简单反色。</span></li>
            <li><strong>Monochrome / Duotone</strong><span>用一到两种颜色控制视觉系统。</span></li>
            <li><strong>Gradient Mesh / Grain</strong><span>适合 Hero 和背景，透明度要低，不能抢正文注意力。</span></li>
            <li><strong>Neumorphism</strong><span>只适合局部控制组件，必须保留清晰边界和 focus 状态。</span></li>
          </ol>
        </section>
        <ArticleMedia items={vibeCodingMedia.slice(9, 14)} inline startIndex={9} />
        <section>
          <h2>四、高级效果要有边界</h2>
          <p>Custom Cursor、Magnetic Button、3D Tilt、Spotlight、Text Mask、Clip-path、Three.js 和 View Transitions 都可以增强体验，但不应成为完成任务的必要条件。</p>
          <p>所有动画都要支持 <code>prefers-reduced-motion: reduce</code>。移动端和低性能设备应降低效果或使用静态回退图。视觉效果上线前，先给图片、字体、脚本和 WebGL 设定性能预算。</p>
          <div className="prompt-box">请为「项目」设计响应式网页。请分别说明滚动动作、加载状态、视觉风格和高级效果；每个效果都要给出适用场景、性能限制、键盘操作、移动端降级和 reduced motion 方案。不要为了动画隐藏内容或牺牲首屏加载。</div>
        </section>
        <ArticleMedia items={vibeCodingMedia.slice(14, 19)} inline startIndex={14} />
      </>
    ),
  },
  "fde-ai-implementation": {
    index: "08",
    category: "AI 落地",
    readTime: "9 min",
    title: "FDE 是什么：把 AI 工具接到真实业务流程",
    description: "从业务观察、最小 Demo 到上线交付，理解前置部署工程师如何解决企业 AI 落地问题。",
    source: "https://x.com/Shenmeili1213/status/2084857018356297898",
    content: (
      <>
        <section><p>FDE 是 Forward Deployed Engineer 的缩写，可以理解为前置部署工程师。它不只是写代码，而是进入客户的真实业务流程，找出问题、搭建方案、完成集成并推动上线。</p><p>大模型和工具是标准化能力，但不同企业的数据、流程和权限结构差异很大。FDE 的价值就在于把通用能力接到具体业务上。</p></section>
        <ArticleMedia items={fdeMedia.slice(0, 2)} inline startIndex={0} />
        <section>
          <h2>一、FDE 与普通外包的区别</h2>
          <p>外包通常围绕明确的交付物执行；FDE 先观察流程，再确认真正的问题。比如客户提出“做一个 AI 客服”，现场可能发现根因是多个业务系统的客户数据没有连通。</p>
          <div className="article-callout"><strong>判断顺序</strong><p>先确认业务结果，再决定模型、工具和界面。不要把工具名称当成项目目标。</p></div>
        </section>
        <ArticleMedia items={fdeMedia.slice(2, 3)} inline startIndex={2} />
        <section>
          <h2>二、一套可复用的落地流程</h2>
          <ol className="article-steps">
            <li><strong>观察</strong><span>跟着业务人员走完整流程，记录重复、等待、录入和交接环节。</span></li>
            <li><strong>建模</strong><span>把输入、处理、判断、输出、权限和异常情况画出来。</span></li>
            <li><strong>做 Demo</strong><span>只解决一个明确的小问题，先让业务人员现场试用。</span></li>
            <li><strong>接入工具</strong><span>连接知识库、表格、CRM、文档或内部系统，并控制权限。</span></li>
            <li><strong>灰度上线</strong><span>保留人工确认，记录错误和无法处理的情况。</span></li>
            <li><strong>交付复盘</strong><span>用时间、错误率、处理量和用户反馈评估实际效果。</span></li>
          </ol>
        </section>
        <ArticleMedia items={fdeMedia.slice(3, 5)} inline startIndex={3} />
        <section>
          <h2>三、适合小规模试点的场景</h2>
          <ul className="article-checklist">
            <li>文档解析：从 PDF、合同或物流单据中提取结构化字段。</li>
            <li>知识库客服：让 AI 根据企业自己的产品资料和 FAQ 回答问题。</li>
            <li>内容自动化：批量生成脚本、笔记和营销文案，但保留人工审核。</li>
            <li>报表自动化：读取表格、发现异常并生成解释性报告。</li>
            <li>流程审批：提取合同、报销或采购信息，人工完成最终确认。</li>
          </ul>
        </section>
        <ArticleMedia items={fdeMedia.slice(5, 7)} inline startIndex={5} />
        <section>
          <h2>四、工具只是执行层</h2>
          <p>原文以 WorkBuddy、Skill 和 MCP 作为示例。它们可以分别承担任务规划、能力扩展和系统连接，但具体产品能力、权限和可用连接器会变化，使用前应以官方文档为准。</p>
          <p>无论使用什么工具，都建议把“确定性程序”和“AI 判断”分开：字段映射、去重、计算和写入需要稳定可检查；内容理解和改写可以交给 AI；最终是否上线由业务人员决定。</p>
        </section>
        <section>
          <h2>五、五天试点计划</h2>
          <ol className="article-steps">
            <li><strong>第 1 天</strong><span>找一个仍在手动处理重复任务的业务流程。</span></li>
            <li><strong>第 2 天</strong><span>用真实但经过脱敏的数据做最小 Demo。</span></li>
            <li><strong>第 3 天</strong><span>让业务人员试用，记录不理解、出错和缺数据的地方。</span></li>
            <li><strong>第 4 天</strong><span>补充权限、异常处理和必要的系统连接。</span></li>
            <li><strong>第 5 天</strong><span>确定验收指标、交付边界和后续维护方式。</span></li>
          </ol>
          <p>不要承诺“自动化后一定省多少人”或“保证爆款”。先定义可测量的流程指标，再根据真实结果迭代。</p>
        </section>
        <ArticleMedia items={fdeMedia.slice(7, 8)} inline startIndex={7} />
      </>
    ),
  },
  "video-workflow-skills": {
    index: "06",
    category: "资源",
    readTime: "5 min",
    title: "视频制作 Skills 资源清单：先确认仓库、许可和可运行性",
    description: "整理一批视频制作相关的开源 Skill 入口，使用前先检查 README、许可证、依赖和输出质量。",
    source: "https://x.com/369Serena/status/2084934939905073544",
    content: (
      <>
        <section><p>视频制作 Skill 可以把镜头设计、变装、漫画化、旁白、书籍视频或 B-roll 等任务封装成可复用流程。但“有仓库”不等于“可直接使用”，安装前应检查运行环境、依赖、许可证和示例输出。</p></section>
        <section>
          <h2>资源入口</h2>
          <ol className="article-steps">
            <li><strong>Video Shotcraft</strong><span><a href="https://github.com/Vincentwei1021/video-shotcraft" target="_blank" rel="noreferrer">视频动效与镜头工作流</a></span></li>
            <li><strong>Female Outfit Director</strong><span><a href="https://github.com/liyue-aigc/female-outfit-director" target="_blank" rel="noreferrer">穿搭变装视频</a></span></li>
            <li><strong>Story to Handdrawn Video</strong><span><a href="https://github.com/gnipbao/story-to-handdrawn-video" target="_blank" rel="noreferrer">漫画化故事视频</a></span></li>
            <li><strong>Vox Director</strong><span><a href="https://github.com/Alisa0808/vox-director" target="_blank" rel="noreferrer">Vox 风格视频流程示例</a></span></li>
            <li><strong>GBRO Collage B-roll</strong><span><a href="https://github.com/pyang5166/gbro-collage-broll" target="_blank" rel="noreferrer">拼贴和 B-roll 处理</a></span></li>
            <li><strong>Classical Poem Silk Video</strong><span><a href="https://github.com/Mr-funny/hbg-classical-poem-silk-video" target="_blank" rel="noreferrer">国风古诗词视频</a></span></li>
            <li><strong>Book Video Factory</strong><span><a href="https://github.com/bytec-ai/book-video-factory" target="_blank" rel="noreferrer">图书类视频生产</a></span></li>
            <li><strong>Book Video</strong><span><a href="https://github.com/Endless1936/book-video" target="_blank" rel="noreferrer">图书内容视频</a></span></li>
          </ol>
        </section>
        <section>
          <h2>安装前检查</h2>
          <ul className="article-checklist">
            <li>先读 README，确认支持的客户端、系统和模型。</li>
            <li>查看 LICENSE，确认素材和生成结果的使用边界。</li>
            <li>检查依赖、API、模型和本地工具是否齐全。</li>
            <li>用一段无敏感信息的测试素材试跑。</li>
            <li>确认输出分辨率、字幕、音频和版权来源。</li>
          </ul>
        </section>
        <section>
          <h2>把 Skill 变成自己的工作流</h2>
          <p>不要一开始同时安装多个 Skill。先选一个明确的视频类型，跑通“输入素材 → 生成草稿 → 人工审核 → 导出”的完整链路，再逐步增加镜头、字幕、配乐和发布环节。</p>
          <div className="article-callout"><strong>最小验收标准</strong><p>能重复运行、输出结构稳定、错误可定位、素材来源可追溯，并且最终发布前仍由人检查。</p></div>
        </section>
      </>
    ),
  },
  "content-boom-monitor": {
    index: "10",
    category: "内容系统",
    readTime: "12 min",
    title: "把小红书和抖音选题监控做成可复盘的工作流",
    description: "从关键词、对标账号到去重、评分和人工反馈，把重复刷平台变成可运行的内容监控系统。",
    source: "https://x.com/DZhao63405/status/2084492080173429047",
    content: (
      <>
        <section><p>手动刷平台、记录热门内容和整理链接，短期可以完成，长期很难稳定坚持。更值得搭建的是一条可重复运行的链路：读取监控目标、获取公开数据、清洗去重、筛选重点、生成报告，再把判断结果沉淀下来。</p></section>
        <ArticleMedia items={boomMonitorMedia.slice(0, 1)} inline startIndex={0} />
        <section>
          <h2>一、系统要解决什么问题</h2>
          <p>这类系统不负责预测未来爆款，而是缩小每天需要人工查看的范围，并保留证据和处理状态。关键词监控负责发现候选内容，对标账号监控负责寻找相对异常的作品。</p>
          <div className="article-callout"><strong>核心边界</strong><p>采集、字段映射、去重和计算交给确定性程序；内容结构判断交给 AI；是否值得跟进由人决定。</p></div>
        </section>
        <ArticleMedia items={boomMonitorMedia.slice(1, 2)} inline startIndex={1} />
        <section>
          <h2>二、推荐架构</h2>
          <pre><code>{"飞书录入关键词 / 账号\n        ↓\nCodex Skill 读取配置并限量执行\n        ↓\n平台接口获取公开数据\n        ↓\n清洗、标准化、去重、计算\n        ↓\n监控简报 + 飞书内容库\n        ↓\n人工标记：跟进 / 观察 / 不相关 / 已采用"}</code></pre>
          <p>系统应保留原始响应的脱敏版本，标准化记录至少包含平台、作品 ID、标题、链接、发布时间、作者和实际可用的互动指标。</p>
        </section>
        <ArticleMedia items={boomMonitorMedia.slice(2, 3)} inline startIndex={2} />
        <section>
          <h2>三、两类监控引擎</h2>
          <ol className="article-steps">
            <li><strong>关键词监控</strong><span>输入 AI 工具、AI 外贸等关键词，按平台返回结果筛选候选内容。</span></li>
            <li><strong>账号监控</strong><span>输入账号主页，使用同账号其他作品作为基线，寻找明显高于自身常态的内容。</span></li>
            <li><strong>人工判断</strong><span>结合正文、封面、评论区、发布时间和自身业务，确认是否值得研究。</span></li>
          </ol>
        </section>
        <section>
          <h2>四、评分只是排序工具</h2>
          <p>可以使用一个透明的示例互动值帮助排序，例如把点赞、收藏、评论和分享按不同权重相加。不同平台的指标含义不同，权重应视数据质量和目标调整。</p>
          <p>对标账号可以计算：当前作品互动值 ÷ 同账号其他作品互动值中位数。建议至少有足够的同批样本后再计算，否则显示“样本不足”，不要伪造结果。</p>
          <p>这些分数只用于安排查看顺序，不等于全平台爆款认证，也不代表未来一定会获得流量。</p>
        </section>
        <ArticleMedia items={boomMonitorMedia.slice(3, 4)} inline startIndex={3} />
        <section>
          <h2>五、飞书内容库怎么设计</h2>
          <ul className="article-checklist">
            <li>监控关键词：关键词、平台、状态、最后扫描时间。</li>
            <li>对标账号：账号名称、平台、主页链接、账号 ID。</li>
            <li>内容作品库：标题、平台、作品 ID、链接、发布时间、互动指标。</li>
            <li>判断字段：相对表现、监控等级、数据备注、证据缺口。</li>
            <li>协作字段：AI 摘要、可复用结构、处理状态和人工备注。</li>
          </ul>
          <p>处理状态可以固定为：待评估、值得跟进、继续观察、不相关、已采用。机器字段和人阅读的字段分开，系统更容易长期维护。</p>
        </section>
        <ArticleMedia items={boomMonitorMedia.slice(4, 5)} inline startIndex={4} />
        <section>
          <h2>六、从小规模试跑开始</h2>
          <ol className="article-steps">
            <li><strong>输入少量目标</strong><span>先使用少量关键词和账号，不要一开始扩大采集范围。</span></li>
            <li><strong>验证数据链路</strong><span>确认平台、作品 ID、时间和互动指标映射正确。</span></li>
            <li><strong>预览报告</strong><span>先检查原始数据、去重结果和证据缺口，再写入内容库。</span></li>
            <li><strong>人工反馈</strong><span>标记少量内容是否相关，让下一轮监控更贴近业务方向。</span></li>
          </ol>
          <p>Token 只能放在环境变量中；只处理有权使用的公开数据；缺失指标保持为空，不能把缺失写成 0。</p>
        </section>
        <section>
          <h2>七、相关 Skill</h2>
          <p>原文提供的项目是<a href="https://github.com/xintu1314/content-boom-monitor" target="_blank" rel="noreferrer">Content Boom Monitor</a>。安装和运行前请先查看 README、平台规则、API 条款和当前接口状态。</p>
        </section>
      </>
    ),
  },
  "github-zero-to-one": {
    index: "09",
    category: "开发入门",
    readTime: "10 min",
    title: "GitHub 从零入门：把代码保存、同步和协作起来",
    description: "理解 Git 与 GitHub 的区别，完成仓库、分支、提交、推送和 Pull Request 的基本操作。",
    source: "https://x.com/AdrianPunk115/status/2074744543170469894",
    content: (
      <>
        <section><p>Git 是电脑上的版本管理工具，GitHub 是用于托管代码、同步和协作的平台。可以只使用 Git，也可以把 Git 仓库同步到 GitHub。</p></section>
        <ArticleMedia items={githubMedia.slice(0, 2)} inline startIndex={0} />
        <section>
          <h2>一、准备账号和工具</h2>
          <p>在<a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>注册账号。Git 的安装包可以从<a href="https://git-scm.com/downloads" target="_blank" rel="noreferrer">官方页面</a>获取。</p>
          <p>安装完成后，在终端确认：</p>
          <pre><code>{"git --version"}</code></pre>
        </section>
        <ArticleMedia items={githubMedia.slice(2, 4)} inline startIndex={2} />
        <section>
          <h2>二、初次配置 Git</h2>
          <pre><code>{"git config --global user.name \"你的名字\"\ngit config --global user.email \"你的邮箱@example.com\"\ngit config --list"}</code></pre>
          <p>全局配置会用于以后所有项目。需要不同身份时，可以在具体项目目录单独配置。</p>
        </section>
        <ArticleMedia items={githubMedia.slice(4, 6)} inline startIndex={4} />
        <section>
          <h2>三、创建仓库并完成第一次同步</h2>
          <p>在 GitHub 创建 Repository，填写仓库名和可选描述，再选择公开或私有。README 可以作为项目说明书，写清楚项目用途、安装和使用方式。</p>
          <p>常见的本地工作流是：</p>
          <pre><code>{"git clone https://github.com/用户名/仓库名.git\ncd 仓库名\ngit status\ngit add .\ngit commit -m \"说明本次修改\"\ngit push"}</code></pre>
          <p>add 把修改放入暂存区，commit 创建本地存档，push 把存档推送到 GitHub。提交信息要能说明这次改了什么。</p>
        </section>
        <ArticleMedia items={githubMedia.slice(6, 8)} inline startIndex={6} />
        <section>
          <h2>四、分支和 Pull Request</h2>
          <p>分支是一条独立开发线，适合在不影响主分支的情况下开发功能或修复问题。</p>
          <pre><code>{"git checkout -b feature-login\ngit status\ngit add .\ngit commit -m \"添加登录功能\"\ngit push -u origin feature-login"}</code></pre>
          <p>推送后可以在 GitHub 发起 Pull Request，请其他人审查修改，再决定是否合并到主分支。</p>
        </section>
        <ArticleMedia items={githubMedia.slice(8, 10)} inline startIndex={8} />
        <section>
          <h2>五、使用别人的仓库</h2>
          <ol className="article-steps">
            <li><strong>先读 README</strong><span>确认项目用途、安装步骤、运行命令和已知问题。</span></li>
            <li><strong>再看 LICENSE</strong><span>确认代码和素材是否允许你的使用方式。</span></li>
            <li><strong>检查维护状态</strong><span>查看最近提交、Issues 和版本要求。</span></li>
            <li><strong>选择获取方式</strong><span>只想查看可以 Download ZIP；需要更新使用 git clone；要修改并贡献则 Fork + Clone。</span></li>
          </ol>
          <pre><code>{"git clone https://github.com/项目所有者/项目名.git\ncd 项目名\ngit pull"}</code></pre>
        </section>
        <ArticleMedia items={githubMedia.slice(10, 12)} inline startIndex={10} />
        <section>
          <h2>六、日常安全习惯</h2>
          <ul className="article-checklist">
            <li>不确定时先运行 <code>git status</code> 和 <code>git diff</code>。</li>
            <li>开始新工作前先 <code>git pull</code>，减少冲突。</li>
            <li>完成一个小步骤就提交一次。</li>
            <li>重要操作前先备份。</li>
            <li>谨慎使用 <code>git reset --hard</code>，它可能永久丢弃未提交修改。</li>
          </ul>
        </section>
      </>
    ),
  },
};

type ArticleSlug = keyof typeof articles;

function ArticleMedia({
  items,
  inline = false,
  startIndex = 0,
}: {
  items: MediaItem[];
  inline?: boolean;
  startIndex?: number;
}) {
  return (
    <section
      className={inline ? "article-media article-inline-media" : "article-media"}
      aria-label={inline ? "相关配图与媒体" : "原文配图与媒体"}
    >
      {!inline && (
        <>
          <h2>原文配图与媒体</h2>
          <p className="article-media-note">以下媒体按原始链接顺序保留。图片和视频来自来源页面，发布时不将其当作本站原创素材。</p>
        </>
      )}
      <div className={items.length === 1 ? "article-media-grid article-media-grid-single" : "article-media-grid"}>
        {items.map((item, index) => (
          <figure key={item.src} className="article-media-item">
            {item.type === "video" ? (
              <video controls preload="metadata" poster={item.poster}>
                <source src={item.src} type="video/mp4" />
                <a href={item.src} target="_blank" rel="noreferrer">打开视频</a>
              </video>
            ) : (
              <img src={item.src} alt={item.alt ?? "文章配图"} loading={startIndex === 0 && index === 0 ? "eager" : "lazy"} referrerPolicy="no-referrer" />
            )}
            <figcaption>{item.type === "video" ? "动态演示" : "配图 " + (startIndex + index + 1)}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!(slug in articles)) return {};
  const article = articles[slug as ArticleSlug];

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: "/notes/" + slug },
  };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
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
        <a className="article-back" href="/#notes">← 返回教程</a>
      </header>
      <article className="article-shell">
        <div className="article-meta"><span>{article.index}</span><span>{article.category}</span><span>{article.readTime}</span></div>
        <h1>{article.title}</h1>
        <p className="article-lead">{article.description}</p>
        <div className="article-content">{article.content}</div>
        {article.source && (
          <div className="article-source">
            <span>原始资料</span>
            <a href={article.source} target="_blank" rel="noreferrer">查看来源链接 ↗</a>
          </div>
        )}
        <div className="article-footer">
          <p>把问题讲清楚，AI 才能真正帮上忙。</p>
          <a href="/#notes">继续看其他教程 →</a>
        </div>
      </article>
    </main>
  );
}
