/*
 * @Author: vblazing
 * @Date: 2025-09-23 13:18:35
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-23 15:14:13
 * @Description: 标签组件
 */
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function Label({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn("text-main-label rounded-xl font-medium", className)}
    >
      {text}
    </Badge>
  );
}
