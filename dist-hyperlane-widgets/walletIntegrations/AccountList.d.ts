import React, { ButtonHTMLAttributes } from 'react';
import { MultiProtocolProvider } from '@hyperlane-xyz/sdk';
import { AccountInfo, WalletDetails } from './types.js';
export declare function AccountList({ multiProvider, onClickConnectWallet, onCopySuccess, className, }: {
    multiProvider: MultiProtocolProvider;
    onClickConnectWallet: () => void;
    onCopySuccess?: () => void;
    className?: string;
}): React.JSX.Element;
type AccountSummaryProps = {
    account: AccountInfo;
    walletDetails: WalletDetails;
    onCopySuccess?: () => void;
    onClickDisconnect: () => Promise<void>;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export declare function AccountSummary({ account, onCopySuccess, walletDetails, onClickDisconnect, className, ...rest }: AccountSummaryProps): React.JSX.Element;
export {};
//# sourceMappingURL=AccountList.d.ts.map