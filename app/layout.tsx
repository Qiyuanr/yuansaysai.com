import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeToggle } from "./ThemeToggle";

const title = "予安的 AI 偏方";
const description =
  "面向普通人的 AI 使用指南：分享好用的 AI 功能、看得懂的教程，以及 AI 使用过程中的疑难杂症解法。";

export const metadata: Metadata = {
  metadataBase: new URL("https://yuansaysai.com"),
  title: {
    default: title,
    template: `%s · ${title}`,
  },
  description,
  keywords: [
    "AI 教程",
    "AI 工具",
    "人工智能",
    "提示词",
    "AI 使用技巧",
    "AI 疑难解答",
  ],
  authors: [{ name: "予安" }],
  alternates: { canonical: "/" },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    title,
    description,
    siteName: title,
    images: [
      {
        url: "/og-yuans-ai-remedies-v2.png",
        width: 1732,
        height: 907,
        alt: "予安的 AI 偏方 — 让 AI 成为每个人的能力",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-yuans-ai-remedies-v2.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: "#0c0d0d",
};

const themeBootScript = `
  (() => {
    try {
      const saved = window.localStorage.getItem("yuansaysai-theme");
      const theme = saved === "light" || saved === "dark"
        ? saved
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch {
      document.documentElement.dataset.theme = "dark";
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
