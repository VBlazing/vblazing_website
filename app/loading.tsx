/*
 * @Author: vblazing
 * @Date: 2025-10-19 14:26:21
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-23 12:48:16
 * @Description: loading 页面
 */
import { getTranslations } from "next-intl/server";

export default async function LoadingDetail() {
  console.log("prefetch loading");
  const t = await getTranslations("common");
  return (
    <div className="my-auto w-full text-center">
      <span className="text-main-label animate-pulse text-3xl">
        {t("loading")}
      </span>
    </div>
  );
}
