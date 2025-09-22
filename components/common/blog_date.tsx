/*
 * @Author: vblazing
 * @Date: 2025-09-22 23:06:14
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-22 23:25:11
 * @Description: 博客日期组件
 */
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function BlogDate({
  date,
  className,
}: {
  date: string;
  className?: string;
}) {
  if (!date) {
    return null;
  }
  return (
    <div
      className={cn("text-main-label flex items-center space-x-1", className)}
    >
      <Calendar />
      <span>{format(new Date(date), "MMM d, yyyy")}</span>
    </div>
  );
}
