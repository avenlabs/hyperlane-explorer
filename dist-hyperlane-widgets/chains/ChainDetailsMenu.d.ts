import React from 'react';
import { ChainMetadata } from '@hyperlane-xyz/sdk';
export interface ChainDetailsMenuProps {
    chainMetadata: ChainMetadata;
    overrideChainMetadata?: Partial<ChainMetadata>;
    onChangeOverrideMetadata: (overrides?: Partial<ChainMetadata>) => void;
    onClickBack?: () => void;
    onRemoveChain?: () => void;
}
export declare function ChainDetailsMenu(props: ChainDetailsMenuProps): React.JSX.Element;
//# sourceMappingURL=ChainDetailsMenu.d.ts.map