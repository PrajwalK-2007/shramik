import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as useComposedRefs, l as cn, u as useGlobalTranslation, w as useVerifiedWorkers, z as useRemovedWorkers, v as usePendingWorkers, A as useAllSeekers, D as useRemoveWorker, E as useRestoreWorker, C as Clock, U as Users, B as Button, i as ue } from "./index-D4yy3BhY.js";
import { A as AdminWorkerModal, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, T as Trash2, C as Calendar, R as RotateCcw } from "./AdminWorkerModal-CliqeoFf.js";
import { B as Badge } from "./badge-gXH7trBI.js";
import { C as Card, a as CardContent } from "./card-CPR4qmTf.js";
import { I as Input } from "./input-DxOaIX0x.js";
import { L as Label } from "./label-BaD6ci6U.js";
import { e as createCollection, u as useDirection, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DOkryjF-.js";
import { S as Skeleton } from "./skeleton-CyfHYuxG.js";
import { d as useId, P as Primitive, c as composeEventHandlers, a as createContextScope, u as useControllableState, e as useCallbackRef, b as Presence } from "./index-DYUwcsMR.js";
import { T as Textarea } from "./textarea-Bo00sZbn.js";
import { P as PROFESSIONS } from "./index-D3QYH2aj.js";
import { S as Search } from "./search-BxA_JzXm.js";
import { F as Funnel } from "./funnel-CC_a5AtC.js";
import { S as ShieldCheck } from "./shield-check-B3gYHK5J.js";
import { C as CircleAlert } from "./circle-alert-C_A-Fwyl.js";
import { P as Phone } from "./phone-Gf2viXky.js";
import { M as MapPin } from "./map-pin-BxJaMctR.js";
import { I as IndianRupee } from "./indian-rupee-4DL0qXIY.js";
import { E as Eye } from "./eye-CXEDHLRe.js";
import "./index-f0aJcAoU.js";
import "./mail-Bm7LM0lL.js";
import "./wrench-D0J1_6Oa.js";
import "./circle-check-D2C7GC-o.js";
import "./index-BxqwsFjM.js";
import "./chevron-down-D6yoZGjh.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
const PAGE_SIZE = 20;
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function PaginationRow({
  currentPage,
  total,
  onPrev,
  onNext
}) {
  if (total <= 1) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      "Page ",
      currentPage,
      " of ",
      total
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "outline",
          disabled: currentPage <= 1,
          onClick: onPrev,
          "data-ocid": "admin_users.pagination_prev",
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "outline",
          disabled: currentPage >= total,
          onClick: onNext,
          "data-ocid": "admin_users.pagination_next",
          children: "Next"
        }
      )
    ] })
  ] });
}
function AdminUsersPage() {
  const { t } = useGlobalTranslation();
  const { data: verified, isLoading: vLoading } = useVerifiedWorkers();
  const { data: removed, isLoading: rLoading } = useRemovedWorkers();
  const { data: pending, isLoading: pLoading } = usePendingWorkers();
  const { data: seekers, isLoading: sLoading } = useAllSeekers();
  const { mutateAsync: removeWorker, isPending: removing } = useRemoveWorker();
  const { mutateAsync: restoreWorker, isPending: restoring } = useRestoreWorker();
  const [search, setSearch] = reactExports.useState("");
  const [professionFilter, setProfessionFilter] = reactExports.useState("all");
  const [page, setPage] = reactExports.useState(1);
  const [profileModal, setProfileModal] = reactExports.useState(null);
  const [removeDialog, setRemoveDialog] = reactExports.useState(
    null
  );
  const filterWorkers = (list) => list.filter(
    (w) => (!search || w.name.toLowerCase().includes(search.toLowerCase()) || w.phone.includes(search) || w.email.toLowerCase().includes(search.toLowerCase()) || w.profession.toLowerCase().includes(search.toLowerCase()) || w.location_address.toLowerCase().includes(search.toLowerCase())) && (professionFilter === "all" || w.profession === professionFilter)
  );
  const filteredVerified = filterWorkers(verified ?? []);
  const filteredRemoved = filterWorkers(removed ?? []);
  const filteredPending = filterWorkers(pending ?? []);
  const pagedVerified = filteredVerified.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
  const pagedRemoved = filteredRemoved.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
  const pagedPending = filteredPending.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
  const totalVerifiedPages = Math.max(
    1,
    Math.ceil(filteredVerified.length / PAGE_SIZE)
  );
  const totalRemovedPages = Math.max(
    1,
    Math.ceil(filteredRemoved.length / PAGE_SIZE)
  );
  const totalPendingPages = Math.max(
    1,
    Math.ceil(filteredPending.length / PAGE_SIZE)
  );
  const handleSearch = (val) => {
    setSearch(val);
    setPage(1);
  };
  const handleProfessionFilter = (val) => {
    setProfessionFilter(val);
    setPage(1);
  };
  const confirmRemove = async () => {
    if (!removeDialog || !removeDialog.reason.trim()) return;
    await removeWorker({
      workerId: removeDialog.worker.id,
      reason: removeDialog.reason
    });
    ue.error(`${removeDialog.worker.name} removed from platform`);
    setRemoveDialog(null);
  };
  const handleRestore = async (w) => {
    await restoreWorker({ workerId: w.id });
    ue.success(`${w.name} restored to pending`);
  };
  const WorkerRow = ({
    worker,
    idx,
    showRemove,
    showRestore
  }) => {
    var _a;
    const pLabel = ((_a = PROFESSIONS.find((p) => p.value === worker.profession)) == null ? void 0 : _a.label) ?? worker.profession;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "border-border",
        "data-ocid": `admin_users.worker_row.${idx + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden", children: worker.profile_photo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: worker.profile_photo,
              alt: worker.name,
              className: "w-11 h-11 rounded-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold text-xs", children: worker.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: worker.name }),
              worker.verification_status === "Verified" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-xs bg-success/10 text-success border-success/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-2.5 h-2.5 mr-1" }),
                "Verified"
              ] }) : worker.verification_status === "Pending" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-xs bg-warning/10 text-warning border-warning/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-2.5 h-2.5 mr-1" }),
                "Pending"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-xs bg-muted text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-2.5 h-2.5 mr-1" }),
                "Removed"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium mt-0.5", children: pLabel }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                worker.phone
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 truncate max-w-[180px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                worker.location_address
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-3 h-3" }),
                "\\u20b9",
                worker.hourly_rate,
                "/hr"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                formatDate(worker.created_at)
              ] }),
              worker.availability.startTime && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                worker.availability.startTime,
                " –",
                " ",
                worker.availability.endTime
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: worker.email }),
            worker.admin_notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 italic", children: [
              "Note: ",
              worker.admin_notes
            ] }),
            worker.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1 mt-1.5", children: [
              worker.skills.slice(0, 4).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: s }, s)),
              worker.skills.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                "+",
                worker.skills.length - 4
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                onClick: () => setProfileModal(worker),
                className: "gap-1 text-xs",
                "data-ocid": `admin_users.view_button.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                  "View All"
                ]
              }
            ),
            showRemove && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                onClick: () => setRemoveDialog({ worker, reason: "" }),
                className: "text-destructive hover:bg-destructive/10 border-destructive/30 gap-1",
                "data-ocid": `admin_users.remove_button.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                  t("admin.remove")
                ]
              }
            ),
            showRestore && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                onClick: () => handleRestore(worker),
                disabled: restoring,
                className: "text-success hover:bg-success/10 border-success/30 gap-1",
                "data-ocid": `admin_users.restore_button.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" }),
                  t("admin.restore")
                ]
              }
            )
          ] })
        ] }) })
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8", "data-ocid": "admin_users.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-lg text-foreground", children: t("admin.users") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Full access to all worker information \\u2014 verified, pending, and removed" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: search,
              onChange: (e) => handleSearch(e.target.value),
              placeholder: "Search name, phone, email, profession, address...",
              className: "pl-9",
              "data-ocid": "admin_users.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: professionFilter,
            onValueChange: handleProfessionFilter,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                SelectTrigger,
                {
                  className: "w-[190px]",
                  "data-ocid": "admin_users.profession_filter",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5 mr-1.5 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All professions" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All professions" }),
                PROFESSIONS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.value, children: p.label }, p.value))
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Tabs,
        {
          defaultValue: "verified",
          onValueChange: () => setPage(1),
          "data-ocid": "admin_users.tabs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-6 flex-wrap h-auto gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "verified", "data-ocid": "admin_users.verified_tab", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5 mr-1.5" }),
                t("admin.verifiedWorkers"),
                " (",
                filteredVerified.length,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "pending", "data-ocid": "admin_users.pending_tab", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 mr-1.5" }),
                "Pending (",
                filteredPending.length,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "removed", "data-ocid": "admin_users.removed_tab", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 mr-1.5" }),
                t("admin.removedWorkers"),
                " (",
                filteredRemoved.length,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "seekers", "data-ocid": "admin_users.seekers_tab", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5 mr-1.5" }),
                "Seekers (",
                (seekers == null ? void 0 : seekers.length) ?? 0,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "verified", children: vLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "admin_users.loading_state", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, k)) }) : filteredVerified.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-12 bg-card rounded-xl border border-border",
                "data-ocid": "admin_users.verified_empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-10 h-10 text-muted-foreground mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: search || professionFilter !== "all" ? "No workers match your search" : "No verified workers yet" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: pagedVerified.map((worker, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                WorkerRow,
                {
                  worker,
                  idx: (page - 1) * PAGE_SIZE + i,
                  showRemove: true,
                  showRestore: false
                },
                worker.id
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PaginationRow,
                {
                  currentPage: page,
                  total: totalVerifiedPages,
                  onPrev: () => setPage((p) => p - 1),
                  onNext: () => setPage((p) => p + 1)
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pending", children: pLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["a", "b"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, k)) }) : filteredPending.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-12 bg-card rounded-xl border border-border",
                "data-ocid": "admin_users.pending_empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-10 h-10 text-muted-foreground mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: search || professionFilter !== "all" ? "No pending workers match your search" : "No pending approvals" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: pagedPending.map((worker, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                WorkerRow,
                {
                  worker,
                  idx: (page - 1) * PAGE_SIZE + i,
                  showRemove: false,
                  showRestore: false
                },
                worker.id
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PaginationRow,
                {
                  currentPage: page,
                  total: totalPendingPages,
                  onPrev: () => setPage((p) => p - 1),
                  onNext: () => setPage((p) => p + 1)
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "removed", children: rLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["a", "b"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, k)) }) : filteredRemoved.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-12 bg-card rounded-xl border border-border",
                "data-ocid": "admin_users.removed_empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-10 h-10 text-muted-foreground mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: search || professionFilter !== "all" ? "No removed workers match your search" : "No removed workers" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: pagedRemoved.map((worker, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                WorkerRow,
                {
                  worker,
                  idx: (page - 1) * PAGE_SIZE + i,
                  showRemove: false,
                  showRestore: true
                },
                worker.id
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PaginationRow,
                {
                  currentPage: page,
                  total: totalRemovedPages,
                  onPrev: () => setPage((p) => p - 1),
                  onNext: () => setPage((p) => p + 1)
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "seekers", children: sLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["a", "b"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }, k)) }) : (seekers ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-12 bg-card rounded-xl border border-border",
                "data-ocid": "admin_users.seekers_empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 text-muted-foreground mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No seekers registered yet" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: (seekers ?? []).map((seeker, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                className: "border-border",
                "data-ocid": `admin_users.seeker_row.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-3 flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary font-bold text-xs", children: seeker.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-sm", children: seeker.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      seeker.email,
                      " \\u00b7 ",
                      seeker.phone
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-xs flex-shrink-0 ${seeker.is_active ? "bg-success/10 text-success border-success/30" : "bg-muted text-muted-foreground"}`,
                      children: seeker.is_active ? "Active" : "Inactive"
                    }
                  )
                ] })
              },
              seeker.id
            )) }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdminWorkerModal,
      {
        worker: profileModal,
        open: !!profileModal,
        onClose: () => setProfileModal(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!removeDialog,
        onOpenChange: (o) => !o && setRemoveDialog(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "admin_users.remove_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
            "Remove \\u2014 ",
            removeDialog == null ? void 0 : removeDialog.worker.name
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-destructive/5 border border-destructive/20 rounded-lg p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "This worker will be removed from the platform and will no longer be visible." }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                "Reason for removal ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: (removeDialog == null ? void 0 : removeDialog.reason) ?? "",
                  onChange: (e) => setRemoveDialog(
                    (prev) => prev ? { ...prev, reason: e.target.value } : null
                  ),
                  placeholder: "Provide a reason for removing this worker...",
                  rows: 3,
                  className: "resize-none",
                  "data-ocid": "admin_users.remove_reason_textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: () => setRemoveDialog(null),
                  "data-ocid": "admin_users.remove_cancel_button",
                  children: t("common.cancel")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  onClick: confirmRemove,
                  disabled: !(removeDialog == null ? void 0 : removeDialog.reason.trim()) || removing,
                  className: "bg-destructive text-destructive-foreground hover:opacity-90",
                  "data-ocid": "admin_users.remove_confirm_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 mr-1" }),
                    t("admin.remove")
                  ]
                }
              )
            ] })
          ] })
        ] })
      }
    )
  ] });
}
export {
  AdminUsersPage
};
