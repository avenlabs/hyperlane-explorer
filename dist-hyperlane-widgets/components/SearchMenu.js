import { clsx } from 'clsx';
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState, } from 'react';
import { deepEquals, isObject, toTitleCase } from '@hyperlane-xyz/utils';
import { ColorPalette } from '../color.js';
import { ArrowIcon } from '../icons/Arrow.js';
import { PencilIcon } from '../icons/Pencil.js';
import { PlusIcon } from '../icons/Plus.js';
import { SearchIcon } from '../icons/Search.js';
import { XIcon } from '../icons/X.js';
import { DropdownMenu } from '../layout/DropdownMenu.js';
import { Popover } from '../layout/Popover.js';
import { IconButton } from './IconButton.js';
import { TextInput } from './TextInput.js';
export function SearchMenu({ data, ListComponent, searchFn, onClickItem, onClickEditItem, sortOptions, defaultSortState, FilterComponent, defaultFilterState, placeholder, onClickAddItem, }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [sortState, setSortState] = useState(defaultSortState || {
        sortBy: sortOptions[0],
        sortOrder: SortOrderOption.Asc,
    });
    const [filterState, setFilterState] = useState(defaultFilterState);
    const inputRef = useRef(null);
    const results = useMemo(() => searchFn({
        data,
        query: searchQuery,
        sort: sortState,
        filter: filterState,
    }), [data, searchQuery, sortState, filterState, searchFn]);
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (results.length === 1) {
            const item = results[0];
            isEditMode ? onClickEditItem(item) : onClickItem(item);
        }
    }, [results, isEditMode, onClickEditItem, onClickItem]);
    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    return (React.createElement("div", { className: "htw-flex htw-flex-col htw-gap-2" },
        React.createElement("form", { onSubmit: handleSubmit },
            React.createElement(SearchBar, { value: searchQuery, onChange: setSearchQuery, placeholder: placeholder, ref: inputRef })),
        React.createElement("div", { className: "htw-flex htw-items-center htw-justify-between" },
            React.createElement("div", { className: "htw-flex htw-items-center htw-gap-5" },
                React.createElement(SortDropdown, { options: sortOptions, value: sortState, onChange: setSortState }),
                React.createElement(FilterDropdown, { value: filterState, defaultValue: defaultFilterState, onChange: setFilterState, FilterComponent: FilterComponent })),
            React.createElement("div", { className: "htw-flex htw-items-center htw-gap-3 htw-mr-0.5" },
                React.createElement(IconButton, { onClick: () => setIsEditMode(!isEditMode), className: "htw-p-1.5 htw-border htw-border-gray-200 htw-rounded-full", title: "Edit items" },
                    React.createElement(PencilIcon, { width: 14, height: 14, color: isEditMode ? ColorPalette.Blue : ColorPalette.Black })),
                onClickAddItem && (React.createElement(IconButton, { onClick: onClickAddItem, className: "htw-p-0.5 htw-border htw-border-gray-200 htw-rounded-full", title: "Add item" },
                    React.createElement(PlusIcon, { width: 22, height: 22 }))))),
        React.createElement("div", { className: "htw-flex htw-flex-col htw-divide-y htw-divide-gray-100" }, results.length ? (results.map((data, i) => (React.createElement(ListItem, { key: i, data: data, isEditMode: isEditMode, onClickItem: onClickItem, onClickEditItem: onClickEditItem, ListComponent: ListComponent })))) : (React.createElement("div", { className: "htw-my-8 htw-text-gray-500 htw-text-center" }, "No results found")))));
}
const SearchBar = forwardRef(function SearchBar({ onChange, value, ...props }, ref) {
    return (React.createElement("div", { className: "htw-relative" },
        React.createElement(SearchIcon, { width: 18, height: 18, className: "htw-absolute htw-left-4 htw-top-1/2 -htw-translate-y-1/2 htw-opacity-50" }),
        React.createElement(TextInput, { onChange: onChange, value: value, ref: ref, ...props, className: "htw-bg-inherit focus:htw-bg-inherit htw-border htw-border-gray-200 focus:htw-border-gray-400 htw-w-full htw-rounded-lg htw-px-11 htw-py-3" }),
        value && onChange && (React.createElement(IconButton, { className: "htw-absolute htw-right-4 htw-top-1/3 htw-opacity-50", onClick: () => onChange('') },
            React.createElement(XIcon, { width: 14, height: 14 })))));
});
function SortDropdown({ options, value, onChange, }) {
    const onToggleOrder = () => {
        onChange({
            ...value,
            sortOrder: value.sortOrder === SortOrderOption.Asc
                ? SortOrderOption.Desc
                : SortOrderOption.Asc,
        });
    };
    const onSetSortBy = (sortBy) => {
        onChange({
            ...value,
            sortBy,
        });
    };
    return (React.createElement("div", { className: "htw-h-7 htw-flex htw-items-stretch htw-text-sm htw-rounded htw-border htw-border-gray-200" },
        React.createElement("div", { className: "htw-flex htw-bg-gray-100 htw-px-2" },
            React.createElement("span", { className: "htw-place-self-center" }, "Sort")),
        React.createElement(DropdownMenu, { button: React.createElement("span", { className: "htw-place-self-center htw-px-2" }, toTitleCase(value.sortBy)), buttonClassname: "htw-flex htw-items-stretch hover:htw-bg-gray-100 active:htw-scale-95", menuClassname: "htw-py-1.5 htw-px-2 htw-flex htw-flex-col htw-gap-2 htw-text-sm htw-border htw-border-gray-100", menuItems: options.map((o) => (
            // eslint-disable-next-line react/jsx-key
            React.createElement("div", { className: "htw-rounded htw-p-1.5 hover:htw-bg-gray-200", onClick: () => onSetSortBy(o) }, toTitleCase(o)))), menuProps: { anchor: 'bottom start' } }),
        React.createElement(IconButton, { onClick: onToggleOrder, className: "hover:htw-bg-gray-100 active:htw-scale-95 htw-px-0.5 htw-py-1.5", title: "Toggle sort" },
            React.createElement(ArrowIcon, { direction: value.sortOrder === SortOrderOption.Asc ? 'n' : 's', width: 14, height: 14 }))));
}
function FilterDropdown({ value, defaultValue, onChange, FilterComponent, }) {
    const filterValues = useMemo(() => {
        if (!value || !isObject(value))
            return [];
        const modifiedKeys = Object.keys(value).filter((k) => !deepEquals(value[k], defaultValue[k]));
        return modifiedKeys.map((k) => value[k]);
    }, [value, defaultValue]);
    const hasFilters = filterValues.length > 0;
    const onClear = () => {
        onChange(defaultValue);
    };
    return (React.createElement("div", { className: "htw-h-7 htw-flex htw-items-stretch htw-text-sm htw-rounded htw-border htw-border-gray-200" },
        React.createElement("div", { className: "htw-flex htw-bg-gray-100 htw-px-2" },
            React.createElement("span", { className: "htw-place-self-center" }, "Filter")),
        React.createElement(Popover, { button: React.createElement("span", { className: clsx('htw-place-self-center htw-px-3', !hasFilters && 'htw-text-gray-400') }, hasFilters ? filterValues.map(toTitleCase).join(', ') : 'None'), buttonClassname: "htw-h-full htw-flex htw-items-stretch hover:htw-bg-gray-100 active:htw-scale-95" },
            React.createElement(FilterComponent, { value: value, onChange: onChange })),
        React.createElement(IconButton, { disabled: !filterValues.length, onClick: onClear, className: "hover:htw-bg-gray-100 active:htw-scale-95 htw-px-1 htw-py-1.5", title: "Clear filters" },
            React.createElement(XIcon, { width: 9, height: 9 }))));
}
function ListItem({ data, isEditMode, onClickEditItem, onClickItem, ListComponent, }) {
    return (React.createElement("button", { className: clsx('-htw-mx-2 htw-px-2.5 htw-py-2.5 htw-grid htw-grid-cols-[1fr,1fr,auto] htw-items-center htw-relative htw-rounded htw-transition-all htw-duration-250', data.disabled
            ? 'htw-opacity-50'
            : 'hover:htw-bg-gray-100 active:htw-scale-95'), type: "button", disabled: data.disabled, onClick: () => (isEditMode ? onClickEditItem(data) : onClickItem(data)) },
        React.createElement(ListComponent, { data: data }),
        isEditMode && (React.createElement("div", { className: "htw-justify-self-end" },
            React.createElement(PencilIcon, { width: 16, height: 16 })))));
}
export var SortOrderOption;
(function (SortOrderOption) {
    SortOrderOption["Asc"] = "asc";
    SortOrderOption["Desc"] = "desc";
})(SortOrderOption || (SortOrderOption = {}));
//# sourceMappingURL=SearchMenu.js.map