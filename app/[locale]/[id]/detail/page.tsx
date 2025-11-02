/*
 * @Author: vblazing
 * @Date: 2025-10-11 12:38:53
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-11 22:55:32
 * @Description: 博客详情页面
 */
import type { Metadata, ResolvingMetadata } from "next";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import * as motion from "motion/react-client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { DetailHeader } from "@/components/detail/detail_header";
import { formatBlogListWithCategoryName } from "@/lib/formatData";
import { fetchCategoryList, fetchPublishedBlogDetail } from "@/server/data";

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string; id: string }>;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const locale = await getLocale();
  const params = await props.params;
  const parentMetadata = await parent;

  const blog_info = await fetchPublishedBlogDetail(params?.id);
  const category_list = await fetchCategoryList();

  if (!blog_info) {
    notFound();
  }

  const blog_list_with_category_name = formatBlogListWithCategoryName(
    [blog_info],
    category_list || [],
  );

  const { title, introduction, image_url } =
    blog_list_with_category_name[0] ?? {};

  const images = image_url
    ? [
        {
          url: image_url,
          width: 800,
          height: 600,
        },
      ]
    : parentMetadata?.openGraph?.images;
  return {
    title: {
      absolute: title,
    },
    description: introduction,
    openGraph: {
      images,
      title,
      description: introduction,
      url: "https://blog.vblazing.com",
      siteName: "blog.vblazing",
      locale: locale,
      type: "website",
    },
  };
}

export default async function Detail(
  props: PageProps<"/[locale]/[id]/detail">,
) {
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
        <div className="px-6 py-16 pt-8 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-main-text prose dark:prose-invert"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              components={{
                aside(props) {
                  return (
                    <aside
                      {...props}
                      className="flex gap-2 rounded-xl bg-[#edf1f6] p-4 dark:bg-[#30302e] [&_p]:my-0"
                    />
                  );
                },
              }}
            >
              {blog_info.content}
            </ReactMarkdown>
          </motion.div>
        </div>
      </div>
    </article>
  );
}
