module.exports = [
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/dashboard/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
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
function DashboardPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$stores$2f$auth$2e$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])((state)=>state.user);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!user) return;
        if (user.role === 'Admin') router.replace(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$app$2d$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_ROUTES"].admin.users);
    // other roles stay on /dashboard
    }, [
        user,
        router
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
        className: "text-2xl font-semibold",
        children: "Tổng quan"
    }, void 0, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/dashboard/page.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=0he8_se18d05_group-05_source_FLDN_fe_src_app_%28private%29_dashboard_page_tsx_1w96lqq._.js.map