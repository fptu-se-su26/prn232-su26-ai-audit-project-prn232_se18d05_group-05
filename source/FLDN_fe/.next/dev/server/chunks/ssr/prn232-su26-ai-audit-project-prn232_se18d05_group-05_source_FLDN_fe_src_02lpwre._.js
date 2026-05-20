module.exports = [
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/hooks/use-mobile.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsMobile",
    ()=>useIsMobile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
    const [isMobile, setIsMobile] = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](undefined);
    __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        const onChange = ()=>{
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };
        mql.addEventListener("change", onChange);
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        return ()=>mql.removeEventListener("change", onChange);
    }, []);
    return !!isMobile;
}
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/button/Button.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/80",
            outline: "border-border bg-background shadow-xs hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
            ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
            destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
            sm: "h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
            lg: "h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            icon: "size-9",
            "icon-xs": "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
            "icon-sm": "size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md",
            "icon-lg": "size-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant = "default", size = "default", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$button$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/button.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/input.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$input$2f$Input$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/input/Input.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$input$2f$Input$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/input.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/separator.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Separator",
    ()=>Separator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$separator$2f$Separator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/separator/Separator.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function Separator({ className, orientation = "horizontal", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$separator$2f$Separator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "separator",
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/separator.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sheet.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sheet",
    ()=>Sheet,
    "SheetClose",
    ()=>SheetClose,
    "SheetContent",
    ()=>SheetContent,
    "SheetDescription",
    ()=>SheetDescription,
    "SheetFooter",
    ()=>SheetFooter,
    "SheetHeader",
    ()=>SheetHeader,
    "SheetTitle",
    ()=>SheetTitle,
    "SheetTrigger",
    ()=>SheetTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$index$2e$parts$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/dialog/index.parts.mjs [app-ssr] (ecmascript) <export * as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@hugeicons/react/dist/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@hugeicons/react/dist/esm/HugeiconsIcon.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@hugeicons/core-free-icons/dist/esm/index.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function Sheet({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$index$2e$parts$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Root, {
        "data-slot": "sheet",
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sheet.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
function SheetTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$index$2e$parts$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Trigger, {
        "data-slot": "sheet-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sheet.tsx",
        lineNumber: 16,
        columnNumber: 10
    }, this);
}
function SheetClose({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$index$2e$parts$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Close, {
        "data-slot": "sheet-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sheet.tsx",
        lineNumber: 20,
        columnNumber: 10
    }, this);
}
function SheetPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$index$2e$parts$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Portal, {
        "data-slot": "sheet-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sheet.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
function SheetOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$index$2e$parts$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Backdrop, {
        "data-slot": "sheet-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sheet.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
function SheetContent({ className, children, side = "right", showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SheetPortal, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SheetOverlay, {}, void 0, false, {
                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sheet.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$index$2e$parts$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Popup, {
                "data-slot": "sheet-content",
                "data-side": side,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm", className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$index$2e$parts$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Close, {
                        "data-slot": "sheet-close",
                        render: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            className: "absolute top-4 right-4",
                            size: "icon-sm"
                        }, void 0, false, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sheet.tsx",
                            lineNumber: 67,
                            columnNumber: 15
                        }, this),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Cancel01Icon"],
                                strokeWidth: 2
                            }, void 0, false, {
                                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sheet.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sheet.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sheet.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sheet.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sheet.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
function SheetHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "sheet-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-1.5 p-4", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sheet.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
function SheetFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "sheet-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("mt-auto flex flex-col gap-2 p-4", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sheet.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
function SheetTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$index$2e$parts$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Title, {
        "data-slot": "sheet-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("font-heading font-medium text-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sheet.tsx",
        lineNumber: 105,
        columnNumber: 5
    }, this);
}
function SheetDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$dialog$2f$index$2e$parts$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Dialog$3e$__["Dialog"].Description, {
        "data-slot": "sheet-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sheet.tsx",
        lineNumber: 118,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/skeleton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Skeleton",
    ()=>Skeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Skeleton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "skeleton",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("animate-pulse rounded-md bg-muted", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/skeleton.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/tooltip.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tooltip",
    ()=>Tooltip,
    "TooltipContent",
    ()=>TooltipContent,
    "TooltipProvider",
    ()=>TooltipProvider,
    "TooltipTrigger",
    ()=>TooltipTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$tooltip$2f$index$2e$parts$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/tooltip/index.parts.mjs [app-ssr] (ecmascript) <export * as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function TooltipProvider({ delay = 0, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$tooltip$2f$index$2e$parts$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Provider, {
        "data-slot": "tooltip-provider",
        delay: delay,
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/tooltip.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
function Tooltip({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$tooltip$2f$index$2e$parts$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Root, {
        "data-slot": "tooltip",
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/tooltip.tsx",
        lineNumber: 21,
        columnNumber: 10
    }, this);
}
function TooltipTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$tooltip$2f$index$2e$parts$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Trigger, {
        "data-slot": "tooltip-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/tooltip.tsx",
        lineNumber: 25,
        columnNumber: 10
    }, this);
}
function TooltipContent({ className, side = "top", sideOffset = 4, align = "center", alignOffset = 0, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$tooltip$2f$index$2e$parts$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Portal, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$tooltip$2f$index$2e$parts$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Positioner, {
            align: align,
            alignOffset: alignOffset,
            side: side,
            sideOffset: sideOffset,
            className: "isolate z-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$tooltip$2f$index$2e$parts$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Popup, {
                "data-slot": "tooltip-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
                ...props,
                children: [
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$tooltip$2f$index$2e$parts$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Arrow, {
                        className: "z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5"
                    }, void 0, false, {
                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/tooltip.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/tooltip.tsx",
                lineNumber: 50,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/tooltip.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/tooltip.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sidebar",
    ()=>Sidebar,
    "SidebarContent",
    ()=>SidebarContent,
    "SidebarFooter",
    ()=>SidebarFooter,
    "SidebarGroup",
    ()=>SidebarGroup,
    "SidebarGroupAction",
    ()=>SidebarGroupAction,
    "SidebarGroupContent",
    ()=>SidebarGroupContent,
    "SidebarGroupLabel",
    ()=>SidebarGroupLabel,
    "SidebarHeader",
    ()=>SidebarHeader,
    "SidebarInput",
    ()=>SidebarInput,
    "SidebarInset",
    ()=>SidebarInset,
    "SidebarMenu",
    ()=>SidebarMenu,
    "SidebarMenuAction",
    ()=>SidebarMenuAction,
    "SidebarMenuBadge",
    ()=>SidebarMenuBadge,
    "SidebarMenuButton",
    ()=>SidebarMenuButton,
    "SidebarMenuItem",
    ()=>SidebarMenuItem,
    "SidebarMenuSkeleton",
    ()=>SidebarMenuSkeleton,
    "SidebarMenuSub",
    ()=>SidebarMenuSub,
    "SidebarMenuSubButton",
    ()=>SidebarMenuSubButton,
    "SidebarMenuSubItem",
    ()=>SidebarMenuSubItem,
    "SidebarProvider",
    ()=>SidebarProvider,
    "SidebarRail",
    ()=>SidebarRail,
    "SidebarSeparator",
    ()=>SidebarSeparator,
    "SidebarTrigger",
    ()=>SidebarTrigger,
    "useSidebar",
    ()=>useSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/merge-props/mergeProps.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$use$2d$render$2f$useRender$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/use-render/useRender.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/hooks/use-mobile.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/separator.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sheet.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/skeleton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/tooltip.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@hugeicons/react/dist/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@hugeicons/react/dist/esm/HugeiconsIcon.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@hugeicons/core-free-icons/dist/esm/index.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SidebarContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](null);
function useSidebar() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider.");
    }
    return context;
}
function SidebarProvider({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }) {
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsMobile"])();
    const [openMobile, setOpenMobile] = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](defaultOpen);
    const open = openProp ?? _open;
    const setOpen = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((value)=>{
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
            setOpenProp(openState);
        } else {
            _setOpen(openState);
        }
        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    }, [
        setOpenProp,
        open
    ]);
    // Helper to toggle the sidebar.
    const toggleSidebar = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>{
        return isMobile ? setOpenMobile((open)=>!open) : setOpen((open)=>!open);
    }, [
        isMobile,
        setOpen,
        setOpenMobile
    ]);
    // Adds a keyboard shortcut to toggle the sidebar.
    __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const handleKeyDown = (event)=>{
            if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                toggleSidebar();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return ()=>window.removeEventListener("keydown", handleKeyDown);
    }, [
        toggleSidebar
    ]);
    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed";
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            state,
            open,
            setOpen,
            isMobile,
            openMobile,
            setOpenMobile,
            toggleSidebar
        }), [
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SidebarContext.Provider, {
        value: contextValue,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "data-slot": "sidebar-wrapper",
            style: {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style
            },
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar", className),
            ...props,
            children: children
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
            lineNumber: 132,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
        lineNumber: 131,
        columnNumber: 5
    }, this);
}
function Sidebar({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, dir, ...props }) {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
    if (collapsible === "none") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "data-slot": "sidebar",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground", className),
            ...props,
            children: children
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
            lineNumber: 170,
            columnNumber: 7
        }, this);
    }
    if (isMobile) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sheet"], {
            open: openMobile,
            onOpenChange: setOpenMobile,
            ...props,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetContent"], {
                dir: dir,
                "data-sidebar": "sidebar",
                "data-slot": "sidebar",
                "data-mobile": "true",
                className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
                style: {
                    "--sidebar-width": SIDEBAR_WIDTH_MOBILE
                },
                side: side,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetHeader"], {
                        className: "sr-only",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetTitle"], {
                                children: "Sidebar"
                            }, void 0, false, {
                                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
                                lineNumber: 200,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetDescription"], {
                                children: "Displays the mobile sidebar."
                            }, void 0, false, {
                                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
                                lineNumber: 201,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
                        lineNumber: 199,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-full w-full flex-col",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
                        lineNumber: 203,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
                lineNumber: 186,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
            lineNumber: 185,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "group peer hidden text-sidebar-foreground md:block",
        "data-state": state,
        "data-collapsible": state === "collapsed" ? collapsible : "",
        "data-variant": variant,
        "data-side": side,
        "data-slot": "sidebar",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-slot": "sidebar-gap",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)")
            }, void 0, false, {
                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
                lineNumber: 219,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-slot": "sidebar-container",
                "data-side": side,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex", // Adjust the padding for floating and inset variants.
                variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l", className),
                ...props,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "data-sidebar": "sidebar",
                    "data-slot": "sidebar-inner",
                    className: "flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
                    lineNumber: 243,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
                lineNumber: 230,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
        lineNumber: 210,
        columnNumber: 5
    }, this);
}
function SidebarTrigger({ className, onClick, ...props }) {
    const { toggleSidebar } = useSidebar();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
        "data-sidebar": "trigger",
        "data-slot": "sidebar-trigger",
        variant: "ghost",
        size: "icon-sm",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(className),
        onClick: (event)=>{
            onClick?.(event);
            toggleSidebar();
        },
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SidebarLeftIcon"],
                strokeWidth: 2
            }, void 0, false, {
                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
                lineNumber: 275,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: "Toggle Sidebar"
            }, void 0, false, {
                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
                lineNumber: 276,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
        lineNumber: 263,
        columnNumber: 5
    }, this);
}
function SidebarRail({ className, ...props }) {
    const { toggleSidebar } = useSidebar();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        "data-sidebar": "rail",
        "data-slot": "sidebar-rail",
        "aria-label": "Toggle Sidebar",
        tabIndex: -1,
        onClick: toggleSidebar,
        title: "Toggle Sidebar",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2", "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize", "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar", "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
        lineNumber: 285,
        columnNumber: 5
    }, this);
}
function SidebarInset({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        "data-slot": "sidebar-inset",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
        lineNumber: 308,
        columnNumber: 5
    }, this);
}
function SidebarInput({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
        "data-slot": "sidebar-input",
        "data-sidebar": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-8 w-full bg-background shadow-none", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
        lineNumber: 324,
        columnNumber: 5
    }, this);
}
function SidebarHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "sidebar-header",
        "data-sidebar": "header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 p-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
        lineNumber: 335,
        columnNumber: 5
    }, this);
}
function SidebarFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "sidebar-footer",
        "data-sidebar": "footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 p-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
        lineNumber: 346,
        columnNumber: 5
    }, this);
}
function SidebarSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "sidebar-separator",
        "data-sidebar": "separator",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("mx-2 w-auto bg-sidebar-border", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
        lineNumber: 360,
        columnNumber: 5
    }, this);
}
function SidebarContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "sidebar-content",
        "data-sidebar": "content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("no-scrollbar flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
        lineNumber: 371,
        columnNumber: 5
    }, this);
}
function SidebarGroup({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "sidebar-group",
        "data-sidebar": "group",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative flex w-full min-w-0 flex-col p-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
        lineNumber: 385,
        columnNumber: 5
    }, this);
}
function SidebarGroupLabel({ className, render, ...props }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$use$2d$render$2f$useRender$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])({
        defaultTagName: "div",
        props: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])({
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", className)
        }, props),
        render,
        state: {
            slot: "sidebar-group-label",
            sidebar: "group-label"
        }
    });
}
function SidebarGroupAction({ className, render, ...props }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$use$2d$render$2f$useRender$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])({
        defaultTagName: "button",
        props: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])({
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0", className)
        }, props),
        render,
        state: {
            slot: "sidebar-group-action",
            sidebar: "group-action"
        }
    });
}
function SidebarGroupContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "sidebar-group-content",
        "data-sidebar": "group-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-full text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
        lineNumber: 447,
        columnNumber: 5
    }, this);
}
function SidebarMenu({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
        "data-slot": "sidebar-menu",
        "data-sidebar": "menu",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex w-full min-w-0 flex-col gap-1", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
        lineNumber: 458,
        columnNumber: 5
    }, this);
}
function SidebarMenuItem({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        "data-slot": "sidebar-menu-item",
        "data-sidebar": "menu-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("group/menu-item relative", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
        lineNumber: 469,
        columnNumber: 5
    }, this);
}
const sidebarMenuButtonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate", {
    variants: {
        variant: {
            default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            outline: "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
        },
        size: {
            default: "h-8 text-sm",
            sm: "h-7 text-xs",
            lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function SidebarMenuButton({ render, isActive = false, variant = "default", size = "default", tooltip, className, ...props }) {
    const { isMobile, state } = useSidebar();
    const comp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$use$2d$render$2f$useRender$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])({
        defaultTagName: "button",
        props: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])({
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(sidebarMenuButtonVariants({
                variant,
                size
            }), className)
        }, props),
        render: !tooltip ? render : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
            render: render
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
            lineNumber: 522,
            columnNumber: 33
        }, this),
        state: {
            slot: "sidebar-menu-button",
            sidebar: "menu-button",
            size,
            active: isActive
        }
    });
    if (!tooltip) {
        return comp;
    }
    if (typeof tooltip === "string") {
        tooltip = {
            children: tooltip
        };
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
        children: [
            comp,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipContent"], {
                side: "right",
                align: "center",
                hidden: state !== "collapsed" || isMobile,
                ...tooltip
            }, void 0, false, {
                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
                lineNumber: 544,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
        lineNumber: 542,
        columnNumber: 5
    }, this);
}
function SidebarMenuAction({ className, render, showOnHover = false, ...props }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$use$2d$render$2f$useRender$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])({
        defaultTagName: "button",
        props: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])({
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0", showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0", className)
        }, props),
        render,
        state: {
            slot: "sidebar-menu-action",
            sidebar: "menu-action"
        }
    });
}
function SidebarMenuBadge({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "sidebar-menu-badge",
        "data-sidebar": "menu-badge",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 peer-data-active/menu-button:text-sidebar-accent-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
        lineNumber: 589,
        columnNumber: 5
    }, this);
}
function SidebarMenuSkeleton({ className, showIcon = false, ...props }) {
    // Random width between 50 to 90%.
    const [width] = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](()=>{
        return `${Math.floor(Math.random() * 40) + 50}%`;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "sidebar-menu-skeleton",
        "data-sidebar": "menu-skeleton",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex h-8 items-center gap-2 rounded-md px-2", className),
        ...props,
        children: [
            showIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"], {
                className: "size-4 rounded-md",
                "data-sidebar": "menu-skeleton-icon"
            }, void 0, false, {
                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
                lineNumber: 621,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"], {
                className: "h-4 max-w-(--skeleton-width) flex-1",
                "data-sidebar": "menu-skeleton-text",
                style: {
                    "--skeleton-width": width
                }
            }, void 0, false, {
                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
                lineNumber: 626,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
        lineNumber: 614,
        columnNumber: 5
    }, this);
}
function SidebarMenuSub({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
        "data-slot": "sidebar-menu-sub",
        "data-sidebar": "menu-sub",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
        lineNumber: 641,
        columnNumber: 5
    }, this);
}
function SidebarMenuSubItem({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        "data-slot": "sidebar-menu-sub-item",
        "data-sidebar": "menu-sub-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("group/menu-sub-item relative", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx",
        lineNumber: 658,
        columnNumber: 5
    }, this);
}
function SidebarMenuSubButton({ render, size = "md", isActive = false, className, ...props }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$use$2d$render$2f$useRender$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])({
        defaultTagName: "a",
        props: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])({
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-sm data-[size=sm]:text-xs data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground", className)
        }, props),
        render,
        state: {
            slot: "sidebar-menu-sub-button",
            sidebar: "menu-sub-button",
            size,
            active: isActive
        }
    });
}
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/routes/app-routes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "APP_ROUTES",
    ()=>APP_ROUTES
]);
const APP_ROUTES = {
    home: '/',
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        verifyEmail: '/auth/verify-email',
        forgotPassword: '/auth/forgot-password',
        resetPassword: '/auth/reset-password',
        registerSuccess: '/auth/register-success'
    },
    dashboard: '/dashboard',
    products: '/products',
    orders: {
        list: '/orders',
        create: '/orders/create'
    },
    unauthorized: '/unauthorized',
    admin: {
        dashboard: '/admin',
        users: '/admin/users',
        suppliers: '/admin/suppliers',
        categories: '/admin/categories',
        logistics: '/admin/logistics',
        zones: '/admin/zones'
    },
    supplier: {
        products: '/supplier/products',
        supplyRequests: '/supplier/supply-requests',
        analytics: '/supplier/analytics'
    },
    logistics: {
        pending: '/logistics',
        myShipments: '/logistics/my-shipments',
        confirm: (id)=>`/logistics/${id}/confirm`,
        pod: (id)=>`/logistics/${id}/pod`
    }
};
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/stores/auth.store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthStore",
    ()=>useAuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
