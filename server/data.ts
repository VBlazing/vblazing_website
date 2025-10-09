/*
 * @Author: vblazing
 * @Date: 2025-09-20 22:50:58
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-26 10:10:20
 * @Description: 获取页面数据
 */
import postgres from 'postgres';
import { getUserLocaleConfig } from "@/i18n/service";
import { IBlogFilter, IBlogInfo, IPagination } from '@/lib/definitions';
import { homeHeroInfo } from "./placeholder_data";
import { BLOG_STATE } from '@/lib/const';

const isProduction = process.env.NODE_ENV === 'production'
const sql = postgres(process.env.POSTGRES_URL!, { ssl: isProduction ? 'require' : false })

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
 * @param {IPagination} pagination 分页信息
 * @param {IBlogFilter} filter 过滤条件
 * @return {IBlogInfo[]} 博客列表
 */
export async function fetchBlogList({
  pagination,
  filter,
}: {
  pagination: IPagination
  filter?: IBlogFilter
}) {
  const { page, pageSize } = pagination
  const { category, label, state } = filter ?? {}

  try {
    const list = await sql<IBlogInfo[]>`
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
      ${state ? sql`AND state IN ${sql(state)}` : sql``}
      LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}
    `
    return list
  } catch (e) {
    console.error('Failed to fetch blog:', e);
  }
}

/**
 * @description: 获取已发布的博客列表
 * @param {IPagination} pagination 分页信息
 * @param {IBlogFilter} filter 过滤条件
 * @return {IBlogInfo[]} 博客列表
 */
export async function fetchPublishedBlogList(query: {
  pagination: IPagination
  filter?: IBlogFilter
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