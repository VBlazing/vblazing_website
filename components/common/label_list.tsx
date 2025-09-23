/*
 * @Author: vblazing
 * @Date: 2025-09-23 13:33:12
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-23 18:02:42
 * @Description: 标签列表组件
 */
import { cn } from "@/lib/utils";
import Label from "@/components/common/label";

export default function LabelList({
  labelList,
  maxLength = 3,
  className,
}: {
  // todo: 类型待修改
  labelList: {
    key: string;
    name: string;
  }[];
  maxLength?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full flex-wrap items-center gap-1", className)}>
      {labelList?.slice(0, maxLength)?.map((item) => (
        <Label key={item.key} text={item.name} />
      ))}
      {labelList?.length > maxLength && <Label text="+1" />}
    </div>
  );
}
