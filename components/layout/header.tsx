/*
 * @Author: vblazing
 * @Date: 2025-09-05 21:32:17
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-06 00:46:43
 * @Description: 页面顶部
 */
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import LocaleSwitch from "@/components/common/local_switch";

export default function Header() {
  const t = useTranslations("header");
  return (
    <header className="drop-blur-lg sticky top-0 z-50 w-full border-b border-gray-100 bg-white font-bold">
      <div className="flex h-16 items-center justify-between px-6 sm:px-8">
        {/* 标志 */}
        <div>logo</div>

        {/* 导航栏 */}
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            {/* 主页 */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/">{t("header_home")}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* 配置 */}
        <div>
          {/* 切换语言 */}
          <LocaleSwitch />
          {/* 切换主题 */}
          <div></div>
        </div>
      </div>
    </header>
  );
}
