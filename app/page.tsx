/*
 * @Author: vblazing
 * @Date: 2025-09-02 18:01:24
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-05 22:08:33
 * @Description:
 */
import Header from "@/components/layout/header";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("test");

  return (
    <div className="grad min-h-screen w-full items-center justify-items-center bg-gray-50 font-sans">
      <Header />
      <main className="row-start-2 flex h-[1000px] w-full flex-col items-center gap-[32px] sm:items-start">
        <h2>{t("test_content")}</h2>
      </main>
      <footer className="mt-auto w-full border-t border-gray-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-12 sm:px-8">
          {t("test_copyright")}
        </div>
      </footer>
    </div>
  );
}
