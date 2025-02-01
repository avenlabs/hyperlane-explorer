import { ChainName, TypedTransactionReceipt, WarpTypedTransaction } from '@hyperlane-xyz/sdk';
import { HexString, ProtocolType } from '@hyperlane-xyz/utils';
export interface ChainAddress {
    address: string;
    chainName?: ChainName;
}
export interface AccountInfo {
    protocol: ProtocolType;
    addresses: Array<ChainAddress>;
    publicKey?: Promise<HexString>;
    isReady: boolean;
}
export interface WalletDetails {
    name?: string;
    logoUrl?: string;
}
export interface ActiveChainInfo {
    chainDisplayName?: string;
    chainName?: ChainName;
}
export type SendTransactionFn<TxReq extends WarpTypedTransaction = WarpTypedTransaction, TxResp extends TypedTransactionReceipt = TypedTransactionReceipt> = (params: {
    tx: TxReq;
    chainName: ChainName;
    activeChainName?: ChainName;
}) => Promise<{
    hash: string;
    confirm: () => Promise<TxResp>;
}>;
export type SwitchNetworkFn = (chainName: ChainName) => Promise<void>;
export interface ChainTransactionFns {
    sendTransaction: SendTransactionFn;
    switchNetwork?: SwitchNetworkFn;
}
//# sourceMappingURL=types.d.ts.map