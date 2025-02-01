import type { AssetList, Chain as CosmosChain } from '@chain-registry/types';
import { MultiProtocolProvider } from '@hyperlane-xyz/sdk';
import { AccountInfo, ActiveChainInfo, ChainTransactionFns, WalletDetails } from './types.js';
export declare function useCosmosAccount(multiProvider: MultiProtocolProvider): AccountInfo;
export declare function useCosmosWalletDetails(): WalletDetails;
export declare function useCosmosConnectFn(): () => void;
export declare function useCosmosDisconnectFn(): () => Promise<void>;
export declare function useCosmosActiveChain(_multiProvider: MultiProtocolProvider): ActiveChainInfo;
export declare function useCosmosTransactionFns(multiProvider: MultiProtocolProvider): ChainTransactionFns;
export declare function getCosmosKitChainConfigs(multiProvider: MultiProtocolProvider): {
    chains: CosmosChain[];
    assets: AssetList[];
};
//# sourceMappingURL=cosmos.d.ts.map