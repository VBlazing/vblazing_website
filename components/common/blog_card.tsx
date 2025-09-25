/*
 * @Author: vblazing
 * @Date: 2025-09-23 15:52:28
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-25 18:44:26
 * @Description: 博客卡片组件
 */
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import CategoryTag from "@/components/common/category_tag";
import FeaturedImage from "@/components/common/featured_image";
import BlogDate from "@/components/common/blog_date";
import ReadingTime from "@/components/common/reading_time";
import LabelList from "@/components/common/label_list";
import { cn } from "@/lib/utils";

// todo: 类型待修改
interface IBlogCardPros {
  blogInfo: {
    id: string;
    title: string;
    content: string;
    category: string;
    lastEditedTime: string;
    readingTime: number;
    image: string;
    labelList: {
      key: string;
      name: string;
    }[];
  };
  showLabel?: boolean;
  className?: string;
}

export default async function BlogCard({
  blogInfo,
  showLabel = false,
  className,
}: IBlogCardPros) {
  const t = await getTranslations("common");

  const {
    id,
    title,
    content,
    category,
    lastEditedTime,
    readingTime,
    image,
    labelList,
  } = blogInfo ?? {};
  return (
    <div
      className={cn(
        "bg-background group @container flex w-full overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-lg",
        className,
      )}
    >
      <div className="flex flex-grow flex-col gap-0 @lg:flex-row">
        {/* 图片 */}
        <div className="relative h-50 w-full overflow-hidden @sm:h-64 @lg:h-auto">
          <Link href={`/detail/${id}`}>
            <CategoryTag
              category={category}
              className="absolute top-3 left-3 z-50"
            />
            <FeaturedImage
              url={image}
              title={title}
              className="group-hover:scale-105"
            />
          </Link>
        </div>
        {/* 博客内容 */}
        <div className="flex w-full flex-grow flex-col justify-between p-6 @sm:p-8">
          <div className="mb-6 flex w-full flex-col justify-center">
            <div className="mb-4 flex items-center space-x-3 text-xs @sm:space-x-5 @sm:text-sm [&_svg]:size-3 @sm:[&_svg]:size-4">
              <BlogDate date={lastEditedTime} />
              <ReadingTime time={readingTime} />
            </div>
            <h3 className="text-main-title mb-2 text-2xl leading-tight font-light @sm:mb-4 @lg:text-3xl">
              <Link href={`/detail/${id}`}>{title}</Link>
            </h3>
            <p className="text-main-text mb-4 line-clamp-3 text-base leading-relaxed overflow-ellipsis @lg:text-lg">
              {content}
            </p>
            {showLabel && <LabelList labelList={labelList} className="mb-4" />}
          </div>
          <Link
            href={`/detail/${id}`}
            className="text-main-title inline-flex items-center space-x-2 font-medium transition-all duration-200 group-hover:translate-x-1"
          >
            <span>{t("read_more")}</span>
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
