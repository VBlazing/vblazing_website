/*
 * @Author: vblazing
 * @Date: 2025-10-14 13:20:32
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-14 22:43:29
 * @Description: 查询组件
 */
"use client";

import { SearchIcon, X } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

interface ISearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Search({ value, onChange }: ISearchProps) {
  const t = useTranslations("common");

  const handleClear = () => {
    onChange("");
  };

  return (
    <InputGroup>
      <InputGroupInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("search_post")}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      {!!value && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            className="cursor-pointer"
            onClick={handleClear}
          >
            <X />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
