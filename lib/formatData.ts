/*
 * @Author: VBlazing
 * @Date: 2025-10-09 21:09:42
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-18 23:25:57
 * @Description: format utils
 */
import { PostInfo, CategoryInfo } from "@/lib/definitions";

/**
 * @description: 博客数据添加分类名称
 * @return { PostInfo & { category_name: string }[] } post_list_with_category_name 包含分类名称的博客数据
 */
export function formatPostListWithCategoryName(post_list: PostInfo[], category_list: CategoryInfo[]) {
  return post_list.map((item) => ({
    ...item,
    category_name:
      category_list?.find((category) => category.id === item.category_id)
        ?.name || "",
  }));
}