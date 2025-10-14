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
          { "bg-active-background": isActive },
          { "text-active-text": isActive },
          className,
        )}
      />
    </div>
  );
}
