import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("test");

  return (
    <div className="grad min-h-screen w-full items-center justify-items-center bg-gray-50 font-sans">
      <nav className="drop-blur-lg sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
        <div className="flex h-16 items-center justify-center">
          {t("test_navigation")}
        </div>
      </nav>
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
