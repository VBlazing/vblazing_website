/*
 * @Author: vblazing
 * @Date: 2025-09-02 18:01:24
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-25 00:02:23
 * @Description: 布局
 */
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import ErrorManagerClient from "@/components/common/error_manager_client";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/lib/i18n/routing";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  const locale = await getLocale();
  return {
    title: {
      template: `${t("blazer")} - %s`,
      default: t("title"),
    },
    description: t("description"),
    icons: {
      icon: "https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/icon.ico",
      shortcut: [
        "https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/shortcut-icon_16.png",
        "https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/shortcut-icon_32.png",
      ],
      apple: [
        "https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/apple-icon_16.png",
        "https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/apple-icon_32.png",
      ],
    },
    openGraph: {
      // images: [ogimage],
      title: t("title"),
      description: t("description"),
      url: "https://blog.vblazing.com",
      siteName: "blog.vblazing",
      locale: locale,
      type: "website",
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
        {/* 国际化 */}
        <NextIntlClientProvider>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
