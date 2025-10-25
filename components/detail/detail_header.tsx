/*
 * @Author: vblazing
 * @Date: 2025-10-11 20:35:11
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-11 22:30:42
 * @Description:
 */
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import * as motion from "motion/react-client";
import { Share2 } from "lucide-react";
import { BlogInfo } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import LabelList from "@/components/common/label_list";
import CategoryTag from "@/components/common/category_tag";
import BlogDate from "@/components/common/blog_date";
import ReadingTime from "@/components/common/reading_time";

interface IDetailHeaderProps {
  blog_info: BlogInfo & { category_name: string };
}

export function DetailHeader({ blog_info }: IDetailHeaderProps) {
  const t = useTranslations("detail");
  const [shareLoading, setShareLoading] = useState(false);

  const handleShare = async () => {
    if (navigator.share && blog_info) {
      setShareLoading(true);
      try {
        await navigator.share({
          title: blog_info.title,
          text: blog_info.introduction,
          url: window.location.href,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        // 20 为 DOMException 中的 AbortError，代表用户取消分享
        if (e.code === 20) {
          toast.info(t("cancel_share"));
        } else {
          toast.warning(t("failed_share"), {
            richColors: true,
            description: e.message,
          });
        }
      } finally {
        setShareLoading(false);
      }
    } else {
      // Fallback: copy URL to clipboard
      toast.info(t("copy_clipboard"));
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="w-full px-6 py-8 sm:px-8">
      {/* Post Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title */}
        <div className="mb-6 flex items-center justify-between space-x-10">
          <h1 className="text-main-title text-2xl leading-tight md:text-4xl lg:text-5xl">
            {blog_info.title}
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            disabled={shareLoading}
            className="flex cursor-pointer items-center space-x-2"
          >
            <Share2 />
            <span>{t("share")}</span>
          </Button>
        </div>

        {/* Meta Info */}
        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
          <CategoryTag
            category={blog_info.category_name}
            className="dark:bg-background bg-[#edf1f6] font-medium opacity-100"
          />
          <BlogDate
            date={blog_info.last_edited_time}
            className="text-main-text sm:font-medium [&_svg]:size-4"
          />
          <ReadingTime
            time={blog_info.reading_time}
            className="text-main-text sm:font-medium [&_svg]:size-4"
          />
        </div>

        {/* Excerpt */}
        {blog_info.introduction && (
          <p className="text-main-text mb-8 max-w-3xl text-base leading-relaxed italic sm:text-xl">
            {blog_info.introduction}
          </p>
        )}

        {/* Share Button */}
        <div className="flex flex-wrap gap-2">
          <LabelList
            labels={blog_info.labels}
            maxLength={10}
            showIcon={true}
            className="gap-2"
          />
        </div>
      </motion.div>
    </div>
  );
}
