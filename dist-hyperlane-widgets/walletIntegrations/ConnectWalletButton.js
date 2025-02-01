import { clsx } from 'clsx';
import React from 'react';
import { ProtocolType, shortenAddress } from '@hyperlane-xyz/utils';
import { Button } from '../components/Button.js';
import { ChevronIcon } from '../icons/Chevron.js';
import { WalletIcon } from '../icons/Wallet.js';
import { useIsSsr } from '../utils/ssr.js';
import { WalletLogo } from './WalletLogo.js';
import { useAccounts, useWalletDetails } from './multiProtocol.js';
export function ConnectWalletButton({ multiProvider, onClickWhenConnected, onClickWhenUnconnected, className, countClassName, ...rest }) {
    const isSsr = useIsSsr();
    const { readyAccounts } = useAccounts(multiProvider);
    const walletDetails = useWalletDetails();
    const numReady = readyAccounts.length;
    const firstAccount = readyAccounts[0];
    const firstWallet = walletDetails[firstAccount?.protocol || ProtocolType.Ethereum];
    if (isSsr) {
        // https://github.com/wagmi-dev/wagmi/issues/542#issuecomment-1144178142
        return null;
    }
    return (React.createElement("div", { className: "htw-relative" },
        React.createElement("div", { className: "htw-relative" },
            numReady === 0 && (React.createElement(Button, { className: clsx('htw-py-2 htw-px-3', className), onClick: onClickWhenUnconnected, title: "Choose wallet", ...rest },
                React.createElement("div", { className: "htw-flex htw-items-center htw-gap-2" },
                    React.createElement(WalletIcon, { width: 16, height: 16 }),
                    React.createElement("div", { className: "htw-text-xs sm:htw-text-sm" }, "Connect wallet")))),
            numReady === 1 && (React.createElement(Button, { onClick: onClickWhenConnected, className: clsx('htw-px-2.5 htw-py-1', className), ...rest },
                React.createElement("div", { className: "htw-flex htw-w-36 htw-items-center htw-justify-center xs:htw-w-auto" },
                    React.createElement(WalletLogo, { walletDetails: firstWallet, size: 26 }),
                    React.createElement("div", { className: "htw-mx-3 htw-flex htw-flex-col htw-items-start" },
                        React.createElement("div", { className: "htw-text-xs htw-text-gray-500" }, firstWallet.name || 'Wallet'),
                        React.createElement("div", { className: "htw-text-xs" }, readyAccounts[0].addresses.length
                            ? shortenAddress(readyAccounts[0].addresses[0].address, true)
                            : 'Unknown')),
                    React.createElement(ChevronIcon, { direction: "s", width: 10, height: 6 })))),
            numReady > 1 && (React.createElement(Button, { onClick: onClickWhenConnected, className: clsx('htw-px-2.5 htw-py-1', className), ...rest },
                React.createElement("div", { className: "htw-flex htw-items-center htw-justify-center" },
                    React.createElement("div", { style: { height: 26, width: 26 }, className: clsx('htw-flex htw-items-center htw-justify-center htw-rounded-full htw-bg-gray-600 htw-text-white', countClassName) }, numReady),
                    React.createElement("div", { className: "htw-mx-3 htw-flex htw-flex-col htw-items-start" },
                        React.createElement("div", { className: "htw-text-xs htw-text-gray-500" }, "Wallets"),
                        React.createElement("div", { className: "htw-text-xs" }, `${numReady} Connected`)),
                    React.createElement(ChevronIcon, { direction: "s", width: 10, height: 6 })))))));
}
//# sourceMappingURL=ConnectWalletButton.js.map