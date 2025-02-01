import React from 'react';
import { ChainMap, ChainMetadata, ChainName } from '@hyperlane-xyz/sdk';
export declare enum ChainSortByOption {
    Name = "name",
    ChainId = "chain id",
    Protocol = "protocol"
}
type DefaultSortField = ChainSortByOption | 'custom';
interface CustomListItemField {
    header: string;
    data: ChainMap<{
        display: string;
        sortValue: number;
    }>;
}
export interface ChainSearchMenuProps {
    chainMetadata: ChainMap<ChainMetadata>;
    overrideChainMetadata?: ChainMap<Partial<ChainMetadata> | undefined>;
    onChangeOverrideMetadata: (overrides?: ChainMap<Partial<ChainMetadata> | undefined>) => void;
    onClickChain: (chain: ChainMetadata) => void;
    customListItemField?: CustomListItemField | null;
    showChainDetails?: ChainName;
    showAddChainMenu?: boolean;
    showAddChainButton?: boolean;
    defaultSortField?: DefaultSortField;
}
export declare function ChainSearchMenu({ chainMetadata, onChangeOverrideMetadata, overrideChainMetadata, onClickChain, customListItemField, showChainDetails, showAddChainButton, showAddChainMenu, defaultSortField, }: ChainSearchMenuProps): React.JSX.Element;
export {};
//# sourceMappingURL=ChainSearchMenu.d.ts.map