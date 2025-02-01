import { ChainName, MultiProtocolProvider } from '@hyperlane-xyz/sdk';
import { Address, HexString, ProtocolType } from '@hyperlane-xyz/utils';
import { AccountInfo, ActiveChainInfo, ChainTransactionFns, WalletDetails } from './types.js';
export declare function useAccounts(multiProvider: MultiProtocolProvider, blacklistedAddresses?: Address[]): {
    accounts: Record<ProtocolType, AccountInfo>;
    readyAccounts: Array<AccountInfo>;
};
export declare function useAccountForChain(multiProvider: MultiProtocolProvider, chainName?: ChainName): AccountInfo | undefined;
export declare function useAccountAddressForChain(multiProvider: MultiProtocolProvider, chainName?: ChainName): Address | undefined;
export declare function getAccountAddressForChain(multiProvider: MultiProtocolProvider, chainName?: ChainName, accounts?: Record<ProtocolType, AccountInfo>): Address | undefined;
export declare function getAccountAddressAndPubKey(multiProvider: MultiProtocolProvider, chainName?: ChainName, accounts?: Record<ProtocolType, AccountInfo>): {
    address?: Address;
    publicKey?: Promise<HexString>;
};
export declare function useWalletDetails(): Record<ProtocolType, WalletDetails>;
export declare function useConnectFns(): Record<ProtocolType, () => void>;
export declare function useDisconnectFns(): Record<ProtocolType, () => Promise<void>>;
export declare function useActiveChains(multiProvider: MultiProtocolProvider): {
    chains: Record<ProtocolType, ActiveChainInfo>;
    readyChains: Array<ActiveChainInfo>;
};
export declare function useTransactionFns(multiProvider: MultiProtocolProvider): Record<ProtocolType, ChainTransactionFns>;
//# sourceMappingURL=multiProtocol.d.ts.map