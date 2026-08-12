"use client";

import { useEffect, useId, useState } from "react";
import type { ReactNode } from "react";
import styles from "./VibeHub.module.css";

export type DemoTerm = {
  id: string;
  title: string;
  secondaryTitle: string;
  prompt: string;
};

export const interactiveDemoGroups: Array<{
  id: string;
  label: string;
  terms: DemoTerm[];
}> = [
  {
    id: "button-link",
    label: "按钮与链接",
    terms: [
      { id: "button", title: "按钮", secondaryTitle: "Button", prompt: "执行保存、取消等当前页面动作。" },
      { id: "link", title: "链接", secondaryTitle: "Link", prompt: "前往另一页面、页内位置或外部资源。" },
    ],
  },
  {
    id: "form",
    label: "表单",
    terms: [
      { id: "input", title: "输入框", secondaryTitle: "Input", prompt: "填写邮箱、名称等单行内容。" },
      { id: "textarea", title: "多行文本框", secondaryTitle: "Textarea", prompt: "输入一段较长的文字。" },
      { id: "input-number", title: "数字输入框", secondaryTitle: "InputNumber", prompt: "直接输入数字，也可以按加减调整。" },
      { id: "radio", title: "单选框", secondaryTitle: "Radio", prompt: "一组选项中只能选择一个。" },
      { id: "checkbox", title: "复选框", secondaryTitle: "Checkbox", prompt: "多个选项可以同时选择。" },
      { id: "switch", title: "开关", secondaryTitle: "Switch", prompt: "在开启与关闭之间切换。" },
      { id: "slider", title: "滑块", secondaryTitle: "Slider", prompt: "拖动选择一个连续范围内的值。" },
      { id: "rate", title: "评分", secondaryTitle: "Rate", prompt: "点击星星给内容评分。" },
      { id: "select", title: "选择器", secondaryTitle: "Select", prompt: "从收起的选项列表中选择。" },
      { id: "date-picker", title: "日期选择器", secondaryTitle: "DatePicker", prompt: "通过系统日历选择日期。" },
      { id: "upload", title: "上传", secondaryTitle: "Upload", prompt: "选择本地文件并显示文件名，不会上传。" },
    ],
  },
  {
    id: "display",
    label: "内容展示",
    terms: [
      { id: "tabs", title: "标签页", secondaryTitle: "Tabs", prompt: "点击页签切换同一区域里的内容。" },
      { id: "collapse", title: "折叠面板", secondaryTitle: "Collapse", prompt: "按需展开或收起一段内容。" },
      { id: "carousel", title: "走马灯", secondaryTitle: "Carousel", prompt: "使用左右按钮切换多张内容卡片。" },
      { id: "badge", title: "徽标", secondaryTitle: "Badge", prompt: "在图标旁提示未读数量。" },
      { id: "progress", title: "进度条", secondaryTitle: "Progress", prompt: "展示任务当前完成到哪一步。" },
      { id: "skeleton", title: "骨架屏", secondaryTitle: "Skeleton", prompt: "加载时先显示内容轮廓占位。" },
    ],
  },
  {
    id: "feedback",
    label: "弹窗与提示",
    terms: [
      { id: "alert", title: "警告提示", secondaryTitle: "Alert", prompt: "持续展示一条需要注意的信息。" },
      { id: "toast", title: "轻提示", secondaryTitle: "Toast", prompt: "动作完成后短暂出现，再自动消失。" },
      { id: "modal", title: "弹窗", secondaryTitle: "Modal", prompt: "在当前页面上方集中处理一件事。" },
      { id: "drawer", title: "抽屉", secondaryTitle: "Drawer", prompt: "从侧边滑出面板，同时保留页面背景。" },
      { id: "tooltip", title: "文字提示", secondaryTitle: "Tooltip", prompt: "悬停或键盘聚焦时显示短说明。" },
      { id: "popconfirm", title: "气泡确认框", secondaryTitle: "Popconfirm", prompt: "在危险按钮附近进行一次轻量确认。" },
    ],
  },
  {
    id: "navigation",
    label: "导航",
    terms: [
      { id: "pagination", title: "分页", secondaryTitle: "Pagination", prompt: "在多页内容之间前后切换。" },
      { id: "steps", title: "步骤条", secondaryTitle: "Steps", prompt: "展示流程阶段与当前所在步骤。" },
      { id: "dropdown", title: "下拉菜单", secondaryTitle: "Dropdown", prompt: "点击后展开一组临时操作。" },
      { id: "search", title: "搜索", secondaryTitle: "Search", prompt: "输入关键词即时筛选可能相关的结果。" },
    ],
  },
];

