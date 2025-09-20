/*
 * @Author: vblazing
 * @Date: 2025-09-05 22:08:55
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-20 17:53:03
 * @Description: 更换语言环境前端组件
 */
"use client";

import { useTransition } from "react";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { localeConfigs } from "@/i18n/config";
import { setUserLocale } from "@/i18n/service";

export default function LocaleSwitchClient({
  currentLocaleConfig,
}: {
  currentLocaleConfig: {
    code: string;
    name: string;
  };
}) {
  const [isPending, startTransition] = useTransition();

  const handleSwitchLocale = (value: string) => {
    startTransition(() => {
      setUserLocale(value);
    });
  };

  return isPending ? (
    <Skeleton className="h-[32px] w-[36px] sm:w-[98px]" />
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* focus-visible:ring-[0]：删除自带的聚焦后边框 */}
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center focus-visible:ring-[0]"
        >
          <Globe className="mr-0 h-2 w-2" />
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
