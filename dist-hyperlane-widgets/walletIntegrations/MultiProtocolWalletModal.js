import React from 'react';
import { ProtocolType } from '@hyperlane-xyz/utils';
import { Modal } from '../layout/Modal.js';
import { PROTOCOL_TO_LOGO } from '../logos/protocols.js';
import { useConnectFns } from './multiProtocol.js';
export function MultiProtocolWalletModal({ isOpen, close, protocols, }) {
    const connectFns = useConnectFns();
    const onClickProtocol = (protocol) => {
        close();
        const connectFn = connectFns[protocol];
        if (connectFn)
            connectFn();
    };
    const includesProtocol = (protocol) => !protocols || protocols.includes(protocol);
    return (React.createElement(Modal, { isOpen: isOpen, close: close, panelClassname: "htw-max-w-sm htw-p-4" },
        React.createElement("div", { className: "htw-flex htw-flex-col htw-space-y-2.5 htw-pb-2 htw-pt-4" },
            includesProtocol(ProtocolType.Ethereum) && (React.createElement(ProtocolButton, { protocol: ProtocolType.Ethereum, onClick: onClickProtocol, subTitle: "an EVM" }, "Ethereum")),
            includesProtocol(ProtocolType.Sealevel) && (React.createElement(ProtocolButton, { protocol: ProtocolType.Sealevel, onClick: onClickProtocol, subTitle: "a Solana" }, "Solana")),
            includesProtocol(ProtocolType.Cosmos) && (React.createElement(ProtocolButton, { protocol: ProtocolType.Cosmos, onClick: onClickProtocol, subTitle: "an Cosmos" }, "Cosmos")))));
}
function ProtocolButton({ onClick, subTitle, protocol, children, }) {
    const Logo = PROTOCOL_TO_LOGO[protocol];
    return (React.createElement("button", { onClick: () => onClick(protocol), className: "htw-flex htw-w-full htw-flex-col htw-items-center htw-space-y-2.5 htw-rounded-lg htw-border htw-border-gray-200 htw-py-3.5 htw-transition-all hover:htw-bg-gray-100 active:htw-scale-95" },
        React.createElement(Logo, { width: 34, height: 34 }),
        React.createElement("div", { className: "htw-tracking-wide htw-text-gray-800" }, children),
        React.createElement("div", { className: "htw-text-sm htw-text-gray-500" }, `Connect to ${subTitle} compatible wallet`)));
}
//# sourceMappingURL=MultiProtocolWalletModal.js.map