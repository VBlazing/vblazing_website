/*
 * @Author: vblazing
 * @Date: 2025-09-20 15:41:47
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-20 17:47:08
 * @Description: 移动端通过logo切换导航
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { INavigateConfig } from "@/lib/navigate";
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
          {/* focus-visible:ring-[0]：删除自带的聚焦后边框 */}
          <Button variant={"ghost"} className="p-0 focus-visible:ring-[0]">
            <div>{openMenu ? <X /> : <Menu />}</div>
            <span>logo</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="m-0 h-screen w-screen border-none px-4">
          {navigate?.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <DropdownMenuItem key={item.key} className="mb-2 font-medium">
                <Link
                  onClick={() => {
                    setOpenMenu(false);
                  }}
                  href={item.href}
                  className="flex flex-row items-center"
                >
                  <Icon className="mr-1 h-4 w-4" />
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