const searchItems = ["提示词基础", "按钮与链接", "数字输入框", "响应式设计"];
const carouselItems = ["第一张：产品概览", "第二张：核心功能", "第三张：开始使用"];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function TermDemo({ termId, compact = false }: { termId: string; compact?: boolean }) {
  const fieldId = useId();
  const [actionMessage, setActionMessage] = useState("尚未操作");
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [quantity, setQuantity] = useState(3);
  const [radioValue, setRadioValue] = useState("标准版");
  const [checks, setChecks] = useState(["邮件通知"]);
  const [switchOn, setSwitchOn] = useState(true);
  const [sliderValue, setSliderValue] = useState(45);
  const [rating, setRating] = useState(3);
  const [selectedValue, setSelectedValue] = useState("北京");
  const [fileName, setFileName] = useState("");
  const [activeTab, setActiveTab] = useState("概览");
  const [expanded, setExpanded] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [badgeCount, setBadgeCount] = useState(3);
  const [progress, setProgress] = useState(42);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [alertVisible, setAlertVisible] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [page, setPage] = useState(1);
  const [step, setStep] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!toastVisible) return;
    const timer = window.setTimeout(() => setToastVisible(false), 2200);
    return () => window.clearTimeout(timer);
  }, [toastVisible]);

  function toggleCheck(value: string) {
    setChecks((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  }

  const filteredSearchItems = searchItems.filter((item) => item.includes(searchValue.trim()));
  let content: ReactNode = null;

  switch (termId) {
    case "button":
      content = (
        <div className={styles.buttonDemo}>
          <div className={styles.demoActions}>
            <button className={styles.demoPrimary} type="button" onClick={() => setActionMessage("演示：已触发保存动作，不会保存真实数据")}>保存</button>
            <button className={styles.demoSecondary} type="button" onClick={() => setActionMessage("演示：已取消本次修改")}>取消</button>
          </div>
          <p className={styles.demoStatus} aria-live="polite"><i aria-hidden="true" />{actionMessage}</p>
        </div>
      );
      break;
    case "link":
      content = (
        <div className={styles.demoLinkCopy}>
          <p>上手之前，可以先看 <a href="https://vibe-hub.org/link" target="_blank" rel="noreferrer">链接说明 ↗</a>，再回来继续。</p>
          <a href="#catalog">浏览完整术语目录 →</a>
        </div>
      );
      break;
    case "input":
      content = (
        <label className={styles.demoField} htmlFor={`${fieldId}-input`}>
          <span>邮箱</span>
          <input id={`${fieldId}-input`} type="email" value={inputValue} onChange={(event) => setInputValue(event.target.value)} placeholder="you@example.com" />
          <small>{inputValue ? `当前输入：${inputValue}` : "等待输入"}</small>
        </label>
      );
      break;
    case "textarea":
      content = (
        <label className={styles.demoField} htmlFor={`${fieldId}-textarea`}>
          <span>补充说明</span>
          <textarea id={`${fieldId}-textarea`} value={textareaValue} onChange={(event) => setTextareaValue(event.target.value.slice(0, 80))} placeholder="写下一段说明…" />
          <small>{textareaValue.length} / 80</small>
        </label>
      );
      break;
    case "input-number":
      content = (
        <div className={styles.numberDemo}>
          <span>购买数量</span>
          <div>
            <button type="button" aria-label="数量减一" disabled={quantity <= 1} onClick={() => setQuantity((value) => clamp(value - 1, 1, 20))}>−</button>
            <input aria-label="购买数量" type="number" min="1" max="20" step="1" value={quantity} onChange={(event) => setQuantity(clamp(Math.round(Number(event.target.value) || 1), 1, 20))} />
            <button type="button" aria-label="数量加一" disabled={quantity >= 20} onClick={() => setQuantity((value) => clamp(value + 1, 1, 20))}>＋</button>
          </div>
          <small>范围 1–20 · 合计 ¥{quantity * 329}</small>
        </div>
      );
      break;
    case "radio":
      content = (
        <fieldset className={styles.demoChoices}>
          <legend>选择套餐</legend>
          {["基础版", "标准版", "专业版"].map((item) => (
            <label key={item}><input type="radio" name={`${fieldId}-plan`} checked={radioValue === item} onChange={() => setRadioValue(item)} /> {item}</label>
          ))}
          <small>当前选择：{radioValue}</small>
        </fieldset>
      );
      break;
    case "checkbox":
      content = (
        <fieldset className={styles.demoChoices}>
          <legend>通知方式</legend>
          {["邮件通知", "短信通知", "站内提醒"].map((item) => (
            <label key={item}><input type="checkbox" checked={checks.includes(item)} onChange={() => toggleCheck(item)} /> {item}</label>
          ))}
          <small>已选择 {checks.length} 项</small>
        </fieldset>
      );
      break;
    case "switch":
      content = (
        <div className={styles.switchDemo}>
          <div><strong>消息提醒</strong><small>{switchOn ? "已开启" : "已关闭"}</small></div>
          <button type="button" role="switch" aria-checked={switchOn} aria-label="切换消息提醒" onClick={() => setSwitchOn((value) => !value)}><span /></button>
        </div>
      );
      break;
    case "slider":
      content = (
        <label className={styles.demoField} htmlFor={`${fieldId}-slider`}>
          <span>预算：¥{sliderValue * 10}</span>
          <input id={`${fieldId}-slider`} type="range" min="0" max="100" value={sliderValue} onChange={(event) => setSliderValue(Number(event.target.value))} />
          <small>拖动滑块试试</small>
        </label>
      );
      break;
    case "rate":
      content = (
        <div className={styles.rateDemo}>
          <span>这篇内容有帮助吗？</span>
          <div role="radiogroup" aria-label="评分">
            {[1, 2, 3, 4, 5].map((value) => <button type="button" role="radio" aria-checked={rating === value} aria-label={`${value} 星`} onClick={() => setRating(value)} key={value}>{value <= rating ? "★" : "☆"}</button>)}
          </div>
          <small>{rating} / 5 分</small>
        </div>
      );
      break;
    case "select":
      content = (
        <label className={styles.demoField} htmlFor={`${fieldId}-select`}>
          <span>所在城市</span>
          <select id={`${fieldId}-select`} value={selectedValue} onChange={(event) => setSelectedValue(event.target.value)}>
            <option>北京</option><option>上海</option><option>深圳</option><option>成都</option>
          </select>
          <small>当前选择：{selectedValue}</small>
        </label>
      );
      break;
    case "date-picker":
      content = (
        <label className={styles.demoField} htmlFor={`${fieldId}-date`}>
          <span>预约日期</span>
          <input id={`${fieldId}-date`} type="date" defaultValue="2026-08-16" />
          <small>点击输入框打开系统日期选择器</small>
        </label>
      );
      break;
    case "upload":
      content = (
        <div className={styles.uploadDemo}>
          <label htmlFor={`${fieldId}-file`}>＋ 选择一个文件</label>
          <input id={`${fieldId}-file`} type="file" onChange={(event) => setFileName(event.target.files?.[0]?.name || "")} />
          <small>{fileName || "文件只在本机选择，不会上传"}</small>
        </div>
      );
      break;
    case "tabs":
      content = (
        <div className={styles.tabsDemo}>
          <div role="tablist">{["概览", "数据", "设置"].map((item) => <button type="button" role="tab" aria-selected={activeTab === item} onClick={() => setActiveTab(item)} key={item}>{item}</button>)}</div>
          <p role="tabpanel">当前显示“{activeTab}”页签里的内容。</p>
        </div>
      );
      break;
    case "collapse":
      content = (
        <div className={styles.collapseDemo}>
          <button type="button" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}><span>这个服务支持退款吗？</span><i>{expanded ? "−" : "＋"}</i></button>
          {expanded ? <p>支持。购买后 7 天内且未大量使用时可以申请。</p> : null}
        </div>
      );
      break;
    case "carousel":
      content = (
        <div className={styles.carouselDemo}>
          <button type="button" aria-label="上一张" onClick={() => setCarouselIndex((value) => (value + carouselItems.length - 1) % carouselItems.length)}>←</button>
          <div><span>0{carouselIndex + 1}</span><strong>{carouselItems[carouselIndex]}</strong></div>
          <button type="button" aria-label="下一张" onClick={() => setCarouselIndex((value) => (value + 1) % carouselItems.length)}>→</button>
        </div>
      );
      break;
    case "badge":
      content = (
        <div className={styles.badgeDemo}>
          <button type="button" aria-label={`${badgeCount} 条未读消息`} onClick={() => setBadgeCount(0)}>消息 <span>{badgeCount || "✓"}</span></button>
          <small>点击后标记已读</small>
        </div>
      );
      break;
    case "progress":
      content = (
        <div className={styles.progressDemo}>
          <div><span>上传进度</span><strong>{progress}%</strong></div>
          <progress max="100" value={progress}>{progress}%</progress>
          <button type="button" onClick={() => setProgress((value) => (value >= 100 ? 0 : Math.min(100, value + 14)))}>推进进度</button>
        </div>
      );
      break;
    case "skeleton":
      content = (
        <div className={styles.skeletonDemo}>
          {showSkeleton ? <div aria-label="内容加载中"><i /><i /><i /></div> : <div><strong>内容加载完成</strong><p>这里显示真实标题与摘要。</p></div>}
          <button type="button" onClick={() => setShowSkeleton((value) => !value)}>{showSkeleton ? "显示内容" : "重新加载"}</button>
        </div>
      );
      break;
    case "alert":
      content = alertVisible ? (
        <div className={styles.alertDemo} role="alert"><span>!</span><p><strong>账号将在 3 天后到期</strong><small>请及时续费，避免服务中断。</small></p><button type="button" aria-label="关闭提示" onClick={() => setAlertVisible(false)}>×</button></div>
      ) : <button className={styles.demoSecondary} type="button" onClick={() => setAlertVisible(true)}>重新显示警告</button>;
      break;
    case "toast":
      content = (
        <div className={styles.toastDemo}>
          <button className={styles.demoPrimary} type="button" onClick={() => setToastVisible(true)}>保存设置</button>
          {toastVisible ? <div role="status">✓ 已保存</div> : <small>点击后观察右上角</small>}
        </div>
      );
      break;
    case "modal":
      content = (
        <div className={styles.overlayDemo}>
          <button className={styles.demoPrimary} type="button" onClick={() => setModalOpen(true)}>打开弹窗</button>
          {modalOpen ? <div className={styles.modalBackdrop}><div role="dialog" aria-modal="true" aria-label="确认发布"><strong>确认发布？</strong><p>发布后其他人就能看到这篇内容。</p><div className={styles.demoActions}><button className={styles.demoSecondary} type="button" onClick={() => setModalOpen(false)}>取消</button><button className={styles.demoPrimary} type="button" onClick={() => { setModalOpen(false); setActionMessage("演示：已确认发布"); }}>确认</button></div></div></div> : null}
          <small aria-live="polite">{actionMessage}</small>
        </div>
      );
      break;
    case "drawer":
      content = (
        <div className={styles.overlayDemo}>
          <button className={styles.demoPrimary} type="button" onClick={() => setDrawerOpen(true)}>查看详情</button>
          {drawerOpen ? <div className={styles.drawerBackdrop} onClick={() => setDrawerOpen(false)}><aside aria-label="项目详情" onClick={(event) => event.stopPropagation()}><button type="button" aria-label="关闭抽屉" onClick={() => setDrawerOpen(false)}>×</button><span>PROJECT 07</span><strong>网站改版</strong><p>抽屉从侧边出现，背后的列表仍然保留。</p></aside></div> : null}
        </div>
      );
      break;
    case "tooltip":
      content = (
        <div className={styles.tooltipDemo}>
          <span role="tooltip" id={`${fieldId}-tooltip`}>复制链接</span>
          <button type="button" aria-describedby={`${fieldId}-tooltip`} aria-label="复制链接">⌘</button>
          <small>把鼠标移到图标上，或按 Tab 聚焦</small>
        </div>
      );
      break;
    case "popconfirm":
      content = (
        <div className={styles.popconfirmDemo}>
          {deleted ? (
            <div className={styles.popconfirmResult} role="status">
              <span aria-hidden="true">✓</span>
              <p><strong>项目已删除</strong><small>这里只改变演示状态，没有删除真实内容。</small></p>
              <button type="button" onClick={() => setDeleted(false)}>重新演示</button>
            </div>
          ) : (
            <div className={styles.popconfirmAnchor}>
              {confirmOpen ? (
                <div className={styles.popconfirmBubble} role="dialog" aria-label="确认删除">
                  <strong>确定删除这个项目？</strong>
                  <p>删除后无法恢复，请确认是否继续。</p>
                  <div className={styles.demoActions}>
                    <button type="button" onClick={() => setConfirmOpen(false)}>取消</button>
                    <button className={styles.demoDanger} type="button" onClick={() => { setConfirmOpen(false); setDeleted(true); }}>确认删除</button>
                  </div>
                </div>
              ) : null}
              <button className={styles.demoDanger} type="button" aria-expanded={confirmOpen} onClick={() => setConfirmOpen(true)}>删除项目</button>
            </div>
          )}
        </div>
      );
      break;
    case "pagination":
      content = (
        <div className={styles.paginationDemo} aria-label="分页">
          <button type="button" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>←</button>
          {[1, 2, 3, 4].map((value) => <button type="button" aria-current={page === value ? "page" : undefined} onClick={() => setPage(value)} key={value}>{value}</button>)}
          <button type="button" disabled={page === 4} onClick={() => setPage((value) => Math.min(4, value + 1))}>→</button>
        </div>
      );
      break;
    case "steps":
      content = (
        <div className={styles.stepsDemo}>
          <ol>{["填写信息", "确认订单", "完成付款"].map((item, index) => <li data-active={index <= step} key={item}><span>{index + 1}</span><small>{item}</small></li>)}</ol>
          <div className={styles.demoActions}><button type="button" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>上一步</button><button type="button" disabled={step === 2} onClick={() => setStep((value) => Math.min(2, value + 1))}>下一步</button></div>
        </div>
      );
      break;
    case "dropdown":
      content = (
        <div className={styles.dropdownDemo}>
          <button type="button" aria-expanded={dropdownOpen} onClick={() => setDropdownOpen((value) => !value)}>项目操作 <span>⌄</span></button>
          {dropdownOpen ? <div role="menu"><button type="button" role="menuitem" onClick={() => setDropdownOpen(false)}>重命名</button><button type="button" role="menuitem" onClick={() => setDropdownOpen(false)}>复制链接</button><button type="button" role="menuitem" onClick={() => setDropdownOpen(false)}>归档</button></div> : null}
        </div>
      );
      break;
    case "search":
      content = (
        <div className={styles.searchDemo}>
          <label htmlFor={`${fieldId}-search`}>搜索笔记</label>
          <input id={`${fieldId}-search`} type="search" value={searchValue} onChange={(event) => setSearchValue(event.target.value)} placeholder="输入“按钮”试试" />
          <ul>{filteredSearchItems.map((item) => <li key={item}>{item}</li>)}</ul>
          {!filteredSearchItems.length ? <small>没有匹配结果</small> : null}
        </div>
      );
      break;
    default:
      return null;
  }

  return <div className={`${styles.termDemo} ${compact ? styles.termDemoCompact : ""}`}>{content}</div>;
}