;
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set)=>({
        user: null,
        setAuth: (user, accessToken)=>{
            localStorage.setItem('access_token', accessToken);
            set({
                user
            });
        },
        clearAuth: ()=>{
            localStorage.removeItem('access_token');
            set({
                user: null
            });
        }
    }), {
    name: 'auth',
    partialize: (state)=>({
            user: state.user
        })
}));
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppHeader.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppHeader",
    ()=>AppHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/log-out.js [app-ssr] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/separator.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$app$2d$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/routes/app-routes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$stores$2f$auth$2e$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/stores/auth.store.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function AppHeader() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$stores$2f$auth$2e$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])((state)=>state.user);
    const clearAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$stores$2f$auth$2e$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])((state)=>state.clearAuth);
    function handleLogout() {
        clearAuth();
        __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Đã đăng xuất thành công khỏi hệ thống!');
        router.replace(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$app$2d$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_ROUTES"].auth.login);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/90 px-5 backdrop-blur-md font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SidebarTrigger"], {
                        className: "-ml-1 rounded-xl hover:bg-emerald-50 text-slate-600 hover:text-emerald-950 transition-colors",
                        "aria-label": "Toggle sidebar"
                    }, void 0, false, {
                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppHeader.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {
                        orientation: "vertical",
                        className: "h-5 bg-slate-200"
                    }, void 0, false, {
                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppHeader.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden items-center gap-2 md:flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex size-2 rounded-full bg-emerald-500 animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppHeader.tsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-bold text-slate-600",
                                children: "Hệ thống Quản lý Nguồn cung Thực phẩm TP. Đà Nẵng (FoodLink B2B)"
                            }, void 0, false, {
                                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppHeader.tsx",
                                lineNumber: 30,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppHeader.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppHeader.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-1.5 shadow-2xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex size-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                    className: "size-3.5",
                                    "aria-hidden": "true"
                                }, void 0, false, {
                                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppHeader.tsx",
                                    lineNumber: 40,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppHeader.tsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-extrabold text-slate-800",
                                children: user.fullName || user.email || 'Nhà Cung Cấp'
                            }, void 0, false, {
                                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppHeader.tsx",
                                lineNumber: 42,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppHeader.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {
                        orientation: "vertical",
                        className: "h-5 bg-slate-200"
                    }, void 0, false, {
                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppHeader.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleLogout,
                        "aria-label": "Đăng xuất",
                        className: "inline-flex items-center gap-1.5 rounded-xl border border-rose-100 bg-rose-50/60 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-all active:scale-95 cursor-pointer",
                        title: "Đăng xuất khỏi tài khoản",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                className: "size-3.5",
                                "aria-hidden": "true"
                            }, void 0, false, {
                                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppHeader.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline",
                                children: "Đăng xuất"
                            }, void 0, false, {
                                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppHeader.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppHeader.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppHeader.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppHeader.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/config/nav-config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NAV_CONFIG",
    ()=>NAV_CONFIG
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/clipboard-list.js [app-ssr] (ecmascript) <export default as ClipboardList>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-ssr] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$boxes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Boxes$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/boxes.js [app-ssr] (ecmascript) <export default as Boxes>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$forklift$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Forklift$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/forklift.js [app-ssr] (ecmascript) <export default as Forklift>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-ssr] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/tag.js [app-ssr] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/truck.js [app-ssr] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$app$2d$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/routes/app-routes.ts [app-ssr] (ecmascript)");
;
;
const NAV_CONFIG = {
    // Admin: /api/admin/* (role-locked), products public
    Admin: [
        {
            label: 'Tổng quan',
            href: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$app$2d$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_ROUTES"].admin.dashboard,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"]
        },
        {
            label: 'Người dùng',
            href: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$app$2d$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_ROUTES"].admin.users,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
        },
        {
            label: 'Nhà cung cấp',
            href: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$app$2d$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_ROUTES"].admin.suppliers,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"]
        },
        {
            label: 'Danh mục',
            href: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$app$2d$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_ROUTES"].admin.categories,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"]
        },
        {
            label: 'Tài xế logistics',
            href: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$app$2d$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_ROUTES"].admin.logistics,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"]
        },
        {
            label: 'Vùng giao hàng',
            href: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$app$2d$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_ROUTES"].admin.zones,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"]
        }
    ],
    // Supplier: /api/supplier/* (role-locked)
    Supplier: [
        {
            label: 'Tổng quan',
            href: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$app$2d$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_ROUTES"].dashboard,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"]
        },
        {
            label: 'Sản phẩm & Lô hàng',
            href: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$app$2d$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_ROUTES"].supplier.products,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$boxes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Boxes$3e$__["Boxes"]
        },
        {
            label: 'Yêu cầu cung ứng',
            href: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$app$2d$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_ROUTES"].supplier.supplyRequests,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"]
        },
        {
            label: 'Báo cáo KPI',
            href: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$app$2d$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_ROUTES"].supplier.analytics,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"]
        }
    ],
    // DistributionPoint: /api/orders [Authorize], /api/products (public)
    DistributionPoint: [
        {
            label: 'Tìm kiếm sản phẩm',
            href: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$app$2d$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_ROUTES"].products,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"]
        },
        {
            label: 'Tạo yêu cầu cung ứng',
            href: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$app$2d$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_ROUTES"].orders.create,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
        },
        {
            label: 'Quản lý yêu cầu',
            href: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$app$2d$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_ROUTES"].orders.list,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__["ClipboardList"]
        }
    ],
    // LogisticsOperator: /api/logistics/* (role-locked)
    LogisticsOperator: [
        {
            label: 'Lô hàng chờ nhận',
            href: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$app$2d$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_ROUTES"].logistics.pending,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"]
        },
        {
            label: 'Lô hàng của tôi',
            href: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$app$2d$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_ROUTES"].logistics.myShipments,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$forklift$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Forklift$3e$__["Forklift"]
        }
    ]
};
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppSidebar",
    ()=>AppSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-ssr] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ui/sidebar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$config$2f$nav$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/config/nav-config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$stores$2f$auth$2e$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/stores/auth.store.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function AppSidebar() {
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$stores$2f$auth$2e$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])((state)=>state.user);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const navItems = user?.role ? __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$config$2f$nav$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAV_CONFIG"][user.role] ?? [] : [];
    const isActive = (href)=>{
        if (pathname === href) return true;
        if (href === '/dashboard' || href === '/admin') return false;
        if (!pathname.startsWith(href)) return false;
        // Prevent /orders matching when /orders/create is the active item
        return !navItems.some((item)=>item.href !== href && item.href.startsWith(href) && pathname.startsWith(item.href));
    };
    const userInitial = user?.fullName ? user.fullName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'N';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sidebar"], {
        collapsible: "offcanvas",
        className: "border-r border-slate-200/80 bg-white/95 font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SidebarHeader"], {
                className: "border-b border-slate-100 px-5 py-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white p-1 shadow-md border border-emerald-100",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/logo.png",
                                alt: "FoodLink Đà Nẵng",
                                className: "size-full object-contain"
                            }, void 0, false, {
                                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-black tracking-tight text-slate-900",
                                            children: "FoodLink"
                                        }, void 0, false, {
                                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                                            lineNumber: 51,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "rounded-md bg-emerald-100 px-1.5 py-0.5 text-[9px] font-black uppercase text-emerald-900",
                                            children: "Đà Nẵng"
                                        }, void 0, false, {
                                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                                            lineNumber: 54,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] font-bold text-slate-400 mt-0.5 flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                            className: "size-3 text-emerald-600"
                                        }, void 0, false, {
                                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                                            lineNumber: 59,
                                            columnNumber: 15
                                        }, this),
                                        "Nông sản VietGAP"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SidebarContent"], {
                className: "px-3 py-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SidebarGroup"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SidebarGroupContent"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SidebarMenu"], {
                            className: "space-y-1.5",
                            children: navItems.map((item)=>{
                                const active = isActive(item.href);
                                const Icon = item.icon;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SidebarMenuItem"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: item.href,
                                        className: `group relative flex w-full items-center justify-between rounded-2xl px-4 py-3 text-xs font-bold transition-all duration-200 cursor-pointer ${active ? 'bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white shadow-md shadow-emerald-950/20 font-black' : 'text-slate-600 hover:bg-emerald-50/80 hover:text-emerald-950 hover:translate-x-0.5'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `flex size-8 items-center justify-center rounded-xl transition-all ${active ? 'bg-white/15 text-emerald-300' : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-800'}`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                            className: "size-4 shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                                                            lineNumber: 92,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                                                        lineNumber: 85,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "tracking-tight",
                                                        children: item.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                                                        lineNumber: 94,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                                                lineNumber: 84,
                                                columnNumber: 23
                                            }, this),
                                            active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "size-1.5 rounded-full bg-emerald-400 shadow-sm animate-pulse"
                                            }, void 0, false, {
                                                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                                                lineNumber: 98,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                                        lineNumber: 76,
                                        columnNumber: 21
                                    }, this)
                                }, item.href, false, {
                                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                                    lineNumber: 75,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                            lineNumber: 70,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SidebarFooter"], {
                className: "border-t border-slate-100 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/80 p-3 shadow-2xs",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-700 to-teal-900 font-mono text-sm font-black text-white shadow-sm",
                                children: [
                                    userInitial,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white"
                                    }, void 0, false, {
                                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                                        lineNumber: 115,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "truncate text-xs font-extrabold text-slate-900",
                                        children: user?.fullName || 'Nguyễn Văn Nhà Cung Cấp'
                                    }, void 0, false, {
                                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                                        lineNumber: 118,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "truncate text-[10px] font-bold text-emerald-800 mt-0.5",
                                        children: "Nhà Cung Cấp • Active"
                                    }, void 0, false, {
                                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                        lineNumber: 112,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/layout/AppSidebar.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ProtectedRoute.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProtectedRoute",
    ()=>ProtectedRoute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$app$2d$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/routes/app-routes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$stores$2f$auth$2e$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/stores/auth.store.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function ProtectedRoute({ children, allowedRoles }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$stores$2f$auth$2e$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])((state)=>state.user);
    const [hasHydrated, setHasHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$stores$2f$auth$2e$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"].persist.hasHydrated()) {
            setHasHydrated(true);
            return;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$stores$2f$auth$2e$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"].persist.onFinishHydration(()=>setHasHydrated(true));
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!hasHydrated) return;
        if (!user) {
            router.replace(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$app$2d$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_ROUTES"].auth.login);
            return;
        }
        if (allowedRoles && !allowedRoles.includes(user.role)) router.replace(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$app$2d$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_ROUTES"].unauthorized);
    }, [
        hasHydrated,
        user,
        router,
        allowedRoles
    ]);
    if (!hasHydrated) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-screen items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"
            }, void 0, false, {
                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ProtectedRoute.tsx",
                lineNumber: 35,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/components/ProtectedRoute.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this);
    }
    if (!user) return null;
    if (allowedRoles && !allowedRoles.includes(user.role)) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}),
];

//# sourceMappingURL=prn232-su26-ai-audit-project-prn232_se18d05_group-05_source_FLDN_fe_src_02lpwre._.js.map