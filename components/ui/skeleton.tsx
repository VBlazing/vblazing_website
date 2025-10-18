/*
 * @Author: vblazing
 * @Date: 2025-09-06 00:42:41
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-15 23:17:27
 * @Description: 骨架屏组件
 */
import { SettingsType } from "@/lib/definitions";
import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

// 主页简介骨架屏
function HomeHeroSkeleton() {
  return (
    <div className="bg-home-hero-section relative mx-auto flex w-full flex-col items-center px-6 pt-12 pb-16 sm:px-8 sm:pt-28 sm:pb-28">
      <Skeleton className="mb-8 h-9 w-60 rounded-full" />
      <Skeleton className="mb-6 h-[7.5rem] w-[20rem] rounded-md sm:h-[5.5rem] sm:w-[55rem]" />
      <Skeleton className="mb-12 h-[8rem] w-[20rem] rounded-md sm:h-[4.8rem] sm:w-[48rem]" />
      <Skeleton className="h-[6rem] w-[20rem] rounded-md sm:h-[3.5rem] sm:w-[18rem]" />
    </div>
  );
}

function BlogCardSkeleton() {
  return (
    <div className="@container flex w-full rounded-2xl border bg-white not-first:hidden sm:not-first:block dark:bg-[#15181c]">
      <div className="flex flex-grow flex-col gap-0 @lg:flex-row">
        <div className="h-50 w-full p-4 @sm:h-64 @lg:h-auto">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="flex w-full flex-col justify-between p-4">
          <Skeleton className="mb-4 h-4 w-[25%]" />
          <Skeleton className="mb-4 h-6 w-full" />
          <Skeleton className="mb-4 h-16 w-[75%]" />
          <Skeleton className="mb-4 h-4 w-full" />
        </div>
      </div>
    </div>
  );
}

function SimpleBlogCardSkeleton() {
  return (
    <div
      className={
        "flex items-center justify-between rounded-sm border bg-white p-4 dark:bg-[#15181c]"
      }
    >
      <div className="flex w-full gap-4">
        <Skeleton className="h-6 w-12" />
        <Skeleton className="h-6 w-[75%]" />
      </div>
      <Skeleton className="h-6 w-12 flex-shrink-0" />
    </div>
  );
}

function BlogListSkeleton({ mode = "full" }: { mode?: SettingsType["mode"] }) {
  if (mode === "simple") {
    return (
      <div className="flex flex-col gap-6">
        <SimpleBlogCardSkeleton />
        <SimpleBlogCardSkeleton />
        <SimpleBlogCardSkeleton />
        <SimpleBlogCardSkeleton />
        <SimpleBlogCardSkeleton />
      </div>
    );
  }
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <BlogCardSkeleton />
      <BlogCardSkeleton />
      <BlogCardSkeleton />
      <BlogCardSkeleton />
      <BlogCardSkeleton />
      <BlogCardSkeleton />
    </div>
  );
}

function RecentBlogSkeleton() {
  return (
    <div className="mx-auto mb-20 w-full max-w-6xl px-6 sm:px-8">
      <Skeleton className="mx-auto mb-10 h-10 w-[50%] sm:h-16 sm:w-[25%]" />
      <BlogListSkeleton />
    </div>
  );
}

export {
  Skeleton,
  HomeHeroSkeleton,
  BlogCardSkeleton,
  BlogListSkeleton,
  RecentBlogSkeleton,
};
