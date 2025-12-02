/*
 * @Author: vblazing
 * @Date: 2025-09-20 22:50:58
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-25 14:18:42
 * @Description: 获取页面数据
 */
import { cache } from 'react';
import { getLocale } from 'next-intl/server';
import { unstable_cache } from 'next/cache';
import { isNotNil } from 'es-toolkit';
import { AboutInfo, PostFilter, PostInfo, BlogSummary, CategoryInfo, HomeHeroInfo, Pagination } from '@/lib/definitions';
import { POST_STATE } from '@/lib/const';
import { normalizeLabels } from '@/lib/utils';
import { parseError } from '@/lib/error';
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
      } catch (error) {
        throw new Error('Failed to fetch category: ' + parseError(error).message);
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
    } catch (error) {
      throw new Error('Failed to fetch labels: ' + parseError(error).message);
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
      } catch (error) {
        throw new Error('Failed to fetch home info: ' + parseError(error).message);
      }
    },
    [locale],
  )()
}

/**
 * @description: 获取博客列表
 * @param {Pagination} pagination 分页信息
 * @param {PostFilter} filter 过滤条件
 * @return {PostInfo[]} 博客列表
 */
export async function fetchPostList({
  pagination,
  filter,
}: {
  pagination?: Pagination
  filter?: PostFilter
}) {
  const { page, pageSize } = pagination ?? {}
  const { category, labels, state, is_featured, search } = filter ?? {}

  try {
    const list = await sql<PostInfo[]>`
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
  } catch (error) {
    throw new Error('Failed to fetch post: ' + parseError(error).message);
  }
}

/**
 * @description: 获取已发布的博客列表
 * @param {Pagination} pagination 分页信息
 * @param {PostFilter} filter 过滤条件
 * @return {PostInfo[]} 博客列表
 */
export const fetchPublishedPostList = unstable_cache(
  (query?: {
    pagination?: Pagination
    filter?: PostFilter
  }) => {
    const { filter } = query ?? {}
    const queryWithState = {
      ...query,
      filter: {
        ...filter,
        state: filter?.state?.length ? filter.state : [POST_STATE.PUBLISHED]
      }
    }
    return fetchPostList(queryWithState)
  },
  [],
  {
    revalidate: 60,
  }
)

/**
 * @description: 获取已发布博客数量
 * @return {number} 已发布博客数量
 */
export const fetchPublishedPostTotal = unstable_cache(
  async () => {
    try {
      const result = await sql<{ count: number }[]>`
        SELECT COUNT(*) FROM post_with_labels
        WHERE state = ${POST_STATE.PUBLISHED}
      `
      console.log('result: ', result)
      return result?.[0]?.count
    } catch (error) {
      throw new Error('Failed to fetch post total: ' + parseError(error).message);
    }
  },
  [],
)

/**
 * @description: 获取博客详情
 * @return {PostInfo} 博客详情
 */
export const fetchPublishedPostDetail =
  cache(async (slug: string) => {
    try {
      const result = await sql<PostInfo[]>`
        SELECT * FROM post_with_labels
        WHERE state = ${POST_STATE.PUBLISHED}
        AND slug = ${slug}
      `
      return result?.[0]
    } catch (error) {
      throw new Error('Failed to fetch post: ' + parseError(error).message);
    }
  })

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
      } catch (error) {
        throw new Error('Failed to fetch blog summaries: ' + parseError(error).message);
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
      } catch (error) {
        throw new Error('Failed to fetch about info: ' + parseError(error).message);
      }
    },
    [locale],
  )()
}


// -------------------- Upload ------------------------

/**
 * @description: 确认标签是否存在，不存在则新增
 * @param {string[]} labels 待确认的标签列表
 * @return {Promise<void>} 无
 */
const ensureLabelsExist = async (labels: string[]) => {
  if (!labels.length) return
  try {
    const existing = await sql<{ id: string }[]>`
      SELECT id FROM labels WHERE id IN ${sql(labels)}
    `
    const existingSet = new Set(existing?.map(item => item.id))
    const newLabels = labels
      .filter(label => !existingSet.has(label))
      .map(label => ({ id: label, name: label }))
    if (newLabels.length) {
      await sql`
        INSERT INTO labels ${sql(newLabels, 'id', 'name')}
      `
    }
  } catch (error) {
    throw new Error('Failed to ensure labels: ' + parseError(error).message);
  }
}

/**
 * @description: 关联标签和文章，自动新增不存在的标签
 * @param {string} postId 文章 ID
 * @param {string[]} labels 标签列表
 * @return {Promise<void>} 无
 */
const attachLabelsToPost = async (postId: string, labels?: string[]) => {
  const normalizedLabels = normalizeLabels(labels)
  if (!normalizedLabels.length) return
  try {
    await ensureLabelsExist(normalizedLabels)
    const relations = normalizedLabels.map(label => ({
      post_id: postId,
      label_id: label,
    }))
    await sql`
      INSERT INTO post_labels ${sql(relations, 'post_id', 'label_id')}
      ON CONFLICT (post_id, label_id) DO NOTHING
    `
  } catch (error) {
    throw new Error('Failed to attach labels to post: ' + parseError(error).message);
  }
}

/**
 * @description 新增文章
 * @param { Omit<PostInfo, 'id' | 'is_featured' | 'labels'> } data 新增的文章
 * @returns null
 */
export const AddPost = async (data: Omit<PostInfo, 'id' | 'is_featured'>) => {
  try {
    const { labels, ...postData } = data
    const result = await sql`
      INSERT INTO posts ${sql(postData, 'slug', 'title', 'introduction', 'content', 'author', 'create_time', 'last_edited_time', 'word_count', 'reading_time', 'image_url', 'category_id', 'state')}
      RETURNING id
    `
    const postId = result?.[0]?.id
    if (postId && labels?.length) {
      await attachLabelsToPost(postId, labels)
    }
    return result
  } catch (error) {
    throw new Error('Failed to add post: ' + parseError(error).message);
  }
}
