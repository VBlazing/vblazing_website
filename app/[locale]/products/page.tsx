/*
 * @Author: vblazing
 * @Date: 2025-09-20 17:55:39
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-07 17:49:13
 * @Description: 产品页面
 */
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("products"),
  };
}

export default function Products() {
  return <div>this is products</div>;
}
