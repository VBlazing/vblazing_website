/*
 * @Author: vblazing
 * @Date: 2025-09-22 22:36:18
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-22 22:59:56
 * @Description: 分类标签组件
 */
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function CategoryTag({
  category,
  className,
}: {
  category: string;
  className?: string;
}) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "text-main-text bg-background rounded-xl border-0 font-bold opacity-90",
        className,
      )}
    >
      {category}
    </Badge>
  );
}
