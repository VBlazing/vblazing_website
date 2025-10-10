/*
 * @Author: vblazing
 * @Date: 2025-09-20 22:50:58
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-26 10:10:20
 * @Description: 获取页面数据
 */
import postgres from 'postgres';
import { isNotNil } from 'es-toolkit';
import { getUserLocaleConfig } from "@/i18n/service";
import { BlogFilter, BlogInfo, CategoryInfo, Pagination } from '@/lib/definitions';
import { homeHeroInfo } from "./placeholder_data";
import { BLOG_STATE } from '@/lib/const';

const isProduction = process.env.NODE_ENV === 'production'
const sql = postgres(process.env.POSTGRES_URL!, { ssl: isProduction ? 'require' : false })


/**
 * @description: 获取博客类型列表
 * @return {*} homeHeroInfo 主页简介数据
 */
export async function fetchCategoryList() {
  const currentLocaleConfig = await getUserLocaleConfig();
  try {
    const list = await sql<CategoryInfo[]>`
      SELECT category_id AS id, name FROM category_locales
      WHERE locale = ${currentLocaleConfig.code}
    `
    return list
  } catch (e) {
    console.error('Failed to fetch category:', e);
  }
}

/**
 * @description: 获取主页简介数据
 * @return {*} homeHeroInfo 主页简介数据
 */
export async function fetchHomeHeroInfo() {
  const currentLocaleConfig = await getUserLocaleConfig();
  return homeHeroInfo[currentLocaleConfig?.code]
}

/**
 * @description: 获取博客列表
 * @param {Pagination} pagination 分页信息
 * @param {BlogFilter} filter 过滤条件
 * @return {BlogInfo[]} 博客列表
 */
export async function fetchBlogList({
  pagination,
  filter,
}: {
  pagination?: Pagination
  filter?: BlogFilter
}) {
  const { page, pageSize } = pagination ?? {}
  const { category, label, state, is_featured } = filter ?? {}

  try {
    const list = await sql<BlogInfo[]>`
      SELECT * FROM blog_with_labels
      WHERE TRUE
      ${category ? sql`AND category_id = ${category}` : sql``}
      ${label
        ? sql`
          AND id IN (
            SELECT b.id FROM blogs b
            LEFT JOIN blog_labels bl ON b.id = bl.blog_id
            WHERE bl.label_id IN ${sql(label)}
            GROUP BY b.id
          )
        `
        : sql``}
      ${isNotNil(is_featured) ? sql`AND is_featured = ${is_featured}` : sql``}
      ${state ? sql`AND state IN ${sql(state)}` : sql``}
      ${page && pageSize
        ? sql`LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`
        : sql``
      }
    `
    return list
  } catch (e) {
    console.error('Failed to fetch blog:', e);
  }
}

/**
 * @description: 获取已发布的博客列表
 * @param {Pagination} pagination 分页信息
 * @param {BlogFilter} filter 过滤条件
 * @return {BlogInfo[]} 博客列表
 */
export async function fetchPublishedBlogList(query: {
  pagination?: Pagination
  filter?: BlogFilter
}) {
  const { filter } = query
  const queryWithState = {
    ...query,
    filter: {
      ...filter,
      state: filter?.state?.length ? filter.state : [BLOG_STATE.PUBLISHED]
    }
  }
  return fetchBlogList(queryWithState)
}

/**
 * @description: 获取已发布博客数量
 * @return {number} 已发布博客数量
 */
export async function fetchPublishedBlogTotal() {
  try {
    const result = await sql<{ count: number }[]>`
      SELECT COUNT(*) FROM blog_with_labels
      WHERE state = ${BLOG_STATE.PUBLISHED}
    `
    return result?.[0]?.count
  } catch (e) {
    console.error('Failed to fetch blog total:', e);
  }
}