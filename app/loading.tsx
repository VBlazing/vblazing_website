import { getTranslations } from "next-intl/server";

export default async function LoadingDetail() {
  const t = await getTranslations("common");
  return (
    <div className="my-auto w-full text-center">
      <span className="text-main-label animate-pulse text-3xl">
        {t("loading")}
      </span>
    </div>
  );
}
