/*
 * @Author: vblazing
 * @Date: 2025-10-11 15:18:50
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-23 12:48:58
 * @Description: 详情加载中
 */
import { getTranslations } from "next-intl/server";

export default async function LoadingDetail() {
  console.log("prefetch detail loading");

  const t = await getTranslations("detail");
  return (
    <div className="my-auto w-full text-center">
      <span className="text-main-label animate-pulse text-3xl">
        {t("loading")}
      </span>
    </div>
  );
}
