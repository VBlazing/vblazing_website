/*
 * @Author: VBlazing
 * @Date: 2025-10-24 00:57:13
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-11 11:39:02
 * @Description: loading 页面
 */
import { useTranslations } from "next-intl";

export default function LoadingDetailsss() {
  const t = useTranslations("common");
  return (
    <div className="my-auto w-full text-center">
      <span className="text-main-label animate-pulse text-3xl">
        {t("loading")}
      </span>
    </div>
  );
}
