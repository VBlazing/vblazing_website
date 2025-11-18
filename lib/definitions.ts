/*
 * @Author: vblazing
 * @Date: 2025-09-20 22:57:15
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-18 23:02:19
 * @Description: 数据类型定义
 */

export type PageParams<T> = Promise<T>;

export type LocaleParams = { locale: string }

export type HomeHeroInfo = {
  welcome: string
  title: string
  subtitle: string
}

export type BlogSummary = {
  title: string
  content: string
}

export type BlogFilter = {
  search?: string
  category?: number
  labels?: string[]
  state?: number[]
  is_featured?: boolean
}

export type Pagination = {
  page: number
  pageSize: number
}

export type BlogStateKey = 'DRAFT' | 'PUBLISHED' | 'REMOVED' | 'DELETED'
export type BlogState = 1 | 2 | 3 | 4

export type BlogCategoryKey = 'THOUGHTS' | 'TECHNOLOGY' | 'FINANCE' | 'TRAVEL' | 'READING' | 'PERSONAL'
export type BlogCategory = 1 | 2 | 3 | 4 | 5 | 6

export type CategoryInfo = {
  id: BlogCategory
  name: string
}

export type BlogInfo = {
  id: string
  slug: string
  title: string
  introduction: string
  content: string
  author: string
  create_time: string
  last_edited_time: string
  word_count: number
  reading_time: number
  image_url: string
  category_id: BlogCategory
  state: BlogState
  is_featured: boolean
  labels: string[]
}

export type SettingsType = {
  mode: "simple" | "full";
};

export type AboutInfo = {
  avatar: string
  title: string
  subtitle: string
  story: string
  interests: string[]
}