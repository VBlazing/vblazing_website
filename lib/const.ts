/*
 * @Author: vblazing
 * @Date: 2025-10-09 16:31:05
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-12 12:44:35
 * @Description: 常量
 */
import { BlogState, BlogStateKey, BlogCategory, BlogCategoryKey } from "@/lib/definitions";

export enum LOCALE_CODE {
  EN = 'en',
  ZH = 'zh'
}

export const HOST = 'https://blog.vblazing.com'

// `所有`的id
export const ALL = -1

// 博客状态
export const BLOG_STATE: Record<BlogStateKey, BlogState> = {
  DRAFT: 1,
  PUBLISHED: 2,
  REMOVED: 3,
  DELETED: 4
};

// 博客类型
export const BLOG_CATEGORY: Record<BlogCategoryKey, BlogCategory> = {
  THOUGHTS: 1,
  TECHNOLOGY: 2,
  FINANCE: 3,
  TRAVEL: 4,
  READING: 5,
  PERSONAL: 6
}
