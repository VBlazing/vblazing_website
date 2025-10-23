/*
 * @Author: vblazing
 * @Date: 2025-10-14 13:13:33
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-23 23:22:49
 * @Description: 标签过滤组件
 */
"use client";

import { useTranslations } from "next-intl";
import { CircleXIcon, Tag } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import ActiveLabel from "@/components/common/active_label";
import { cn } from "@/lib/utils";

interface ILabelFilterProps {
  labels: string[];
  value: string[];
  onChange: (value: string[]) => void;
  clear?: boolean;
  className?: string;
}

export default function LabelFilter({
  labels,
  value = [],
  onChange,
  clear = true,
  className,
}: ILabelFilterProps) {
  const t = useTranslations("common");

  const handleClickLabel = (key: string, isActive: boolean) => {
    onChange(isActive ? [...value, key] : value.filter((item) => item !== key));
  };

  const handleClear = () => {
    onChange([]);
  };

  const couldClear = clear && !!value.length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "relative cursor-pointer",
            {
              "bg-hover-background": !!value.length,
            },
            className,
          )}
          variant="outline"
        >
          <Tag />
          {t("tags")}
          {couldClear && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="text-main-text absolute top-0 right-0 translate-x-[30%] -translate-y-[30%]"
            >
              <CircleXIcon className="bg-background rounded-full" />
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <div className="mb-3 flex min-h-10 items-center justify-between">
          <div className="text-main-title font-medium">
            {t("filter_by_tags")}
          </div>
          {couldClear && (
            <Button
              onClick={handleClear}
              variant="ghost"
              className="text-main-title cursor-pointer"
            >
              {t("clear")}
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {labels.map((item) => {
            return (
              <ActiveLabel
                key={item}
                text={item}
                isActive={value.includes(item)}
                onChange={(isActive) => handleClickLabel(item, isActive)}
              />
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
