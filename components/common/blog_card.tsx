/*
 * @Author: vblazing
 * @Date: 2025-09-23 15:52:28
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-25 00:10:33
 * @Description: 博客卡片组件
 */
import { JSX } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import CategoryTag from "@/components/common/category_tag";
import FeaturedImage from "@/components/common/featured_image";
import BlogDate from "@/components/common/blog_date";
import ReadingTime from "@/components/common/reading_time";
import LabelList from "@/components/common/label_list";
import { cn } from "@/lib/utils";
import { BlogInfo, SettingsType } from "@/lib/definitions";
import { getBlogDetailUrl } from "@/lib/navigate";
import { Link } from "@/lib/i18n/navigation";

export interface IBlogCardPros {
  blog_info: BlogInfo & { category_name: string };
  mode?: SettingsType["mode"];
  showLabel?: boolean;
  className?: string;
  labelMaxLength?: number;
}

function SimpleBlogCard({
  blog_info,
  className,
}: Omit<IBlogCardPros, "showLabel" | "labelMaxLength" | "mode">) {
  const t = useTranslations("common");
  const { id, title, content, introduction, category_name, last_edited_time } =
    blog_info ?? {};
  const blogDetailUrl = getBlogDetailUrl(id);
  return (
    <Link href={blogDetailUrl} className="w-full">
      <div
        className={cn(
          "group flex items-center justify-between space-x-0 rounded-sm border bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg sm:space-x-4 dark:bg-[#15181c]",
          className,
        )}
      >
        <div className="flex max-sm:w-full max-sm:flex-col sm:items-center">
          <div className="flex items-center max-sm:mb-3 max-sm:max-w-full sm:mr-4 sm:flex-shrink-0">
            <CategoryTag
              category={category_name}
              className="bg-featured-img-from mr-4 flex-shrink-0 rounded-sm font-medium opacity-100"
            />
            <div className="flex flex-grow items-end justify-between gap-3 max-sm:min-w-0 max-sm:flex-shrink">
              <h3 className="text-main-title flex-shrink leading-tight break-words max-sm:min-w-0">
                {title}
              </h3>
              <div className="flex-shrink-0 text-xs [&_svg]:size-3">
                <BlogDate date={last_edited_time} />
              </div>
            </div>
          </div>
          <p className="text-main-text line-clamp-2 max-w-xl overflow-hidden text-sm overflow-ellipsis italic sm:line-clamp-1">
            {introduction || content}
          </p>
        </div>
        <div className="hidden flex-shrink-0 items-center gap-2 text-sm transition-all duration-200 group-hover:translate-x-1 sm:flex">
          <span>{t("read_more")}</span>
          <ArrowRight className="size-4" />
        </div>
      </div>
    </Link>
  );
}

function FullBlogCard({
  blog_info,
  showLabel = false,
  className,
  labelMaxLength = 3,
}: IBlogCardPros) {
  const t = useTranslations("common");

  const {
    id,
    title,
    content,
    introduction,
    category_name,
    last_edited_time,
    reading_time,
    image_url,
    labels,
  } = blog_info ?? {};
  const blogDetailUrl = getBlogDetailUrl(id);
  return (
    <div
      className={cn(
        "group @container flex w-full overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-[#15181c]",
        className,
      )}
    >
      <div className="flex flex-grow flex-col gap-0 @lg:flex-row">
        {/* 图片 */}
        <div className="relative h-50 w-full overflow-hidden @sm:h-64 @lg:h-auto">
          <Link href={blogDetailUrl}>
            <CategoryTag
              category={category_name}
              className="absolute top-3 left-3 z-1"
            />
            <FeaturedImage
              url={image_url}
              title={title}
              className="group-hover:scale-105"
            />
          </Link>
        </div>
        {/* 博客内容 */}
        <div className="flex w-full flex-grow flex-col justify-between p-6 @sm:p-8">
          <div className="mb-6 flex w-full flex-col justify-center">
            <div className="mb-4 flex items-center space-x-3 text-xs @sm:space-x-5 @sm:text-sm [&_svg]:size-3 @sm:[&_svg]:size-4">
              <BlogDate date={last_edited_time} />
              <ReadingTime time={reading_time} />
            </div>
            <h3 className="text-main-title mb-2 text-2xl leading-tight @sm:mb-4 @lg:text-3xl">
              <Link href={blogDetailUrl}>{title}</Link>
            </h3>
            <p className="text-main-text mb-4 line-clamp-3 text-base leading-relaxed overflow-ellipsis italic @lg:text-lg">
              {introduction || content}
            </p>
            {showLabel && (
              <LabelList
                labels={labels}
                maxLength={labelMaxLength}
                className="mb-4"
              />
            )}
          </div>
          <Link
            href={blogDetailUrl}
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

function BlogCard(
  props: Omit<IBlogCardPros, "mode"> & { mode?: "full" },
): Promise<JSX.Element>;
function BlogCard(
  props: Omit<IBlogCardPros, "showLabel" | "labelMaxLength" | "mode"> & {
    mode?: "simple";
  },
): Promise<JSX.Element>;
async function BlogCard({ mode = "full", ...restProps }: IBlogCardPros) {
  if (mode === "simple") {
    return (
      <SimpleBlogCard
        blog_info={restProps.blog_info}
        className={restProps.className}
      />
    );
  }
  return <FullBlogCard {...restProps} />;
}

export default BlogCard;
