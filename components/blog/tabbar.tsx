"use client";

import { CategoryInfo, SettingsType } from "@/lib/definitions";
import CategoryFilter from "@/components/common/category_filter";
import Settings from "@/components/common/settings";

interface ITabBar {
  settings: SettingsType;
  category_list: CategoryInfo[];
}
export default function Tabbar({ settings, category_list }: ITabBar) {
  return (
    <div className="flex items-center justify-between sm:block">
      {/* Filter */}
      {!!category_list?.length && (
        <div className="mb-6 sm:mb-4">
          <CategoryFilter category_list={category_list} />
        </div>
      )}

      {/* Settings */}
      <div className="mb-6 flex justify-end sm:mb-4 sm:w-full">
        <Settings defaultValue={settings} />
      </div>
    </div>
  );
}
