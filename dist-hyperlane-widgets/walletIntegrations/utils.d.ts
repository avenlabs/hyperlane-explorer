import { SendTransactionParameters } from '@wagmi/core';
import { PopulatedTransaction as Ethers5Transaction } from 'ethers';
import { ChainMetadata, MultiProtocolProvider } from '@hyperlane-xyz/sdk';
import { ProtocolType } from '@hyperlane-xyz/utils';
export declare function ethers5TxToWagmiTx(tx: Ethers5Transaction): SendTransactionParameters;
export declare function getChainsForProtocol(multiProvider: MultiProtocolProvider, protocol: ProtocolType): ChainMetadata[];
export declare function findChainByRpcUrl(multiProvider: MultiProtocolProvider, url?: string): {
    name: string;
    chainId: string | number;
    domainId: number;
    protocol: ProtocolType;
    rpcUrls: {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
    }[];
    bech32Prefix?: string | undefined;
    blockExplorers?: {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
    }[] | undefined;
    blocks?: {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    } | undefined;
    customGrpcUrls?: string | undefined;
    deployer?: {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    } | undefined;
    displayName?: string | undefined;
    displayNameShort?: string | undefined;
    gasCurrencyCoinGeckoId?: string | undefined;
    gnosisSafeTransactionServiceUrl?: string | undefined;
    grpcUrls?: {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
    }[] | undefined;
    index?: {
        from?: number | undefined;
    } | undefined;
    isTestnet?: boolean | undefined;
    logoURI?: string | undefined;
    nativeToken?: {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    } | undefined;
    restUrls?: {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
    }[] | undefined;
    slip44?: number | undefined;
    technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
    transactionOverrides?: Record<string, any> | undefined;
} | undefined;
//# sourceMappingURL=utils.d.ts.map