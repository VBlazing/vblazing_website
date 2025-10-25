/*
 * @Author: vblazing
 * @Date: 2025-09-23 13:13:26
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-23 15:12:29
 * @Description: 阅读时间组件
 */
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ReadingTime({
  time,
  className,
}: {
  time: number;
  className?: string;
}) {
  const t = useTranslations("common");
  if (!time) {
    return null;
  }
  return (
    <div
      className={cn("text-main-label flex items-center space-x-1", className)}
    >
      <Clock />
      <span>{t("reading_time", { time })}</span>
    </div>
  );
}
