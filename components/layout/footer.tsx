/*
 * @Author: vblazing
 * @Date: 2025-10-10 22:47:14
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-11 15:40:06
 * @Description: 页脚
 */
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="bg-background border-border/40 mt-auto w-full border-t">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-6 sm:px-8 sm:py-12">
        {t("copyright")}
      </div>
    </footer>
  );
}
