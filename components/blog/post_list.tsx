/*
 * @Author: vblazing
 * @Date: 2025-10-14 23:49:39
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-15 23:28:54
 * @Description: 博客列表
 */
import * as motion from "motion/react-client";
import PostCard, { IPostCardPros } from "@/components/common/post_card";
import { PostCategory, CategoryInfo, SettingsType } from "@/lib/definitions";
import { formatPostListWithCategoryName } from "@/lib/formatData";
import { fetchPublishedPostList } from "@/server/data";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { File } from "lucide-react";
import { getTranslations } from "next-intl/server";

export type PostListQuery = {
  search?: string;
  labels?: string[];
  category?: PostCategory;
};

interface IPostListProps {
  query: PostListQuery;
  category_list: CategoryInfo[];
  mode?: SettingsType["mode"];
}

function FullPostList({
  post_list,
}: {
  post_list: IPostCardPros["post_info"][];
}) {
  return (
    <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
      {post_list?.map((item, index) => {
        return (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex"
          >
            <PostCard
              showLabel
              key={item?.id}
              post_info={item}
              className="flex-grow"
              mode="full"
            />
          </motion.article>
        );
      })}
    </div>
  );
}

function SimplePostList({
  post_list,
}: {
  post_list: IPostCardPros["post_info"][];
}) {
  return (
    <div className="flex flex-col space-y-4 sm:space-y-6">
      {post_list?.map((item, index) => {
        return (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex"
          >
            <PostCard
              key={item?.id}
              post_info={item}
              className="flex-grow"
              mode="simple"
            />
          </motion.article>
        );
      })}
    </div>
  );
}

export default async function PostList({
  query,
  category_list,
  mode = "full",
}: IPostListProps) {
  const t = await getTranslations("blog.not_found");
  const post_list = await fetchPublishedPostList({ filter: query });
  const post_list_with_category_name = formatPostListWithCategoryName(
    post_list || [],
    category_list,
  );

  if (!post_list_with_category_name.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto"
      >
        <Empty>
          <EmptyHeader>
            <EmptyMedia
              variant="icon"
              className="text-main-title bg-main-content"
            >
              <File className="size-10 max-sm:size-8" />
            </EmptyMedia>
            <EmptyTitle className="text-main-title">{t("title")}</EmptyTitle>
            <EmptyDescription className="text-main-label">
              {t("description")}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </motion.div>
    );
  }

  if (mode === "simple") {
    return <SimplePostList post_list={post_list_with_category_name} />;
  }

  return <FullPostList post_list={post_list_with_category_name} />;
}
