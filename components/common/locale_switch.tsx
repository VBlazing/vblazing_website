/*
 * @Author: vblazing
 * @Date: 2025-09-05 22:08:55
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-15 22:52:07
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
import { defaultLocaleConfig, localeConfigs } from "@/i18n/config";
import { setUserLocale } from "@/i18n/service";

export default function LocaleSwitchClient() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const currentLocaleConfig =
    localeConfigs.find((item) => item.code === locale) ?? defaultLocaleConfig;

  const handleSwitchLocale = (value: string) => {
    startTransition(() => {
      setUserLocale(value);
    });
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
          <Globe />
          <span className="hidden text-sm sm:block">
            {currentLocaleConfig.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {localeConfigs.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleSwitchLocale(lang.code)}
            className={`flex cursor-pointer items-center space-x-3 ${
              currentLocaleConfig.code === lang.code ? "bg-accent" : ""
            }`}
          >
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
