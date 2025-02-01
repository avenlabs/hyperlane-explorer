import { ApiMessage } from './types.js';
interface Params {
    messageId?: string;
    originTxHash?: string;
    explorerApiUrl?: string;
    retryInterval?: number;
}
export declare function useMessage({ messageId, originTxHash, explorerApiUrl, retryInterval, }: Params): {
    data: ApiMessage | null;
    isLoading: boolean;
    error: string | null;
};
export {};
//# sourceMappingURL=useMessage.d.ts.map