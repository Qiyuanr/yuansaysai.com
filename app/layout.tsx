import type { Metadata } from "next";
import "./globals.css";

const title = "Yuan Says AI";
const description = "Yuan 关于 AI、产品与独立创造的个人笔记与实验。";

export const metadata: Metadata = {
  metadataBase: new URL("https://yuansaysai.com"),
  title: {
    default: title,
    template: `%s · ${title}`,
  },
  description,
  keywords: ["AI", "人工智能", "产品", "独立创造", "个人博客"],
  authors: [{ name: "Yuan" }],
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
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Yuan Says AI — 把复杂的未来，说得简单一点。",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
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
