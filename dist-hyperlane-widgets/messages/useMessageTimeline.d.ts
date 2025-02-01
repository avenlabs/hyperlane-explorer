import type { MultiProvider } from '@hyperlane-xyz/sdk';
interface Params {
    messageId?: string;
    multiProvider: MultiProvider;
    originTxHash?: string;
    explorerApiUrl?: string;
    retryInterval?: number;
}
export declare function useMessageTimeline(params: Params): {
    message: import("./types.js").ApiMessage | null;
    stage: import("./types.js").MessageStage;
    timings: import("./types.js").StageTimings;
    error: string | null;
    isLoading: boolean;
};
export {};
//# sourceMappingURL=useMessageTimeline.d.ts.map