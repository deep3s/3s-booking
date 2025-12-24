"use client";

import * as React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Input } from "./input";
import { cn } from "./utils";
import { useLazyGetSuggestionsQuery, Suggestion } from "../../services/olaMaps.api";

interface AutocompleteProps {
  value?: string;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
  onSelect?: (item: Suggestion) => void;
  debounceMs?: number;
}

export function Autocomplete({
  value = "",
  placeholder,
  className,
  onChange,
  onSelect,
  debounceMs = 300,
}: AutocompleteProps) {
  const [inputValue, setInputValue] = React.useState(value??'');
  const [open, setOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);
  const triggerRef = React.useRef<HTMLInputElement | null>(null);
  const listRef = React.useRef<HTMLUListElement | null>(null);

  const [fetchSuggestions, { data: suggestions = [], isFetching }] = useLazyGetSuggestionsQuery();

  // keep internal value in sync if parent controls it
  React.useEffect(() => {
    setInputValue(value);
    // Only open dropdown if input is focused (not just on value change)
    if (triggerRef.current && document.activeElement === triggerRef.current) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [value]);

  // Only open dropdown on input click (focus), not on typing
  const handleInputFocus = () => {
    if (inputValue.trim()) {
      fetchSuggestions(inputValue);
      setOpen(true);
    } else {
      setOpen(true); // open even if empty, for UX consistency
    }
  };

  // Remove automatic opening on input change
  React.useEffect(() => {
    if (!inputValue.trim()) {
      setHighlightedIndex(-1);
      return;
    }
    // Only fetch, do not open dropdown
    const id = setTimeout(() => {
      fetchSuggestions(inputValue);
      // setOpen(true); // removed: do not open on typing
    }, debounceMs);
    return () => clearTimeout(id);
  }, [inputValue, debounceMs]);

  // when suggestions change, reset highlighted index and keep focus on input
  React.useEffect(() => {
    setHighlightedIndex(suggestions.length ? 0 : -1);
    if (suggestions.length && triggerRef.current) {
      // ensure the input keeps focus when suggestions arrive
      try {
        triggerRef.current.focus();
      } catch (e) {
        // ignore
      }
    }
  }, [suggestions]);

  const handleInputChange = (val: string) => {
    setInputValue(val);
    onChange?.(val);
  };

  const handleSelect = (item: Suggestion) => {
    const label = item.description || "";
    setInputValue(label);
    setOpen(false);
    onSelect?.(item);
    // return focus to input after selection
    setTimeout(() => triggerRef.current?.focus(), 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || !suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(suggestions.length - 1, i + 1));
      scrollHighlightedIntoView();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(0, i - 1));
      scrollHighlightedIntoView();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = suggestions[highlightedIndex];
      if (item) handleSelect(item);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const scrollHighlightedIntoView = () => {
    const list = listRef.current;
    const idx = highlightedIndex;
    if (!list || idx < 0) return;
    const item = list.children[idx] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Input
            ref={triggerRef as any}
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn("pl-10 border-[#d4af37]/30 focus:border-[#d4af37] dark:bg-black/50 dark:text-white dark:placeholder:text-white/40 cream:bg-white cream:text-foreground cream:placeholder:text-foreground/40", className)}
            onFocus={handleInputFocus}
          />
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-full max-w-md p-0 border-[#d4af37]/30 dark:bg-zinc-900 cream:bg-white"
        align="start"
        // prevent Radix from moving focus to the content when it opens
        onOpenAutoFocus={(e: any) => e.preventDefault()}
      >
        <div className="divide-y">
          <div className="p-2">
            {isFetching && <div className="text-sm text-muted-foreground">Loading...</div>}
            {!isFetching && !suggestions.length && (inputValue??'').trim() && (
              <div className="text-sm text-muted-foreground">No results</div>
            )}
          </div>

          <ul
            ref={listRef}
            role="listbox"
            aria-label="Suggestions"
            className="max-h-60 overflow-y-auto p-1 space-y-1"
            style={{
              scrollbarColor: '#d4af37 #f5f1e8', // thumb, track
              scrollbarWidth: 'thin',
            }}
          >
            {suggestions.map((s: Suggestion, idx: number) => (
              <li
                key={s.place_id || s.description}
                role="option"
                aria-selected={idx === highlightedIndex}
                onMouseDown={(ev) => ev.preventDefault()} /* prevent blur before click */
                onClick={() => handleSelect(s)}
                onMouseEnter={() => setHighlightedIndex(idx)}
                className={cn(
                  "cursor-pointer px-3 py-2 rounded-md text-sm",
                  idx === highlightedIndex ? "bg-[#d4af37]/20 text-[#d4af37]" : "hover:bg-gray-100 dark:hover:bg-zinc-800",
                )}
              >
                {s.description}
              </li>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}
