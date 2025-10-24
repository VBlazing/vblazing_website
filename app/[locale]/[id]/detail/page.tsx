/*
 * @Author: vblazing
 * @Date: 2025-10-11 12:38:53
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-11 22:55:32
 * @Description: 博客详情页面
 */
import Image from "next/image";
import { notFound } from "next/navigation";
import * as motion from "motion/react-client";
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
    <article className="bg-main-content min-h-screen w-full pb-10 sm:pb-16">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <DetailHeader blog_info={blog_list_with_category_name[0]} />

        {/* Featured Image */}
        {blog_info.image_url && (
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full"
            >
              <Image
                src={blog_info.image_url}
                alt={blog_info.title}
                width={800}
                height={400}
                className="w-full"
              />
            </motion.div>
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-16 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg prose-slate text-main-text"
            dangerouslySetInnerHTML={{ __html: blog_info.content }}
          />
        </div>
      </div>
    </article>
  );
}
