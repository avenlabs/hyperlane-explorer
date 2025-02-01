import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, } from '@headlessui/react';
import { clsx } from 'clsx';
import React, { useState } from 'react';
import { IconButton } from '../components/IconButton.js';
import { XCircleIcon } from '../icons/XCircle.js';
export function useModal() {
    const [isOpen, setIsOpen] = useState(false);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    return { isOpen, open, close };
}
export function Modal({ isOpen, close, dialogClassname, dialogProps, panelClassname, panelProps, showCloseButton, title, children, }) {
    return (React.createElement(Dialog, { open: isOpen, as: "div", className: clsx('htw-z-20 htw-focus:outline-none', dialogClassname), onClose: close, ...dialogProps },
        React.createElement(DialogBackdrop, { className: "htw-fixed htw-inset-0 htw-bg-black/25 htw-transition-all htw-duration-200" }),
        React.createElement("div", { className: "htw-fixed htw-inset-0 htw-z-20 htw-w-screen htw-overflow-y-auto" },
            React.createElement("div", { className: "htw-flex htw-min-h-full htw-items-center htw-justify-center htw-p-4" },
                React.createElement(DialogPanel, { transition: true, className: clsx('htw-w-full htw-max-w-sm htw-max-h-[90vh] htw-relative htw-rounded-lg htw-shadow htw-overflow-auto no-scrollbar htw-bg-white htw-duration-200 htw-ease-out data-[closed]:htw-transform-[scale(95%)] data-[closed]:htw-opacity-0 data-[closed]:htw--translate-y-1', panelClassname), ...panelProps },
                    title && (React.createElement(DialogTitle, { as: "h3", className: "htw-text-gray-700" }, title)),
                    children,
                    showCloseButton && (React.createElement("div", { className: "htw-absolute htw-right-3 htw-top-3" },
                        React.createElement(IconButton, { onClick: close, title: "Close", className: "hover:htw-rotate-90" },
                            React.createElement(XCircleIcon, { height: 16, width: 16 })))))))));
}
//# sourceMappingURL=Modal.js.map