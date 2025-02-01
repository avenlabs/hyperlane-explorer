import { Chain as ViemChain } from 'viem';
import { MultiProtocolProvider } from '@hyperlane-xyz/sdk';
import { AccountInfo, ActiveChainInfo, ChainTransactionFns, WalletDetails } from './types.js';
export declare function useEthereumAccount(_multiProvider: MultiProtocolProvider): AccountInfo;
export declare function useEthereumWalletDetails(): WalletDetails;
export declare function useEthereumConnectFn(): () => void;
export declare function useEthereumDisconnectFn(): () => Promise<void>;
export declare function useEthereumActiveChain(multiProvider: MultiProtocolProvider): ActiveChainInfo;
export declare function useEthereumTransactionFns(multiProvider: MultiProtocolProvider): ChainTransactionFns;
export declare function getWagmiChainConfigs(multiProvider: MultiProtocolProvider): ViemChain[];
//# sourceMappingURL=ethereum.d.ts.map