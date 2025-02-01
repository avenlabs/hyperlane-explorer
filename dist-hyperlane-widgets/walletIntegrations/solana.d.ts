import { MultiProtocolProvider } from '@hyperlane-xyz/sdk';
import { AccountInfo, ActiveChainInfo, ChainTransactionFns, WalletDetails } from './types.js';
export declare function useSolanaAccount(_multiProvider: MultiProtocolProvider): AccountInfo;
export declare function useSolanaWalletDetails(): WalletDetails;
export declare function useSolanaConnectFn(): () => void;
export declare function useSolanaDisconnectFn(): () => Promise<void>;
export declare function useSolanaActiveChain(multiProvider: MultiProtocolProvider): ActiveChainInfo;
export declare function useSolanaTransactionFns(multiProvider: MultiProtocolProvider): ChainTransactionFns;
//# sourceMappingURL=solana.d.ts.map