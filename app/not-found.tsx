/*
 * @Author: vblazing
 * @Date: 2025-09-20 09:55:34
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-20 20:33:21
 * @Description: 页面未找到
 */
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("not_found");

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center px-8 sm:items-start">
      <div className="space-y-6 text-center sm:ml-10 sm:text-left">
        <div className="space-y-2">
          <h1 className="text-7xl font-light text-slate-300">404</h1>
          <div className="h-0.5 w-full bg-slate-200"></div>
        </div>
        <h2 className="text-primary text-2xl">{t("text")}</h2>
        <div className="mt-10">
          <Button variant="outline" className="px-0">
            <Link href="/" className="flex items-center space-x-2 px-4">
              <Home className="h-4 w-4" />
              <span>{t("go_home")}</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
