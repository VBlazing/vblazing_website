/*
 * @Author: vblazing
 * @Date: 2025-09-05 21:32:17
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-20 15:30:31
 * @Description: 页面顶部
 */
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import LocaleSwitch from "@/components/common/local_switch";
import ThemeSwitch from "@/components/common/theme_switch";
import { getNavigate } from "@/lib/navigate";

export default async function Header() {
  const navigate = await getNavigate();

  return (
    <header className="drop-blur-lg border-border bg-background sticky top-0 z-50 w-full border-b font-medium">
      <div className="flex h-16 items-center justify-between px-6 sm:px-8">
        {/* 标志 */}
        <div>logo</div>

        {/* 导航栏 */}
        <NavigationMenu viewport={false} className="hidden sm:block">
          <NavigationMenuList className="space-x-6">
            {navigate?.map((item) => {
              return (
                <NavigationMenuItem key={item.key}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="flex flex-row items-center"
                    >
                      <item.icon className="mr-1 h-4 w-4 font-bold" />
                      <span>{item.title}</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* 配置 */}
        <div className="flex items-center justify-between">
          {/* 切换语言 */}
          <LocaleSwitch />
          {/* 切换主题 */}
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
