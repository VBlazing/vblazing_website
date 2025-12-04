/*
 * @Author: vblazing
 * @Date: 2025-09-22 23:06:14
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-22 23:25:11
 * @Description: 博客日期组件
 */
import { Calendar } from "lucide-react";
import { useFormatter } from "next-intl";
import { cn } from "@/lib/utils";

export default function PostDate({
  date,
  className,
}: {
  date: Date;
  className?: string;
}) {
  const format = useFormatter();
  console.log("date", date);

  if (!date) {
    return null;
  }
  return (
    <div
      className={cn("text-main-label flex items-center space-x-1", className)}
    >
      <Calendar />
      <span>
        {format.dateTime(date, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </span>
    </div>
  );
}
