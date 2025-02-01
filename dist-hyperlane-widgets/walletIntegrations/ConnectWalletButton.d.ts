import React, { ButtonHTMLAttributes } from 'react';
import { MultiProtocolProvider } from '@hyperlane-xyz/sdk';
type Props = {
    multiProvider: MultiProtocolProvider;
    onClickWhenConnected: () => void;
    onClickWhenUnconnected: () => void;
    countClassName?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export declare function ConnectWalletButton({ multiProvider, onClickWhenConnected, onClickWhenUnconnected, className, countClassName, ...rest }: Props): React.JSX.Element | null;
export {};
//# sourceMappingURL=ConnectWalletButton.d.ts.map