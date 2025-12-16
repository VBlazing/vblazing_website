/*
 * @Author: vblazing
 * @Date: 2025-09-02 18:01:24
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-21 12:50:18
 * @Description: 布局
 */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import hljs from "highlight.js";
import typescript from "highlight.js/lib/languages/typescript";
import ErrorManagerClient from "@/components/common/error_manager_client";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/lib/i18n/routing";
import { getUrl } from "@/lib/i18n/navigation";
import { LOCALE_CODE } from "@/lib/const";
import "highlight.js/styles/atom-one-dark.css";

// register for md code
hljs.registerLanguage("tsx", typescript);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: {
      template: `${t("blazer")} - %s`,
      default: t("title"),
    },
    description: t("description"),
    alternates: {
      canonical: getUrl("/", locale as LOCALE_CODE),
      languages: {
        en: getUrl("/", LOCALE_CODE.EN),
        zh: getUrl("/", LOCALE_CODE.ZH),
      },
    },
    icons: {
      icon: [
        "https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/image/icon/icon_36x36.png",
        "https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/image/icon/icon_72x72.png",
        "https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/image/icon/icon_114x114.png",
        "https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/image/icon/icon_144x144.png",
      ],
      shortcut: [
        "https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/image/icon/icon_36x36.png",
        "https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/image/icon/icon_72x72.png",
        "https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/image/icon/icon_114x114.png",
        "https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/image/icon/icon_144x144.png",
      ],
      apple: [
        "https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/image/icon/icon_36x36.png",
        "https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/image/icon/icon_72x72.png",
        "https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/image/icon/icon_114x114.png",
        "https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/image/icon/icon_144x144.png",
      ],
      other: [
        {
          rel: "apple-touch-icon-precomposed",
          url: "https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/image/icon/icon_36x36.png",
        },
        {
          rel: "apple-touch-icon-precomposed",
          url: "https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/image/icon/icon_72x72.png",
        },
        {
          rel: "apple-touch-icon-precomposed",
          url: "https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/image/icon/icon_114x114.png",
        },
        {
          rel: "apple-touch-icon-precomposed",
          url: "https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/image/icon/icon_144x144.png",
        },
      ],
    },
    openGraph: {
      images: [
        {
          url: "https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/image/hero_800_400.png",
          width: 800,
          height: 400,
        },
      ],
      title: t("title"),
      description: t("description"),
      url: getUrl("/", locale as LOCALE_CODE),
      siteName: "Blazer V",
      locale: locale,
      type: "website",
    },
    verification: {
      google: "l81mCOTeMiWvxv-OlnVJ9z2SUIuGouRB7H5CRuvTU8I",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* speed insights on vercel */}
        <SpeedInsights />
        {/* 国际化 */}
        <NextIntlClientProvider>
          <SessionProvider>
            {/* 主题 */}
            <ThemeProvider
              attribute="class"
              enableSystem={false}
              storageKey="VBLAZING_THEME"
            >
              <div className="bg-main-content flex min-h-screen w-full flex-col items-center font-sans sm:items-start">
                <Header />
                <main className="flex w-full flex-1 flex-col items-center sm:items-start">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster position="top-right" />
              <ErrorManagerClient />
            </ThemeProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
