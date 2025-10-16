"use client";

import { useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SettingsType } from "@/lib/definitions";
import { setSettings } from "@/lib/settings";

export default function Settings({
  defaultValue,
}: {
  defaultValue: SettingsType;
}) {
  const [checked, setChecked] = useState<boolean>(
    defaultValue.mode === "simple",
  );

  const handleChecked = () => {
    setChecked((checked) => !checked);
    setSettings({ mode: !checked ? "simple" : "full" });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="focus-visible:ring-[0]">
          <SettingsIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto">
        <div
          onClick={handleChecked}
          className="flex cursor-pointer items-center gap-2 pr-4 text-sm font-medium"
        >
          <Switch checked={checked} />
          <span>Simple Mode</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
