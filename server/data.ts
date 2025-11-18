/*
 * @Author: vblazing
 * @Date: 2025-09-20 22:50:58
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-18 23:01:22
 * @Description: 获取页面数据
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cache } from 'react';
import { getLocale } from 'next-intl/server';
import { unstable_cache } from 'next/cache';
import { isNotNil } from 'es-toolkit';
import { AboutInfo, BlogFilter, BlogInfo, BlogSummary, CategoryInfo, HomeHeroInfo, Pagination } from '@/lib/definitions';
import { BLOG_STATE } from '@/lib/const';
import { sql } from './client'

/**
 * @description: 获取博客类型列表
 * @return {CategoryInfo[]} 博客类型列表
 */
export const fetchCategoryList = async () => {
  const locale = await getLocale()
  return unstable_cache(
    async () => {
      try {
        const list = await sql<CategoryInfo[]>`
          SELECT category_id AS id, name FROM category_locales
          WHERE locale = ${locale}
        `
        return list
      } catch (e: any) {
        throw new Error('Failed to fetch category: ' + e.message);
      }
    },
    [locale],
  )()
}

/**
 * @description: 获取博客标签列表
 * @return {string[]} 博客标签列表
 */
export const fetchLabelList = unstable_cache(
  async () => {
    try {
      const list = await sql<{ id: string }[]>`SELECT id FROM labels`
      return list?.map(item => item.id)
    } catch (e: any) {
      throw new Error('Failed to fetch labels: ' + e.message);
    }
  },
  [],
)

/**
 * @description: 获取主页简介数据
 * @return {HomeHeroInfo} 主页简介数据
 */
export const fetchHomeHeroInfo = async () => {
  const locale = await getLocale()
  return unstable_cache(
    async () => {
      try {
        const result = await sql<HomeHeroInfo[]>`
          SELECT welcome, title, subtitle FROM home_info
          WHERE locale = ${locale}
        `
        return result?.[0]
      } catch (e: any) {
        throw new Error('Failed to fetch home info: ' + e.message);
      }
    },
    [locale],
  )()
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
  const { category, labels, state, is_featured, search } = filter ?? {}

  try {
    const list = await sql<BlogInfo[]>`
      SELECT * FROM post_with_labels
      WHERE TRUE
      ${search
        ? sql`
          AND (
            title LIKE ${'%' + search + '%'}
            OR content LIKE ${'%' + search + '%'}
            OR introduction LIKE ${'%' + search + '%'}
          )
        `
        : sql``}
      ${category ? sql`AND category_id = ${category}` : sql``}
      ${labels
        ? sql`
          AND id IN (
            SELECT DISTINCT p.id FROM posts p
            LEFT JOIN post_labels pl ON p.id = pl.post_id
            WHERE pl.label_id IN ${sql(labels)}
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
  } catch (e: any) {
    throw new Error('Failed to fetch post: ' + e.message);
  }
}

/**
 * @description: 获取已发布的博客列表
 * @param {Pagination} pagination 分页信息
 * @param {BlogFilter} filter 过滤条件
 * @return {BlogInfo[]} 博客列表
 */
export const fetchPublishedBlogList = unstable_cache(
  (query?: {
    pagination?: Pagination
    filter?: BlogFilter
  }) => {
    const { filter } = query ?? {}
    const queryWithState = {
      ...query,
      filter: {
        ...filter,
        state: filter?.state?.length ? filter.state : [BLOG_STATE.PUBLISHED]
      }
    }
    return fetchBlogList(queryWithState)
  },
  [],
)

/**
 * @description: 获取已发布博客数量
 * @return {number} 已发布博客数量
 */
export const fetchPublishedBlogTotal = unstable_cache(
  async () => {
    try {
      const result = await sql<{ count: number }[]>`
        SELECT COUNT(*) FROM post_with_labels
        WHERE state = ${BLOG_STATE.PUBLISHED}
      `
      return result?.[0]?.count
    } catch (e: any) {
      throw new Error('Failed to fetch blog total: ' + e.message);
    }
  },
  [],
)

/**
 * @description: 获取博客详情
 * @return {BlogInfo} 博客详情
 */
export const fetchPublishedBlogDetail = unstable_cache(
  cache(async (slug: string) => {
    try {
      const result = await sql<BlogInfo[]>`
        SELECT * FROM post_with_labels
        WHERE state = ${BLOG_STATE.PUBLISHED}
        AND slug = ${slug}
      `
      return result?.[0]
    } catch (e: any) {
      throw new Error('Failed to fetch blog: ' + e.message);
    }
  }),
  []
)

/**
 * @description: 获取博客概览信息
 * @return {BlogSummary[]} 博客概览信息
 */
export const fetchBlogSummaries = async () => {
  const locale = await getLocale()
  return unstable_cache(
    async () => {
      try {
        const result = await sql<BlogSummary[]>`
          SELECT title, content FROM blog_summaries
          WHERE locale = ${locale}
        `
        return result
      } catch (e: any) {
        throw new Error('Failed to fetch blog summaries: ' + e.message);
      }
    },
    [locale],
  )()
}

/**
 * @description: 获取关于我信息
 * @return {AboutInfo[]} 关于我信息
 */
export const fetchAboutInfo = async () => {
  const locale = await getLocale()
  return unstable_cache(
    async () => {
      try {
        const result = await sql<AboutInfo[]>`
          SELECT avatar, title, subtitle, story, interests FROM about_me
          WHERE locale = ${locale}
        `
        return result[0]
      } catch (e: any) {
        throw new Error('Failed to fetch about info: ' + e.message);
      }
    },
    [locale],
  )()
}