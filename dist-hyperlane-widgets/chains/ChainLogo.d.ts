import React, { ReactElement } from 'react';
import type { IRegistry } from '@hyperlane-xyz/registry';
type SvgIcon = (props: {
    width: number;
    height: number;
    title?: string;
}) => ReactElement;
export interface ChainLogoProps {
    chainName: string;
    logoUri?: string;
    registry?: IRegistry;
    size?: number;
    background?: boolean;
    Icon?: SvgIcon;
}
export declare function ChainLogo({ chainName, logoUri, registry, size, background, Icon, }: ChainLogoProps): React.JSX.Element;
export {};
//# sourceMappingURL=ChainLogo.d.ts.map