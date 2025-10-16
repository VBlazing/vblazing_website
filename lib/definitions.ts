/*
 * @Author: vblazing
 * @Date: 2025-09-20 22:57:15
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-15 13:56:11
 * @Description: 数据类型定义
 */

export type HomeHeroInfo = {
  welcome: string
  title: string
  subtitle: string
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
  title: string
  content: string
  introduction: string
  create_time: string
  last_edited_time: string
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
