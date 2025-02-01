import { clsx } from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import { stringify as yamlStringify } from 'yaml';
import { DEFAULT_GITHUB_REGISTRY } from '@hyperlane-xyz/registry';
import { isValidChainMetadata, mergeChainMetadata, } from '@hyperlane-xyz/sdk';
import { failure, isNullish, isUrl, objMerge, objOmit, success, tryParseJsonOrYaml, } from '@hyperlane-xyz/utils';
import { ColorPalette } from '../color.js';
import { CopyButton } from '../components/CopyButton.js';
import { IconButton } from '../components/IconButton.js';
import { LinkButton } from '../components/LinkButton.js';
import { TextInput } from '../components/TextInput.js';
import { Tooltip } from '../components/Tooltip.js';
import { BoxArrowIcon } from '../icons/BoxArrow.js';
import { CheckmarkIcon } from '../icons/Checkmark.js';
import { ChevronIcon } from '../icons/Chevron.js';
import { Circle } from '../icons/Circle.js';
import { PlusCircleIcon } from '../icons/PlusCircle.js';
import { SpinnerIcon } from '../icons/Spinner.js';
import { XIcon } from '../icons/X.js';
import { useConnectionHealthTest } from '../utils/useChainConnectionTest.js';
import { ChainLogo } from './ChainLogo.js';
import { ChainConnectionType } from './types.js';
export function ChainDetailsMenu(props) {
    const mergedMetadata = useMemo(() => mergeChainMetadata(props.chainMetadata || {}, props.overrideChainMetadata || {}), [props]);
    return (React.createElement("div", { className: "htw-space-y-4" },
        React.createElement(ChainHeader, { ...props, chainMetadata: mergedMetadata }),
        React.createElement(ButtonRow, { ...props, chainMetadata: mergedMetadata }),
        React.createElement(ChainRpcs, { ...props, chainMetadata: mergedMetadata }),
        React.createElement(ChainExplorers, { ...props, chainMetadata: mergedMetadata }),
        React.createElement(ChainInfo, { ...props, chainMetadata: mergedMetadata }),
        React.createElement(MetadataOverride, { ...props, chainMetadata: mergedMetadata })));
}
function ChainHeader({ chainMetadata, onClickBack, }) {
    return (React.createElement("div", null,
        !!onClickBack && (React.createElement(LinkButton, { onClick: onClickBack, className: "htw-py-1 htw-mb-1.5" },
            React.createElement("div", { className: "htw-flex htw-items-center htw-gap-1.5" },
                React.createElement(ChevronIcon, { width: 12, height: 12, direction: "w", className: "htw-opacity-70" }),
                React.createElement("span", { className: "htw-text-xs htw-text-gray-600" }, "Back")))),
        React.createElement("div", { className: "htw-flex htw-items-center htw-gap-3" },
            React.createElement(ChainLogo, { chainName: chainMetadata.name, logoUri: chainMetadata.logoURI, size: 30 }),
            React.createElement("h2", { className: "htw-text-lg htw-font-medium" }, `${chainMetadata.displayName} Metadata`))));
}
function ButtonRow({ chainMetadata, onRemoveChain }) {
    const { name } = chainMetadata;
    const copyValue = useMemo(() => yamlStringify(chainMetadata), [chainMetadata]);
    return (React.createElement("div", { className: "htw-pl-0.5 htw-flex htw-items-center htw-gap-10" },
        React.createElement("div", { className: "htw-flex htw-items-center htw-gap-1.5" },
            React.createElement(BoxArrowIcon, { width: 13, height: 13 }),
            React.createElement("a", { 
                // TODO support alternative registries here
                href: `${DEFAULT_GITHUB_REGISTRY}/tree/main/chains/${name}`, target: "_blank", rel: "noopener noreferrer", className: "htw-text-sm hover:htw-underline htw-underline-offset-2 active:htw-opacity-70 htw-transition-all" }, "View in registry")),
        React.createElement("div", { className: "htw-flex htw-items-center htw-gap-1" },
            React.createElement(CopyButton, { width: 12, height: 12, copyValue: copyValue, className: "htw-text-sm hover:htw-underline htw-underline-offset-2 active:htw-opacity-70" }, "Copy Metadata")),
        onRemoveChain && (React.createElement(LinkButton, { onClick: onRemoveChain, className: "htw-text-sm htw-text-red-500 htw-gap-1.5" },
            React.createElement(XIcon, { width: 10, height: 10, color: ColorPalette.Red }),
            React.createElement("span", null, "Delete Chain")))));
}
function ChainRpcs(props) {
    return (React.createElement(ConnectionsSection, { ...props, header: "Connections", type: ChainConnectionType.RPC, tooltip: "Hyperlane tools require chain metadata<br/>with at least one healthy RPC connection." }));
}
function ChainExplorers(props) {
    return (React.createElement(ConnectionsSection, { ...props, header: "Block Explorers", type: ChainConnectionType.Explorer, tooltip: "Explorers are used to provide transaction links and to query data." }));
}
function ConnectionsSection({ chainMetadata, overrideChainMetadata, onChangeOverrideMetadata, header, type, tooltip, }) {
    const values = getConnectionValues(chainMetadata, type);
    return (React.createElement("div", { className: "htw-space-y-1.5" },
        React.createElement(SectionHeader, { tooltip: tooltip }, header),
        values.map((_, i) => (React.createElement(ConnectionRow, { key: i, chainMetadata: chainMetadata, overrideChainMetadata: overrideChainMetadata, onChangeOverrideMetadata: onChangeOverrideMetadata, index: i, type: type }))),
        React.createElement(AddConnectionButton, { chainMetadata: chainMetadata, overrideChainMetadata: overrideChainMetadata, onChangeOverrideMetadata: onChangeOverrideMetadata, type: type })));
}
function AddConnectionButton({ chainMetadata, overrideChainMetadata, onChangeOverrideMetadata, type, }) {
    const [isAdding, setIsAdding] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const [url, setUrl] = useState('');
    const onClickDismiss = () => {
        setIsAdding(false);
        setIsInvalid(false);
        setUrl('');
    };
    const onClickAdd = (e) => {
        e?.preventDefault();
        const currentValues = getConnectionValues(chainMetadata, type);
        const newValue = url?.trim();
        if (!newValue || !isUrl(newValue) || currentValues.includes(newValue)) {
            setIsInvalid(true);
            return;
        }
        let newOverrides = {};
        if (type === ChainConnectionType.RPC) {
            newOverrides = {
                rpcUrls: [{ http: newValue }],
            };
        }
        else if (type === ChainConnectionType.Explorer) {
            const hostName = new URL(newValue).hostname;
            newOverrides = {
                blockExplorers: [{ url: newValue, apiUrl: newValue, name: hostName }],
            };
        }
        onChangeOverrideMetadata(objMerge(overrideChainMetadata || {}, newOverrides, 10, true));
        onClickDismiss();
    };
    if (!isAdding) {
        return (React.createElement(LinkButton, { className: "htw-gap-3", onClick: () => setIsAdding(true) },
            React.createElement(PlusCircleIcon, { width: 15, height: 15, color: ColorPalette.LightGray }),
            React.createElement("div", { className: "htw-text-sm" }, `Add new ${type}`)));
    }
    return (React.createElement("form", { className: "htw-flex htw-items-center htw-gap-2", onSubmit: (e) => onClickAdd(e) },
        React.createElement(PlusCircleIcon, { width: 15, height: 15, color: ColorPalette.LightGray }),
        React.createElement("div", { className: "htw-flex htw-items-stretch htw-gap-1" },
            React.createElement(TextInput, { className: `htw-w-64 htw-text-sm htw-px-1 htw-rounded-sm ${isInvalid && 'htw-text-red-500'}`, placeholder: `Enter ${type} URL`, value: url, onChange: setUrl }),
            React.createElement(IconButton, { onClick: () => onClickAdd(), className: "htw-bg-gray-600 htw-rounded-sm htw-px-1" },
                React.createElement(CheckmarkIcon, { width: 20, height: 20, color: ColorPalette.White })),
            React.createElement(IconButton, { onClick: onClickDismiss, className: "htw-bg-gray-600 htw-rounded-sm htw-px-1" },
                React.createElement(XIcon, { width: 9, height: 9, color: ColorPalette.White })))));
}
function ChainInfo({ chainMetadata }) {
    const { chainId, domainId, deployer, isTestnet } = chainMetadata;
    return (React.createElement("div", { className: "htw-space-y-1.5" },
        React.createElement(SectionHeader, null, "Chain Information"),
        React.createElement("div", { className: "htw-grid htw-grid-cols-2 htw-gap-1.5" },
            React.createElement("div", null,
                React.createElement(SectionHeader, { className: "htw-text-xs" }, "Chain Id"),
                React.createElement("span", { className: "htw-text-sm" }, chainId)),
            React.createElement("div", null,
                React.createElement(SectionHeader, { className: "htw-text-xs" }, "Domain Id"),
                React.createElement("span", { className: "htw-text-sm" }, domainId)),
            React.createElement("div", null,
                React.createElement(SectionHeader, { className: "htw-text-xs" }, "Contract Deployer"),
                React.createElement("a", { href: deployer?.url, target: "_blank", rel: "noopener noreferrer", className: "htw-text-sm hover:htw-underline htw-underline-offset-2" }, deployer?.name || 'Unknown')),
            React.createElement("div", null,
                React.createElement(SectionHeader, { className: "htw-text-xs" }, "Chain Type"),
                React.createElement("span", { className: "htw-text-sm" }, isTestnet ? 'Testnet' : 'Mainnet')))));
}
function MetadataOverride({ chainMetadata, overrideChainMetadata, onChangeOverrideMetadata, }) {
    const stringified = overrideChainMetadata
        ? yamlStringify(overrideChainMetadata)
        : '';
    const [overrideInput, setOverrideInput] = useState(stringified);
    const showButton = overrideInput !== stringified;
    const [isInvalid, setIsInvalid] = useState(false);
    // Keep input in sync with external changes
    useEffect(() => {
        setOverrideInput(stringified);
    }, [stringified]);
    const onChangeInput = (e) => {
        setOverrideInput(e.target.value);
        setIsInvalid(false);
    };
    const onClickSetOverride = () => {
        const trimmed = overrideInput?.trim();
        if (!trimmed) {
            onChangeOverrideMetadata(undefined);
            return;
        }
        const result = tryParseInput(trimmed, chainMetadata);
        if (result.success) {
            onChangeOverrideMetadata(result.data);
            setOverrideInput(trimmed);
            setIsInvalid(false);
        }
        else {
            setIsInvalid(true);
        }
    };
    return (React.createElement("div", { className: "htw-space-y-1.5" },
        React.createElement(SectionHeader, { tooltip: "You can set data here to locally override the metadata from the registry." }, "Metadata Overrides"),
        React.createElement("div", { className: "htw-relative" },
            React.createElement("textarea", { className: clsx('htw-text-xs htw-resize htw-border htw-border-gray-200 focus:htw-border-gray-400 htw-rounded-sm htw-p-1.5 htw-w-full htw-h-12 htw-outline-none', isInvalid && 'htw-border-red-500'), placeholder: `blocks:\n  confirmations: 10`, value: overrideInput, onChange: onChangeInput }),
            React.createElement(IconButton, { onClick: onClickSetOverride, className: clsx('htw-right-3.5 htw-top-2 htw-bg-gray-600 htw-rounded-sm htw-px-1', showButton ? 'htw-absolute' : 'htw-hidden') },
                React.createElement(CheckmarkIcon, { width: 20, height: 20, color: ColorPalette.White })))));
}
function SectionHeader({ children, className, tooltip, }) {
    return (React.createElement("div", { className: "htw-flex htw-items-center htw-gap-3" },
        React.createElement("h3", { className: `htw-text-sm htw-text-gray-500 ${className}` }, children),
        tooltip && React.createElement(Tooltip, { id: "metadata-help", content: tooltip })));
}
function ConnectionRow({ chainMetadata, overrideChainMetadata = {}, onChangeOverrideMetadata, index, type, }) {
    const isHealthy = useConnectionHealthTest(chainMetadata, index, type);
    const value = getConnectionValues(chainMetadata, type)[index];
    const isRemovable = isOverrideConnection(overrideChainMetadata, type, value);
    const onClickRemove = () => {
        let toOmit = {};
        if (type === ChainConnectionType.RPC) {
            toOmit = {
                rpcUrls: [
                    overrideChainMetadata.rpcUrls.find((r) => r.http === value),
                ],
            };
        }
        else if (type === ChainConnectionType.Explorer) {
            toOmit = {
                blockExplorers: [
                    overrideChainMetadata.blockExplorers.find((r) => r.url === value),
                ],
            };
        }
        onChangeOverrideMetadata(objOmit(overrideChainMetadata, toOmit, 10, true));
    };
    return (React.createElement("div", { className: "htw-flex htw-items-center htw-gap-3" },
        isNullish(isHealthy) && type == ChainConnectionType.RPC && (React.createElement(SpinnerIcon, { width: 14, height: 14 })),
        isNullish(isHealthy) && type == ChainConnectionType.Explorer && (React.createElement(Circle, { size: 14, className: "htw-bg-gray-400" })),
        !isNullish(isHealthy) && (React.createElement(Circle, { size: 14, className: isHealthy ? 'htw-bg-green-500' : 'htw-bg-red-500' })),
        React.createElement("div", { className: "htw-text-sm htw-truncate" }, value),
        isRemovable && (React.createElement(IconButton, { className: "htw-bg-gray-600 htw-rounded-sm htw-p-1 htw-mt-0.5", onClick: onClickRemove },
            React.createElement(XIcon, { width: 8, height: 8, color: ColorPalette.White })))));
}
function getConnectionValues(chainMetadata, type) {
    return ((type === ChainConnectionType.RPC
        ? chainMetadata.rpcUrls?.map((r) => r.http)
        : chainMetadata.blockExplorers?.map((b) => b.url)) || []);
}
function isOverrideConnection(overrides, type, value) {
    return getConnectionValues(overrides || {}, type).includes(value);
}
function tryParseInput(input, existingChainMetadata) {
    const parsed = tryParseJsonOrYaml(input);
    if (!parsed.success)
        return parsed;
    const merged = mergeChainMetadata(existingChainMetadata, parsed.data);
    const isValid = isValidChainMetadata(merged);
    return isValid ? success(parsed.data) : failure('Invalid metadata overrides');
}
//# sourceMappingURL=ChainDetailsMenu.js.map