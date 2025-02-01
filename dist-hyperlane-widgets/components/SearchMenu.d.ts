import React, { ComponentType } from 'react';
export interface SearchMenuProps<ListItemData extends {
    disabled?: boolean;
}, SortBy extends string, FilterState> {
    data: ListItemData[];
    ListComponent: ComponentType<{
        data: ListItemData;
    }>;
    onClickItem: (item: ListItemData) => void;
    onClickEditItem: (item: ListItemData) => void;
    searchFn: (args: {
        data: ListItemData[];
        query: string;
        sort: SortState<SortBy>;
        filter: FilterState;
    }) => ListItemData[];
    sortOptions: SortBy[];
    defaultSortState?: SortState<SortBy>;
    FilterComponent: ComponentType<{
        value: FilterState;
        onChange: (s: FilterState) => void;
    }>;
    defaultFilterState: FilterState;
    placeholder?: string;
    onClickAddItem?: () => void;
}
export declare function SearchMenu<ListItem extends {
    disabled?: boolean;
}, SortBy extends string, FilterState>({ data, ListComponent, searchFn, onClickItem, onClickEditItem, sortOptions, defaultSortState, FilterComponent, defaultFilterState, placeholder, onClickAddItem, }: SearchMenuProps<ListItem, SortBy, FilterState>): React.JSX.Element;
export interface SortState<SortBy> {
    sortBy: SortBy;
    sortOrder: SortOrderOption;
}
export declare enum SortOrderOption {
    Asc = "asc",
    Desc = "desc"
}
//# sourceMappingURL=SearchMenu.d.ts.map