import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="bg-background border-border mt-auto w-full border-t">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-12 sm:px-8">
        {t("copyright")}
      </div>
    </footer>
  );
}
