/*
 * @Author: vblazing
 * @Date: 2025-09-23 13:33:12
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-11 21:38:22
 * @Description: 标签列表组件
 */
import { cn } from "@/lib/utils";
import Label from "@/components/common/label";

export default function LabelList({
  labels,
  showIcon = false,
  maxLength = 3,
  className,
}: {
  labels: string[];
  showIcon?: boolean;
  maxLength?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full flex-wrap items-center gap-1", className)}>
      {labels?.slice(0, maxLength)?.map((item) => (
        <Label key={item} text={item} showIcon={showIcon} />
      ))}
      {labels?.length > maxLength && <Label text="+1" />}
    </div>
  );
}
