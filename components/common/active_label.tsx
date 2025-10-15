/*
 * @Author: vblazing
 * @Date: 2025-10-14 15:07:34
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-15 16:36:49
 * @Description: 动态标签
 */
import Label, { ILabelProps } from "@/components/common/label";
import { cn } from "@/lib/utils";

interface IActiveLabel extends ILabelProps {
  isActive: boolean;
  onChange: (isActive: boolean) => void;
}
export default function ActiveLabel({
  isActive,
  onChange,
  className,
  ...restProps
}: IActiveLabel) {
  return (
    <div className="group" onClick={() => onChange(!isActive)}>
      <Label
        {...restProps}
        className={cn(
          "transaction-all text-main-title cursor-pointer",
          { "group-hover:bg-hover-background": !isActive },
          { "bg-active-background text-active-text": isActive },
          className,
        )}
      />
    </div>
  );
}
