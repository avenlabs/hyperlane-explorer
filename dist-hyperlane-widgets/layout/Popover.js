import { PopoverButton, PopoverPanel, Popover as _Popover, } from '@headlessui/react';
import { clsx } from 'clsx';
import React from 'react';
export function Popover({ button, buttonClassname, buttonProps, panelClassname, panelProps, children, }) {
    return (React.createElement(_Popover, null,
        React.createElement(PopoverButton, { className: clsx('htw-focus:outline-none', buttonClassname), ...buttonProps }, button),
        React.createElement(PopoverPanel, { transition: true, anchor: "bottom", className: clsx('htw-rounded htw-bg-white htw-border htw-border-gray-100 htw-shadow-md htw-drop-shadow-md htw-backdrop-blur htw-transition htw-duration-200 htw-ease-in-out htw-focus:outline-none [--anchor-gap:var(--spacing-5)] data-[closed]:htw--translate-y-1 data-[closed]:htw-opacity-0 htw-z-30', panelClassname), ...panelProps }, children)));
}
//# sourceMappingURL=Popover.js.map