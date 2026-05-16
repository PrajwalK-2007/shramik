import { Input } from "@/components/ui/input";
import { useGlobalTranslation } from "@/hooks/useTranslation";
import { PROFESSIONS } from "@/types";
import type { Profession } from "@/types";
import { ChevronDown, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ProfessionSelectProps {
  value: Profession | "";
  onChange: (value: Profession) => void;
  customValue?: string;
  onCustomChange?: (value: string) => void;
  error?: string;
}

export function ProfessionSelect({
  value,
  onChange,
  customValue = "",
  onCustomChange,
  error,
}: ProfessionSelectProps) {
  const { t } = useGlobalTranslation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = PROFESSIONS.filter((p) =>
    p.label.toLowerCase().includes(search.toLowerCase()),
  );

  const constructionProfessions = filtered.filter(
    (p) => p.group === "construction",
  );
  const nonConstructionProfessions = filtered.filter(
    (p) => p.group === "non-construction",
  );

  const selectedLabel = value
    ? (PROFESSIONS.find((p) => p.value === value)?.label ?? value)
    : t("worker.selectProfession");

  return (
    <div className="space-y-2">
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md border text-sm transition-smooth ${
            error ? "border-destructive" : "border-input"
          } bg-card hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring/30`}
          aria-haspopup="listbox"
          aria-expanded={open}
          data-ocid="profession_select.trigger"
        >
          <span className={value ? "text-foreground" : "text-muted-foreground"}>
            {selectedLabel}
          </span>
          <div className="flex items-center gap-1">
            {value && (
              <button
                type="button"
                aria-label="Clear"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("" as Profession);
                }}
                className="p-0.5 rounded hover:bg-muted"
              >
                <X className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            )}
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-smooth ${open ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        {open && (
          <div
            className="absolute z-50 mt-1 w-full bg-card border border-border rounded-md shadow-elevated max-h-72 overflow-hidden flex flex-col"
            tabIndex={-1}
            data-ocid="profession_select.dropdown"
          >
            <div className="p-2 border-b border-border">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t("common.search")}
                  className="w-full pl-8 pr-3 py-1.5 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  data-ocid="profession_select.search_input"
                />
              </div>
            </div>

            <div className="overflow-y-auto flex-1">
              {constructionProfessions.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground bg-muted/50 sticky top-0">
                    🏗️ {t("worker.group.construction")}
                  </div>
                  {constructionProfessions.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      aria-selected={value === p.value}
                      onClick={() => {
                        onChange(p.value);
                        setOpen(false);
                        setSearch("");
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-smooth ${
                        value === p.value
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              )}

              {nonConstructionProfessions.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground bg-muted/50 sticky top-0">
                    🛠️ {t("worker.group.non-construction")}
                  </div>
                  {nonConstructionProfessions.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      aria-selected={value === p.value}
                      onClick={() => {
                        onChange(p.value);
                        setOpen(false);
                        setSearch("");
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-smooth ${
                        value === p.value
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              )}

              {filtered.length === 0 && (
                <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                  {t("common.noResults")}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Custom profession input when 'Other' selected */}
      {value === "Other" && (
        <Input
          value={customValue}
          onChange={(e) => onCustomChange?.(e.target.value)}
          placeholder={t("worker.professionOther")}
          className="mt-2"
          data-ocid="profession_select.custom_input"
        />
      )}

      {error && (
        <p
          className="text-xs text-destructive"
          data-ocid="profession_select.field_error"
        >
          {error}
        </p>
      )}
    </div>
  );
}
