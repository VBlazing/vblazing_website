/*
 * @Author: vblazing
 * @Date: 2025-09-17 01:16:04
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-24 01:11:51
 * @Description: 更换主题组件
 */
"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

enum THEME {
  LIGHT = "light",
  DARK = "dark",
}

export default function ThemeSwitch() {
  const { setTheme } = useTheme();

  const handleSwitchTheme = () => {
    setTheme((theme) => {
      return theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
    });
  };

  return (
    <Button size="icon" variant={"ghost"} onClick={handleSwitchTheme}>
      <Sun className="size-4 scale-100 rotate-0 transition-all max-sm:size-5 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-4 scale-0 rotate-90 transition-all max-sm:size-5 dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
