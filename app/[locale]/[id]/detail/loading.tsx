/*
 * @Author: vblazing
 * @Date: 2025-10-11 15:18:50
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-25 00:12:01
 * @Description: 详情加载中
 */
import { useTranslations } from "next-intl";

export default function LoadingDetail() {
  const t = useTranslations("detail");
  return (
    <div className="my-auto w-full text-center">
      <span className="text-main-label animate-pulse text-3xl">
        {t("loading")}
      </span>
    </div>
  );
}
