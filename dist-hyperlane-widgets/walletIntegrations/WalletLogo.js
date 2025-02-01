import React from 'react';
import { WalletIcon } from '../icons/Wallet.js';
import { WalletConnectLogo } from '../logos/WalletConnect.js';
export function WalletLogo({ walletDetails, size, }) {
    const src = walletDetails.logoUrl?.trim();
    if (src) {
        return React.createElement("img", { src: src, width: size, height: size });
    }
    else if (walletDetails.name?.toLowerCase() === 'walletconnect') {
        return React.createElement(WalletConnectLogo, { width: size, height: size });
    }
    else {
        return React.createElement(WalletIcon, { width: size, height: size });
    }
}
//# sourceMappingURL=WalletLogo.js.map