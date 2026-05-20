(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/routes/api-endpoints.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_ENDPOINTS",
    ()=>API_ENDPOINTS
]);
const API_ENDPOINTS = {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        verifyEmail: '/auth/verify-email',
        logout: '/auth/logout',
        forgotPassword: '/auth/forgot-password',
        resetPassword: '/auth/reset-password'
    },
    admin: {
        users: '/admin/users',
        user: (id)=>`/admin/users/${id}`,
        lockUser: (id)=>`/admin/users/${id}/lock`,
        unlockUser: (id)=>`/admin/users/${id}/unlock`,
        resetUserPassword: (id)=>`/admin/users/${id}/reset-password`,
        suppliers: '/admin/suppliers',
        supplier: (id)=>`/admin/suppliers/${id}`,
        approveSupplier: (id)=>`/admin/suppliers/${id}/approve`,
        rejectSupplier: (id)=>`/admin/suppliers/${id}/reject`,
        supplierFee: (id)=>`/admin/suppliers/${id}/fee`,
        categories: '/admin/categories',
        category: (id)=>`/admin/categories/${id}`,
        dashboard: '/admin/dashboard',
        logistics: '/admin/logistics',
        logisticsOperator: (id)=>`/admin/logistics/${id}`,
        activateOperator: (id)=>`/admin/logistics/${id}/activate`,
        deactivateOperator: (id)=>`/admin/logistics/${id}/deactivate`,
        zones: '/admin/zones',
        zone: (id)=>`/admin/zones/${id}`,
        districts: '/admin/districts'
    },
    products: {
        list: '/products',
        search: '/products/search',
        detail: (id)=>`/products/${id}`,
        supplierProducts: '/supplier/products'
    },
    categories: '/categories',
    orders: {
        create: '/orders',
        list: '/orders',
        detail: (id)=>`/orders/${id}`,
        cancel: (id)=>`/orders/${id}/cancel`,
        confirmReceipt: (id)=>`/orders/${id}/confirm-receipt`
    },
    addresses: '/addresses',
    vouchers: {
        validate: '/vouchers/validate'
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/lib/axios.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$api$2d$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/routes/api-endpoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
;
const API_BASE_URL = (("TURBOPACK compile-time value", "http://localhost:5167") ?? 'https://localhost:7114').replace(/\/+$/, '') + '/api';
const isRecord = (value)=>typeof value === 'object' && value !== null;
const normalizeApiError = (error)=>{
    const data = error.response?.data;
    const statusCode = isRecord(data) && typeof data.statusCode === 'number' ? data.statusCode : error.response?.status ?? 500;
    const message = isRecord(data) && typeof data.message === 'string' && data.message.trim().length > 0 ? data.message : error.message || 'Something went wrong. Please try again.';
    const errors = isRecord(data) && isRecord(data.errors) ? data.errors : undefined;
    return {
        statusCode,
        message,
        ...errors ? {
            errors
        } : {}
    };
};
const api = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: API_BASE_URL,
    timeout: 30_000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});
