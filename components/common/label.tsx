/*
 * @Author: vblazing
 * @Date: 2025-09-23 13:18:35
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-11 21:39:04
 * @Description: 标签组件
 */
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Tag } from "lucide-react";

export interface ILabelProps {
  text: string;
  showIcon?: boolean;
  className?: string;
}

export default function Label({
  text,
  showIcon = false,
  className,
}: ILabelProps) {
  return (
    <Badge
      variant="outline"
      className={cn("text-main-label rounded-xl font-medium", className)}
    >
      {showIcon && <Tag />}
      {text}
    </Badge>
  );
}
