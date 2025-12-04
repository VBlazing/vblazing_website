/*
 * @Author: vblazing
 * @Date: 2025-09-20 22:57:15
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-18 23:22:28
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

export type PostFilter = {
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

export type PostStateKey = 'DRAFT' | 'PUBLISHED' | 'REMOVED' | 'DELETED'
export type PostState = 1 | 2 | 3 | 4

export type PostCategoryKey = 'THOUGHTS' | 'TECHNOLOGY' | 'FINANCE' | 'TRAVEL' | 'READING' | 'PERSONAL'
export type PostCategory = 1 | 2 | 3 | 4 | 5 | 6

export type CategoryInfo = {
  id: PostCategory
  name: string
}

export type PostInfo = {
  id: string
  slug: string
  title: string
  introduction: string
  content: string
  author: string
  create_time: Date
  last_edited_time: Date
  word_count: number
  reading_time: number
  image_url: string
  category_id: PostCategory
  state: PostState
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