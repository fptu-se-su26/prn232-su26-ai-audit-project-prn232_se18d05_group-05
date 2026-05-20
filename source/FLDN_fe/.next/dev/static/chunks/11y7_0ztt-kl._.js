(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/query-core/build/modern/mutationObserver.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MutationObserver",
    ()=>MutationObserver
]);
// src/mutationObserver.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$mutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/query-core/build/modern/mutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/query-core/build/modern/notifyManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$subscribable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/query-core/build/modern/subscribable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/query-core/build/modern/utils.js [app-client] (ecmascript)");
;
;
;
;
var MutationObserver = class extends __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$subscribable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Subscribable"] {
    #client;
    #currentResult = void 0;
    #currentMutation;
    #mutateOptions;
    constructor(client, options){
        super();
        this.#client = client;
        this.setOptions(options);
        this.bindMethods();
        this.#updateResult();
    }
    bindMethods() {
        this.mutate = this.mutate.bind(this);
        this.reset = this.reset.bind(this);
    }
    setOptions(options) {
        const prevOptions = this.options;
        this.options = this.#client.defaultMutationOptions(options);
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shallowEqualObjects"])(this.options, prevOptions)) {
            this.#client.getMutationCache().notify({
                type: "observerOptionsUpdated",
                mutation: this.#currentMutation,
                observer: this
            });
        }
        if (prevOptions?.mutationKey && this.options.mutationKey && (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashKey"])(prevOptions.mutationKey) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashKey"])(this.options.mutationKey)) {
            this.reset();
        } else if (this.#currentMutation?.state.status === "pending") {
            this.#currentMutation.setOptions(this.options);
        }
    }
    onUnsubscribe() {
        if (!this.hasListeners()) {
            this.#currentMutation?.removeObserver(this);
        }
    }
    onMutationUpdate(action) {
        this.#updateResult();
        this.#notify(action);
    }
    getCurrentResult() {
        return this.#currentResult;
    }
    reset() {
        this.#currentMutation?.removeObserver(this);
        this.#currentMutation = void 0;
        this.#updateResult();
        this.#notify();
    }
    mutate(variables, options) {
        this.#mutateOptions = options;
        this.#currentMutation?.removeObserver(this);
        this.#currentMutation = this.#client.getMutationCache().build(this.#client, this.options);
        this.#currentMutation.addObserver(this);
        return this.#currentMutation.execute(variables);
    }
    #updateResult() {
        const state = this.#currentMutation?.state ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$mutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultState"])();
        this.#currentResult = {
            ...state,
            isPending: state.status === "pending",
            isSuccess: state.status === "success",
            isError: state.status === "error",
            isIdle: state.status === "idle",
            mutate: this.mutate,
            reset: this.reset
        };
    }
    #notify(action) {
        __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifyManager"].batch(()=>{
            if (this.#mutateOptions && this.hasListeners()) {
                const variables = this.#currentResult.variables;
                const onMutateResult = this.#currentResult.context;
                const context = {
                    client: this.#client,
                    meta: this.options.meta,
                    mutationKey: this.options.mutationKey
                };
                if (action?.type === "success") {
                    try {
                        this.#mutateOptions.onSuccess?.(action.data, variables, onMutateResult, context);
                    } catch (e) {
                        void Promise.reject(e);
                    }
                    try {
                        this.#mutateOptions.onSettled?.(action.data, null, variables, onMutateResult, context);
                    } catch (e) {
                        void Promise.reject(e);
                    }
                } else if (action?.type === "error") {
                    try {
                        this.#mutateOptions.onError?.(action.error, variables, onMutateResult, context);
                    } catch (e) {
                        void Promise.reject(e);
                    }
                    try {
                        this.#mutateOptions.onSettled?.(void 0, action.error, variables, onMutateResult, context);
                    } catch (e) {
                        void Promise.reject(e);
                    }
                }
            }
            this.listeners.forEach((listener)=>{
                listener(this.#currentResult);
            });
        });
    }
};
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/query-core/build/modern/queryObserver.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueryObserver",
    ()=>QueryObserver
]);
// src/queryObserver.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$focusManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/query-core/build/modern/focusManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$environmentManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/query-core/build/modern/environmentManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/query-core/build/modern/notifyManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$query$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/query-core/build/modern/query.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$subscribable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/query-core/build/modern/subscribable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$thenable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/query-core/build/modern/thenable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/query-core/build/modern/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/query-core/build/modern/timeoutManager.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
var QueryObserver = class extends __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$subscribable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Subscribable"] {
    constructor(client, options){
        super();
        this.options = options;
        this.#client = client;
        this.#selectError = null;
        this.#currentThenable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$thenable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pendingThenable"])();
        this.bindMethods();
        this.setOptions(options);
    }
    #client;
    #currentQuery = void 0;
    #currentQueryInitialState = void 0;
    #currentResult = void 0;
    #currentResultState;
    #currentResultOptions;
    #currentThenable;
    #selectError;
    #selectFn;
    #selectResult;
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    #lastQueryWithDefinedData;
    #staleTimeoutId;
    #refetchIntervalId;
    #currentRefetchInterval;
    #trackedProps = /* @__PURE__ */ new Set();
    bindMethods() {
        this.refetch = this.refetch.bind(this);
    }
    onSubscribe() {
        if (this.listeners.size === 1) {
            this.#currentQuery.addObserver(this);
            if (shouldFetchOnMount(this.#currentQuery, this.options)) {
                this.#executeFetch();
            } else {
                this.updateResult();
            }
            this.#updateTimers();
        }
    }
    onUnsubscribe() {
        if (!this.hasListeners()) {
            this.destroy();
        }
    }
    shouldFetchOnReconnect() {
        return shouldFetchOn(this.#currentQuery, this.options, this.options.refetchOnReconnect);
    }
    shouldFetchOnWindowFocus() {
        return shouldFetchOn(this.#currentQuery, this.options, this.options.refetchOnWindowFocus);
    }
    destroy() {
        this.listeners = /* @__PURE__ */ new Set();
        this.#clearStaleTimeout();
        this.#clearRefetchInterval();
        this.#currentQuery.removeObserver(this);
    }
    setOptions(options) {
        const prevOptions = this.options;
        const prevQuery = this.#currentQuery;
        this.options = this.#client.defaultQueryOptions(options);
        if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(this.options.enabled, this.#currentQuery) !== "boolean") {
            throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");
        }
        this.#updateQuery();
        this.#currentQuery.setOptions(this.options);
        if (prevOptions._defaulted && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shallowEqualObjects"])(this.options, prevOptions)) {
            this.#client.getQueryCache().notify({
                type: "observerOptionsUpdated",
                query: this.#currentQuery,
                observer: this
            });
        }
        const mounted = this.hasListeners();
        if (mounted && shouldFetchOptionally(this.#currentQuery, prevQuery, this.options, prevOptions)) {
            this.#executeFetch();
        }
        this.updateResult();
        if (mounted && (this.#currentQuery !== prevQuery || (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(this.options.enabled, this.#currentQuery) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(prevOptions.enabled, this.#currentQuery) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(this.options.staleTime, this.#currentQuery) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(prevOptions.staleTime, this.#currentQuery))) {
            this.#updateStaleTimeout();
        }
        const nextRefetchInterval = this.#computeRefetchInterval();
        if (mounted && (this.#currentQuery !== prevQuery || (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(this.options.enabled, this.#currentQuery) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(prevOptions.enabled, this.#currentQuery) || nextRefetchInterval !== this.#currentRefetchInterval)) {
            this.#updateRefetchInterval(nextRefetchInterval);
        }
    }
    getOptimisticResult(options) {
        const query = this.#client.getQueryCache().build(this.#client, options);
        const result = this.createResult(query, options);
        if (shouldAssignObserverCurrentProperties(this, result)) {
            this.#currentResult = result;
            this.#currentResultOptions = this.options;
            this.#currentResultState = this.#currentQuery.state;
        }
        return result;
    }
    getCurrentResult() {
        return this.#currentResult;
    }
    trackResult(result, onPropTracked) {
        return new Proxy(result, {
            get: (target, key)=>{
                this.trackProp(key);
                onPropTracked?.(key);
                if (key === "promise") {
                    this.trackProp("data");
                    if (!this.options.experimental_prefetchInRender && this.#currentThenable.status === "pending") {
                        this.#currentThenable.reject(new Error("experimental_prefetchInRender feature flag is not enabled"));
                    }
                }
                return Reflect.get(target, key);
            }
        });
    }
    trackProp(key) {
        this.#trackedProps.add(key);
    }
    getCurrentQuery() {
        return this.#currentQuery;
    }
    refetch({ ...options } = {}) {
        return this.fetch({
            ...options
        });
    }
    fetchOptimistic(options) {
        const defaultedOptions = this.#client.defaultQueryOptions(options);
        const query = this.#client.getQueryCache().build(this.#client, defaultedOptions);
        return query.fetch().then(()=>this.createResult(query, defaultedOptions));
    }
    fetch(fetchOptions) {
        return this.#executeFetch({
            ...fetchOptions,
            cancelRefetch: fetchOptions.cancelRefetch ?? true
        }).then(()=>{
            this.updateResult();
            return this.#currentResult;
        });
    }
    #executeFetch(fetchOptions) {
        this.#updateQuery();
        let promise = this.#currentQuery.fetch(this.options, fetchOptions);
        if (!fetchOptions?.throwOnError) {
            promise = promise.catch(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"]);
        }
        return promise;
    }
    #updateStaleTimeout() {
        this.#clearStaleTimeout();
        const staleTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(this.options.staleTime, this.#currentQuery);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$environmentManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["environmentManager"].isServer() || this.#currentResult.isStale || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidTimeout"])(staleTime)) {
            return;
        }
        const time = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeUntilStale"])(this.#currentResult.dataUpdatedAt, staleTime);
        const timeout = time + 1;
        this.#staleTimeoutId = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeoutManager"].setTimeout(()=>{
            if (!this.#currentResult.isStale) {
                this.updateResult();
            }
        }, timeout);
    }
    #computeRefetchInterval() {
        return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(this.#currentQuery) : this.options.refetchInterval) ?? false;
    }
    #updateRefetchInterval(nextInterval) {
        this.#clearRefetchInterval();
        this.#currentRefetchInterval = nextInterval;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$environmentManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["environmentManager"].isServer() || (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(this.options.enabled, this.#currentQuery) === false || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidTimeout"])(this.#currentRefetchInterval) || this.#currentRefetchInterval === 0) {
            return;
        }
        this.#refetchIntervalId = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeoutManager"].setInterval(()=>{
            if (this.options.refetchIntervalInBackground || __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$focusManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["focusManager"].isFocused()) {
                this.#executeFetch();
            }
        }, this.#currentRefetchInterval);
    }
    #updateTimers() {
        this.#updateStaleTimeout();
        this.#updateRefetchInterval(this.#computeRefetchInterval());
    }
    #clearStaleTimeout() {
        if (this.#staleTimeoutId !== void 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeoutManager"].clearTimeout(this.#staleTimeoutId);
            this.#staleTimeoutId = void 0;
        }
    }
    #clearRefetchInterval() {
        if (this.#refetchIntervalId !== void 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeoutManager"].clearInterval(this.#refetchIntervalId);
            this.#refetchIntervalId = void 0;
        }
    }
    createResult(query, options) {
        const prevQuery = this.#currentQuery;
        const prevOptions = this.options;
        const prevResult = this.#currentResult;
        const prevResultState = this.#currentResultState;
        const prevResultOptions = this.#currentResultOptions;
        const queryChange = query !== prevQuery;
        const queryInitialState = queryChange ? query.state : this.#currentQueryInitialState;
        const { state } = query;
        let newState = {
            ...state
        };
        let isPlaceholderData = false;
        let data;
        if (options._optimisticResults) {
            const mounted = this.hasListeners();
            const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
            const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
            if (fetchOnMount || fetchOptionally) {
                newState = {
                    ...newState,
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$query$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchState"])(state.data, query.options)
                };
            }
            if (options._optimisticResults === "isRestoring") {
                newState.fetchStatus = "idle";
            }
        }
        let { error, errorUpdatedAt, status } = newState;
        data = newState.data;
        let skipSelect = false;
        if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
            let placeholderData;
            if (prevResult?.isPlaceholderData && options.placeholderData === prevResultOptions?.placeholderData) {
                placeholderData = prevResult.data;
                skipSelect = true;
            } else {
                placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(this.#lastQueryWithDefinedData?.state.data, this.#lastQueryWithDefinedData) : options.placeholderData;
            }
            if (placeholderData !== void 0) {
                status = "success";
                data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replaceData"])(prevResult?.data, placeholderData, options);
                isPlaceholderData = true;
            }
        }
        if (options.select && data !== void 0 && !skipSelect) {
            if (prevResult && data === prevResultState?.data && options.select === this.#selectFn) {
                data = this.#selectResult;
            } else {
                try {
                    this.#selectFn = options.select;
                    data = options.select(data);
                    data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replaceData"])(prevResult?.data, data, options);
                    this.#selectResult = data;
                    this.#selectError = null;
                } catch (selectError) {
                    this.#selectError = selectError;
                }
            }
        }
        if (this.#selectError) {
            error = this.#selectError;
            data = this.#selectResult;
            errorUpdatedAt = Date.now();
            status = "error";
        }
        const isFetching = newState.fetchStatus === "fetching";
        const isPending = status === "pending";
        const isError = status === "error";
        const isLoading = isPending && isFetching;
        const hasData = data !== void 0;
        const result = {
            status,
            fetchStatus: newState.fetchStatus,
            isPending,
            isSuccess: status === "success",
            isError,
            isInitialLoading: isLoading,
            isLoading,
            data,
            dataUpdatedAt: newState.dataUpdatedAt,
            error,
            errorUpdatedAt,
            failureCount: newState.fetchFailureCount,
            failureReason: newState.fetchFailureReason,
            errorUpdateCount: newState.errorUpdateCount,
            isFetched: query.isFetched(),
            isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
            isFetching,
            isRefetching: isFetching && !isPending,
            isLoadingError: isError && !hasData,
            isPaused: newState.fetchStatus === "paused",
            isPlaceholderData,
            isRefetchError: isError && hasData,
            isStale: isStale(query, options),
            refetch: this.refetch,
            promise: this.#currentThenable,
            isEnabled: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(options.enabled, query) !== false
        };
        const nextResult = result;
        if (this.options.experimental_prefetchInRender) {
            const hasResultData = nextResult.data !== void 0;
            const isErrorWithoutData = nextResult.status === "error" && !hasResultData;
            const finalizeThenableIfPossible = (thenable)=>{
                if (isErrorWithoutData) {
                    thenable.reject(nextResult.error);
                } else if (hasResultData) {
                    thenable.resolve(nextResult.data);
                }
            };
            const recreateThenable = ()=>{
                const pending = this.#currentThenable = nextResult.promise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$thenable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pendingThenable"])();
                finalizeThenableIfPossible(pending);
            };
            const prevThenable = this.#currentThenable;
            switch(prevThenable.status){
                case "pending":
                    if (query.queryHash === prevQuery.queryHash) {
                        finalizeThenableIfPossible(prevThenable);
                    }
                    break;
                case "fulfilled":
                    if (isErrorWithoutData || nextResult.data !== prevThenable.value) {
                        recreateThenable();
                    }
                    break;
                case "rejected":
                    if (!isErrorWithoutData || nextResult.error !== prevThenable.reason) {
                        recreateThenable();
                    }
                    break;
            }
        }
        return nextResult;
    }
    updateResult() {
        const prevResult = this.#currentResult;
        const nextResult = this.createResult(this.#currentQuery, this.options);
        this.#currentResultState = this.#currentQuery.state;
        this.#currentResultOptions = this.options;
        if (this.#currentResultState.data !== void 0) {
            this.#lastQueryWithDefinedData = this.#currentQuery;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shallowEqualObjects"])(nextResult, prevResult)) {
            return;
        }
        this.#currentResult = nextResult;
        const shouldNotifyListeners = ()=>{
            if (!prevResult) {
                return true;
            }
            const { notifyOnChangeProps } = this.options;
            const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
            if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !this.#trackedProps.size) {
                return true;
            }
            const includedProps = new Set(notifyOnChangePropsValue ?? this.#trackedProps);
            if (this.options.throwOnError) {
                includedProps.add("error");
            }
            return Object.keys(this.#currentResult).some((key)=>{
                const typedKey = key;
                const changed = this.#currentResult[typedKey] !== prevResult[typedKey];
                return changed && includedProps.has(typedKey);
            });
        };
        this.#notify({
            listeners: shouldNotifyListeners()
        });
    }
    #updateQuery() {
        const query = this.#client.getQueryCache().build(this.#client, this.options);
        if (query === this.#currentQuery) {
            return;
        }
        const prevQuery = this.#currentQuery;
        this.#currentQuery = query;
        this.#currentQueryInitialState = query.state;
        if (this.hasListeners()) {
            prevQuery?.removeObserver(this);
            query.addObserver(this);
        }
    }
    onQueryUpdate() {
        this.updateResult();
        if (this.hasListeners()) {
            this.#updateTimers();
        }
    }
    #notify(notifyOptions) {
        __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifyManager"].batch(()=>{
            if (notifyOptions.listeners) {
                this.listeners.forEach((listener)=>{
                    listener(this.#currentResult);
                });
            }
            this.#client.getQueryCache().notify({
                query: this.#currentQuery,
                type: "observerResultsUpdated"
            });
        });
    }
};
function shouldLoadOnMount(query, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(options.retryOnMount, query) === false);
}
function shouldFetchOnMount(query, options) {
    return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(options.enabled, query) !== false && (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(options.staleTime, query) !== "static") {
        const value = typeof field === "function" ? field(query) : field;
        return value === "always" || value !== false && isStale(query, options);
    }
    return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
    return (query !== prevQuery || (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveQueryBoolean"])(options.enabled, query) !== false && query.isStaleByTime((0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shallowEqualObjects"])(observer.getCurrentResult(), optimisticResult)) {
        return true;
    }
    return false;
}
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMutation",
    ()=>useMutation
]);
// src/useMutation.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$mutationObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/query-core/build/modern/mutationObserver.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/query-core/build/modern/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/query-core/build/modern/notifyManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
"use client";
;
;
;
function useMutation(options, queryClient) {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])(queryClient);
    const [observer] = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "useMutation.useState": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$mutationObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MutationObserver"](client, options)
    }["useMutation.useState"]);
    __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useMutation.useEffect": ()=>{
            observer.setOptions(options);
        }
    }["useMutation.useEffect"], [
        observer,
        options
    ]);
    const result = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"](__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useMutation.useSyncExternalStore[result]": (onStoreChange)=>observer.subscribe(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifyManager"].batchCalls(onStoreChange))
    }["useMutation.useSyncExternalStore[result]"], [
        observer
    ]), {
        "useMutation.useSyncExternalStore[result]": ()=>observer.getCurrentResult()
    }["useMutation.useSyncExternalStore[result]"], {
        "useMutation.useSyncExternalStore[result]": ()=>observer.getCurrentResult()
    }["useMutation.useSyncExternalStore[result]"]);
    const mutate = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useMutation.useCallback[mutate]": (variables, mutateOptions)=>{
            observer.mutate(variables, mutateOptions).catch(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"]);
        }
    }["useMutation.useCallback[mutate]"], [
        observer
    ]);
    if (result.error && (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldThrowError"])(observer.options.throwOnError, [
        result.error
    ])) {
        throw result.error;
    }
    return {
        ...result,
        mutate,
        mutateAsync: result.mutate
    };
}
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueryErrorResetBoundary",
    ()=>QueryErrorResetBoundary,
    "useQueryErrorResetBoundary",
    ()=>useQueryErrorResetBoundary
]);
// src/QueryErrorResetBoundary.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
"use client";
;
;
function createValue() {
    let isReset = false;
    return {
        clearReset: ()=>{
            isReset = false;
        },
        reset: ()=>{
            isReset = true;
        },
        isReset: ()=>{
            return isReset;
        }
    };
}
var QueryErrorResetBoundaryContext = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](createValue());
var useQueryErrorResetBoundary = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](QueryErrorResetBoundaryContext);
var QueryErrorResetBoundary = ({ children })=>{
    const [value] = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "QueryErrorResetBoundary.useState": ()=>createValue()
    }["QueryErrorResetBoundary.useState"]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(QueryErrorResetBoundaryContext.Provider, {
        value,
        children: typeof children === "function" ? children(value) : children
    });
};
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ensurePreventErrorBoundaryRetry",
    ()=>ensurePreventErrorBoundaryRetry,
    "getHasError",
    ()=>getHasError,
    "useClearResetErrorBoundary",
    ()=>useClearResetErrorBoundary
]);
// src/errorBoundaryUtils.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/query-core/build/modern/utils.js [app-client] (ecmascript)");
"use client";
;
;
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query)=>{
    const throwOnError = query?.state.error && typeof options.throwOnError === "function" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldThrowError"])(options.throwOnError, [
        query.state.error,
        query
    ]) : options.throwOnError;
    if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
        if (!errorResetBoundary.isReset()) {
            options.retryOnMount = false;
        }
    }
};
var useClearResetErrorBoundary = (errorResetBoundary)=>{
    __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useClearResetErrorBoundary.useEffect": ()=>{
            errorResetBoundary.clearReset();
        }
    }["useClearResetErrorBoundary.useEffect"], [
        errorResetBoundary
    ]);
};
var getHasError = ({ result, errorResetBoundary, throwOnError, query, suspense })=>{
    return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldThrowError"])(throwOnError, [
        result.error,
        query
    ]));
};
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IsRestoringProvider",
    ()=>IsRestoringProvider,
    "useIsRestoring",
    ()=>useIsRestoring
]);
// src/IsRestoringProvider.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
var IsRestoringContext = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](false);
var useIsRestoring = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](IsRestoringContext);
var IsRestoringProvider = IsRestoringContext.Provider;
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/react-query/build/modern/suspense.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultThrowOnError",
    ()=>defaultThrowOnError,
    "ensureSuspenseTimers",
    ()=>ensureSuspenseTimers,
    "fetchOptimistic",
    ()=>fetchOptimistic,
    "shouldSuspend",
    ()=>shouldSuspend,
    "willFetch",
    ()=>willFetch
]);
// src/suspense.ts
var defaultThrowOnError = (_error, query)=>query.state.data === void 0;
var ensureSuspenseTimers = (defaultedOptions)=>{
    if (defaultedOptions.suspense) {
        const MIN_SUSPENSE_TIME_MS = 1e3;
        const clamp = (value)=>value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
        const originalStaleTime = defaultedOptions.staleTime;
        defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args)=>clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
        if (typeof defaultedOptions.gcTime === "number") {
            defaultedOptions.gcTime = Math.max(defaultedOptions.gcTime, MIN_SUSPENSE_TIME_MS);
        }
    }
};
var willFetch = (result, isRestoring)=>result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result)=>defaultedOptions?.suspense && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary)=>observer.fetchOptimistic(defaultedOptions).catch(()=>{
        errorResetBoundary.clearReset();
    });
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/react-query/build/modern/useBaseQuery.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBaseQuery",
    ()=>useBaseQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// src/useBaseQuery.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$environmentManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/query-core/build/modern/environmentManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/query-core/build/modern/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/query-core/build/modern/notifyManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryErrorResetBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$IsRestoringProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/react-query/build/modern/suspense.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function useBaseQuery(options, Observer, queryClient) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (typeof options !== "object" || Array.isArray(options)) {
            throw new Error('Bad argument type. Starting with v5, only the "Object" form is allowed when calling query related functions. Please use the error stack to find the culprit call. More info here: https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5#supports-a-single-signature-one-object');
        }
    }
    const isRestoring = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$IsRestoringProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsRestoring"])();
    const errorResetBoundary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryErrorResetBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryErrorResetBoundary"])();
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])(queryClient);
    const defaultedOptions = client.defaultQueryOptions(options);
    client.getDefaultOptions().queries?._experimental_beforeQuery?.(defaultedOptions);
    const query = client.getQueryCache().get(defaultedOptions.queryHash);
    if ("TURBOPACK compile-time truthy", 1) {
        if (!defaultedOptions.queryFn) {
            console.error(`[${defaultedOptions.queryHash}]: No queryFn was passed as an option, and no default queryFn was found. The queryFn parameter is only optional when using a default queryFn. More info here: https://tanstack.com/query/latest/docs/framework/react/guides/default-query-function`);
        }
    }
    const subscribed = options.subscribed !== false;
    defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : subscribed ? "optimistic" : void 0;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensureSuspenseTimers"])(defaultedOptions);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensurePreventErrorBoundaryRetry"])(defaultedOptions, errorResetBoundary, query);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClearResetErrorBoundary"])(errorResetBoundary);
    const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
    const [observer] = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "useBaseQuery.useState": ()=>new Observer(client, defaultedOptions)
    }["useBaseQuery.useState"]);
    const result = observer.getOptimisticResult(defaultedOptions);
    const shouldSubscribe = !isRestoring && subscribed;
    __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"](__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useBaseQuery.useSyncExternalStore.useCallback": (onStoreChange)=>{
            const unsubscribe = shouldSubscribe ? observer.subscribe(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifyManager"].batchCalls(onStoreChange)) : __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"];
            observer.updateResult();
            return unsubscribe;
        }
    }["useBaseQuery.useSyncExternalStore.useCallback"], [
        observer,
        shouldSubscribe
    ]), {
        "useBaseQuery.useSyncExternalStore": ()=>observer.getCurrentResult()
    }["useBaseQuery.useSyncExternalStore"], {
        "useBaseQuery.useSyncExternalStore": ()=>observer.getCurrentResult()
    }["useBaseQuery.useSyncExternalStore"]);
    __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useBaseQuery.useEffect": ()=>{
            observer.setOptions(defaultedOptions);
        }
    }["useBaseQuery.useEffect"], [
        defaultedOptions,
        observer
    ]);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldSuspend"])(defaultedOptions, result)) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchOptimistic"])(defaultedOptions, observer, errorResetBoundary);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHasError"])({
        result,
        errorResetBoundary,
        throwOnError: defaultedOptions.throwOnError,
        query,
        suspense: defaultedOptions.suspense
    })) {
        throw result.error;
    }
    ;
    client.getDefaultOptions().queries?._experimental_afterQuery?.(defaultedOptions, result);
    if (defaultedOptions.experimental_prefetchInRender && !__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$environmentManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["environmentManager"].isServer() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["willFetch"])(result, isRestoring)) {
        const promise = isNewCacheEntry ? // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchOptimistic"])(defaultedOptions, observer, errorResetBoundary) : // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
        query?.promise;
        promise?.catch(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"]).finally(()=>{
            observer.updateResult();
        });
    }
    return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useQuery",
    ()=>useQuery
]);
// src/useQuery.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/query-core/build/modern/queryObserver.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useBaseQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@tanstack/react-query/build/modern/useBaseQuery.js [app-client] (ecmascript)");
"use client";
;
;
function useQuery(options, queryClient) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useBaseQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseQuery"])(options, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryObserver"], queryClient);
}
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

