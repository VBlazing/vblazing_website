/*
 * @Author: vblazing
 * @Date: 2025-09-02 18:01:24
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-20 09:38:00
 * @Description:
 */
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("test");

  return <h2 className="text-main-text">{t("test_content")}</h2>;
}
