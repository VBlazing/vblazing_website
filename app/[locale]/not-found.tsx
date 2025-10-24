/*
 * @Author: vblazing
 * @Date: 2025-09-20 09:55:34
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-24 21:43:19
 * @Description: 页面未找到
 */
import { useTranslations } from "next-intl";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("not_found");

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center px-8 sm:items-start">
      <div className="space-y-6 text-center sm:ml-[10%] sm:text-left">
        <div className="space-y-2">
          <h1 className="text-7xl font-light text-slate-300">404</h1>
          <div className="h-0.5 w-full bg-slate-200"></div>
        </div>
        <h2 className="text-main-text text-2xl">{t("text")}</h2>
        <div className="mt-10">
          <Button variant="outline" asChild>
            <Link href="/" className="flex items-center space-x-2 px-4 py-2">
              <Home />
              <span>{t("go_home")}</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
