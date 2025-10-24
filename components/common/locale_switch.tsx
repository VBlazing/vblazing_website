/*
 * @Author: vblazing
 * @Date: 2025-09-05 22:08:55
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-24 21:02:57
 * @Description: 更换语言环境前端组件
 */
"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LOCALE_CODE } from "@/lib/const";

const localeConfigs = [
  {
    code: LOCALE_CODE.ZH,
    name: "简体中文",
  },
  {
    code: LOCALE_CODE.EN,
    name: "English",
  },
];

export default function LocaleSwitchClient() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const currentLocaleConfig = localeConfigs.find(
    (item) => item.code === locale,
  );

  const handleSwitchLocale = (value: string) => {
    // startTransition(() => {
    //   setUserLocale(value);
    // });
  };

  return isPending ? (
    <Skeleton className="h-8 w-9 sm:w-24" />
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* focus-visible:ring-[0]：删除自带的聚焦后边框 */}
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center font-normal focus-visible:ring-[0]"
        >
          <Globe className="size-4 max-sm:size-5" />
          <span className="hidden text-sm sm:block">
            {currentLocaleConfig?.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-100">
        {localeConfigs.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleSwitchLocale(lang.code)}
            className={`flex cursor-pointer items-center space-x-3 ${
              currentLocaleConfig?.code === lang.code ? "bg-accent" : ""
            }`}
          >
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
