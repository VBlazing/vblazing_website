/*
 * @Author: vblazing
 * @Date: 2025-09-20 17:55:39
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-20 17:56:12
 * @Description: 产品页面
 */
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("metadata");
  return {
    title: t("products"),
  };
}

export default function Products() {
  return <div>this is products</div>;
}
