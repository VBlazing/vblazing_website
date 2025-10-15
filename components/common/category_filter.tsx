/*
 * @Author: vblazing
 * @Date: 2025-10-15 14:09:32
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-15 22:33:37
 * @Description: 文章分类筛选器
 */
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "@/components/ui/button";
import { CategoryInfo } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { ALL } from "@/lib/const";

interface ICategoryFilterProps {
  category_list: CategoryInfo[];
}

export default function CategoryFilter({
  category_list,
}: ICategoryFilterProps) {
  const t = useTranslations("common");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const categoryListWithAll = [
    {
      id: ALL,
      name: t("all"),
    },
    ...category_list,
  ];

  const [value, setValue] = useState<string>(
    searchParams.get("category") || ALL,
  );

  const createQuery = useDebouncedCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "-1") {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleChange = (value: string) => {
    setValue(value);
    createQuery("category", value);
  };

  return (
    <div className="border-border bg-background inline-flex items-center rounded-sm border-1 shadow-sm">
      {categoryListWithAll.map((item) => {
        const idStr = String(item.id);
        const isChoose = idStr === value;
        return (
          <Button
            variant="ghost"
            onClick={() => handleChange(idStr)}
            key={item.id}
            className={cn(
              "hover:bg-background dark:hover:bg-background cursor-pointer rounded-none px-6 first:rounded-l-sm last:rounded-r-sm",
              {
                "bg-active-background text-active-text dark:hover:bg-active-background hover:bg-active-background dark:hover:text-active-text hover:text-active-text":
                  isChoose,
              },
            )}
          >
            {item.name}
          </Button>
        );
      })}
    </div>
  );
}
