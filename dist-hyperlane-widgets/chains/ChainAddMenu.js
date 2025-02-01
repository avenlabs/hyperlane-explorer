import { clsx } from 'clsx';
import React, { useState } from 'react';
import { DEFAULT_GITHUB_REGISTRY } from '@hyperlane-xyz/registry';
import { ChainMetadataSchema, MultiProtocolProvider, } from '@hyperlane-xyz/sdk';
import { failure, success, tryParseJsonOrYaml, } from '@hyperlane-xyz/utils';
import { ColorPalette } from '../color.js';
import { Button } from '../components/Button.js';
import { CopyButton } from '../components/CopyButton.js';
import { LinkButton } from '../components/LinkButton.js';
import { ChevronIcon } from '../icons/Chevron.js';
import { PlusIcon } from '../icons/Plus.js';
import { widgetLogger } from '../logger.js';
export function ChainAddMenu(props) {
    return (React.createElement("div", { className: "htw-space-y-4" },
        React.createElement(Header, { ...props }),
        React.createElement(Form, { ...props })));
}
function Header({ onClickBack }) {
    return (React.createElement("div", null,
        !!onClickBack && (React.createElement(LinkButton, { onClick: onClickBack, className: "htw-py-1 htw-mb-1.5" },
            React.createElement("div", { className: "htw-flex htw-items-center htw-gap-1.5" },
                React.createElement(ChevronIcon, { width: 12, height: 12, direction: "w", className: "htw-opacity-70" }),
                React.createElement("span", { className: "htw-text-xs htw-text-gray-600" }, "Back")))),
        React.createElement("h2", { className: "htw-text-lg htw-font-medium" }, "Add chain metadata"),
        React.createElement("p", { className: "htw-mt-1 htw-text-sm htw-text-gray-500" },
            "Add metadata for chains not yet included in the",
            ' ',
            React.createElement("a", { href: DEFAULT_GITHUB_REGISTRY, target: "_blank", rel: "noopener noreferrer", className: "htw-underline htw-underline-offset-2" }, "Hyperlane Canonical Registry"),
            ". Note, this data will only be used locally in your own browser. It does not affect the registry.")));
}
function Form({ chainMetadata, overrideChainMetadata, onChangeOverrideMetadata, onClickBack, }) {
    const [textInput, setTextInput] = useState('');
    const [error, setError] = useState(null);
    const onChangeInput = (e) => {
        setTextInput(e.target.value);
        setError(null);
    };
    const onClickAdd = () => {
        const result = tryParseMetadataInput(textInput, chainMetadata);
        if (result.success) {
            onChangeOverrideMetadata({
                ...overrideChainMetadata,
                [result.data.name]: result.data,
            });
            setTextInput('');
            onClickBack?.();
        }
        else {
            setError(`Invalid config: ${result.error}`);
        }
    };
    return (React.createElement("div", { className: "htw-space-y-1.5" },
        React.createElement("div", { className: "htw-relative" },
            React.createElement("textarea", { className: clsx('htw-text-xs htw-resize htw-border htw-border-gray-200 focus:htw-border-gray-400 htw-rounded-sm htw-p-2 htw-w-full htw-min-h-72 htw-outline-none', error && 'htw-border-red-500'), placeholder: placeholderText, value: textInput, onChange: onChangeInput }),
            error && React.createElement("div", { className: "htw-text-red-600 htw-text-sm" }, error),
            React.createElement(CopyButton, { copyValue: textInput || placeholderText, width: 14, height: 14, className: "htw-absolute htw-right-6 htw-top-3" })),
        React.createElement(Button, { onClick: onClickAdd, className: "htw-bg-gray-600 htw-px-3 htw-py-1.5 htw-gap-1 htw-text-white htw-text-sm" },
            React.createElement(PlusIcon, { width: 20, height: 20, color: ColorPalette.White }),
            React.createElement("span", null, "Add chain"))));
}
function tryParseMetadataInput(input, existingChainMetadata) {
    const parsed = tryParseJsonOrYaml(input);
    if (!parsed.success)
        return parsed;
    const result = ChainMetadataSchema.safeParse(parsed.data);
    if (!result.success) {
        widgetLogger.error('Error validating chain config', result.error);
        const firstIssue = result.error.issues[0];
        return failure(`${firstIssue.path} => ${firstIssue.message}`);
    }
    const newMetadata = result.data;
    const multiProvider = new MultiProtocolProvider(existingChainMetadata);
    if (multiProvider.tryGetChainMetadata(newMetadata.name)) {
        return failure('name is already in use by another chain');
    }
    if (multiProvider.tryGetChainMetadata(newMetadata.domainId)) {
        return failure('domainId is already in use by another chain');
    }
    return success(newMetadata);
}
const placeholderText = `# YAML data
---
chainId: 11155111
name: sepolia
displayName: Sepolia
protocol: ethereum
rpcUrls:
  - http: https://foobar.com
blockExplorers:
  - name: Sepolia Etherscan
    family: etherscan
    url: https://sepolia.etherscan.io
    apiUrl: https://api-sepolia.etherscan.io/api
    apiKey: '12345'
blocks:
  confirmations: 1
  estimateBlockTime: 13
`;
//# sourceMappingURL=ChainAddMenu.js.map