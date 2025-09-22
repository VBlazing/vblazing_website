/*
 * @Author: vblazing
 * @Date: 2025-09-02 20:01:33
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-21 20:02:38
 * @Description: 工具函数
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