(function() {
    var e = {
        675: function(e, r) {
            "use strict";
            r.byteLength = byteLength;
            r.toByteArray = toByteArray;
            r.fromByteArray = fromByteArray;
            var t = [];
            var f = [];
            var n = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
            var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            for(var o = 0, u = i.length; o < u; ++o){
                t[o] = i[o];
                f[i.charCodeAt(o)] = o;
            }
            f["-".charCodeAt(0)] = 62;
            f["_".charCodeAt(0)] = 63;
            function getLens(e) {
                var r = e.length;
                if (r % 4 > 0) {
                    throw new Error("Invalid string. Length must be a multiple of 4");
                }
                var t = e.indexOf("=");
                if (t === -1) t = r;
                var f = t === r ? 0 : 4 - t % 4;
                return [
                    t,
                    f
                ];
            }
            function byteLength(e) {
                var r = getLens(e);
                var t = r[0];
                var f = r[1];
                return (t + f) * 3 / 4 - f;
            }
            function _byteLength(e, r, t) {
                return (r + t) * 3 / 4 - t;
            }
            function toByteArray(e) {
                var r;
                var t = getLens(e);
                var i = t[0];
                var o = t[1];
                var u = new n(_byteLength(e, i, o));
                var a = 0;
                var s = o > 0 ? i - 4 : i;
                var h;
                for(h = 0; h < s; h += 4){
                    r = f[e.charCodeAt(h)] << 18 | f[e.charCodeAt(h + 1)] << 12 | f[e.charCodeAt(h + 2)] << 6 | f[e.charCodeAt(h + 3)];
                    u[a++] = r >> 16 & 255;
                    u[a++] = r >> 8 & 255;
                    u[a++] = r & 255;
                }
                if (o === 2) {
                    r = f[e.charCodeAt(h)] << 2 | f[e.charCodeAt(h + 1)] >> 4;
                    u[a++] = r & 255;
                }
                if (o === 1) {
                    r = f[e.charCodeAt(h)] << 10 | f[e.charCodeAt(h + 1)] << 4 | f[e.charCodeAt(h + 2)] >> 2;
                    u[a++] = r >> 8 & 255;
                    u[a++] = r & 255;
                }
                return u;
            }
            function tripletToBase64(e) {
                return t[e >> 18 & 63] + t[e >> 12 & 63] + t[e >> 6 & 63] + t[e & 63];
            }
            function encodeChunk(e, r, t) {
                var f;
                var n = [];
                for(var i = r; i < t; i += 3){
                    f = (e[i] << 16 & 16711680) + (e[i + 1] << 8 & 65280) + (e[i + 2] & 255);
                    n.push(tripletToBase64(f));
                }
                return n.join("");
            }
            function fromByteArray(e) {
                var r;
                var f = e.length;
                var n = f % 3;
                var i = [];
                var o = 16383;
                for(var u = 0, a = f - n; u < a; u += o){
                    i.push(encodeChunk(e, u, u + o > a ? a : u + o));
                }
                if (n === 1) {
                    r = e[f - 1];
                    i.push(t[r >> 2] + t[r << 4 & 63] + "==");
                } else if (n === 2) {
                    r = (e[f - 2] << 8) + e[f - 1];
                    i.push(t[r >> 10] + t[r >> 4 & 63] + t[r << 2 & 63] + "=");
                }
                return i.join("");
            }
        },
        72: function(e, r, t) {
            "use strict";
            /*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ var f = t(675);
            var n = t(783);
            var i = typeof Symbol === "function" && typeof Symbol.for === "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
            r.Buffer = Buffer;
            r.SlowBuffer = SlowBuffer;
            r.INSPECT_MAX_BYTES = 50;
            var o = 2147483647;
            r.kMaxLength = o;
            Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
            if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
                console.error("This browser lacks typed array (Uint8Array) support which is required by " + "`buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
            }
            function typedArraySupport() {
                try {
                    var e = new Uint8Array(1);
                    var r = {
                        foo: function() {
                            return 42;
                        }
                    };
                    Object.setPrototypeOf(r, Uint8Array.prototype);
                    Object.setPrototypeOf(e, r);
                    return e.foo() === 42;
                } catch (e) {
                    return false;
                }
            }
            Object.defineProperty(Buffer.prototype, "parent", {
                enumerable: true,
                get: function() {
                    if (!Buffer.isBuffer(this)) return undefined;
                    return this.buffer;
                }
            });
            Object.defineProperty(Buffer.prototype, "offset", {
                enumerable: true,
                get: function() {
                    if (!Buffer.isBuffer(this)) return undefined;
                    return this.byteOffset;
                }
            });
            function createBuffer(e) {
                if (e > o) {
                    throw new RangeError('The value "' + e + '" is invalid for option "size"');
                }
                var r = new Uint8Array(e);
                Object.setPrototypeOf(r, Buffer.prototype);
                return r;
            }
            function Buffer(e, r, t) {
                if (typeof e === "number") {
                    if (typeof r === "string") {
                        throw new TypeError('The "string" argument must be of type string. Received type number');
                    }
                    return allocUnsafe(e);
                }
                return from(e, r, t);
            }
            Buffer.poolSize = 8192;
            function from(e, r, t) {
                if (typeof e === "string") {
                    return fromString(e, r);
                }
                if (ArrayBuffer.isView(e)) {
                    return fromArrayLike(e);
                }
                if (e == null) {
                    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, " + "or Array-like Object. Received type " + typeof e);
                }
                if (isInstance(e, ArrayBuffer) || e && isInstance(e.buffer, ArrayBuffer)) {
                    return fromArrayBuffer(e, r, t);
                }
                if (typeof SharedArrayBuffer !== "undefined" && (isInstance(e, SharedArrayBuffer) || e && isInstance(e.buffer, SharedArrayBuffer))) {
                    return fromArrayBuffer(e, r, t);
                }
                if (typeof e === "number") {
                    throw new TypeError('The "value" argument must not be of type number. Received type number');
                }
                var f = e.valueOf && e.valueOf();
                if (f != null && f !== e) {
                    return Buffer.from(f, r, t);
                }
                var n = fromObject(e);
                if (n) return n;
                if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof e[Symbol.toPrimitive] === "function") {
                    return Buffer.from(e[Symbol.toPrimitive]("string"), r, t);
                }
                throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, " + "or Array-like Object. Received type " + typeof e);
            }
            Buffer.from = function(e, r, t) {
                return from(e, r, t);
            };
            Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
            Object.setPrototypeOf(Buffer, Uint8Array);
            function assertSize(e) {
                if (typeof e !== "number") {
                    throw new TypeError('"size" argument must be of type number');
                } else if (e < 0) {
                    throw new RangeError('The value "' + e + '" is invalid for option "size"');
                }
            }
            function alloc(e, r, t) {
                assertSize(e);
                if (e <= 0) {
                    return createBuffer(e);
                }
                if (r !== undefined) {
                    return typeof t === "string" ? createBuffer(e).fill(r, t) : createBuffer(e).fill(r);
                }
                return createBuffer(e);
            }
            Buffer.alloc = function(e, r, t) {
                return alloc(e, r, t);
            };
            function allocUnsafe(e) {
                assertSize(e);
                return createBuffer(e < 0 ? 0 : checked(e) | 0);
            }
            Buffer.allocUnsafe = function(e) {
                return allocUnsafe(e);
            };
            Buffer.allocUnsafeSlow = function(e) {
                return allocUnsafe(e);
            };
            function fromString(e, r) {
                if (typeof r !== "string" || r === "") {
                    r = "utf8";
                }
                if (!Buffer.isEncoding(r)) {
                    throw new TypeError("Unknown encoding: " + r);
                }
                var t = byteLength(e, r) | 0;
                var f = createBuffer(t);
                var n = f.write(e, r);
                if (n !== t) {
                    f = f.slice(0, n);
                }
                return f;
            }
            function fromArrayLike(e) {
                var r = e.length < 0 ? 0 : checked(e.length) | 0;
                var t = createBuffer(r);
                for(var f = 0; f < r; f += 1){
                    t[f] = e[f] & 255;
                }
                return t;
            }
            function fromArrayBuffer(e, r, t) {
                if (r < 0 || e.byteLength < r) {
                    throw new RangeError('"offset" is outside of buffer bounds');
                }
                if (e.byteLength < r + (t || 0)) {
                    throw new RangeError('"length" is outside of buffer bounds');
                }
                var f;
                if (r === undefined && t === undefined) {
                    f = new Uint8Array(e);
                } else if (t === undefined) {
                    f = new Uint8Array(e, r);
                } else {
                    f = new Uint8Array(e, r, t);
                }
                Object.setPrototypeOf(f, Buffer.prototype);
                return f;
            }
            function fromObject(e) {
                if (Buffer.isBuffer(e)) {
                    var r = checked(e.length) | 0;
                    var t = createBuffer(r);
                    if (t.length === 0) {
                        return t;
                    }
                    e.copy(t, 0, 0, r);
                    return t;
                }
                if (e.length !== undefined) {
                    if (typeof e.length !== "number" || numberIsNaN(e.length)) {
                        return createBuffer(0);
                    }
                    return fromArrayLike(e);
                }
                if (e.type === "Buffer" && Array.isArray(e.data)) {
                    return fromArrayLike(e.data);
                }
            }
            function checked(e) {
                if (e >= o) {
                    throw new RangeError("Attempt to allocate Buffer larger than maximum " + "size: 0x" + o.toString(16) + " bytes");
                }
                return e | 0;
            }
            function SlowBuffer(e) {
                if (+e != e) {
                    e = 0;
                }
                return Buffer.alloc(+e);
            }
            Buffer.isBuffer = function isBuffer(e) {
                return e != null && e._isBuffer === true && e !== Buffer.prototype;
            };
            Buffer.compare = function compare(e, r) {
                if (isInstance(e, Uint8Array)) e = Buffer.from(e, e.offset, e.byteLength);
                if (isInstance(r, Uint8Array)) r = Buffer.from(r, r.offset, r.byteLength);
                if (!Buffer.isBuffer(e) || !Buffer.isBuffer(r)) {
                    throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                }
                if (e === r) return 0;
                var t = e.length;
                var f = r.length;
                for(var n = 0, i = Math.min(t, f); n < i; ++n){
                    if (e[n] !== r[n]) {
                        t = e[n];
                        f = r[n];
                        break;
                    }
                }
                if (t < f) return -1;
                if (f < t) return 1;
                return 0;
            };
            Buffer.isEncoding = function isEncoding(e) {
                switch(String(e).toLowerCase()){
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return true;
                    default:
                        return false;
                }
            };
            Buffer.concat = function concat(e, r) {
                if (!Array.isArray(e)) {
                    throw new TypeError('"list" argument must be an Array of Buffers');
                }
                if (e.length === 0) {
                    return Buffer.alloc(0);
                }
                var t;
                if (r === undefined) {
                    r = 0;
                    for(t = 0; t < e.length; ++t){
                        r += e[t].length;
                    }
                }
                var f = Buffer.allocUnsafe(r);
                var n = 0;
                for(t = 0; t < e.length; ++t){
                    var i = e[t];
                    if (isInstance(i, Uint8Array)) {
                        i = Buffer.from(i);
                    }
                    if (!Buffer.isBuffer(i)) {
                        throw new TypeError('"list" argument must be an Array of Buffers');
                    }
                    i.copy(f, n);
                    n += i.length;
                }
                return f;
            };
            function byteLength(e, r) {
                if (Buffer.isBuffer(e)) {
                    return e.length;
                }
                if (ArrayBuffer.isView(e) || isInstance(e, ArrayBuffer)) {
                    return e.byteLength;
                }
                if (typeof e !== "string") {
                    throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' + "Received type " + typeof e);
                }
                var t = e.length;
                var f = arguments.length > 2 && arguments[2] === true;
                if (!f && t === 0) return 0;
                var n = false;
                for(;;){
                    switch(r){
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return t;
                        case "utf8":
                        case "utf-8":
                            return utf8ToBytes(e).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return t * 2;
                        case "hex":
                            return t >>> 1;
                        case "base64":
                            return base64ToBytes(e).length;
                        default:
                            if (n) {
                                return f ? -1 : utf8ToBytes(e).length;
                            }
                            r = ("" + r).toLowerCase();
                            n = true;
                    }
                }
            }
            Buffer.byteLength = byteLength;
            function slowToString(e, r, t) {
                var f = false;
                if (r === undefined || r < 0) {
                    r = 0;
                }
                if (r > this.length) {
                    return "";
                }
                if (t === undefined || t > this.length) {
                    t = this.length;
                }
                if (t <= 0) {
                    return "";
                }
                t >>>= 0;
                r >>>= 0;
                if (t <= r) {
                    return "";
                }
                if (!e) e = "utf8";
                while(true){
                    switch(e){
                        case "hex":
                            return hexSlice(this, r, t);
                        case "utf8":
                        case "utf-8":
                            return utf8Slice(this, r, t);
                        case "ascii":
                            return asciiSlice(this, r, t);
                        case "latin1":
                        case "binary":
                            return latin1Slice(this, r, t);
                        case "base64":
                            return base64Slice(this, r, t);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return utf16leSlice(this, r, t);
                        default:
                            if (f) throw new TypeError("Unknown encoding: " + e);
                            e = (e + "").toLowerCase();
                            f = true;
                    }
                }
            }
            Buffer.prototype._isBuffer = true;
            function swap(e, r, t) {
                var f = e[r];
                e[r] = e[t];
                e[t] = f;
            }
            Buffer.prototype.swap16 = function swap16() {
                var e = this.length;
                if (e % 2 !== 0) {
                    throw new RangeError("Buffer size must be a multiple of 16-bits");
                }
                for(var r = 0; r < e; r += 2){
                    swap(this, r, r + 1);
                }
                return this;
            };
            Buffer.prototype.swap32 = function swap32() {
                var e = this.length;
                if (e % 4 !== 0) {
                    throw new RangeError("Buffer size must be a multiple of 32-bits");
                }
                for(var r = 0; r < e; r += 4){
                    swap(this, r, r + 3);
                    swap(this, r + 1, r + 2);
                }
                return this;
            };
            Buffer.prototype.swap64 = function swap64() {
                var e = this.length;
                if (e % 8 !== 0) {
                    throw new RangeError("Buffer size must be a multiple of 64-bits");
                }
                for(var r = 0; r < e; r += 8){
                    swap(this, r, r + 7);
                    swap(this, r + 1, r + 6);
                    swap(this, r + 2, r + 5);
                    swap(this, r + 3, r + 4);
                }
                return this;
            };
            Buffer.prototype.toString = function toString() {
                var e = this.length;
                if (e === 0) return "";
                if (arguments.length === 0) return utf8Slice(this, 0, e);
                return slowToString.apply(this, arguments);
            };
            Buffer.prototype.toLocaleString = Buffer.prototype.toString;
            Buffer.prototype.equals = function equals(e) {
                if (!Buffer.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                if (this === e) return true;
                return Buffer.compare(this, e) === 0;
            };
            Buffer.prototype.inspect = function inspect() {
                var e = "";
                var t = r.INSPECT_MAX_BYTES;
                e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim();
                if (this.length > t) e += " ... ";
                return "<Buffer " + e + ">";
            };
            if (i) {
                Buffer.prototype[i] = Buffer.prototype.inspect;
            }
            Buffer.prototype.compare = function compare(e, r, t, f, n) {
                if (isInstance(e, Uint8Array)) {
                    e = Buffer.from(e, e.offset, e.byteLength);
                }
                if (!Buffer.isBuffer(e)) {
                    throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. ' + "Received type " + typeof e);
                }
                if (r === undefined) {
                    r = 0;
                }
                if (t === undefined) {
                    t = e ? e.length : 0;
                }
                if (f === undefined) {
                    f = 0;
                }
                if (n === undefined) {
                    n = this.length;
                }
                if (r < 0 || t > e.length || f < 0 || n > this.length) {
                    throw new RangeError("out of range index");
                }
                if (f >= n && r >= t) {
                    return 0;
                }
                if (f >= n) {
                    return -1;
                }
                if (r >= t) {
                    return 1;
                }
                r >>>= 0;
                t >>>= 0;
                f >>>= 0;
                n >>>= 0;
                if (this === e) return 0;
                var i = n - f;
                var o = t - r;
                var u = Math.min(i, o);
                var a = this.slice(f, n);
                var s = e.slice(r, t);
                for(var h = 0; h < u; ++h){
                    if (a[h] !== s[h]) {
                        i = a[h];
                        o = s[h];
                        break;
                    }
                }
                if (i < o) return -1;
                if (o < i) return 1;
                return 0;
            };
            function bidirectionalIndexOf(e, r, t, f, n) {
                if (e.length === 0) return -1;
                if (typeof t === "string") {
                    f = t;
                    t = 0;
                } else if (t > 2147483647) {
                    t = 2147483647;
                } else if (t < -2147483648) {
                    t = -2147483648;
                }
                t = +t;
                if (numberIsNaN(t)) {
                    t = n ? 0 : e.length - 1;
                }
                if (t < 0) t = e.length + t;
                if (t >= e.length) {
                    if (n) return -1;
                    else t = e.length - 1;
                } else if (t < 0) {
                    if (n) t = 0;
                    else return -1;
                }
                if (typeof r === "string") {
                    r = Buffer.from(r, f);
                }
                if (Buffer.isBuffer(r)) {
                    if (r.length === 0) {
                        return -1;
                    }
                    return arrayIndexOf(e, r, t, f, n);
                } else if (typeof r === "number") {
                    r = r & 255;
                    if (typeof Uint8Array.prototype.indexOf === "function") {
                        if (n) {
                            return Uint8Array.prototype.indexOf.call(e, r, t);
                        } else {
                            return Uint8Array.prototype.lastIndexOf.call(e, r, t);
                        }
                    }
                    return arrayIndexOf(e, [
                        r
                    ], t, f, n);
                }
                throw new TypeError("val must be string, number or Buffer");
            }
            function arrayIndexOf(e, r, t, f, n) {
                var i = 1;
                var o = e.length;
                var u = r.length;
                if (f !== undefined) {
                    f = String(f).toLowerCase();
                    if (f === "ucs2" || f === "ucs-2" || f === "utf16le" || f === "utf-16le") {
                        if (e.length < 2 || r.length < 2) {
                            return -1;
                        }
                        i = 2;
                        o /= 2;
                        u /= 2;
                        t /= 2;
                    }
                }
                function read(e, r) {
                    if (i === 1) {
                        return e[r];
                    } else {
                        return e.readUInt16BE(r * i);
                    }
                }
                var a;
                if (n) {
                    var s = -1;
                    for(a = t; a < o; a++){
                        if (read(e, a) === read(r, s === -1 ? 0 : a - s)) {
                            if (s === -1) s = a;
                            if (a - s + 1 === u) return s * i;
                        } else {
                            if (s !== -1) a -= a - s;
                            s = -1;
                        }
                    }
                } else {
                    if (t + u > o) t = o - u;
                    for(a = t; a >= 0; a--){
                        var h = true;
                        for(var c = 0; c < u; c++){
                            if (read(e, a + c) !== read(r, c)) {
                                h = false;
                                break;
                            }
                        }
                        if (h) return a;
                    }
                }
                return -1;
            }
            Buffer.prototype.includes = function includes(e, r, t) {
                return this.indexOf(e, r, t) !== -1;
            };
            Buffer.prototype.indexOf = function indexOf(e, r, t) {
                return bidirectionalIndexOf(this, e, r, t, true);
            };
            Buffer.prototype.lastIndexOf = function lastIndexOf(e, r, t) {
                return bidirectionalIndexOf(this, e, r, t, false);
            };
            function hexWrite(e, r, t, f) {
                t = Number(t) || 0;
                var n = e.length - t;
                if (!f) {
                    f = n;
                } else {
                    f = Number(f);
                    if (f > n) {
                        f = n;
                    }
                }
                var i = r.length;
                if (f > i / 2) {
                    f = i / 2;
                }
                for(var o = 0; o < f; ++o){
                    var u = parseInt(r.substr(o * 2, 2), 16);
                    if (numberIsNaN(u)) return o;
                    e[t + o] = u;
                }
                return o;
            }
            function utf8Write(e, r, t, f) {
                return blitBuffer(utf8ToBytes(r, e.length - t), e, t, f);
            }
            function asciiWrite(e, r, t, f) {
                return blitBuffer(asciiToBytes(r), e, t, f);
            }
            function latin1Write(e, r, t, f) {
                return asciiWrite(e, r, t, f);
            }
            function base64Write(e, r, t, f) {
                return blitBuffer(base64ToBytes(r), e, t, f);
            }
            function ucs2Write(e, r, t, f) {
                return blitBuffer(utf16leToBytes(r, e.length - t), e, t, f);
            }
            Buffer.prototype.write = function write(e, r, t, f) {
                if (r === undefined) {
                    f = "utf8";
                    t = this.length;
                    r = 0;
                } else if (t === undefined && typeof r === "string") {
                    f = r;
                    t = this.length;
                    r = 0;
                } else if (isFinite(r)) {
                    r = r >>> 0;
                    if (isFinite(t)) {
                        t = t >>> 0;
                        if (f === undefined) f = "utf8";
                    } else {
                        f = t;
                        t = undefined;
                    }
                } else {
                    throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                }
                var n = this.length - r;
                if (t === undefined || t > n) t = n;
                if (e.length > 0 && (t < 0 || r < 0) || r > this.length) {
                    throw new RangeError("Attempt to write outside buffer bounds");
                }
                if (!f) f = "utf8";
                var i = false;
                for(;;){
                    switch(f){
                        case "hex":
                            return hexWrite(this, e, r, t);
                        case "utf8":
                        case "utf-8":
                            return utf8Write(this, e, r, t);
                        case "ascii":
                            return asciiWrite(this, e, r, t);
                        case "latin1":
                        case "binary":
                            return latin1Write(this, e, r, t);
                        case "base64":
                            return base64Write(this, e, r, t);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return ucs2Write(this, e, r, t);
                        default:
                            if (i) throw new TypeError("Unknown encoding: " + f);
                            f = ("" + f).toLowerCase();
                            i = true;
                    }
                }
            };
            Buffer.prototype.toJSON = function toJSON() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                };
            };
            function base64Slice(e, r, t) {
                if (r === 0 && t === e.length) {
                    return f.fromByteArray(e);
                } else {
                    return f.fromByteArray(e.slice(r, t));
                }
            }
            function utf8Slice(e, r, t) {
                t = Math.min(e.length, t);
                var f = [];
                var n = r;
                while(n < t){
                    var i = e[n];
                    var o = null;
                    var u = i > 239 ? 4 : i > 223 ? 3 : i > 191 ? 2 : 1;
                    if (n + u <= t) {
                        var a, s, h, c;
                        switch(u){
                            case 1:
                                if (i < 128) {
                                    o = i;
                                }
                                break;
                            case 2:
                                a = e[n + 1];
                                if ((a & 192) === 128) {
                                    c = (i & 31) << 6 | a & 63;
                                    if (c > 127) {
                                        o = c;
                                    }
                                }
                                break;
                            case 3:
                                a = e[n + 1];
                                s = e[n + 2];
                                if ((a & 192) === 128 && (s & 192) === 128) {
                                    c = (i & 15) << 12 | (a & 63) << 6 | s & 63;
                                    if (c > 2047 && (c < 55296 || c > 57343)) {
                                        o = c;
                                    }
                                }
                                break;
                            case 4:
                                a = e[n + 1];
                                s = e[n + 2];
                                h = e[n + 3];
                                if ((a & 192) === 128 && (s & 192) === 128 && (h & 192) === 128) {
                                    c = (i & 15) << 18 | (a & 63) << 12 | (s & 63) << 6 | h & 63;
                                    if (c > 65535 && c < 1114112) {
                                        o = c;
                                    }
                                }
                        }
                    }
                    if (o === null) {
                        o = 65533;
                        u = 1;
                    } else if (o > 65535) {
                        o -= 65536;
                        f.push(o >>> 10 & 1023 | 55296);
                        o = 56320 | o & 1023;
                    }
                    f.push(o);
                    n += u;
                }
                return decodeCodePointsArray(f);
            }
            var u = 4096;
            function decodeCodePointsArray(e) {
                var r = e.length;
                if (r <= u) {
                    return String.fromCharCode.apply(String, e);
                }
                var t = "";
                var f = 0;
                while(f < r){
                    t += String.fromCharCode.apply(String, e.slice(f, f += u));
                }
                return t;
            }
            function asciiSlice(e, r, t) {
                var f = "";
                t = Math.min(e.length, t);
                for(var n = r; n < t; ++n){
                    f += String.fromCharCode(e[n] & 127);
                }
                return f;
            }
            function latin1Slice(e, r, t) {
                var f = "";
                t = Math.min(e.length, t);
                for(var n = r; n < t; ++n){
                    f += String.fromCharCode(e[n]);
                }
                return f;
            }
            function hexSlice(e, r, t) {
                var f = e.length;
                if (!r || r < 0) r = 0;
                if (!t || t < 0 || t > f) t = f;
                var n = "";
                for(var i = r; i < t; ++i){
                    n += s[e[i]];
                }
                return n;
            }
            function utf16leSlice(e, r, t) {
                var f = e.slice(r, t);
                var n = "";
                for(var i = 0; i < f.length; i += 2){
                    n += String.fromCharCode(f[i] + f[i + 1] * 256);
                }
                return n;
            }
            Buffer.prototype.slice = function slice(e, r) {
                var t = this.length;
                e = ~~e;
                r = r === undefined ? t : ~~r;
                if (e < 0) {
                    e += t;
                    if (e < 0) e = 0;
                } else if (e > t) {
                    e = t;
                }
                if (r < 0) {
                    r += t;
                    if (r < 0) r = 0;
                } else if (r > t) {
                    r = t;
                }
                if (r < e) r = e;
                var f = this.subarray(e, r);
                Object.setPrototypeOf(f, Buffer.prototype);
                return f;
            };
            function checkOffset(e, r, t) {
                if (e % 1 !== 0 || e < 0) throw new RangeError("offset is not uint");
                if (e + r > t) throw new RangeError("Trying to access beyond buffer length");
            }
            Buffer.prototype.readUIntLE = function readUIntLE(e, r, t) {
                e = e >>> 0;
                r = r >>> 0;
                if (!t) checkOffset(e, r, this.length);
                var f = this[e];
                var n = 1;
                var i = 0;
                while(++i < r && (n *= 256)){
                    f += this[e + i] * n;
                }
                return f;
            };
            Buffer.prototype.readUIntBE = function readUIntBE(e, r, t) {
                e = e >>> 0;
                r = r >>> 0;
                if (!t) {
                    checkOffset(e, r, this.length);
                }
                var f = this[e + --r];
                var n = 1;
                while(r > 0 && (n *= 256)){
                    f += this[e + --r] * n;
                }
                return f;
            };
            Buffer.prototype.readUInt8 = function readUInt8(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 1, this.length);
                return this[e];
            };
            Buffer.prototype.readUInt16LE = function readUInt16LE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 2, this.length);
                return this[e] | this[e + 1] << 8;
            };
            Buffer.prototype.readUInt16BE = function readUInt16BE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 2, this.length);
                return this[e] << 8 | this[e + 1];
            };
            Buffer.prototype.readUInt32LE = function readUInt32LE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 4, this.length);
                return (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216;
            };
            Buffer.prototype.readUInt32BE = function readUInt32BE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 4, this.length);
                return this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
            };
            Buffer.prototype.readIntLE = function readIntLE(e, r, t) {
                e = e >>> 0;
                r = r >>> 0;
                if (!t) checkOffset(e, r, this.length);
                var f = this[e];
                var n = 1;
                var i = 0;
                while(++i < r && (n *= 256)){
                    f += this[e + i] * n;
                }
                n *= 128;
                if (f >= n) f -= Math.pow(2, 8 * r);
                return f;
            };
            Buffer.prototype.readIntBE = function readIntBE(e, r, t) {
                e = e >>> 0;
                r = r >>> 0;
                if (!t) checkOffset(e, r, this.length);
                var f = r;
                var n = 1;
                var i = this[e + --f];
                while(f > 0 && (n *= 256)){
                    i += this[e + --f] * n;
                }
                n *= 128;
                if (i >= n) i -= Math.pow(2, 8 * r);
                return i;
            };
            Buffer.prototype.readInt8 = function readInt8(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 1, this.length);
                if (!(this[e] & 128)) return this[e];
                return (255 - this[e] + 1) * -1;
            };
            Buffer.prototype.readInt16LE = function readInt16LE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 2, this.length);
                var t = this[e] | this[e + 1] << 8;
                return t & 32768 ? t | 4294901760 : t;
            };
            Buffer.prototype.readInt16BE = function readInt16BE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 2, this.length);
                var t = this[e + 1] | this[e] << 8;
                return t & 32768 ? t | 4294901760 : t;
            };
            Buffer.prototype.readInt32LE = function readInt32LE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 4, this.length);
                return this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
            };
            Buffer.prototype.readInt32BE = function readInt32BE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 4, this.length);
                return this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
            };
            Buffer.prototype.readFloatLE = function readFloatLE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 4, this.length);
                return n.read(this, e, true, 23, 4);
            };
            Buffer.prototype.readFloatBE = function readFloatBE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 4, this.length);
                return n.read(this, e, false, 23, 4);
            };
            Buffer.prototype.readDoubleLE = function readDoubleLE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 8, this.length);
                return n.read(this, e, true, 52, 8);
            };
            Buffer.prototype.readDoubleBE = function readDoubleBE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 8, this.length);
                return n.read(this, e, false, 52, 8);
            };
            function checkInt(e, r, t, f, n, i) {
                if (!Buffer.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (r > n || r < i) throw new RangeError('"value" argument is out of bounds');
                if (t + f > e.length) throw new RangeError("Index out of range");
            }
            Buffer.prototype.writeUIntLE = function writeUIntLE(e, r, t, f) {
                e = +e;
                r = r >>> 0;
                t = t >>> 0;
                if (!f) {
                    var n = Math.pow(2, 8 * t) - 1;
                    checkInt(this, e, r, t, n, 0);
                }
                var i = 1;
                var o = 0;
                this[r] = e & 255;
                while(++o < t && (i *= 256)){
                    this[r + o] = e / i & 255;
                }
                return r + t;
            };
            Buffer.prototype.writeUIntBE = function writeUIntBE(e, r, t, f) {
                e = +e;
                r = r >>> 0;
                t = t >>> 0;
                if (!f) {
                    var n = Math.pow(2, 8 * t) - 1;
                    checkInt(this, e, r, t, n, 0);
                }
                var i = t - 1;
                var o = 1;
                this[r + i] = e & 255;
                while(--i >= 0 && (o *= 256)){
                    this[r + i] = e / o & 255;
                }
                return r + t;
            };
            Buffer.prototype.writeUInt8 = function writeUInt8(e, r, t) {
                e = +e;
                r = r >>> 0;
                if (!t) checkInt(this, e, r, 1, 255, 0);
                this[r] = e & 255;
                return r + 1;
            };
            Buffer.prototype.writeUInt16LE = function writeUInt16LE(e, r, t) {
                e = +e;
                r = r >>> 0;
                if (!t) checkInt(this, e, r, 2, 65535, 0);
                this[r] = e & 255;
                this[r + 1] = e >>> 8;
                return r + 2;
            };
            Buffer.prototype.writeUInt16BE = function writeUInt16BE(e, r, t) {
                e = +e;
                r = r >>> 0;
                if (!t) checkInt(this, e, r, 2, 65535, 0);
                this[r] = e >>> 8;
                this[r + 1] = e & 255;
                return r + 2;
            };
            Buffer.prototype.writeUInt32LE = function writeUInt32LE(e, r, t) {
                e = +e;
                r = r >>> 0;
                if (!t) checkInt(this, e, r, 4, 4294967295, 0);
                this[r + 3] = e >>> 24;
                this[r + 2] = e >>> 16;
                this[r + 1] = e >>> 8;
                this[r] = e & 255;
                return r + 4;
            };
            Buffer.prototype.writeUInt32BE = function writeUInt32BE(e, r, t) {
                e = +e;
                r = r >>> 0;
                if (!t) checkInt(this, e, r, 4, 4294967295, 0);
                this[r] = e >>> 24;
                this[r + 1] = e >>> 16;
                this[r + 2] = e >>> 8;
                this[r + 3] = e & 255;
                return r + 4;
            };
            Buffer.prototype.writeIntLE = function writeIntLE(e, r, t, f) {
                e = +e;
                r = r >>> 0;
                if (!f) {
                    var n = Math.pow(2, 8 * t - 1);
                    checkInt(this, e, r, t, n - 1, -n);
                }
                var i = 0;
                var o = 1;
                var u = 0;
                this[r] = e & 255;
                while(++i < t && (o *= 256)){
                    if (e < 0 && u === 0 && this[r + i - 1] !== 0) {
                        u = 1;
                    }
                    this[r + i] = (e / o >> 0) - u & 255;
                }
                return r + t;
            };
            Buffer.prototype.writeIntBE = function writeIntBE(e, r, t, f) {
                e = +e;
                r = r >>> 0;
                if (!f) {
                    var n = Math.pow(2, 8 * t - 1);
                    checkInt(this, e, r, t, n - 1, -n);
                }
                var i = t - 1;
                var o = 1;
                var u = 0;
                this[r + i] = e & 255;
                while(--i >= 0 && (o *= 256)){
                    if (e < 0 && u === 0 && this[r + i + 1] !== 0) {
                        u = 1;
                    }
                    this[r + i] = (e / o >> 0) - u & 255;
                }
                return r + t;
            };
            Buffer.prototype.writeInt8 = function writeInt8(e, r, t) {
                e = +e;
                r = r >>> 0;
                if (!t) checkInt(this, e, r, 1, 127, -128);
                if (e < 0) e = 255 + e + 1;
                this[r] = e & 255;
                return r + 1;
            };
            Buffer.prototype.writeInt16LE = function writeInt16LE(e, r, t) {
                e = +e;
                r = r >>> 0;
                if (!t) checkInt(this, e, r, 2, 32767, -32768);
                this[r] = e & 255;
                this[r + 1] = e >>> 8;
                return r + 2;
            };
            Buffer.prototype.writeInt16BE = function writeInt16BE(e, r, t) {
                e = +e;
                r = r >>> 0;
                if (!t) checkInt(this, e, r, 2, 32767, -32768);
                this[r] = e >>> 8;
                this[r + 1] = e & 255;
                return r + 2;
            };
            Buffer.prototype.writeInt32LE = function writeInt32LE(e, r, t) {
                e = +e;
                r = r >>> 0;
                if (!t) checkInt(this, e, r, 4, 2147483647, -2147483648);
                this[r] = e & 255;
                this[r + 1] = e >>> 8;
                this[r + 2] = e >>> 16;
                this[r + 3] = e >>> 24;
                return r + 4;
            };
            Buffer.prototype.writeInt32BE = function writeInt32BE(e, r, t) {
                e = +e;
                r = r >>> 0;
                if (!t) checkInt(this, e, r, 4, 2147483647, -2147483648);
                if (e < 0) e = 4294967295 + e + 1;
                this[r] = e >>> 24;
                this[r + 1] = e >>> 16;
                this[r + 2] = e >>> 8;
                this[r + 3] = e & 255;
                return r + 4;
            };
            function checkIEEE754(e, r, t, f, n, i) {
                if (t + f > e.length) throw new RangeError("Index out of range");
                if (t < 0) throw new RangeError("Index out of range");
            }
            function writeFloat(e, r, t, f, i) {
                r = +r;
                t = t >>> 0;
                if (!i) {
                    checkIEEE754(e, r, t, 4, 34028234663852886e22, -34028234663852886e22);
                }
                n.write(e, r, t, f, 23, 4);
                return t + 4;
            }
            Buffer.prototype.writeFloatLE = function writeFloatLE(e, r, t) {
                return writeFloat(this, e, r, true, t);
            };
            Buffer.prototype.writeFloatBE = function writeFloatBE(e, r, t) {
                return writeFloat(this, e, r, false, t);
            };
            function writeDouble(e, r, t, f, i) {
                r = +r;
                t = t >>> 0;
                if (!i) {
                    checkIEEE754(e, r, t, 8, 17976931348623157e292, -17976931348623157e292);
                }
                n.write(e, r, t, f, 52, 8);
                return t + 8;
            }
            Buffer.prototype.writeDoubleLE = function writeDoubleLE(e, r, t) {
                return writeDouble(this, e, r, true, t);
            };
            Buffer.prototype.writeDoubleBE = function writeDoubleBE(e, r, t) {
                return writeDouble(this, e, r, false, t);
            };
            Buffer.prototype.copy = function copy(e, r, t, f) {
                if (!Buffer.isBuffer(e)) throw new TypeError("argument should be a Buffer");
                if (!t) t = 0;
                if (!f && f !== 0) f = this.length;
                if (r >= e.length) r = e.length;
                if (!r) r = 0;
                if (f > 0 && f < t) f = t;
                if (f === t) return 0;
                if (e.length === 0 || this.length === 0) return 0;
                if (r < 0) {
                    throw new RangeError("targetStart out of bounds");
                }
                if (t < 0 || t >= this.length) throw new RangeError("Index out of range");
                if (f < 0) throw new RangeError("sourceEnd out of bounds");
                if (f > this.length) f = this.length;
                if (e.length - r < f - t) {
                    f = e.length - r + t;
                }
                var n = f - t;
                if (this === e && typeof Uint8Array.prototype.copyWithin === "function") {
                    this.copyWithin(r, t, f);
                } else if (this === e && t < r && r < f) {
                    for(var i = n - 1; i >= 0; --i){
                        e[i + r] = this[i + t];
                    }
                } else {
                    Uint8Array.prototype.set.call(e, this.subarray(t, f), r);
                }
                return n;
            };
            Buffer.prototype.fill = function fill(e, r, t, f) {
                if (typeof e === "string") {
                    if (typeof r === "string") {
                        f = r;
                        r = 0;
                        t = this.length;
                    } else if (typeof t === "string") {
                        f = t;
                        t = this.length;
                    }
                    if (f !== undefined && typeof f !== "string") {
                        throw new TypeError("encoding must be a string");
                    }
                    if (typeof f === "string" && !Buffer.isEncoding(f)) {
                        throw new TypeError("Unknown encoding: " + f);
                    }
                    if (e.length === 1) {
                        var n = e.charCodeAt(0);
                        if (f === "utf8" && n < 128 || f === "latin1") {
                            e = n;
                        }
                    }
                } else if (typeof e === "number") {
                    e = e & 255;
                } else if (typeof e === "boolean") {
                    e = Number(e);
                }
                if (r < 0 || this.length < r || this.length < t) {
                    throw new RangeError("Out of range index");
                }
                if (t <= r) {
                    return this;
                }
                r = r >>> 0;
                t = t === undefined ? this.length : t >>> 0;
                if (!e) e = 0;
                var i;
                if (typeof e === "number") {
                    for(i = r; i < t; ++i){
                        this[i] = e;
                    }
                } else {
                    var o = Buffer.isBuffer(e) ? e : Buffer.from(e, f);
                    var u = o.length;
                    if (u === 0) {
                        throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                    }
                    for(i = 0; i < t - r; ++i){
                        this[i + r] = o[i % u];
                    }
                }
                return this;
            };
            var a = /[^+/0-9A-Za-z-_]/g;
            function base64clean(e) {
                e = e.split("=")[0];
                e = e.trim().replace(a, "");
                if (e.length < 2) return "";
                while(e.length % 4 !== 0){
                    e = e + "=";
                }
                return e;
            }
            function utf8ToBytes(e, r) {
                r = r || Infinity;
                var t;
                var f = e.length;
                var n = null;
                var i = [];
                for(var o = 0; o < f; ++o){
                    t = e.charCodeAt(o);
                    if (t > 55295 && t < 57344) {
                        if (!n) {
                            if (t > 56319) {
                                if ((r -= 3) > -1) i.push(239, 191, 189);
                                continue;
                            } else if (o + 1 === f) {
                                if ((r -= 3) > -1) i.push(239, 191, 189);
                                continue;
                            }
                            n = t;
                            continue;
                        }
                        if (t < 56320) {
                            if ((r -= 3) > -1) i.push(239, 191, 189);
                            n = t;
                            continue;
                        }
                        t = (n - 55296 << 10 | t - 56320) + 65536;
                    } else if (n) {
                        if ((r -= 3) > -1) i.push(239, 191, 189);
                    }
                    n = null;
                    if (t < 128) {
                        if ((r -= 1) < 0) break;
                        i.push(t);
                    } else if (t < 2048) {
                        if ((r -= 2) < 0) break;
                        i.push(t >> 6 | 192, t & 63 | 128);
                    } else if (t < 65536) {
                        if ((r -= 3) < 0) break;
                        i.push(t >> 12 | 224, t >> 6 & 63 | 128, t & 63 | 128);
                    } else if (t < 1114112) {
                        if ((r -= 4) < 0) break;
                        i.push(t >> 18 | 240, t >> 12 & 63 | 128, t >> 6 & 63 | 128, t & 63 | 128);
                    } else {
                        throw new Error("Invalid code point");
                    }
                }
                return i;
            }
            function asciiToBytes(e) {
                var r = [];
                for(var t = 0; t < e.length; ++t){
                    r.push(e.charCodeAt(t) & 255);
                }
                return r;
            }
            function utf16leToBytes(e, r) {
                var t, f, n;
                var i = [];
                for(var o = 0; o < e.length; ++o){
                    if ((r -= 2) < 0) break;
                    t = e.charCodeAt(o);
                    f = t >> 8;
                    n = t % 256;
                    i.push(n);
                    i.push(f);
                }
                return i;
            }
            function base64ToBytes(e) {
                return f.toByteArray(base64clean(e));
            }
            function blitBuffer(e, r, t, f) {
                for(var n = 0; n < f; ++n){
                    if (n + t >= r.length || n >= e.length) break;
                    r[n + t] = e[n];
                }
                return n;
            }
            function isInstance(e, r) {
                return e instanceof r || e != null && e.constructor != null && e.constructor.name != null && e.constructor.name === r.name;
            }
            function numberIsNaN(e) {
                return e !== e;
            }
            var s = function() {
                var e = "0123456789abcdef";
                var r = new Array(256);
                for(var t = 0; t < 16; ++t){
                    var f = t * 16;
                    for(var n = 0; n < 16; ++n){
                        r[f + n] = e[t] + e[n];
                    }
                }
                return r;
            }();
        },
        783: function(e, r) {
            /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ r.read = function(e, r, t, f, n) {
                var i, o;
                var u = n * 8 - f - 1;
                var a = (1 << u) - 1;
                var s = a >> 1;
                var h = -7;
                var c = t ? n - 1 : 0;
                var l = t ? -1 : 1;
                var p = e[r + c];
                c += l;
                i = p & (1 << -h) - 1;
                p >>= -h;
                h += u;
                for(; h > 0; i = i * 256 + e[r + c], c += l, h -= 8){}
                o = i & (1 << -h) - 1;
                i >>= -h;
                h += f;
                for(; h > 0; o = o * 256 + e[r + c], c += l, h -= 8){}
                if (i === 0) {
                    i = 1 - s;
                } else if (i === a) {
                    return o ? NaN : (p ? -1 : 1) * Infinity;
                } else {
                    o = o + Math.pow(2, f);
                    i = i - s;
                }
                return (p ? -1 : 1) * o * Math.pow(2, i - f);
            };
            r.write = function(e, r, t, f, n, i) {
                var o, u, a;
                var s = i * 8 - n - 1;
                var h = (1 << s) - 1;
                var c = h >> 1;
                var l = n === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
                var p = f ? 0 : i - 1;
                var y = f ? 1 : -1;
                var g = r < 0 || r === 0 && 1 / r < 0 ? 1 : 0;
                r = Math.abs(r);
                if (isNaN(r) || r === Infinity) {
                    u = isNaN(r) ? 1 : 0;
                    o = h;
                } else {
                    o = Math.floor(Math.log(r) / Math.LN2);
                    if (r * (a = Math.pow(2, -o)) < 1) {
                        o--;
                        a *= 2;
                    }
                    if (o + c >= 1) {
                        r += l / a;
                    } else {
                        r += l * Math.pow(2, 1 - c);
                    }
                    if (r * a >= 2) {
                        o++;
                        a /= 2;
                    }
                    if (o + c >= h) {
                        u = 0;
                        o = h;
                    } else if (o + c >= 1) {
                        u = (r * a - 1) * Math.pow(2, n);
                        o = o + c;
                    } else {
                        u = r * Math.pow(2, c - 1) * Math.pow(2, n);
                        o = 0;
                    }
                }
                for(; n >= 8; e[t + p] = u & 255, p += y, u /= 256, n -= 8){}
                o = o << n | u;
                s += n;
                for(; s > 0; e[t + p] = o & 255, p += y, o /= 256, s -= 8){}
                e[t + p - y] |= g * 128;
            };
        }
    };
    var r = {};
    function __nccwpck_require__(t) {
        var f = r[t];
        if (f !== undefined) {
            return f.exports;
        }
        var n = r[t] = {
            exports: {}
        };
        var i = true;
        try {
            e[t](n, n.exports, __nccwpck_require__);
            i = false;
        } finally{
            if (i) delete r[t];
        }
        return n.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/compiled/buffer") + "/";
    var t = __nccwpck_require__(72);
    module.exports = t;
})();
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Pencil
]);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
            key: "1a8usu"
        }
    ],
    [
        "path",
        {
            d: "m15 5 4 4",
            key: "1mk7zo"
        }
    ]
];
const Pencil = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("pencil", __iconNode);
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Pencil",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript)");
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Trash2
]);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M3 6h18",
            key: "d0wm0j"
        }
    ],
    [
        "path",
        {
            d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",
            key: "4alrt4"
        }
    ],
    [
        "path",
        {
            d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",
            key: "v07s0e"
        }
    ],
    [
        "line",
        {
            x1: "10",
            x2: "10",
            y1: "11",
            y2: "17",
            key: "1uufr5"
        }
    ],
    [
        "line",
        {
            x1: "14",
            x2: "14",
            y1: "11",
            y2: "17",
            key: "xtxkd"
        }
    ]
];
const Trash2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("trash-2", __iconNode);
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Trash2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript)");
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>CircleCheckBig
]);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M21.801 10A10 10 0 1 1 17 3.335",
            key: "yps3ct"
        }
    ],
    [
        "path",
        {
            d: "m9 11 3 3L22 4",
            key: "1pflzl"
        }
    ]
];
const CircleCheckBig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("circle-check-big", __iconNode);
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript)");
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>CircleX
]);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "m15 9-6 6",
            key: "1uzhvr"
        }
    ],
    [
        "path",
        {
            d: "m9 9 6 6",
            key: "z0biqf"
        }
    ]
];
const CircleX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("circle-x", __iconNode);
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "XCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript)");
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Lock
]);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "rect",
        {
            width: "18",
            height: "11",
            x: "3",
            y: "11",
            rx: "2",
            ry: "2",
            key: "1w4ew1"
        }
    ],
    [
        "path",
        {
            d: "M7 11V7a5 5 0 0 1 10 0v4",
            key: "fwvmzm"
        }
    ]
];
const Lock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("lock", __iconNode);
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Lock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript)");
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/lock-open.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>LockOpen
]);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "rect",
        {
            width: "18",
            height: "11",
            x: "3",
            y: "11",
            rx: "2",
            ry: "2",
            key: "1w4ew1"
        }
    ],
    [
        "path",
        {
            d: "M7 11V7a5 5 0 0 1 9.9-1",
            key: "1mm8w8"
        }
    ]
];
const LockOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("lock-open", __iconNode);
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/lock-open.js [app-client] (ecmascript) <export default as Unlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Unlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/lucide-react/dist/esm/icons/lock-open.js [app-client] (ecmascript)");
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@hookform/resolvers/dist/resolvers.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toNestErrors",
    ()=>r,
    "validateFieldsNatively",
    ()=>o
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
;
const s = (e, s, o)=>{
    if (e && "reportValidity" in e) {
        const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get"])(o, s);
        e.setCustomValidity(r && r.message || ""), e.reportValidity();
    }
}, o = (t, e)=>{
    for(const o in e.fields){
        const r = e.fields[o];
        r && r.ref && "reportValidity" in r.ref ? s(r.ref, o, t) : r.refs && r.refs.forEach((e)=>s(e, o, t));
    }
}, r = (s, r)=>{
    r.shouldUseNativeValidation && o(s, r);
    const f = {};
    for(const o in s){
        const n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get"])(r.fields, o), a = Object.assign(s[o] || {}, {
            ref: n && n.ref
        });
        if (i(r.names || Object.keys(s), o)) {
            const s = Object.assign({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get"])(f, o));
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["set"])(s, "root", a), (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["set"])(f, o, s);
        } else (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["set"])(f, o, a);
    }
    return f;
}, i = (t, e)=>t.some((t)=>t.startsWith(e + "."));
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@hookform/resolvers/zod/dist/zod.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "zodResolver",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$hookform$2f$resolvers$2f$dist$2f$resolvers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@hookform/resolvers/dist/resolvers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
;
;
var n = function(r, e) {
    for(var n = {}; r.length;){
        var t = r[0], s = t.code, i = t.message, a = t.path.join(".");
        if (!n[a]) if ("unionErrors" in t) {
            var u = t.unionErrors[0].errors[0];
            n[a] = {
                message: u.message,
                type: u.code
            };
        } else n[a] = {
            message: i,
            type: s
        };
        if ("unionErrors" in t && t.unionErrors.forEach(function(e) {
            return e.errors.forEach(function(e) {
                return r.push(e);
            });
        }), e) {
            var c = n[a].types, f = c && c[t.code];
            n[a] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["appendErrors"])(a, e, n, s, f ? [].concat(f, t.message) : t.message);
        }
        r.shift();
    }
    return n;
}, t = function(o, t, s) {
    return void 0 === s && (s = {}), function(i, a, u) {
        try {
            return Promise.resolve(function(e, n) {
                try {
                    var a = Promise.resolve(o["sync" === s.mode ? "parse" : "parseAsync"](i, t)).then(function(e) {
                        return u.shouldUseNativeValidation && (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$hookform$2f$resolvers$2f$dist$2f$resolvers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateFieldsNatively"])({}, u), {
                            errors: {},
                            values: s.raw ? i : e
                        };
                    });
                } catch (r) {
                    return n(r);
                }
                return a && a.then ? a.then(void 0, n) : a;
            }(0, function(r) {
                if (function(r) {
                    return Array.isArray(null == r ? void 0 : r.errors);
                }(r)) return {
                    values: {},
                    errors: (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$hookform$2f$resolvers$2f$dist$2f$resolvers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toNestErrors"])(n(r.errors, !u.shouldUseNativeValidation && "all" === u.criteriaMode), u)
                };
                throw r;
            }));
        } catch (r) {
            return Promise.reject(r);
        }
    };
};
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/switch/index.parts.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/switch/root/SwitchRootContext.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SwitchRootContext",
    ()=>SwitchRootContext,
    "useSwitchRootContext",
    ()=>useSwitchRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
const SwitchRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) SwitchRootContext.displayName = "SwitchRootContext";
function useSwitchRootContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](SwitchRootContext);
    if (context === undefined) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: SwitchRootContext is missing. Switch parts must be placed within <Switch.Root>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/switch/root/SwitchRootDataAttributes.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SwitchRootDataAttributes",
    ()=>SwitchRootDataAttributes
]);
let SwitchRootDataAttributes = /*#__PURE__*/ function(SwitchRootDataAttributes) {
    /**
   * Present when the switch is checked.
   */ SwitchRootDataAttributes["checked"] = "data-checked";
    /**
   * Present when the switch is not checked.
   */ SwitchRootDataAttributes["unchecked"] = "data-unchecked";
    /**
   * Present when the switch is disabled.
   */ SwitchRootDataAttributes["disabled"] = "data-disabled";
    /**
   * Present when the switch is readonly.
   */ SwitchRootDataAttributes["readonly"] = "data-readonly";
    /**
   * Present when the switch is required.
   */ SwitchRootDataAttributes["required"] = "data-required";
    /**
   * Present when the switch is in a valid state (when wrapped in Field.Root).
   */ SwitchRootDataAttributes["valid"] = "data-valid";
    /**
   * Present when the switch is in an invalid state (when wrapped in Field.Root).
   */ SwitchRootDataAttributes["invalid"] = "data-invalid";
    /**
   * Present when the switch has been touched (when wrapped in Field.Root).
   */ SwitchRootDataAttributes["touched"] = "data-touched";
    /**
   * Present when the switch's value has changed (when wrapped in Field.Root).
   */ SwitchRootDataAttributes["dirty"] = "data-dirty";
    /**
   * Present when the switch is active (when wrapped in Field.Root).
   */ SwitchRootDataAttributes["filled"] = "data-filled";
    /**
   * Present when the switch is focused (when wrapped in Field.Root).
   */ SwitchRootDataAttributes["focused"] = "data-focused";
    return SwitchRootDataAttributes;
}({});
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/switch/stateAttributesMapping.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "stateAttributesMapping",
    ()=>stateAttributesMapping
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/internals/field-constants/constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$switch$2f$root$2f$SwitchRootDataAttributes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/switch/root/SwitchRootDataAttributes.mjs [app-client] (ecmascript)");
;
;
const stateAttributesMapping = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fieldValidityMapping"],
    checked (value) {
        if (value) {
            return {
                [__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$switch$2f$root$2f$SwitchRootDataAttributes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchRootDataAttributes"].checked]: ''
            };
        }
        return {
            [__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$switch$2f$root$2f$SwitchRootDataAttributes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchRootDataAttributes"].unchecked]: ''
        };
    }
};
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/internals/labelable-provider/useAriaLabelledBy.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAriaLabelledBy",
    ()=>useAriaLabelledBy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/utils/useIsoLayoutEffect.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useBaseUiId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/internals/useBaseUiId.mjs [app-client] (ecmascript)");
'use client';
;
;
;
function useAriaLabelledBy(explicitAriaLabelledBy, labelId, labelSourceRef, enableFallback = true, labelSourceId) {
    const [fallbackAriaLabelledBy, setFallbackAriaLabelledBy] = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]();
    const generatedLabelId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useBaseUiId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseUiId"])(labelSourceId ? `${labelSourceId}-label` : undefined);
    const ariaLabelledBy = explicitAriaLabelledBy ?? labelId ?? fallbackAriaLabelledBy;
    // Fallback for <span> controls labelled by wrapping/sibling native <label>.
    // Run after every commit so DOM association changes (e.g. label mount/unmount)
    // are reflected even when props/state deps are unchanged.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useAriaLabelledBy.useIsoLayoutEffect": ()=>{
            const nextAriaLabelledBy = explicitAriaLabelledBy || labelId || !enableFallback ? undefined : getAriaLabelledBy(labelSourceRef.current, generatedLabelId);
            if (fallbackAriaLabelledBy !== nextAriaLabelledBy) {
                setFallbackAriaLabelledBy(nextAriaLabelledBy);
            }
        }
    }["useAriaLabelledBy.useIsoLayoutEffect"]);
    return ariaLabelledBy;
}
function getAriaLabelledBy(labelSource, generatedLabelId) {
    const label = findAssociatedLabel(labelSource);
    if (!label) {
        return undefined;
    }
    if (!label.id && generatedLabelId) {
        label.id = generatedLabelId;
    }
    return label.id || undefined;
}
function findAssociatedLabel(labelSource) {
    if (!labelSource) {
        return undefined;
    }
    // Fast path before the expensive `.labels` read.
    const parent = labelSource.parentElement;
    if (parent && parent.tagName === 'LABEL') {
        return parent;
    }
    const controlId = labelSource.id;
    if (controlId) {
        const nextSibling = labelSource.nextElementSibling;
        if (nextSibling && nextSibling.htmlFor === controlId) {
            return nextSibling;
        }
    }
    const labels = labelSource.labels;
    return labels && labels[0];
}
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/switch/root/SwitchRoot.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SwitchRoot",
    ()=>SwitchRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useControlled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/utils/useControlled.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useMergedRefs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/utils/useMergedRefs.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/utils/useIsoLayoutEffect.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$visuallyHidden$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/utils/visuallyHidden.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/utils/empty.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__getWindow__as__ownerWindow$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript) <export getWindow as ownerWindow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/internals/useRenderElement.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/merge-props/mergeProps.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useBaseUiId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/internals/useBaseUiId.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$use$2d$button$2f$useButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/internals/use-button/useButton.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$switch$2f$root$2f$SwitchRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/switch/root/SwitchRootContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$switch$2f$stateAttributesMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/switch/stateAttributesMapping.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$root$2d$context$2f$FieldRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$register$2d$control$2f$useRegisterFieldControl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/internals/field-register-control/useRegisterFieldControl.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$form$2d$context$2f$FormContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/internals/form-context/FormContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$useAriaLabelledBy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/internals/labelable-provider/useAriaLabelledBy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$useLabelableId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/internals/labelable-provider/useLabelableId.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$createBaseUIEventDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$reason$2d$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/internals/reason-parts.mjs [app-client] (ecmascript) <export * as REASONS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useValueChanged$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/internals/useValueChanged.mjs [app-client] (ecmascript)");
