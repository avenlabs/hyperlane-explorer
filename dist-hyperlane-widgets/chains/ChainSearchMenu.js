import React, { useCallback, useMemo, useState } from 'react';
import { mergeChainMetadataMap, } from '@hyperlane-xyz/sdk';
import { ProtocolType } from '@hyperlane-xyz/utils';
import { SearchMenu, SortOrderOption, } from '../components/SearchMenu.js';
import { SegmentedControl } from '../components/SegmentedControl.js';
import { ChainAddMenu } from './ChainAddMenu.js';
import { ChainDetailsMenu } from './ChainDetailsMenu.js';
import { ChainLogo } from './ChainLogo.js';
export var ChainSortByOption;
(function (ChainSortByOption) {
    ChainSortByOption["Name"] = "name";
    ChainSortByOption["ChainId"] = "chain id";
    ChainSortByOption["Protocol"] = "protocol";
})(ChainSortByOption || (ChainSortByOption = {}));
var FilterTestnetOption;
(function (FilterTestnetOption) {
    FilterTestnetOption["Testnet"] = "testnet";
    FilterTestnetOption["Mainnet"] = "mainnet";
})(FilterTestnetOption || (FilterTestnetOption = {}));
const defaultFilterState = {
    type: undefined,
    protocol: undefined,
};
export function ChainSearchMenu({ chainMetadata, onChangeOverrideMetadata, overrideChainMetadata, onClickChain, customListItemField, showChainDetails, showAddChainButton, showAddChainMenu, defaultSortField, }) {
    const [drilldownChain, setDrilldownChain] = useState(showChainDetails);
    const [addChain, setAddChain] = useState(showAddChainMenu || false);
    const { listData, mergedMetadata } = useMemo(() => {
        const mergedMetadata = mergeChainMetadataMap(chainMetadata, overrideChainMetadata);
        return { mergedMetadata, listData: Object.values(mergedMetadata) };
    }, [chainMetadata, overrideChainMetadata]);
    const { ListComponent, searchFn, sortOptions, defaultSortState } = useCustomizedListItems(customListItemField, defaultSortField);
    if (drilldownChain && mergedMetadata[drilldownChain]) {
        const isLocalOverrideChain = !chainMetadata[drilldownChain];
        const onRemoveChain = () => {
            const newOverrides = { ...overrideChainMetadata };
            delete newOverrides[drilldownChain];
            onChangeOverrideMetadata(newOverrides);
        };
        return (React.createElement(ChainDetailsMenu, { chainMetadata: chainMetadata[drilldownChain], overrideChainMetadata: overrideChainMetadata?.[drilldownChain], onChangeOverrideMetadata: (o) => onChangeOverrideMetadata({
                ...overrideChainMetadata,
                [drilldownChain]: o,
            }), onClickBack: () => setDrilldownChain(undefined), onRemoveChain: isLocalOverrideChain ? onRemoveChain : undefined }));
    }
    if (addChain) {
        return (React.createElement(ChainAddMenu, { chainMetadata: chainMetadata, overrideChainMetadata: overrideChainMetadata, onChangeOverrideMetadata: onChangeOverrideMetadata, onClickBack: () => setAddChain(false) }));
    }
    return (React.createElement(SearchMenu, { data: listData, ListComponent: ListComponent, searchFn: searchFn, onClickItem: onClickChain, onClickEditItem: (chain) => setDrilldownChain(chain.name), sortOptions: sortOptions, defaultSortState: defaultSortState, FilterComponent: ChainFilters, defaultFilterState: defaultFilterState, placeholder: "Chain Name or ID", onClickAddItem: showAddChainButton ? () => setAddChain(true) : undefined }));
}
function ChainListItem({ data: chain, customField, }) {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "htw-flex htw-items-center" },
            React.createElement("div", { className: "htw-shrink-0" },
                React.createElement(ChainLogo, { chainName: chain.name, logoUri: chain.logoURI, size: 32 })),
            React.createElement("div", { className: "htw-ml-3 htw-text-left htw-overflow-hidden" },
                React.createElement("div", { className: "htw-text-sm htw-font-medium truncate" }, chain.displayName),
                React.createElement("div", { className: "htw-text-[0.7rem] htw-text-gray-500" }, chain.isTestnet ? 'Testnet' : 'Mainnet'))),
        customField !== null && (React.createElement("div", { className: "htw-text-left htw-overflow-hidden" },
            React.createElement("div", { className: "htw-text-sm truncate" }, customField
                ? customField.data[chain.name].display || 'Unknown'
                : chain.deployer?.name || 'Unknown deployer'),
            React.createElement("div", { className: "htw-text-[0.7rem] htw-text-gray-500" }, customField ? customField.header : 'Deployer')))));
}
function ChainFilters({ value, onChange, }) {
    return (React.createElement("div", { className: "htw-py-3 htw-px-2.5 htw-space-y-4" },
        React.createElement("div", { className: "htw-flex htw-flex-col htw-items-start htw-gap-2" },
            React.createElement("label", { className: "htw-text-sm htw-text-gray-600 htw-pl-px" }, "Type"),
            React.createElement(SegmentedControl, { options: Object.values(FilterTestnetOption), onChange: (selected) => onChange({ ...value, type: selected }), allowEmpty: true })),
        React.createElement("div", { className: "htw-flex htw-flex-col htw-items-start htw-gap-2" },
            React.createElement("label", { className: "htw-text-sm htw-text-gray-600 htw-pl-px" }, "Protocol"),
            React.createElement(SegmentedControl, { options: Object.values(ProtocolType), onChange: (selected) => onChange({ ...value, protocol: selected }), allowEmpty: true }))));
}
function chainSearch({ data, query, sort, filter, customListItemField, }) {
    const queryFormatted = query.trim().toLowerCase();
    return (data
        // Query search
        .filter((chain) => chain.name.includes(queryFormatted) ||
        chain.displayName?.toLowerCase().includes(queryFormatted) ||
        chain.chainId.toString().includes(queryFormatted) ||
        chain.domainId.toString().includes(queryFormatted))
        // Filter options
        .filter((chain) => {
        let included = true;
        if (filter.type) {
            included &&=
                !!chain.isTestnet === (filter.type === FilterTestnetOption.Testnet);
        }
        if (filter.protocol) {
            included &&= chain.protocol === filter.protocol;
        }
        return included;
    })
        // Sort options
        .sort((c1, c2) => {
        // Special case handling for if the chains are being sorted by the
        // custom field provided to ChainSearchMenu
        if (customListItemField && sort.sortBy === customListItemField.header) {
            const result = customListItemField.data[c1.name].sortValue -
                customListItemField.data[c2.name].sortValue;
            return sort.sortOrder === SortOrderOption.Asc ? result : -result;
        }
        // Otherwise sort by the default options
        let sortValue1 = c1.name;
        let sortValue2 = c2.name;
        if (sort.sortBy === ChainSortByOption.ChainId) {
            sortValue1 = c1.chainId.toString();
            sortValue2 = c2.chainId.toString();
        }
        else if (sort.sortBy === ChainSortByOption.Protocol) {
            sortValue1 = c1.protocol;
            sortValue2 = c2.protocol;
        }
        return sort.sortOrder === SortOrderOption.Asc
            ? sortValue1.localeCompare(sortValue2)
            : sortValue2.localeCompare(sortValue1);
    }));
}
/**
 * This hook creates closures around the provided customListItemField data
 * This is useful because SearchMenu will do handle the list item rendering and
 * management but the custom data is more or a chain-search-specific concern
 */
function useCustomizedListItems(customListItemField, defaultSortField) {
    // Create closure of ChainListItem but with customField pre-bound
    const ListComponent = useCallback(({ data }) => (React.createElement(ChainListItem, { data: data, customField: customListItemField })), [customListItemField]);
    // Bind the custom field to the search function
    const searchFn = useCallback((args) => chainSearch({ ...args, customListItemField }), [customListItemField]);
    // Merge the custom field into the sort options if a custom field exists
    const sortOptions = useMemo(() => [
        ...(customListItemField ? [customListItemField.header] : []),
        ...Object.values(ChainSortByOption),
    ], [customListItemField]);
    // Sort by defaultSortField initially, if value is "custom", sort using custom field by default
    const defaultSortState = useMemo(() => defaultSortField
        ? {
            sortBy: defaultSortField === 'custom' && customListItemField
                ? customListItemField.header
                : defaultSortField,
            sortOrder: SortOrderOption.Desc,
        }
        : undefined, [defaultSortField, customListItemField]);
    return { ListComponent, searchFn, sortOptions, defaultSortState };
}
//# sourceMappingURL=ChainSearchMenu.js.map