/*
 * @Author: vblazing
 * @Date: 2025-10-11 12:38:53
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-11 21:18:35
 * @Description: 博客详情页面
 */
import { notFound } from "next/navigation";
import { fetchCategoryList, fetchPublishedBlogDetail } from "@/server/data";
import { formatBlogListWithCategoryName } from "@/lib/formatData";
import { DetailHeader } from "@/components/detail/detail_header";

type UrlParams = {
  id: string;
};

type UrlSearchParams = {
  query: string;
};

interface IDetailProps {
  params: Promise<UrlParams>;
  searchParams: Promise<UrlSearchParams>;
}

export default async function Detail(props: IDetailProps) {
  const params = await props.params;

  const blog_info = await fetchPublishedBlogDetail(params?.id);
  const category_list = await fetchCategoryList();

  if (!blog_info) {
    notFound();
  }

  const blog_list_with_category_name = formatBlogListWithCategoryName(
    [blog_info],
    category_list || [],
  );

  return (
    <article className="min-h-screen w-full pb-10 sm:pb-16">
      {/* Header */}
      <DetailHeader blog_info={blog_list_with_category_name[0]} />
    </article>
  );
}
