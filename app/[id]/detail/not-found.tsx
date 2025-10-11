/*
 * @Author: vblazing
 * @Date: 2025-10-11 15:18:50
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-11 15:50:16
 * @Description: 文章内容未找到
 */
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function DetailNotFound() {
  const t = await getTranslations("detail");
  return (
    <div className="my-auto w-full px-6">
      <div className="text-center">
        <h1 className="text-main-title mb-4 text-3xl font-light md:text-5xl">
          {t("not_found.title")}
        </h1>
        <p className="text-main-text mb-8 text-sm md:text-lg">
          {t("not_found.text")}
        </p>
        <Button variant="outline" className="p-0">
          <Link href="/blog" className="flex items-center space-x-2 px-4 py-2">
            <ArrowLeft />
            {t("not_found.back")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
