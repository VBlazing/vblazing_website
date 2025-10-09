/*
 * @Author: vblazing
 * @Date: 2025-09-02 20:01:33
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-21 20:02:38
 * @Description: 工具函数
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * @description: 合并类名
 * @return {*} 合并后的类名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * @description: 延迟
 * @return {*} 延迟后的Promise
 */
export const delay = (time: number) => {
  return new Promise<void>((res) => {
    setTimeout(() => {
      res()
    }, time)
  })
}

/**
 * @description: 抛出错误
 * @return {*} 抛出的错误
 */
export const throwError = () => {
  throw new Error('database error')
}
