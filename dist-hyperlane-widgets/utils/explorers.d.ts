import type { MultiProvider } from '@hyperlane-xyz/sdk';
export interface ExplorerQueryResponse<R> {
    status: string;
    message: string;
    result: R;
}
export declare function getExplorerApiUrl(chainName: string, multiProvider: MultiProvider): Promise<string | null>;
export declare function queryExplorer<P>(chainName: string, multiProvider: MultiProvider, path: string, apiKey?: string, timeout?: number): Promise<NonNullable<P>>;
export declare function executeExplorerQuery<P>(url: string, timeout?: number): Promise<NonNullable<P>>;
interface PartialBlock {
    hash: string;
    number: number;
    timestamp: number;
    nonce: string;
}
export declare function queryExplorerForBlock(chainName: string, multiProvider: MultiProvider, blockNumber?: number | string): Promise<PartialBlock>;
export {};
//# sourceMappingURL=explorers.d.ts.map