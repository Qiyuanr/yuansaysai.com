import type { Metadata } from "next";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
