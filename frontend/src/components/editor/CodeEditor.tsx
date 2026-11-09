"use client";

import { useState } from "react";
import { Bold, Italic, List, Link2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

export type CodeEditorProps = {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export function CodeEditor({
  className,
  value,
  onChange,
  placeholder = "Start writing…",
}: CodeEditorProps) {
  const [internal, setInternal] = useState(value ?? "");
  const text = value ?? internal;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-neutral-400 bg-white",
        className,
      )}
    >
      <div className="flex flex-wrap gap-1 border-b border-neutral-300 bg-neutral-100 px-2 py-2">
        {[Bold, Italic, List, Link2].map((Icon, i) => (
          <Button key={i} type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Icon className="h-4 w-4" />
          </Button>
        ))}
      </div>
      <textarea
        value={text}
        onChange={(e) => {
          setInternal(e.target.value);
          onChange?.(e.target.value);
        }}
        placeholder={placeholder}
        rows={10}
        className="w-full resize-y bg-transparent px-4 py-3 text-400 text-neutral-800 outline-none placeholder:text-neutral-600"
      />
    </div>
  );
}
