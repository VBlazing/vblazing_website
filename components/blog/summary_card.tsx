/*
 * @Author: vblazing
 * @Date: 2025-10-14 13:21:09
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-14 23:29:03
 * @Description: 博客纵览卡片
 */
export default function SummaryCard({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="flex w-full flex-col rounded-2xl border bg-white px-6 py-4 shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-[#15181c]">
      <div className="text-main-title mb-2 w-full text-start font-medium">
        {title}
      </div>
      <div className="text-main-text w-full text-start text-sm">{content}</div>
    </div>
  );
}
