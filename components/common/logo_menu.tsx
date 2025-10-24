/*
 * @Author: vblazing
 * @Date: 2025-09-20 15:41:47
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-24 21:41:42
 * @Description: 移动端通过logo切换导航
 */
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { INavigateConfig } from "@/lib/navigate";
import { Link } from "@/lib/i18n/navigation";
import { getIcon } from "@/lib/icon";

export default function LogoMenu({
  navigate,
  className,
}: {
  navigate: INavigateConfig[];
  className?: string;
}) {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu((state) => !state);
  };
  return (
    <div className={className}>
      <DropdownMenu open={openMenu} onOpenChange={handleOpenMenu}>
        <DropdownMenuTrigger asChild>
          {/* todo: 待整理*/}
          {/* focus-visible:ring-[0]：删除自带的聚焦后边框 */}
          <Button variant={"ghost"} className="p-0 focus-visible:ring-[0]">
            <div>
              {openMenu ? (
                <X className="max-sm:size-5" />
              ) : (
                <Menu className="max-sm:size-5" />
              )}
            </div>
            <span className="text-lg">logo</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-100 m-0 h-screen w-screen border-none px-4">
          {navigate?.map((item) => {
            const Icon = getIcon(item.icon);
            if (item.hidden) {
              return null;
            }
            return (
              <DropdownMenuItem
                key={item.key}
                className="mb-2 p-2 text-lg font-medium"
              >
                <Link
                  onClick={() => {
                    setOpenMenu(false);
                  }}
                  href={item.href}
                  className="flex flex-row items-center space-x-2"
                >
                  <Icon className="text-foreground size-5" />
                  <span>{item.title}</span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
