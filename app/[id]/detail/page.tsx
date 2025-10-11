/*
 * @Author: vblazing
 * @Date: 2025-10-11 12:38:53
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-11 15:29:27
 * @Description: 博客详情页面
 */
import { notFound } from "next/navigation";
import { fetchPublishedBlogDetail } from "@/server/data";

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
  const searchParams = await props.searchParams;

  const blogInfo = await fetchPublishedBlogDetail(params?.id);
  console.log("blogInfo, ", blogInfo);

  if (!blogInfo) {
    notFound();
  }

  return <div>this is detail</div>;
}
