import { BlogInfo, CategoryInfo } from "@/lib/definitions";

/**
 * @description: 博客数据添加分类名称
 * @return { BlogInfo & { category_name: string }[] } blog_list_with_category_name 包含分类名称的博客数据
 */
export function formatBlogListWithCategoryName(blog_list: BlogInfo[], category_list: CategoryInfo[]) {
  return blog_list.map((item) => ({
    ...item,
    category_name:
      category_list?.find((category) => category.id === item.category_id)
        ?.name || "",
  }));
}