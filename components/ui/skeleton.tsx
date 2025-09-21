/*
 * @Author: vblazing
 * @Date: 2025-09-06 00:42:41
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-21 19:36:54
 * @Description: 骨架屏组件
 */
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
    <div className="bg-home-hero-section relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-12 pb-16 sm:px-8 sm:pt-28 sm:pb-28">
      <Skeleton className="mb-8 h-9 w-60 rounded-full" />
      <Skeleton className="mb-6 h-[7.5rem] w-[20rem] rounded-md sm:h-[5.5rem] sm:w-[55rem]" />
      <Skeleton className="mb-12 h-[8rem] w-[20rem] rounded-md sm:h-[4.8rem] sm:w-[48rem]" />
      <Skeleton className="h-[6rem] w-[20rem] rounded-md sm:h-[3.5rem] sm:w-[18rem]" />
    </div>
  );
}

export { Skeleton, HomeHeroSkeleton };
