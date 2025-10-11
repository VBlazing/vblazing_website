/*
 * @Author: vblazing
 * @Date: 2025-10-11 20:35:11
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-11 22:30:42
 * @Description:
 */
"use client";

import * as motion from "motion/react-client";
import { BlogInfo } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import LabelList from "@/components/common/label_list";
import CategoryTag from "@/components/common/category_tag";
import BlogDate from "@/components/common/blog_date";
import ReadingTime from "@/components/common/reading_time";
import { Share2 } from "lucide-react";

interface IDetailHeaderProps {
  blog_info: BlogInfo & { category_name: string };
}

export function DetailHeader({ blog_info }: IDetailHeaderProps) {
  return (
    <div className="w-full px-6 py-8 sm:px-8">
      {/* Post Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title */}
        <h1 className="text-main-title mb-6 text-3xl leading-tight md:text-4xl lg:text-5xl">
          {blog_info.title}
        </h1>

        {/* Meta Info */}
        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
          <CategoryTag
            category={blog_info.category_name}
            className="bg-featured-img-from font-medium opacity-100"
          />
          <BlogDate
            date={blog_info.last_edited_time}
            className="text-main-text font-medium [&_svg]:size-4"
          />
          <ReadingTime
            time={blog_info.reading_time}
            className="text-main-text font-medium [&_svg]:size-4"
          />
        </div>

        {/* Excerpt */}
        {blog_info.introduction && (
          <p className="text-main-text mb-8 max-w-3xl text-base leading-relaxed sm:text-xl">
            {blog_info.introduction}
          </p>
        )}

        {/* Share Button */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <LabelList
              labels={blog_info.labels}
              maxLength={10}
              showIcon={true}
              className="gap-2"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              console.log("share");
            }}
            className="flex cursor-pointer items-center space-x-2"
          >
            <Share2 />
            <span>Share</span>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
