/*
 * @Author: vblazing
 * @Date: 2025-10-14 13:20:38
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-14 22:39:58
 * @Description: 搜索功能区
 */
"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import LabelFilter from "@/components/common/label_filter";
import Search from "@/components/common/search";
import { Button } from "@/components/ui/button";

interface ISearchBarProps {
  labels?: string[];
}

export default function SearchBar({ labels }: ISearchBarProps) {
  const t = useTranslations("blog");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchLabels = searchParams.get("labels");
  const [searchValue, setSearchValue] = useState<string>(
    searchParams.get("search") || "",
  );
  const [labelValue, setLabelValue] = useState<string[]>(
    searchLabels ? searchLabels.split(",") : [],
  );

  const createQuery = useDebouncedCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleChangeSearch = (value: string) => {
    setSearchValue(value);
    createQuery("search", value);
  };

  const handleChangeLabels = (value: string[]) => {
    setLabelValue(value);
    createQuery("labels", value.join(","));
  };

  const handleClearAll = () => {
    setSearchValue("");
    setLabelValue([]);
    replace(pathname);
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-2 sm:flex-row">
      <Search value={searchValue} onChange={handleChangeSearch} />
      <div className="flex w-full gap-2 sm:w-auto">
        {!!labels?.length && (
          <LabelFilter
            labels={labels}
            value={labelValue}
            onChange={handleChangeLabels}
            className="flex-1"
          />
        )}
        {!!(searchValue || labelValue.length) && (
          <Button
            className="flex-1 cursor-pointer"
            variant="outline"
            onClick={handleClearAll}
          >
            {t("clear_all")}
          </Button>
        )}
      </div>
    </div>
  );
}
