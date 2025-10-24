/*
 * @Author: vblazing
 * @Date: 2025-10-11 15:18:50
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-24 21:45:25
 * @Description: 文章内容未找到
 */
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/navigation";

export default function DetailNotFound() {
  const t = useTranslations("detail");
  return (
    <div className="my-auto w-full px-6">
      <div className="text-center">
        <h1 className="text-main-title mb-4 text-3xl font-light md:text-5xl">
          {t("not_found.title")}
        </h1>
        <p className="text-main-text mb-8 text-sm md:text-lg">
          {t("not_found.text")}
        </p>
        <Button variant="outline" asChild>
          <Link href="/blog" className="flex items-center space-x-2 px-4 py-2">
            <ArrowLeft />
            {t("not_found.back")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
