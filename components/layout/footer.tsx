/*
 * @Author: vblazing
 * @Date: 2025-10-10 22:47:14
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-25 00:09:13
 * @Description: 页脚
 */
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-background border-border/40 mt-auto w-full border-t">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-6 sm:px-8 sm:py-12">
        {t("copyright")}
      </div>
    </footer>
  );
}