const isClient = ("TURBOPACK compile-time value", "object") !== 'undefined';
const getAccessToken = ()=>("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('access_token') : "TURBOPACK unreachable";
const AUTH_401_PASSTHROUGH_ENDPOINTS = [
    __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$api$2d$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].auth.login
];
api.interceptors.request.use((config)=>{
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
api.interceptors.response.use((response)=>response, async (error)=>{
    const originalRequest = error.config;
    const isPassthrough = AUTH_401_PASSTHROUGH_ENDPOINTS.some((ep)=>originalRequest?.url === ep);
    if (error.response?.status === 401 && !isPassthrough && !originalRequest?._retry) {
        localStorage.removeItem('access_token');
        window.location.href = '/auth/login';
    }
    return Promise.reject(normalizeApiError(error));
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/services/product.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MOCK_CATEGORIES",
    ()=>MOCK_CATEGORIES,
    "MOCK_PRODUCTS",
    ()=>MOCK_PRODUCTS,
    "productService",
    ()=>productService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$api$2d$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/routes/api-endpoints.ts [app-client] (ecmascript)");
;
;
const MOCK_CATEGORIES = [
    {
        categoryId: 'c1111111-1111-1111-1111-111111111111',
        name: 'Rau củ tươi',
        description: 'Các loại rau củ hữu cơ tươi sạch'
    },
    {
        categoryId: 'c2222222-2222-2222-2222-222222222222',
        name: 'Trái cây Việt',
        description: 'Trái cây tươi ngon theo mùa'
    },
    {
        categoryId: 'c3333333-3333-3333-3333-333333333333',
        name: 'Thịt tươi & Trứng',
        description: 'Thịt heo, bò, gà đạt chuẩn ATVSTP'
    },
    {
        categoryId: 'c4444444-4444-4444-4444-444444444444',
        name: 'Hải sản tươi sống',
        description: 'Hải sản cá, tôm, mực đánh bắt hàng ngày'
    },
    {
        categoryId: 'c5555555-5555-5555-5555-555555555555',
        name: 'Gia vị & Khô',
        description: 'Gia vị truyền thống và thực phẩm khô'
    },
    {
        categoryId: 'c6666666-6666-6666-6666-666666666666',
        name: 'Đồ uống & Sữa',
        description: 'Sữa tươi, nước ép trái cây đóng chai'
    }
];
const MOCK_PRODUCTS = [
    {
        productId: 'a0000000-0000-0000-0000-000000000001',
        name: 'Rau Cải Thìa Hữu Cơ Đà Lạt',
        description: 'Rau cải thìa trồng theo phương pháp hữu cơ tại Đà Lạt, lá xanh giòn, không hóa chất bảo quản. Đạt tiêu chuẩn VietGAP.',
        retailPrice: 25000,
        wholesalePrice: 18000,
        unit: 'Kg',
        packagingStandard: 'Túi 500g bọc màng thực phẩm',
        categoryId: 'c1111111-1111-1111-1111-111111111111',
        categoryName: 'Rau củ tươi',
        supplierName: 'Nông trại Xanh Đà Lạt',
        supplierId: 's1111111-1111-1111-1111-111111111111',
        mainImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
        quantity: 120,
        averageRating: 4.8,
        totalReviews: 32,
        season: 'Quanh năm',
        districtName: 'Đà Lạt, Lâm Đồng'
    },
    {
        productId: 'a0000000-0000-0000-0000-000000000002',
        name: 'Cà Rốt Đà Lạt Tươi Loại 1',
        description: 'Cà rốt tươi đỏ củ chắc, vị ngọt thanh tự nhiên. Rất giàu Vitamin A và khoáng chất.',
        retailPrice: 32000,
        wholesalePrice: 24000,
        unit: 'Kg',
        packagingStandard: 'Túi lưới 1Kg',
        categoryId: 'c1111111-1111-1111-1111-111111111111',
        categoryName: 'Rau củ tươi',
        supplierName: 'Nông trại Xanh Đà Lạt',
        supplierId: 's1111111-1111-1111-1111-111111111111',
        mainImage: 'https://images.unsplash.com/photo-1598170845058-12ef4a457939?auto=format&fit=crop&q=80&w=800',
        quantity: 85,
        averageRating: 4.6,
        totalReviews: 18,
        season: 'Mùa đông',
        districtName: 'Đà Lạt, Lâm Đồng'
    },
    {
        productId: 'a0000000-0000-0000-0000-000000000003',
        name: 'Xoài Cát Hòa Lộc Tiền Giang',
        description: 'Xoài cát Hòa Lộc đặc sản Tiền Giang, thịt dày, ngọt đậm đà, thơm lừng khi chín.',
        retailPrice: 85000,
        wholesalePrice: 65000,
        unit: 'Kg',
        packagingStandard: 'Thùng giấy 5Kg',
        categoryId: 'c2222222-2222-2222-2222-222222222222',
        categoryName: 'Trái cây Việt',
        supplierName: 'Hợp tác xã Nông sản Tiền Giang',
        supplierId: 's2222222-2222-2222-2222-222222222222',
        mainImage: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=800',
        quantity: 50,
        averageRating: 4.9,
        totalReviews: 45,
        season: 'Mùa hè',
        districtName: 'Cái Bè, Tiền Giang'
    },
    {
        productId: 'a0000000-0000-0000-0000-000000000004',
        name: 'Dưa Hấu Không Hạt Long An',
        description: 'Dưa hấu vỏ mỏng, ruột đỏ mọng nước, ngọt mát thanh nhiệt ngày hè.',
        retailPrice: 28000,
        wholesalePrice: 20000,
        unit: 'Kg',
        packagingStandard: 'Trái từ 3-4kg',
        categoryId: 'c2222222-2222-2222-2222-222222222222',
        categoryName: 'Trái cây Việt',
        supplierName: 'Vườn Trái Cây Miền Tây',
        supplierId: 's3333333-3333-3333-3333-333333333333',
        mainImage: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=800',
        quantity: 200,
        averageRating: 4.7,
        totalReviews: 29,
        season: 'Quanh năm',
        districtName: 'Long An'
    },
    {
        productId: 'a0000000-0000-0000-0000-000000000005',
        name: 'Thịt Thăn Heo Thảo Mộc',
        description: 'Thịt thăn heo tươi ngon nuôi theo công nghệ thảo mộc, thịt mềm thơm ngọt tự nhiên không chất tăng trọng.',
        retailPrice: 145000,
        wholesalePrice: 120000,
        unit: 'Kg',
        packagingStandard: 'Khay hút chân không 500g',
        categoryId: 'c3333333-3333-3333-3333-333333333333',
        categoryName: 'Thịt tươi & Trứng',
        supplierName: 'Trang trại Heo Thảo Mộc Đồng Nai',
        supplierId: 's4444444-4444-4444-4444-444444444444',
        mainImage: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=800',
        quantity: 40,
        averageRating: 4.9,
        totalReviews: 60,
        season: 'Quanh năm',
        districtName: 'Trảng Bom, Đồng Nai'
    },
    {
        productId: 'a0000000-0000-0000-0000-000000000006',
        name: 'Cá Thổ Kim Sa Phú Quốc',
        description: 'Cá tươi cấp đông nhanh ngay tại tàu đánh bắt Phú Quốc, giữ trọn độ tươi ngon nguyên bản.',
        retailPrice: 180000,
        wholesalePrice: 150000,
        unit: 'Kg',
        packagingStandard: 'Khay 1Kg đóng đông',
        categoryId: 'c4444444-4444-4444-4444-444444444444',
        categoryName: 'Hải sản tươi sống',
        supplierName: 'Hải Sản Biển Phú Quốc',
        supplierId: 's5555555-5555-5555-5555-555555555555',
        mainImage: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&q=80&w=800',
        quantity: 35,
        averageRating: 4.8,
        totalReviews: 22,
        season: 'Quanh năm',
        districtName: 'Phú Quốc, Kiên Giang'
    }
];
const productService = {
    async getCategories () {
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$api$2d$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].categories);
            if (Array.isArray(res.data) && res.data.length > 0) {
                return res.data;
            }
        } catch  {
        // API fallback
        }
        return MOCK_CATEGORIES;
    },
    async searchProducts (params) {
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$api$2d$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].products.search, {
                params
            });
            const data = res.data?.data ?? res.data;
            if (Array.isArray(data)) {
                return {
                    items: data,
                    totalCount: data.length,
                    page: params.page ?? 1,
                    pageSize: params.pageSize ?? 12,
                    totalPages: 1
                };
            }
            if (data?.items) {
                return data;
            }
        } catch  {
        // Backend offline or endpoint fallback
        }
        let filtered = [
            ...MOCK_PRODUCTS
        ];
        if (params.keyword && params.keyword.trim().length > 0) {
            const kw = params.keyword.toLowerCase().trim();
            filtered = filtered.filter((p)=>p.name.toLowerCase().includes(kw) || p.description?.toLowerCase().includes(kw) || p.categoryName?.toLowerCase().includes(kw) || p.supplierName?.toLowerCase().includes(kw));
        }
        if (params.categoryId && params.categoryId !== 'all') {
            filtered = filtered.filter((p)=>p.categoryId === params.categoryId);
        }
        if (typeof params.minPrice === 'number' && !isNaN(params.minPrice)) {
            filtered = filtered.filter((p)=>p.retailPrice >= params.minPrice);
        }
        if (typeof params.maxPrice === 'number' && !isNaN(params.maxPrice)) {
            filtered = filtered.filter((p)=>p.retailPrice <= params.maxPrice);
        }
        if (params.sort) {
            switch(params.sort){
                case 'price_asc':
                    filtered.sort((a, b)=>a.retailPrice - b.retailPrice);
                    break;
                case 'price_desc':
                    filtered.sort((a, b)=>b.retailPrice - a.retailPrice);
                    break;
                case 'name_asc':
                    filtered.sort((a, b)=>a.name.localeCompare(b.name, 'vi'));
                    break;
                case 'newest':
                default:
                    break;
            }
        }
        const page = params.page ?? 1;
        const pageSize = params.pageSize ?? 12;
        const startIndex = (page - 1) * pageSize;
        const paginatedItems = filtered.slice(startIndex, startIndex + pageSize);
        return {
            items: paginatedItems,
            totalCount: filtered.length,
            page,
            pageSize,
            totalPages: Math.ceil(filtered.length / pageSize) || 1
        };
    },
    async getProductById (id) {
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$routes$2f$api$2d$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].products.detail(id));
            return res.data?.data ?? res.data;
        } catch  {
            const found = MOCK_PRODUCTS.find((p)=>p.productId === id);
            return found || null;
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductCard",
    ()=>ProductCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/store.js [app-client] (ecmascript) <export default as Store>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ProductCard(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(62);
    if ($[0] !== "1fbc889be744a3bb5b64a58aa3144a747a7064bb0691e5b65e331cf6d198420e") {
        for(let $i = 0; $i < 62; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1fbc889be744a3bb5b64a58aa3144a747a7064bb0691e5b65e331cf6d198420e";
    }
    const { product, onQuickView } = t0;
    const [imgSrc, setImgSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(product.mainImage || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800");
    const formatPrice = _ProductCardFormatPrice;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "ProductCard[<Image>.onError]": ()=>setImgSrc("https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800")
        })["ProductCard[<Image>.onError]"];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] !== imgSrc || $[3] !== product.name) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: imgSrc,
            alt: product.name,
            fill: true,
            sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
            className: "object-cover transition-transform duration-500 group-hover:scale-105",
            onError: t1
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
            lineNumber: 37,
            columnNumber: 10
        }, this);
        $[2] = imgSrc;
        $[3] = product.name;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== product.categoryName) {
        t3 = product.categoryName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute left-2.5 top-2.5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900 shadow-sm backdrop-blur-md",
                children: product.categoryName
            }, void 0, false, {
                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
                lineNumber: 46,
                columnNumber: 77
            }, this)
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
            lineNumber: 46,
            columnNumber: 34
        }, this);
        $[5] = product.categoryName;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] !== onQuickView || $[8] !== product) {
        t4 = ({
            "ProductCard[<button>.onClick]": ()=>onQuickView(product)
        })["ProductCard[<button>.onClick]"];
        $[7] = onQuickView;
        $[8] = product;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    let t5;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
            lineNumber: 65,
            columnNumber: 10
        }, this);
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    let t6;
    if ($[11] !== t4) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t4,
            "aria-label": "Xem nhanh s\u1EA3n ph\u1EA9m",
            className: "absolute right-2.5 top-2.5 flex size-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-transform duration-200 hover:scale-110 hover:bg-black",
            children: t5
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
            lineNumber: 72,
            columnNumber: 10
        }, this);
        $[11] = t4;
        $[12] = t6;
    } else {
        t6 = $[12];
    }
    let t7;
    if ($[13] !== t2 || $[14] !== t3 || $[15] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100",
            children: [
                t2,
                t3,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
            lineNumber: 80,
            columnNumber: 10
        }, this);
        $[13] = t2;
        $[14] = t3;
        $[15] = t6;
        $[16] = t7;
    } else {
        t7 = $[16];
    }
    let t8;
    if ($[17] !== product.supplierName) {
        t8 = product.supplierName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "inline-flex items-center gap-1 font-medium truncate max-w-[70%]",
            title: product.supplierName,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__["Store"], {
                    className: "size-3.5 text-zinc-400 shrink-0"
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
                    lineNumber: 90,
                    columnNumber: 145
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "truncate",
                    children: product.supplierName
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
                    lineNumber: 90,
                    columnNumber: 198
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
            lineNumber: 90,
            columnNumber: 34
        }, this);
        $[17] = product.supplierName;
        $[18] = t8;
    } else {
        t8 = $[18];
    }
    let t9;
    if ($[19] !== product.averageRating) {
        t9 = product.averageRating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "flex items-center gap-1 font-semibold text-amber-600",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                    className: "size-3.5 fill-amber-500 text-amber-500"
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
                    lineNumber: 98,
                    columnNumber: 105
                }, this),
                product.averageRating
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
            lineNumber: 98,
            columnNumber: 34
        }, this) : null;
        $[19] = product.averageRating;
        $[20] = t9;
    } else {
        t9 = $[20];
    }
    let t10;
    if ($[21] !== t8 || $[22] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between text-xs text-zinc-500",
            children: [
                t8,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
            lineNumber: 106,
            columnNumber: 11
        }, this);
        $[21] = t8;
        $[22] = t9;
        $[23] = t10;
    } else {
        t10 = $[23];
    }
    let t11;
    if ($[24] !== product.districtName) {
        t11 = product.districtName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-1 flex items-center gap-1 text-[11px] text-zinc-400",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                    className: "size-3 shrink-0"
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
                    lineNumber: 115,
                    columnNumber: 107
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "truncate",
                    children: product.districtName
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
                    lineNumber: 115,
                    columnNumber: 145
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
            lineNumber: 115,
            columnNumber: 35
        }, this);
        $[24] = product.districtName;
        $[25] = t11;
    } else {
        t11 = $[25];
    }
    let t12;
    if ($[26] !== product.name) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "mt-1.5 text-base font-semibold tracking-tight text-zinc-900 line-clamp-2 group-hover:text-black",
            children: product.name
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
            lineNumber: 123,
            columnNumber: 11
        }, this);
        $[26] = product.name;
        $[27] = t12;
    } else {
        t12 = $[27];
    }
    let t13;
    if ($[28] !== t10 || $[29] !== t11 || $[30] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t10,
                t11,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
            lineNumber: 131,
            columnNumber: 11
        }, this);
        $[28] = t10;
        $[29] = t11;
        $[30] = t12;
        $[31] = t13;
    } else {
        t13 = $[31];
    }
    let t14;
    if ($[32] !== product.retailPrice) {
        t14 = formatPrice(product.retailPrice);
        $[32] = product.retailPrice;
        $[33] = t14;
    } else {
        t14 = $[33];
    }
    let t15;
    if ($[34] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-lg font-bold text-zinc-900",
            children: t14
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
            lineNumber: 149,
            columnNumber: 11
        }, this);
        $[34] = t14;
        $[35] = t15;
    } else {
        t15 = $[35];
    }
    let t16;
    if ($[36] !== product.unit) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ml-1 text-xs text-zinc-500 font-medium",
            children: [
                "/",
                product.unit
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
            lineNumber: 157,
            columnNumber: 11
        }, this);
        $[36] = product.unit;
        $[37] = t16;
    } else {
        t16 = $[37];
    }
    let t17;
    if ($[38] !== t15 || $[39] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t15,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
            lineNumber: 165,
            columnNumber: 11
        }, this);
        $[38] = t15;
        $[39] = t16;
        $[40] = t17;
    } else {
        t17 = $[40];
    }
    let t18;
    if ($[41] !== product.wholesalePrice) {
        t18 = product.wholesalePrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200",
            children: [
                "Sỉ: ",
                formatPrice(product.wholesalePrice)
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
            lineNumber: 174,
            columnNumber: 37
        }, this);
        $[41] = product.wholesalePrice;
        $[42] = t18;
    } else {
        t18 = $[42];
    }
    let t19;
    if ($[43] !== t17 || $[44] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-baseline justify-between gap-1 mb-3",
            children: [
                t17,
                t18
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
            lineNumber: 182,
            columnNumber: 11
        }, this);
        $[43] = t17;
        $[44] = t18;
        $[45] = t19;
    } else {
        t19 = $[45];
    }
    let t20;
    if ($[46] !== onQuickView || $[47] !== product) {
        t20 = ({
            "ProductCard[<button>.onClick]": ()=>onQuickView(product)
        })["ProductCard[<button>.onClick]"];
        $[46] = onQuickView;
        $[47] = product;
        $[48] = t20;
    } else {
        t20 = $[48];
    }
    let t21;
    let t22;
    if ($[49] === Symbol.for("react.memo_cache_sentinel")) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
            lineNumber: 203,
            columnNumber: 11
        }, this);
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: "Xem chi tiết"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
            lineNumber: 204,
            columnNumber: 11
        }, this);
        $[49] = t21;
        $[50] = t22;
    } else {
        t21 = $[49];
        t22 = $[50];
    }
    let t23;
    if ($[51] !== t20) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t20,
            className: "w-full flex items-center justify-center gap-2 rounded-full bg-black px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-zinc-800 hover:shadow-md active:scale-95",
            children: [
                t21,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
            lineNumber: 213,
            columnNumber: 11
        }, this);
        $[51] = t20;
        $[52] = t23;
    } else {
        t23 = $[52];
    }
    let t24;
    if ($[53] !== t19 || $[54] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "border-t border-zinc-100 pt-3",
            children: [
                t19,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
            lineNumber: 221,
            columnNumber: 11
        }, this);
        $[53] = t19;
        $[54] = t23;
        $[55] = t24;
    } else {
        t24 = $[55];
    }
    let t25;
    if ($[56] !== t13 || $[57] !== t24) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-3 flex flex-1 flex-col justify-between gap-3",
            children: [
                t13,
                t24
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
            lineNumber: 230,
            columnNumber: 11
        }, this);
        $[56] = t13;
        $[57] = t24;
        $[58] = t25;
    } else {
        t25 = $[58];
    }
    let t26;
    if ($[59] !== t25 || $[60] !== t7) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md",
            children: [
                t7,
                t25
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx",
            lineNumber: 239,
            columnNumber: 11
        }, this);
        $[59] = t25;
        $[60] = t7;
        $[61] = t26;
    } else {
        t26 = $[61];
    }
    return t26;
}
_s(ProductCard, "qJdiuS+1dIDKpPvDUI5/Vzm7at4=");
_c = ProductCard;
function _ProductCardFormatPrice(amount) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
    }).format(amount);
}
var _c;
__turbopack_context__.k.register(_c, "ProductCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductDetailModal",
    ()=>ProductDetailModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/store.js [app-client] (ecmascript) <export default as Store>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PackageCheck$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/package-check.js [app-client] (ecmascript) <export default as PackageCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/qr-code.js [app-client] (ecmascript) <export default as QrCode>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ProductDetailModal(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(93);
    if ($[0] !== "2f74f31af55efea3610080b87d3027d0d2db5889a3752c1f30ec5c1a6d20ee6c") {
        for(let $i = 0; $i < 93; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2f74f31af55efea3610080b87d3027d0d2db5889a3752c1f30ec5c1a6d20ee6c";
    }
    const { product, isOpen, onClose } = t0;
    const [selectedQty, setSelectedQty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    if (!isOpen || !product) {
        return null;
    }
    const formatPrice = _ProductDetailModalFormatPrice;
    let t1;
    if ($[1] !== onClose || $[2] !== product.name || $[3] !== product.unit || $[4] !== selectedQty) {
        t1 = ({
            "ProductDetailModal[handleAddToCart]": ()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`Đã thêm ${selectedQty} ${product.unit} "${product.name}" vào giỏ hàng!`);
                onClose();
            }
        })["ProductDetailModal[handleAddToCart]"];
        $[1] = onClose;
        $[2] = product.name;
        $[3] = product.unit;
        $[4] = selectedQty;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    const handleAddToCart = t1;
    const mainImage = product.mainImage || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800";
    let t2;
    if ($[6] !== onClose) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity",
            onClick: onClose
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 52,
            columnNumber: 10
        }, this);
        $[6] = onClose;
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    let t3;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
            className: "size-5"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 60,
            columnNumber: 10
        }, this);
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    let t4;
    if ($[9] !== onClose) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onClose,
            "aria-label": "\u0110\xF3ng",
            className: "absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-black",
            children: t3
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 67,
            columnNumber: 10
        }, this);
        $[9] = onClose;
        $[10] = t4;
    } else {
        t4 = $[10];
    }
    let t5;
    if ($[11] !== mainImage || $[12] !== product.name) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: mainImage,
            alt: product.name,
            fill: true,
            priority: true,
            className: "object-cover"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 75,
            columnNumber: 10
        }, this);
        $[11] = mainImage;
        $[12] = product.name;
        $[13] = t5;
    } else {
        t5 = $[13];
    }
    let t6;
    if ($[14] !== product.categoryName) {
        t6 = product.categoryName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "absolute left-3 top-3 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900 shadow-sm",
            children: product.categoryName
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 84,
            columnNumber: 34
        }, this);
        $[14] = product.categoryName;
        $[15] = t6;
    } else {
        t6 = $[15];
    }
    let t7;
    if ($[16] !== t5 || $[17] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200",
            children: [
                t5,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 92,
            columnNumber: 10
        }, this);
        $[16] = t5;
        $[17] = t6;
        $[18] = t7;
    } else {
        t7 = $[18];
    }
    let t8;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 rounded-xl bg-zinc-50 p-3 border border-zinc-100",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                    className: "size-4 text-emerald-600 shrink-0"
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                    lineNumber: 101,
                    columnNumber: 100
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-semibold text-zinc-800",
                            children: "ATVSTP VietGAP"
                        }, void 0, false, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                            lineNumber: 101,
                            columnNumber: 165
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-zinc-500",
                            children: "Đảm bảo an toàn"
                        }, void 0, false, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                            lineNumber: 101,
                            columnNumber: 226
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                    lineNumber: 101,
                    columnNumber: 160
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 101,
            columnNumber: 10
        }, this);
        $[19] = t8;
    } else {
        t8 = $[19];
    }
    let t9;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-3 text-xs",
            children: [
                t8,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 rounded-xl bg-zinc-50 p-3 border border-zinc-100",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__["QrCode"], {
                            className: "size-4 text-emerald-600 shrink-0"
                        }, void 0, false, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                            lineNumber: 108,
                            columnNumber: 152
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-semibold text-zinc-800",
                                    children: "Truy xuất nguồn gốc"
                                }, void 0, false, {
                                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                                    lineNumber: 108,
                                    columnNumber: 212
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-zinc-500",
                                    children: "Mã QR chính hãng"
                                }, void 0, false, {
                                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                                    lineNumber: 108,
                                    columnNumber: 278
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                            lineNumber: 108,
                            columnNumber: 207
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                    lineNumber: 108,
                    columnNumber: 62
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 108,
            columnNumber: 10
        }, this);
        $[20] = t9;
    } else {
        t9 = $[20];
    }
    let t10;
    if ($[21] !== t7) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                t7,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 115,
            columnNumber: 11
        }, this);
        $[21] = t7;
        $[22] = t10;
    } else {
        t10 = $[22];
    }
    let t11;
    if ($[23] !== product.districtName || $[24] !== product.supplierName) {
        t11 = product.supplierName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between text-xs font-medium text-zinc-500 mb-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__["Store"], {
                            className: "size-3.5"
                        }, void 0, false, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                            lineNumber: 123,
                            columnNumber: 251
                        }, this),
                        product.supplierName
                    ]
                }, void 0, true, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                    lineNumber: 123,
                    columnNumber: 125
                }, this),
                product.districtName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "flex items-center gap-1 text-zinc-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                            className: "size-3"
                        }, void 0, false, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                            lineNumber: 123,
                            columnNumber: 391
                        }, this),
                        product.districtName
                    ]
                }, void 0, true, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                    lineNumber: 123,
                    columnNumber: 335
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 123,
            columnNumber: 35
        }, this);
        $[23] = product.districtName;
        $[24] = product.supplierName;
        $[25] = t11;
    } else {
        t11 = $[25];
    }
    let t12;
    if ($[26] !== product.name) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-2xl font-bold text-zinc-900 tracking-tight",
            children: product.name
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 132,
            columnNumber: 11
        }, this);
        $[26] = product.name;
        $[27] = t12;
    } else {
        t12 = $[27];
    }
    let t13;
    if ($[28] !== product.averageRating || $[29] !== product.totalReviews) {
        t13 = product.averageRating && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-2 flex items-center gap-2 text-sm text-zinc-600",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center text-amber-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                            className: "size-4 fill-amber-500"
                        }, void 0, false, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                            lineNumber: 140,
                            columnNumber: 154
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "ml-1 font-bold",
                            children: product.averageRating
                        }, void 0, false, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                            lineNumber: 140,
                            columnNumber: 196
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                    lineNumber: 140,
                    columnNumber: 104
                }, this),
                product.totalReviews && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-zinc-400",
                    children: [
                        "(",
                        product.totalReviews,
                        " đánh giá)"
                    ]
                }, void 0, true, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                    lineNumber: 140,
                    columnNumber: 290
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 140,
            columnNumber: 36
        }, this);
        $[28] = product.averageRating;
        $[29] = product.totalReviews;
        $[30] = t13;
    } else {
        t13 = $[30];
    }
    let t14;
    if ($[31] !== product.retailPrice) {
        t14 = formatPrice(product.retailPrice);
        $[31] = product.retailPrice;
        $[32] = t14;
    } else {
        t14 = $[32];
    }
    let t15;
    if ($[33] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-3xl font-extrabold text-zinc-900",
            children: t14
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 157,
            columnNumber: 11
        }, this);
        $[33] = t14;
        $[34] = t15;
    } else {
        t15 = $[34];
    }
    let t16;
    if ($[35] !== product.unit) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-sm font-medium text-zinc-500",
            children: [
                "/ ",
                product.unit
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 165,
            columnNumber: 11
        }, this);
        $[35] = product.unit;
        $[36] = t16;
    } else {
        t16 = $[36];
    }
    let t17;
    if ($[37] !== t15 || $[38] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-baseline gap-2",
            children: [
                t15,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 173,
            columnNumber: 11
        }, this);
        $[37] = t15;
        $[38] = t16;
        $[39] = t17;
    } else {
        t17 = $[39];
    }
    let t18;
    if ($[40] !== product.unit || $[41] !== product.wholesalePrice) {
        t18 = product.wholesalePrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-1 flex items-center gap-2 text-xs font-medium text-emerald-700",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "Giá sỉ đại lý: ",
                    formatPrice(product.wholesalePrice),
                    " /",
                    product.unit
                ]
            }, void 0, true, {
                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                lineNumber: 182,
                columnNumber: 120
            }, this)
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 182,
            columnNumber: 37
        }, this);
        $[40] = product.unit;
        $[41] = product.wholesalePrice;
        $[42] = t18;
    } else {
        t18 = $[42];
    }
    let t19;
    if ($[43] !== t17 || $[44] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-4 rounded-2xl bg-zinc-50 p-4 border border-zinc-200/80",
            children: [
                t17,
                t18
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 191,
            columnNumber: 11
        }, this);
        $[43] = t17;
        $[44] = t18;
        $[45] = t19;
    } else {
        t19 = $[45];
    }
    let t20;
    if ($[46] !== product.packagingStandard) {
        t20 = product.packagingStandard && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PackageCheck$3e$__["PackageCheck"], {
                    className: "size-4 text-zinc-400 mt-0.5 shrink-0"
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                    lineNumber: 200,
                    columnNumber: 80
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            className: "text-zinc-800",
                            children: "Quy cách:"
                        }, void 0, false, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                            lineNumber: 200,
                            columnNumber: 151
                        }, this),
                        " ",
                        product.packagingStandard
                    ]
                }, void 0, true, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                    lineNumber: 200,
                    columnNumber: 145
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 200,
            columnNumber: 40
        }, this);
        $[46] = product.packagingStandard;
        $[47] = t20;
    } else {
        t20 = $[47];
    }
    let t21;
    if ($[48] !== product.quantity || $[49] !== product.unit) {
        t21 = product.quantity !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "size-2 rounded-full bg-emerald-500"
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                    lineNumber: 208,
                    columnNumber: 86
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            className: "text-zinc-800",
                            children: "Tồn kho:"
                        }, void 0, false, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                            lineNumber: 208,
                            columnNumber: 147
                        }, this),
                        " ",
                        product.quantity,
                        " ",
                        product.unit,
                        " sẵn có"
                    ]
                }, void 0, true, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                    lineNumber: 208,
                    columnNumber: 141
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 208,
            columnNumber: 45
        }, this);
        $[48] = product.quantity;
        $[49] = product.unit;
        $[50] = t21;
    } else {
        t21 = $[50];
    }
    let t22;
    if ($[51] !== t20 || $[52] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-4 space-y-2 text-sm text-zinc-600",
            children: [
                t20,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 217,
            columnNumber: 11
        }, this);
        $[51] = t20;
        $[52] = t21;
        $[53] = t22;
    } else {
        t22 = $[53];
    }
    let t23;
    if ($[54] !== product.description) {
        t23 = product.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                    className: "text-xs font-bold uppercase tracking-wider text-zinc-400",
                    children: "Mô tả sản phẩm"
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                    lineNumber: 226,
                    columnNumber: 56
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-1 text-sm text-zinc-600 leading-relaxed",
                    children: product.description
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                    lineNumber: 226,
                    columnNumber: 148
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 226,
            columnNumber: 34
        }, this);
        $[54] = product.description;
        $[55] = t23;
    } else {
        t23 = $[55];
    }
    let t24;
    if ($[56] !== t11 || $[57] !== t12 || $[58] !== t13 || $[59] !== t19 || $[60] !== t22 || $[61] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t11,
                t12,
                t13,
                t19,
                t22,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 234,
            columnNumber: 11
        }, this);
        $[56] = t11;
        $[57] = t12;
        $[58] = t13;
        $[59] = t19;
        $[60] = t22;
        $[61] = t23;
        $[62] = t24;
    } else {
        t24 = $[62];
    }
    let t25;
    if ($[63] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-sm font-medium text-zinc-700",
            children: "Số lượng:"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 247,
            columnNumber: 11
        }, this);
        $[63] = t25;
    } else {
        t25 = $[63];
    }
    let t26;
    if ($[64] === Symbol.for("react.memo_cache_sentinel")) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: {
                "ProductDetailModal[<button>.onClick]": ()=>setSelectedQty(_ProductDetailModalButtonOnClickSetSelectedQty)
            }["ProductDetailModal[<button>.onClick]"],
            className: "flex size-7 items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100",
            children: "-"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 254,
            columnNumber: 11
        }, this);
        $[64] = t26;
    } else {
        t26 = $[64];
    }
    let t27;
    if ($[65] !== selectedQty) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "w-10 text-center text-sm font-bold text-zinc-900",
            children: selectedQty
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 263,
            columnNumber: 11
        }, this);
        $[65] = selectedQty;
        $[66] = t27;
    } else {
        t27 = $[66];
    }
    let t28;
    if ($[67] === Symbol.for("react.memo_cache_sentinel")) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: {
                "ProductDetailModal[<button>.onClick]": ()=>setSelectedQty(_ProductDetailModalButtonOnClickSetSelectedQty2)
            }["ProductDetailModal[<button>.onClick]"],
            className: "flex size-7 items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100",
            children: "+"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 271,
            columnNumber: 11
        }, this);
        $[67] = t28;
    } else {
        t28 = $[67];
    }
    let t29;
    if ($[68] !== t27) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-4",
            children: [
                t25,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center rounded-full border border-zinc-300 bg-white p-1",
                    children: [
                        t26,
                        t27,
                        t28
                    ]
                }, void 0, true, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                    lineNumber: 280,
                    columnNumber: 57
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 280,
            columnNumber: 11
        }, this);
        $[68] = t27;
        $[69] = t29;
    } else {
        t29 = $[69];
    }
    let t30;
    if ($[70] === Symbol.for("react.memo_cache_sentinel")) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 288,
            columnNumber: 11
        }, this);
        $[70] = t30;
    } else {
        t30 = $[70];
    }
    const t31 = product.retailPrice * selectedQty;
    let t32;
    if ($[71] !== t31) {
        t32 = formatPrice(t31);
        $[71] = t31;
        $[72] = t32;
    } else {
        t32 = $[72];
    }
    let t33;
    if ($[73] !== t32) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: [
                "Thêm vào giỏ hàng (",
                t32,
                ")"
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 304,
            columnNumber: 11
        }, this);
        $[73] = t32;
        $[74] = t33;
    } else {
        t33 = $[74];
    }
    let t34;
    if ($[75] !== handleAddToCart || $[76] !== t33) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-3",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleAddToCart,
                className: "flex-1 flex items-center justify-center gap-2 rounded-full bg-black py-3 px-6 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:scale-95 shadow-md",
                children: [
                    t30,
                    t33
                ]
            }, void 0, true, {
                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
                lineNumber: 312,
                columnNumber: 39
            }, this)
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 312,
            columnNumber: 11
        }, this);
        $[75] = handleAddToCart;
        $[76] = t33;
        $[77] = t34;
    } else {
        t34 = $[77];
    }
    let t35;
    if ($[78] !== t29 || $[79] !== t34) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4 pt-4 border-t border-zinc-100",
            children: [
                t29,
                t34
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 321,
            columnNumber: 11
        }, this);
        $[78] = t29;
        $[79] = t34;
        $[80] = t35;
    } else {
        t35 = $[80];
    }
    let t36;
    if ($[81] !== t24 || $[82] !== t35) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col justify-between space-y-4",
            children: [
                t24,
                t35
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 330,
            columnNumber: 11
        }, this);
        $[81] = t24;
        $[82] = t35;
        $[83] = t36;
    } else {
        t36 = $[83];
    }
    let t37;
    if ($[84] !== t10 || $[85] !== t36) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8",
            children: [
                t10,
                t36
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 339,
            columnNumber: 11
        }, this);
        $[84] = t10;
        $[85] = t36;
        $[86] = t37;
    } else {
        t37 = $[86];
    }
    let t38;
    if ($[87] !== t37 || $[88] !== t4) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl transition-all border border-zinc-200",
            children: [
                t4,
                t37
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 348,
            columnNumber: 11
        }, this);
        $[87] = t37;
        $[88] = t4;
        $[89] = t38;
    } else {
        t38 = $[89];
    }
    let t39;
    if ($[90] !== t2 || $[91] !== t38) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6",
            children: [
                t2,
                t38
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx",
            lineNumber: 357,
            columnNumber: 11
        }, this);
        $[90] = t2;
        $[91] = t38;
        $[92] = t39;
    } else {
        t39 = $[92];
    }
    return t39;
}
_s(ProductDetailModal, "UCbti5QIwkt/kXQnx8nsoTYx0lI=");
_c = ProductDetailModal;
function _ProductDetailModalButtonOnClickSetSelectedQty2(q_0) {
    return q_0 + 1;
}
function _ProductDetailModalButtonOnClickSetSelectedQty(q) {
    return Math.max(1, q - 1);
}
function _ProductDetailModalFormatPrice(amount) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
    }).format(amount);
}
var _c;
__turbopack_context__.k.register(_c, "ProductDetailModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductsSearchPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/arrow-up-down.js [app-client] (ecmascript) <export default as ArrowUpDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2d$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PackageSearch$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/package-search.js [app-client] (ecmascript) <export default as PackageSearch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$services$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/services/product.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$app$2f28$private$292f$products$2f$components$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$app$2f28$private$292f$products$2f$components$2f$ProductDetailModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/components/ProductDetailModal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function ProductsSearchPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(118);
    if ($[0] !== "72ad821ca9362410afc7d0996ea87a77e36909ba8cdc2dcade834c013281ec3e") {
        for(let $i = 0; $i < 118; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "72ad821ca9362410afc7d0996ea87a77e36909ba8cdc2dcade834c013281ec3e";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t0);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [];
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    const [totalCount, setTotalCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    const [keyword, setKeyword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [minPrice, setMinPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [maxPrice, setMaxPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sortOption, setSortOption] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("newest");
    const [showMobileFilter, setShowMobileFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedProductForModal, setSelectedProductForModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    let t2;
    let t3;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = ({
            "ProductsSearchPage[useEffect()]": ()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$services$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["productService"].getCategories().then({
                    "ProductsSearchPage[useEffect() > (anonymous)()]": (cats)=>setCategories(cats)
                }["ProductsSearchPage[useEffect() > (anonymous)()]"]);
            }
        })["ProductsSearchPage[useEffect()]"];
        t3 = [];
        $[3] = t2;
        $[4] = t3;
    } else {
        t2 = $[3];
        t3 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    if ($[5] !== keyword || $[6] !== maxPrice || $[7] !== minPrice || $[8] !== selectedCategory || $[9] !== sortOption) {
        t4 = ({
            "ProductsSearchPage[fetchProducts]": ()=>{
                setIsLoading(true);
                const params = {
                    keyword: keyword.trim() || undefined,
                    categoryId: selectedCategory !== "all" ? selectedCategory : undefined,
                    minPrice: minPrice ? Number(minPrice) : undefined,
                    maxPrice: maxPrice ? Number(maxPrice) : undefined,
                    sort: sortOption,
                    page: 1,
                    pageSize: 20
                };
                __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$services$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["productService"].searchProducts(params).then({
                    "ProductsSearchPage[fetchProducts > (anonymous)()]": (res)=>{
                        setProducts(res.items);
                        setTotalCount(res.totalCount);
                    }
                }["ProductsSearchPage[fetchProducts > (anonymous)()]"]).finally({
                    "ProductsSearchPage[fetchProducts > (anonymous)()]": ()=>{
                        setIsLoading(false);
                    }
                }["ProductsSearchPage[fetchProducts > (anonymous)()]"]);
            }
        })["ProductsSearchPage[fetchProducts]"];
        $[5] = keyword;
        $[6] = maxPrice;
        $[7] = minPrice;
        $[8] = selectedCategory;
        $[9] = sortOption;
        $[10] = t4;
    } else {
        t4 = $[10];
    }
    const fetchProducts = t4;
    let t5;
    let t6;
    if ($[11] !== fetchProducts) {
        t5 = ({
            "ProductsSearchPage[useEffect()]": ()=>{
                const timer = setTimeout({
                    "ProductsSearchPage[useEffect() > setTimeout()]": ()=>{
                        startTransition({
                            "ProductsSearchPage[useEffect() > setTimeout() > startTransition()]": ()=>{
                                fetchProducts();
                            }
                        }["ProductsSearchPage[useEffect() > setTimeout() > startTransition()]"]);
                    }
                }["ProductsSearchPage[useEffect() > setTimeout()]"], 300);
                return ()=>clearTimeout(timer);
            }
        })["ProductsSearchPage[useEffect()]"];
        t6 = [
            fetchProducts
        ];
        $[11] = fetchProducts;
        $[12] = t5;
        $[13] = t6;
    } else {
        t5 = $[12];
        t6 = $[13];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t5, t6);
    let t7;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = ({
            "ProductsSearchPage[handleClearFilters]": ()=>{
                setKeyword("");
                setSelectedCategory("all");
                setMinPrice("");
                setMaxPrice("");
                setSortOption("newest");
            }
        })["ProductsSearchPage[handleClearFilters]"];
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    const handleClearFilters = t7;
    let t8;
    if ($[15] !== categories || $[16] !== selectedCategory) {
        t8 = categories.find({
            "ProductsSearchPage[categories.find()]": (c)=>c.categoryId === selectedCategory
        }["ProductsSearchPage[categories.find()]"])?.name;
        $[15] = categories;
        $[16] = selectedCategory;
        $[17] = t8;
    } else {
        t8 = $[17];
    }
    const activeCategoryName = t8;
    let t9;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900 mb-2",
                    children: "Chợ thực phẩm FoodLink"
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 154,
                    columnNumber: 15
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl",
                    children: "Tìm kiếm sản phẩm"
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 154,
                    columnNumber: 169
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-1 text-sm text-zinc-500",
                    children: "Khám phá nông sản tươi sạch, thực phẩm chất lượng cao từ các nhà cung cấp uy tín."
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 154,
                    columnNumber: 272
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 154,
            columnNumber: 10
        }, this);
        $[18] = t9;
    } else {
        t9 = $[18];
    }
    let t10;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
            className: "absolute left-3.5 size-4 text-zinc-400"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 161,
            columnNumber: 11
        }, this);
        $[19] = t10;
    } else {
        t10 = $[19];
    }
    let t11;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = ({
            "ProductsSearchPage[<input>.onChange]": (e)=>setKeyword(e.target.value)
        })["ProductsSearchPage[<input>.onChange]"];
        $[20] = t11;
    } else {
        t11 = $[20];
    }
    let t12;
    let t13;
    if ($[21] !== keyword) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            value: keyword,
            onChange: t11,
            placeholder: "T\xECm t\xEAn s\u1EA3n ph\u1EA9m, nh\xE0 cung c\u1EA5p...",
            className: "w-full rounded-full border border-zinc-300 bg-white py-2.5 pl-10 pr-10 text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 178,
            columnNumber: 11
        }, this);
        t13 = keyword && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: {
                "ProductsSearchPage[<button>.onClick]": ()=>setKeyword("")
            }["ProductsSearchPage[<button>.onClick]"],
            "aria-label": "X\xF3a t\u1EEB kh\xF3a",
            className: "absolute right-3 rounded-full p-1 text-zinc-400 hover:text-zinc-600",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                lineNumber: 181,
                columnNumber: 166
            }, this)
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 179,
            columnNumber: 22
        }, this);
        $[21] = keyword;
        $[22] = t12;
        $[23] = t13;
    } else {
        t12 = $[22];
        t13 = $[23];
    }
    let t14;
    if ($[24] !== t12 || $[25] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200/80 pb-6",
            children: [
                t9,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full sm:w-80 lg:w-96",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex items-center",
                        children: [
                            t10,
                            t12,
                            t13
                        ]
                    }, void 0, true, {
                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                        lineNumber: 191,
                        columnNumber: 181
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 191,
                    columnNumber: 132
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 191,
            columnNumber: 11
        }, this);
        $[24] = t12;
        $[25] = t13;
        $[26] = t14;
    } else {
        t14 = $[26];
    }
    let t15;
    if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-base font-bold text-zinc-900 flex items-center gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                    className: "size-4"
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 200,
                    columnNumber: 85
                }, this),
                "Bộ lọc tìm kiếm"
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 200,
            columnNumber: 11
        }, this);
        $[27] = t15;
    } else {
        t15 = $[27];
    }
    let t16;
    if ($[28] !== keyword || $[29] !== maxPrice || $[30] !== minPrice || $[31] !== selectedCategory) {
        t16 = (selectedCategory !== "all" || keyword || minPrice || maxPrice) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleClearFilters,
            className: "text-xs font-semibold text-emerald-700 hover:underline",
            children: "Xóa lọc"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 207,
            columnNumber: 78
        }, this);
        $[28] = keyword;
        $[29] = maxPrice;
        $[30] = minPrice;
        $[31] = selectedCategory;
        $[32] = t16;
    } else {
        t16 = $[32];
    }
    let t17;
    if ($[33] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between border-b border-zinc-100 pb-3",
            children: [
                t15,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 218,
            columnNumber: 11
        }, this);
        $[33] = t16;
        $[34] = t17;
    } else {
        t17 = $[34];
    }
    let t18;
    if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-xs font-bold uppercase tracking-wider text-zinc-400",
            children: "Danh mục thực phẩm"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 226,
            columnNumber: 11
        }, this);
        $[35] = t18;
    } else {
        t18 = $[35];
    }
    let t19;
    if ($[36] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = ({
            "ProductsSearchPage[<button>.onClick]": ()=>setSelectedCategory("all")
        })["ProductsSearchPage[<button>.onClick]"];
        $[36] = t19;
    } else {
        t19 = $[36];
    }
    const t20 = `w-full text-left px-3 py-2 text-sm rounded-xl font-medium transition-colors ${selectedCategory === "all" ? "bg-black text-white" : "text-zinc-700 hover:bg-zinc-100"}`;
    let t21;
    if ($[37] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t19,
            className: t20,
            children: "Tất cả danh mục"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 243,
            columnNumber: 11
        }, this);
        $[37] = t20;
        $[38] = t21;
    } else {
        t21 = $[38];
    }
    let t22;
    if ($[39] !== categories || $[40] !== selectedCategory) {
        let t23;
        if ($[42] !== selectedCategory) {
            t23 = ({
                "ProductsSearchPage[categories.map()]": (cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: {
                            "ProductsSearchPage[categories.map() > <button>.onClick]": ()=>setSelectedCategory(cat.categoryId)
                        }["ProductsSearchPage[categories.map() > <button>.onClick]"],
                        className: `w-full text-left px-3 py-2 text-sm rounded-xl font-medium transition-colors flex items-center justify-between ${selectedCategory === cat.categoryId ? "bg-black text-white" : "text-zinc-700 hover:bg-zinc-100"}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: cat.name
                        }, void 0, false, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                            lineNumber: 256,
                            columnNumber: 294
                        }, this)
                    }, cat.categoryId, false, {
                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                        lineNumber: 254,
                        columnNumber: 56
                    }, this)
            })["ProductsSearchPage[categories.map()]"];
            $[42] = selectedCategory;
            $[43] = t23;
        } else {
            t23 = $[43];
        }
        t22 = categories.map(t23);
        $[39] = categories;
        $[40] = selectedCategory;
        $[41] = t22;
    } else {
        t22 = $[41];
    }
    let t23;
    if ($[44] !== t21 || $[45] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: [
                t18,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: [
                        t21,
                        t22
                    ]
                }, void 0, true, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 272,
                    columnNumber: 43
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 272,
            columnNumber: 11
        }, this);
        $[44] = t21;
        $[45] = t22;
        $[46] = t23;
    } else {
        t23 = $[46];
    }
    let t24;
    if ($[47] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-xs font-bold uppercase tracking-wider text-zinc-400",
            children: "Khoảng giá (VND)"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 281,
            columnNumber: 11
        }, this);
        $[47] = t24;
    } else {
        t24 = $[47];
    }
    let t25;
    if ($[48] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = ({
            "ProductsSearchPage[<input>.onChange]": (e_0)=>setMinPrice(e_0.target.value)
        })["ProductsSearchPage[<input>.onChange]"];
        $[48] = t25;
    } else {
        t25 = $[48];
    }
    let t26;
    if ($[49] !== minPrice) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "number",
            placeholder: "T\u1EEB (\u20AB)",
            value: minPrice,
            onChange: t25,
            className: "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 focus:border-black focus:bg-white focus:outline-none"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 297,
            columnNumber: 11
        }, this);
        $[49] = minPrice;
        $[50] = t26;
    } else {
        t26 = $[50];
    }
    let t27;
    if ($[51] === Symbol.for("react.memo_cache_sentinel")) {
        t27 = ({
            "ProductsSearchPage[<input>.onChange]": (e_1)=>setMaxPrice(e_1.target.value)
        })["ProductsSearchPage[<input>.onChange]"];
        $[51] = t27;
    } else {
        t27 = $[51];
    }
    let t28;
    if ($[52] !== maxPrice) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "number",
            placeholder: "\u0110\u1EBFn (\u20AB)",
            value: maxPrice,
            onChange: t27,
            className: "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 focus:border-black focus:bg-white focus:outline-none"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 314,
            columnNumber: 11
        }, this);
        $[52] = maxPrice;
        $[53] = t28;
    } else {
        t28 = $[53];
    }
    let t29;
    if ($[54] !== t26 || $[55] !== t28) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-3 pt-4 border-t border-zinc-100",
            children: [
                t24,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-2",
                    children: [
                        t26,
                        t28
                    ]
                }, void 0, true, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 322,
                    columnNumber: 73
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 322,
            columnNumber: 11
        }, this);
        $[54] = t26;
        $[55] = t28;
        $[56] = t29;
    } else {
        t29 = $[56];
    }
    let t30;
    if ($[57] !== t17 || $[58] !== t23 || $[59] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "hidden lg:block lg:col-span-1 space-y-6 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm h-fit",
            children: [
                t17,
                t23,
                t29
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 331,
            columnNumber: 11
        }, this);
        $[57] = t17;
        $[58] = t23;
        $[59] = t29;
        $[60] = t30;
    } else {
        t30 = $[60];
    }
    let t31;
    if ($[61] === Symbol.for("react.memo_cache_sentinel")) {
        t31 = ({
            "ProductsSearchPage[<button>.onClick]": ()=>setShowMobileFilter(true)
        })["ProductsSearchPage[<button>.onClick]"];
        $[61] = t31;
    } else {
        t31 = $[61];
    }
    let t32;
    if ($[62] === Symbol.for("react.memo_cache_sentinel")) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t31,
            className: "flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 shadow-sm",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                    className: "size-4"
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 350,
                    columnNumber: 170
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Bộ lọc sản phẩm"
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 350,
                    columnNumber: 210
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 350,
            columnNumber: 11
        }, this);
        $[62] = t32;
    } else {
        t32 = $[62];
    }
    let t33;
    if ($[63] === Symbol.for("react.memo_cache_sentinel")) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__["ArrowUpDown"], {
            className: "size-4 text-zinc-400"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 357,
            columnNumber: 11
        }, this);
        $[63] = t33;
    } else {
        t33 = $[63];
    }
    let t34;
    if ($[64] === Symbol.for("react.memo_cache_sentinel")) {
        t34 = ({
            "ProductsSearchPage[<select>.onChange]": (e_2)=>setSortOption(e_2.target.value)
        })["ProductsSearchPage[<select>.onChange]"];
        $[64] = t34;
    } else {
        t34 = $[64];
    }
    let t35;
    let t36;
    let t37;
    let t38;
    if ($[65] === Symbol.for("react.memo_cache_sentinel")) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "newest",
            children: "Mới nhất"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 376,
            columnNumber: 11
        }, this);
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "price_asc",
            children: "Giá: Thấp đến Cao"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 377,
            columnNumber: 11
        }, this);
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "price_desc",
            children: "Giá: Cao đến Thấp"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 378,
            columnNumber: 11
        }, this);
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "name_asc",
            children: "Tên: A - Z"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 379,
            columnNumber: 11
        }, this);
        $[65] = t35;
        $[66] = t36;
        $[67] = t37;
        $[68] = t38;
    } else {
        t35 = $[65];
        t36 = $[66];
        t37 = $[67];
        t38 = $[68];
    }
    let t39;
    if ($[69] !== sortOption) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between lg:hidden",
            children: [
                t32,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        t33,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: sortOption,
                            onChange: t34,
                            className: "rounded-full border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 focus:outline-none",
                            children: [
                                t35,
                                t36,
                                t37,
                                t38
                            ]
                        }, void 0, true, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                            lineNumber: 392,
                            columnNumber: 123
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 392,
                    columnNumber: 77
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 392,
            columnNumber: 11
        }, this);
        $[69] = sortOption;
        $[70] = t39;
    } else {
        t39 = $[70];
    }
    let t40;
    if ($[71] !== totalCount) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-sm text-zinc-600 font-medium",
            children: [
                "Hiển thị ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-bold text-zinc-900",
                    children: totalCount
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 400,
                    columnNumber: 71
                }, this),
                " sản phẩm"
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 400,
            columnNumber: 11
        }, this);
        $[71] = totalCount;
        $[72] = t40;
    } else {
        t40 = $[72];
    }
    let t41;
    let t42;
    if ($[73] === Symbol.for("react.memo_cache_sentinel")) {
        t41 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__["ArrowUpDown"], {
            className: "size-4 text-zinc-400"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 409,
            columnNumber: 11
        }, this);
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs text-zinc-500 font-medium",
            children: "Sắp xếp:"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 410,
            columnNumber: 11
        }, this);
        $[73] = t41;
        $[74] = t42;
    } else {
        t41 = $[73];
        t42 = $[74];
    }
    let t43;
    if ($[75] === Symbol.for("react.memo_cache_sentinel")) {
        t43 = ({
            "ProductsSearchPage[<select>.onChange]": (e_3)=>setSortOption(e_3.target.value)
        })["ProductsSearchPage[<select>.onChange]"];
        $[75] = t43;
    } else {
        t43 = $[75];
    }
    let t44;
    let t45;
    let t46;
    let t47;
    if ($[76] === Symbol.for("react.memo_cache_sentinel")) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "newest",
            children: "Mới nhất"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 431,
            columnNumber: 11
        }, this);
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "price_asc",
            children: "Giá: Thấp đến Cao"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 432,
            columnNumber: 11
        }, this);
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "price_desc",
            children: "Giá: Cao đến Thấp"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 433,
            columnNumber: 11
        }, this);
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "name_asc",
            children: "Tên: A - Z"
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 434,
            columnNumber: 11
        }, this);
        $[76] = t44;
        $[77] = t45;
        $[78] = t46;
        $[79] = t47;
    } else {
        t44 = $[76];
        t45 = $[77];
        t46 = $[78];
        t47 = $[79];
    }
    let t48;
    if ($[80] !== sortOption) {
        t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: [
                t41,
                t42,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    value: sortOption,
                    onChange: t43,
                    className: "rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm font-semibold text-zinc-800 focus:border-black focus:outline-none cursor-pointer",
                    children: [
                        t44,
                        t45,
                        t46,
                        t47
                    ]
                }, void 0, true, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 447,
                    columnNumber: 62
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 447,
            columnNumber: 11
        }, this);
        $[80] = sortOption;
        $[81] = t48;
    } else {
        t48 = $[81];
    }
    let t49;
    if ($[82] !== t40 || $[83] !== t48) {
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "hidden lg:flex items-center justify-between rounded-2xl border border-zinc-200/80 bg-white px-5 py-3 shadow-sm",
            children: [
                t40,
                t48
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 455,
            columnNumber: 11
        }, this);
        $[82] = t40;
        $[83] = t48;
        $[84] = t49;
    } else {
        t49 = $[84];
    }
    let t50;
    if ($[85] !== activeCategoryName || $[86] !== keyword || $[87] !== maxPrice || $[88] !== minPrice || $[89] !== selectedCategory) {
        t50 = (selectedCategory !== "all" || keyword || minPrice || maxPrice) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap items-center gap-2 rounded-2xl bg-emerald-50/60 p-3 border border-emerald-100 text-xs",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-semibold text-emerald-900",
                    children: "Đang lọc theo:"
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 464,
                    columnNumber: 196
                }, this),
                keyword && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-medium text-emerald-800 shadow-sm border border-emerald-200",
                    children: [
                        'Từ khóa: "',
                        keyword,
                        '"',
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "size-3 cursor-pointer",
                            onClick: {
                                "ProductsSearchPage[<X>.onClick]": ()=>setKeyword("")
                            }["ProductsSearchPage[<X>.onClick]"]
                        }, void 0, false, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                            lineNumber: 464,
                            columnNumber: 444
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 464,
                    columnNumber: 278
                }, this),
                selectedCategory !== "all" && activeCategoryName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-medium text-emerald-800 shadow-sm border border-emerald-200",
                    children: [
                        "Danh mục: ",
                        activeCategoryName,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "size-3 cursor-pointer",
                            onClick: {
                                "ProductsSearchPage[<X>.onClick]": ()=>setSelectedCategory("all")
                            }["ProductsSearchPage[<X>.onClick]"]
                        }, void 0, false, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                            lineNumber: 466,
                            columnNumber: 286
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 466,
                    columnNumber: 110
                }, this),
                (minPrice || maxPrice) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-medium text-emerald-800 shadow-sm border border-emerald-200",
                    children: [
                        "Giá: ",
                        minPrice ? `${Number(minPrice).toLocaleString()}₫` : "0\u20AB",
                        " - ",
                        maxPrice ? `${Number(maxPrice).toLocaleString()}₫` : "\u221E",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "size-3 cursor-pointer",
                            onClick: {
                                "ProductsSearchPage[<X>.onClick]": ()=>{
                                    setMinPrice("");
                                    setMaxPrice("");
                                }
                            }["ProductsSearchPage[<X>.onClick]"]
                        }, void 0, false, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                            lineNumber: 468,
                            columnNumber: 365
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 468,
                    columnNumber: 84
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleClearFilters,
                    className: "ml-auto font-bold text-emerald-800 hover:underline",
                    children: "Xóa tất cả"
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 473,
                    columnNumber: 57
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 464,
            columnNumber: 78
        }, this);
        $[85] = activeCategoryName;
        $[86] = keyword;
        $[87] = maxPrice;
        $[88] = minPrice;
        $[89] = selectedCategory;
        $[90] = t50;
    } else {
        t50 = $[90];
    }
    let t51;
    if ($[91] !== isLoading || $[92] !== isPending || $[93] !== products) {
        t51 = isLoading || isPending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
            children: [
                1,
                2,
                3,
                4,
                5,
                6
            ].map(_ProductsSearchPageAnonymous)
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 485,
            columnNumber: 36
        }, this) : products.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
            children: products.map({
                "ProductsSearchPage[products.map()]": (product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$app$2f28$private$292f$products$2f$components$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductCard"], {
                        product: product,
                        onQuickView: {
                            "ProductsSearchPage[products.map() > <ProductCard>.onQuickView]": (p)=>setSelectedProductForModal(p)
                        }["ProductsSearchPage[products.map() > <ProductCard>.onQuickView]"]
                    }, product.productId, false, {
                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                        lineNumber: 486,
                        columnNumber: 58
                    }, this)
            }["ProductsSearchPage[products.map()]"])
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 485,
            columnNumber: 191
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-white p-12 text-center shadow-sm",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2d$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PackageSearch$3e$__["PackageSearch"], {
                        className: "size-8"
                    }, void 0, false, {
                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                        lineNumber: 489,
                        columnNumber: 308
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 489,
                    columnNumber: 201
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-xl font-bold text-zinc-900",
                    children: "Không tìm thấy sản phẩm phù hợp"
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 489,
                    columnNumber: 350
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-1 text-sm text-zinc-500 max-w-md",
                    children: "Rất tiếc, không có sản phẩm nào phù hợp với bộ lọc hoặc từ khóa của bạn. Bạn hãy thử tìm kiếm từ khóa khác hoặc xóa bớt bộ lọc."
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 489,
                    columnNumber: 434
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleClearFilters,
                    className: "mt-6 flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 transition-all",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                            className: "size-4"
                        }, void 0, false, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                            lineNumber: 489,
                            columnNumber: 804
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Đặt lại bộ lọc"
                        }, void 0, false, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                            lineNumber: 489,
                            columnNumber: 836
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 489,
                    columnNumber: 616
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 489,
            columnNumber: 57
        }, this);
        $[91] = isLoading;
        $[92] = isPending;
        $[93] = products;
        $[94] = t51;
    } else {
        t51 = $[94];
    }
    let t52;
    if ($[95] !== t49 || $[96] !== t50 || $[97] !== t51) {
        t52 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "lg:col-span-3 space-y-4",
            children: [
                t49,
                t50,
                t51
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 499,
            columnNumber: 11
        }, this);
        $[95] = t49;
        $[96] = t50;
        $[97] = t51;
        $[98] = t52;
    } else {
        t52 = $[98];
    }
    let t53;
    if ($[99] !== t30 || $[100] !== t39 || $[101] !== t52) {
        t53 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 gap-8 lg:grid-cols-4",
            children: [
                t30,
                t39,
                t52
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 509,
            columnNumber: 11
        }, this);
        $[99] = t30;
        $[100] = t39;
        $[101] = t52;
        $[102] = t53;
    } else {
        t53 = $[102];
    }
    let t54;
    if ($[103] !== t14 || $[104] !== t53) {
        t54 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-7xl space-y-6",
            children: [
                t14,
                t53
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 519,
            columnNumber: 11
        }, this);
        $[103] = t14;
        $[104] = t53;
        $[105] = t54;
    } else {
        t54 = $[105];
    }
    let t55;
    if ($[106] !== categories || $[107] !== selectedCategory || $[108] !== showMobileFilter) {
        t55 = showMobileFilter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-50 flex lg:hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 bg-black/50 backdrop-blur-sm",
                    onClick: {
                        "ProductsSearchPage[<div>.onClick]": ()=>setShowMobileFilter(false)
                    }["ProductsSearchPage[<div>.onClick]"]
                }, void 0, false, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 528,
                    columnNumber: 82
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative ml-auto flex h-full w-4/5 max-w-xs flex-col bg-white p-6 shadow-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between border-b pb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-bold text-zinc-900",
                                    children: "Bộ lọc tìm kiếm"
                                }, void 0, false, {
                                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                                    lineNumber: 530,
                                    columnNumber: 207
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: {
                                        "ProductsSearchPage[<button>.onClick]": ()=>setShowMobileFilter(false)
                                    }["ProductsSearchPage[<button>.onClick]"],
                                    className: "rounded-full p-1 text-zinc-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "size-5"
                                    }, void 0, false, {
                                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                                        lineNumber: 532,
                                        columnNumber: 97
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                                    lineNumber: 530,
                                    columnNumber: 275
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                            lineNumber: 530,
                            columnNumber: 142
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 space-y-6 overflow-y-auto flex-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs font-bold uppercase tracking-wider text-zinc-400",
                                        children: "Danh mục"
                                    }, void 0, false, {
                                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                                        lineNumber: 532,
                                        columnNumber: 218
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: {
                                                    "ProductsSearchPage[<button>.onClick]": ()=>{
                                                        setSelectedCategory("all");
                                                        setShowMobileFilter(false);
                                                    }
                                                }["ProductsSearchPage[<button>.onClick]"],
                                                className: `w-full text-left px-3 py-2 text-sm rounded-xl font-medium ${selectedCategory === "all" ? "bg-black text-white" : "text-zinc-700"}`,
                                                children: "Tất cả danh mục"
                                            }, void 0, false, {
                                                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                                                lineNumber: 532,
                                                columnNumber: 337
                                            }, this),
                                            categories.map({
                                                "ProductsSearchPage[categories.map()]": (cat_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: {
                                                            "ProductsSearchPage[categories.map() > <button>.onClick]": ()=>{
                                                                setSelectedCategory(cat_0.categoryId);
                                                                setShowMobileFilter(false);
                                                            }
                                                        }["ProductsSearchPage[categories.map() > <button>.onClick]"],
                                                        className: `w-full text-left px-3 py-2 text-sm rounded-xl font-medium ${selectedCategory === cat_0.categoryId ? "bg-black text-white" : "text-zinc-700"}`,
                                                        children: cat_0.name
                                                    }, cat_0.categoryId, false, {
                                                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                                                        lineNumber: 538,
                                                        columnNumber: 66
                                                    }, this)
                                            }["ProductsSearchPage[categories.map()]"])
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                                        lineNumber: 532,
                                        columnNumber: 310
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                                lineNumber: 532,
                                columnNumber: 191
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                            lineNumber: 532,
                            columnNumber: 136
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-4 border-t",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: {
                                    "ProductsSearchPage[<button>.onClick]": ()=>setShowMobileFilter(false)
                                }["ProductsSearchPage[<button>.onClick]"],
                                className: "w-full rounded-full bg-black py-3 text-center text-sm font-semibold text-white",
                                children: "Áp dụng bộ lọc"
                            }, void 0, false, {
                                fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                                lineNumber: 544,
                                columnNumber: 107
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                            lineNumber: 544,
                            columnNumber: 76
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
                    lineNumber: 530,
                    columnNumber: 49
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 528,
            columnNumber: 31
        }, this);
        $[106] = categories;
        $[107] = selectedCategory;
        $[108] = showMobileFilter;
        $[109] = t55;
    } else {
        t55 = $[109];
    }
    const t56 = !!selectedProductForModal;
    let t57;
    if ($[110] === Symbol.for("react.memo_cache_sentinel")) {
        t57 = ({
            "ProductsSearchPage[<ProductDetailModal>.onClose]": ()=>setSelectedProductForModal(null)
        })["ProductsSearchPage[<ProductDetailModal>.onClose]"];
        $[110] = t57;
    } else {
        t57 = $[110];
    }
    let t58;
    if ($[111] !== selectedProductForModal || $[112] !== t56) {
        t58 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$src$2f$app$2f28$private$292f$products$2f$components$2f$ProductDetailModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductDetailModal"], {
            product: selectedProductForModal,
            isOpen: t56,
            onClose: t57
        }, void 0, false, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 566,
            columnNumber: 11
        }, this);
        $[111] = selectedProductForModal;
        $[112] = t56;
        $[113] = t58;
    } else {
        t58 = $[113];
    }
    let t59;
    if ($[114] !== t54 || $[115] !== t55 || $[116] !== t58) {
        t59 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-zinc-50/50 p-4 sm:p-6 lg:p-8",
            children: [
                t54,
                t55,
                t58
            ]
        }, void 0, true, {
            fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
            lineNumber: 575,
            columnNumber: 11
        }, this);
        $[114] = t54;
        $[115] = t55;
        $[116] = t58;
        $[117] = t59;
    } else {
        t59 = $[117];
    }
    return t59;
}
_s(ProductsSearchPage, "ctM6kXpNrNvKhQUj1SFQLxBQCiI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"]
    ];
});
_c = ProductsSearchPage;
function _ProductsSearchPageAnonymous(n) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-80 animate-pulse rounded-2xl bg-zinc-200/60"
    }, n, false, {
        fileName: "[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/src/app/(private)/products/page.tsx",
        lineNumber: 586,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "ProductsSearchPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=prn232-su26-ai-audit-project-prn232_se18d05_group-05_source_FLDN_fe_src_064vc09._.js.map