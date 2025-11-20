/*
 * @Author: vblazing
 * @Date: 2025-10-11 20:35:11
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-19 15:50:21
 * @Description:
 */
"use client";

import { PostInfo } from "@/lib/definitions";
import LabelList from "@/components/common/label_list";
import CategoryTag from "@/components/common/category_tag";
import PostDate from "@/components/common/post_date";
import ReadingTime from "@/components/common/reading_time";
import { ShareButton } from "@/components/detail/share_button";

interface IDetailHeaderProps {
  post_info: PostInfo & { category_name: string };
}

export function DetailHeader({ post_info }: IDetailHeaderProps) {
  return (
    <div className="w-full px-6 pt-8 sm:px-8">
      {/* Post Header */}
      <div>
        {/* Title */}
        <div className="mb-6 flex items-center justify-between space-x-10">
          <h1 className="text-main-title text-3xl leading-tight font-medium md:text-4xl lg:text-5xl">
            {post_info.title}
          </h1>
          <ShareButton
            post={post_info}
            className="flex cursor-pointer items-center space-x-2"
          />
        </div>

        {/* Meta Info */}
        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
          <CategoryTag
            category={post_info.category_name}
            className="dark:bg-background bg-[#edf1f6] font-medium opacity-100"
          />
          <PostDate
            date={post_info.last_edited_time}
            className="text-main-text sm:font-medium [&_svg]:size-4"
          />
          <ReadingTime
            time={post_info.reading_time}
            className="text-main-text sm:font-medium [&_svg]:size-4"
          />
        </div>

        {/* Excerpt */}
        {post_info.introduction && (
          <p className="text-main-text max-w-3xl text-base leading-relaxed italic sm:text-xl">
            {post_info.introduction}
          </p>
        )}

        {/* Share Button */}
        <div className="flex flex-wrap gap-2">
          <LabelList
            labels={post_info.labels}
            maxLength={10}
            showIcon={true}
            className="gap-2"
          />
        </div>
      </div>
    </div>
  );
}
