/*
 * @Author: vblazing
 * @Date: 2025-09-22 23:06:14
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-12-05 16:48:13
 * @Description: 博客日期组件
 */
"use client";

import { Calendar } from "lucide-react";
import { useFormatter } from "next-intl";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function PostDate({
  date,
  className,
}: {
  date: string;
  className?: string;
}) {
  const format = useFormatter();
  const [dateFormat, setDateFormat] = useState<string | null>(null);

  useEffect(() => {
    setDateFormat(() => {
      return format.dateTime(new Date(date), {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    });
  }, [date]);

  if (!date) {
    return null;
  }
  return (
    <div
      className={cn("text-main-label flex items-center space-x-1", className)}
    >
      <Calendar />
      <span>{dateFormat}</span>
    </div>
  );
}
