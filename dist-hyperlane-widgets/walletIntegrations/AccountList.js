import { clsx } from 'clsx';
import React from 'react';
import { objKeys } from '@hyperlane-xyz/utils';
import { Button } from '../components/Button.js';
import { IconButton } from '../components/IconButton.js';
import { LogoutIcon } from '../icons/Logout.js';
import { WalletIcon } from '../icons/Wallet.js';
import { XCircleIcon } from '../icons/XCircle.js';
import { widgetLogger } from '../logger.js';
import { tryClipboardSet } from '../utils/clipboard.js';
import { WalletLogo } from '../walletIntegrations/WalletLogo.js';
import { useAccounts, useDisconnectFns, useWalletDetails, } from '../walletIntegrations/multiProtocol.js';
const logger = widgetLogger.child({ module: 'walletIntegrations/AccountList' });
export function AccountList({ multiProvider, onClickConnectWallet, onCopySuccess, className, }) {
    const { readyAccounts } = useAccounts(multiProvider);
    const disconnectFns = useDisconnectFns();
    const walletDetails = useWalletDetails();
    const onClickDisconnect = async (protocol) => {
        try {
            const disconnectFn = disconnectFns[protocol];
            if (disconnectFn)
                await disconnectFn();
        }
        catch (error) {
            logger.error('Error disconnecting wallet', error);
        }
    };
    const onClickDisconnectAll = async () => {
        for (const protocol of objKeys(disconnectFns)) {
            await onClickDisconnect(protocol);
        }
    };
    return (React.createElement("div", { className: clsx('htw-space-y-2', className) },
        readyAccounts.map((acc, i) => (React.createElement(AccountSummary, { key: i, account: acc, walletDetails: walletDetails[acc.protocol], onCopySuccess: onCopySuccess, onClickDisconnect: () => onClickDisconnect(acc.protocol) }))),
        React.createElement(Button, { onClick: onClickConnectWallet, className: clsx(styles.btn, 'htw-py-2 htw-px-2.5') },
            React.createElement(WalletIcon, { width: 18, height: 18 }),
            React.createElement("div", { className: "htw-ml-2 htw-text-sm" }, "Connect wallet")),
        React.createElement(Button, { onClick: onClickDisconnectAll, className: clsx(styles.btn, 'htw-py-2 htw-px-2.5') },
            React.createElement(LogoutIcon, { width: 18, height: 18 }),
            React.createElement("div", { className: "htw-ml-2 htw-text-sm" }, "Disconnect all wallets"))));
}
export function AccountSummary({ account, onCopySuccess, walletDetails, onClickDisconnect, className, ...rest }) {
    const numAddresses = account?.addresses?.length || 0;
    const onlyAddress = numAddresses === 1 ? account.addresses[0].address : undefined;
    const onClickCopy = async () => {
        const copyValue = account.addresses.map((a) => a.address).join(', ');
        await tryClipboardSet(copyValue);
        onCopySuccess?.();
    };
    return (React.createElement("div", { className: "htw-relative" },
        React.createElement(Button, { onClick: onClickCopy, className: clsx(styles.btn, 'htw-py-2 htw-pl-1 htw-pr-3', className), ...rest },
            React.createElement("div", { className: "htw-shrink-0 htw-overflow-hidden htw-rounded-full" },
                React.createElement(WalletLogo, { walletDetails: walletDetails, size: 38 })),
            React.createElement("div", { className: "htw-mx-3 htw-flex htw-shrink htw-flex-col htw-items-start htw-overflow-hidden" },
                React.createElement("div", { className: "htw-text-sm htw-font-normal htw-text-gray-800" }, walletDetails.name || 'Wallet'),
                React.createElement("div", { className: "htw-w-full htw-truncate htw-text-left htw-text-xs" }, onlyAddress || `${numAddresses} known addresses`))),
        React.createElement("div", { className: "htw-absolute htw-right-1 htw-top-1/2 htw--translate-y-1/2 htw-rounded-full" },
            React.createElement(IconButton, { onClick: onClickDisconnect, title: "Disconnect", className: "hover:htw-rotate-90" },
                React.createElement(XCircleIcon, { width: 15, height: 15 })))));
}
const styles = {
    btn: 'htw-flex htw-w-full htw-items-center all:htw-justify-start htw-rounded-sm htw-text-sm hover:htw-bg-gray-200 all:hover:htw-opacity-100',
};
//# sourceMappingURL=AccountList.js.map