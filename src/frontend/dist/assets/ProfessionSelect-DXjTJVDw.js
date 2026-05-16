import { j as jsxRuntimeExports, C as Clock, u as useGlobalTranslation, r as reactExports, X } from "./index-D4yy3BhY.js";
import { I as Input } from "./input-DxOaIX0x.js";
import { P as PROFESSIONS } from "./index-D3QYH2aj.js";
import { C as ChevronDown } from "./chevron-down-D6yoZGjh.js";
import { S as Search } from "./search-BxA_JzXm.js";
function AvailabilitySelect({
  value,
  onChange,
  error
}) {
  const handleStartChange = (e) => {
    onChange({ ...value, startTime: e.target.value });
  };
  const handleEndChange = (e) => {
    onChange({ ...value, endTime: e.target.value });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "availability_select", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            htmlFor: "avail-start",
            className: "text-sm font-medium text-foreground flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-primary" }),
              "Work Start Time"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "avail-start",
            type: "time",
            value: value.startTime,
            onChange: handleStartChange,
            className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer",
            "data-ocid": "availability_select.start_time_input"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            htmlFor: "avail-end",
            className: "text-sm font-medium text-foreground flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-secondary" }),
              "Work End Time"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "avail-end",
            type: "time",
            value: value.endTime,
            onChange: handleEndChange,
            className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer",
            "data-ocid": "availability_select.end_time_input"
          }
        ) })
      ] })
    ] }),
    value.startTime && value.endTime && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
      "Available from",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: value.startTime }),
      " ",
      "to",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: value.endTime })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-xs text-destructive",
        "data-ocid": "availability_select.field_error",
        children: error
      }
    )
  ] });
}
function ProfessionSelect({
  value,
  onChange,
  customValue = "",
  onCustomChange,
  error
}) {
  var _a;
  const { t } = useGlobalTranslation();
  const [open, setOpen] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const dropdownRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
  const filtered = PROFESSIONS.filter(
    (p) => p.label.toLowerCase().includes(search.toLowerCase())
  );
  const constructionProfessions = filtered.filter(
    (p) => p.group === "construction"
  );
  const nonConstructionProfessions = filtered.filter(
    (p) => p.group === "non-construction"
  );
  const selectedLabel = value ? ((_a = PROFESSIONS.find((p) => p.value === value)) == null ? void 0 : _a.label) ?? value : t("worker.selectProfession");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: dropdownRef, className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setOpen(!open),
          className: `w-full flex items-center justify-between px-3 py-2.5 rounded-md border text-sm transition-smooth ${error ? "border-destructive" : "border-input"} bg-card hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring/30`,
          "aria-haspopup": "listbox",
          "aria-expanded": open,
          "data-ocid": "profession_select.trigger",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: value ? "text-foreground" : "text-muted-foreground", children: selectedLabel }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              value && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "aria-label": "Clear",
                  onClick: (e) => {
                    e.stopPropagation();
                    onChange("");
                  },
                  className: "p-0.5 rounded hover:bg-muted",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5 text-muted-foreground" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronDown,
                {
                  className: `w-4 h-4 text-muted-foreground transition-smooth ${open ? "rotate-180" : ""}`
                }
              )
            ] })
          ]
        }
      ),
      open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "absolute z-50 mt-1 w-full bg-card border border-border rounded-md shadow-elevated max-h-72 overflow-hidden flex flex-col",
          tabIndex: -1,
          "data-ocid": "profession_select.dropdown",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  placeholder: t("common.search"),
                  className: "w-full pl-8 pr-3 py-1.5 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring/30",
                  "data-ocid": "profession_select.search_input"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-y-auto flex-1", children: [
              constructionProfessions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-1.5 text-xs font-semibold text-muted-foreground bg-muted/50 sticky top-0", children: [
                  "🏗️ ",
                  t("worker.group.construction")
                ] }),
                constructionProfessions.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-selected": value === p.value,
                    onClick: () => {
                      onChange(p.value);
                      setOpen(false);
                      setSearch("");
                    },
                    className: `w-full text-left px-4 py-2 text-sm transition-smooth ${value === p.value ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-foreground"}`,
                    children: p.label
                  },
                  p.value
                ))
              ] }),
              nonConstructionProfessions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-1.5 text-xs font-semibold text-muted-foreground bg-muted/50 sticky top-0", children: [
                  "🛠️ ",
                  t("worker.group.non-construction")
                ] }),
                nonConstructionProfessions.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-selected": value === p.value,
                    onClick: () => {
                      onChange(p.value);
                      setOpen(false);
                      setSearch("");
                    },
                    className: `w-full text-left px-4 py-2 text-sm transition-smooth ${value === p.value ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-foreground"}`,
                    children: p.label
                  },
                  p.value
                ))
              ] }),
              filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-6 text-center text-sm text-muted-foreground", children: t("common.noResults") })
            ] })
          ]
        }
      )
    ] }),
    value === "Other" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        value: customValue,
        onChange: (e) => onCustomChange == null ? void 0 : onCustomChange(e.target.value),
        placeholder: t("worker.professionOther"),
        className: "mt-2",
        "data-ocid": "profession_select.custom_input"
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-xs text-destructive",
        "data-ocid": "profession_select.field_error",
        children: error
      }
    )
  ] });
}
export {
  AvailabilitySelect as A,
  ProfessionSelect as P
};
