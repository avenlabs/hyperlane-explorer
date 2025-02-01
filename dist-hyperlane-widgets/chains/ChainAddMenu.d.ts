import React from 'react';
import { ChainMap, ChainMetadata } from '@hyperlane-xyz/sdk';
export interface ChainAddMenuProps {
    chainMetadata: ChainMap<ChainMetadata>;
    overrideChainMetadata?: ChainMap<Partial<ChainMetadata> | undefined>;
    onChangeOverrideMetadata: (overrides?: ChainMap<Partial<ChainMetadata> | undefined>) => void;
    onClickBack?: () => void;
}
export declare function ChainAddMenu(props: ChainAddMenuProps): React.JSX.Element;
//# sourceMappingURL=ChainAddMenu.d.ts.map