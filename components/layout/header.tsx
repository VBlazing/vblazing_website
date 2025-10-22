/*
 * @Author: vblazing
 * @Date: 2025-09-05 21:32:17
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-22 20:21:48
 * @Description: 页面顶部
 */
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import LocaleSwitch from "@/components/common/locale_switch";
import ThemeSwitch from "@/components/common/theme_switch";
import LogoMenu from "@/components//common/logo_menu";
import { getNavigate } from "@/lib/navigate";
import { getIcon } from "@/lib/icon";

export default async function Header() {
  const navigate = await getNavigate();

  console.log("navigate: ", navigate);
  return (
    <header className="drop-blur-lg border-border/40 bg-background/90 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-100 w-full border-b font-medium backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-8">
        {/* 标志 */}
        <div className="hidden sm:block">logo</div>
        <LogoMenu className="block sm:hidden" navigate={navigate} />

        {/* 导航栏 */}
        <NavigationMenu
          viewport={false}
          className="absolute left-[50%] hidden -translate-x-[50%] sm:block"
        >
          <NavigationMenuList className="space-x-6">
            {navigate?.map((item) => {
              const Icon = getIcon(item.icon);
              // if (item.hidden) {
              //   return null;
              // }
              console.log("menu item: ", item);
              return (
                <NavigationMenuItem key={item.key}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="flex flex-row items-center"
                    >
                      <Icon className="text-foreground mr-1 h-4 w-4" />
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