/**
 * Represents the switch itself.
 * Renders a `<span>` element and a hidden `<input>` beside.
 *
 * Documentation: [Base UI Switch](https://base-ui.com/react/components/switch)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
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
;
;
;
;
;
;
;
;
const SwitchRoot = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function SwitchRoot(componentProps, forwardedRef) {
    const { checked: checkedProp, className, defaultChecked, 'aria-labelledby': ariaLabelledByProp, form, id: idProp, inputRef: externalInputRef, name: nameProp, nativeButton = false, onCheckedChange, readOnly = false, required = false, disabled: disabledProp = false, render, uncheckedValue, value, style, ...elementProps } = componentProps;
    const { clearErrors } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$form$2d$context$2f$FormContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    const { state: fieldState, setTouched, setDirty, validityData, setFilled, setFocused, validationMode, disabled: fieldDisabled, name: fieldName, validation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$root$2d$context$2f$FieldRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldRootContext"])();
    const { labelId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabelableContext"])();
    const disabled = fieldDisabled || disabledProp;
    const name = fieldName ?? nameProp;
    const inputRef = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const handleInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useMergedRefs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefs"])(inputRef, externalInputRef, validation.inputRef);
    const switchRef = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useBaseUiId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseUiId"])();
    const controlId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$useLabelableId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabelableId"])({
        id: idProp,
        implicit: false,
        controlRef: switchRef
    });
    const hiddenInputId = nativeButton ? undefined : controlId;
    const [checked, setCheckedState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useControlled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useControlled"])({
        controlled: checkedProp,
        default: Boolean(defaultChecked),
        name: 'Switch',
        state: 'checked'
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$register$2d$control$2f$useRegisterFieldControl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRegisterFieldControl"])(switchRef, id, checked, undefined, !disabled, nameProp);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "SwitchRoot.SwitchRoot.useIsoLayoutEffect": ()=>{
            if (inputRef.current) {
                setFilled(inputRef.current.checked);
            }
        }
    }["SwitchRoot.SwitchRoot.useIsoLayoutEffect"], [
        inputRef,
        setFilled
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useValueChanged$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValueChanged"])(checked, {
        "SwitchRoot.SwitchRoot.useValueChanged": ()=>{
            clearErrors(name);
            setDirty(checked !== validityData.initialValue);
            setFilled(checked);
            validation.change(checked);
        }
    }["SwitchRoot.SwitchRoot.useValueChanged"]);
    const { getButtonProps, buttonRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$use$2d$button$2f$useButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useButton"])({
        disabled,
        native: nativeButton
    });
    const ariaLabelledBy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$useAriaLabelledBy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAriaLabelledBy"])(ariaLabelledByProp, labelId, inputRef, !nativeButton, hiddenInputId);
    const rootProps = {
        id: nativeButton ? controlId : id,
        role: 'switch',
        'aria-checked': checked,
        'aria-readonly': readOnly || undefined,
        'aria-required': required || undefined,
        'aria-labelledby': ariaLabelledBy,
        onFocus () {
            if (!disabled) {
                setFocused(true);
            }
        },
        onBlur () {
            const element = inputRef.current;
            if (!element || disabled) {
                return;
            }
            setTouched(true);
            setFocused(false);
            if (validationMode === 'onBlur') {
                validation.commit(element.checked);
            }
        },
        onClick (event) {
            if (readOnly || disabled) {
                return;
            }
            event.preventDefault();
            const input = inputRef.current;
            if (!input) {
                return;
            }
            input.dispatchEvent(new ((0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__getWindow__as__ownerWindow$3e$__["ownerWindow"])(input)).PointerEvent('click', {
                bubbles: true,
                shiftKey: event.shiftKey,
                ctrlKey: event.ctrlKey,
                altKey: event.altKey,
                metaKey: event.metaKey
            }));
        }
    };
    const inputProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])({
        checked,
        disabled,
        form,
        id: hiddenInputId,
        name,
        required,
        style: name ? __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$visuallyHidden$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["visuallyHiddenInput"] : __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$visuallyHidden$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["visuallyHidden"],
        tabIndex: -1,
        type: 'checkbox',
        'aria-hidden': true,
        ref: handleInputRef,
        onChange (event) {
            // Workaround for https://github.com/facebook/react/issues/9023
            if (event.nativeEvent.defaultPrevented) {
                return;
            }
            if (readOnly) {
                event.preventDefault();
                return;
            }
            const nextChecked = event.currentTarget.checked;
            const eventDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$createBaseUIEventDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$reason$2d$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].none, event.nativeEvent);
            onCheckedChange?.(nextChecked, eventDetails);
            if (eventDetails.isCanceled) {
                return;
            }
            setCheckedState(nextChecked);
        },
        onFocus () {
            switchRef.current?.focus();
        }
    }, (props)=>validation.getValidationProps(disabled, props), // React <19 sets an empty value if `undefined` is passed explicitly
    // To avoid this, we only set the value if it's defined
    value !== undefined ? {
        value
    } : __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"]);
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "SwitchRoot.SwitchRoot.useMemo[state]": ()=>({
                ...fieldState,
                checked,
                disabled,
                readOnly,
                required
            })
    }["SwitchRoot.SwitchRoot.useMemo[state]"], [
        fieldState,
        checked,
        disabled,
        readOnly,
        required
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('span', componentProps, {
        state,
        ref: [
            forwardedRef,
            switchRef,
            buttonRef
        ],
        props: [
            rootProps,
            elementProps,
            getButtonProps,
            {
                "SwitchRoot.SwitchRoot.useRenderElement[element]": (props)=>validation.getValidationProps(disabled, props)
            }["SwitchRoot.SwitchRoot.useRenderElement[element]"]
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$switch$2f$stateAttributesMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stateAttributesMapping"]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$switch$2f$root$2f$SwitchRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchRootContext"].Provider, {
        value: state,
        children: [
            element,
            !checked && name && uncheckedValue !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("input", {
                type: "hidden",
                form: form,
                name: name,
                value: uncheckedValue,
                disabled: disabled
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("input", {
                ...inputProps,
                suppressHydrationWarning: true
            })
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) SwitchRoot.displayName = "SwitchRoot";
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/switch/thumb/SwitchThumb.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SwitchThumb",
    ()=>SwitchThumb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$switch$2f$root$2f$SwitchRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/switch/root/SwitchRootContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/internals/useRenderElement.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$switch$2f$stateAttributesMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/switch/stateAttributesMapping.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
const SwitchThumb = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function SwitchThumb(componentProps, forwardedRef) {
    const { render, className, style, ...elementProps } = componentProps;
    const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$switch$2f$root$2f$SwitchRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwitchRootContext"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('span', componentProps, {
        state,
        ref: forwardedRef,
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$switch$2f$stateAttributesMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stateAttributesMapping"],
        props: elementProps
    });
});
if ("TURBOPACK compile-time truthy", 1) SwitchThumb.displayName = "SwitchThumb";
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/switch/index.parts.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Root",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$switch$2f$root$2f$SwitchRoot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchRoot"],
    "Thumb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$switch$2f$thumb$2f$SwitchThumb$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchThumb"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$switch$2f$index$2e$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/switch/index.parts.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$switch$2f$root$2f$SwitchRoot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/switch/root/SwitchRoot.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$switch$2f$thumb$2f$SwitchThumb$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/switch/thumb/SwitchThumb.mjs [app-client] (ecmascript)");
}),
"[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/switch/index.parts.mjs [app-client] (ecmascript) <export * as Switch>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Switch",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$switch$2f$index$2e$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$prn232$2d$su26$2d$ai$2d$audit$2d$project$2d$prn232_se18d05_group$2d$05$2f$source$2f$FLDN_fe$2f$node_modules$2f40$base$2d$ui$2f$react$2f$switch$2f$index$2e$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prn232-su26-ai-audit-project-prn232_se18d05_group-05/source/FLDN_fe/node_modules/@base-ui/react/switch/index.parts.mjs [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=11y7_0ztt-kl._.js.map