import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { clsx } from 'clsx';
import React from 'react';
export function DropdownMenu({ button, buttonClassname, buttonProps, menuClassname, menuProps, menuItems, }) {
    return (React.createElement(Menu, null,
        React.createElement(MenuButton, { className: clsx('htw-focus:outline-none', buttonClassname), ...buttonProps }, button),
        React.createElement(MenuItems, { transition: true, anchor: "bottom", className: clsx('htw-rounded htw-bg-white htw-shadow-md htw-drop-shadow-md htw-backdrop-blur htw-transition htw-duration-200 htw-ease-in-out htw-focus:outline-none [--anchor-gap:var(--spacing-5)] data-[closed]:htw--translate-y-1 data-[closed]:htw-opacity-0 htw-cursor-pointer htw-z-30', menuClassname), ...menuProps }, menuItems.map((mi, i) => (React.createElement(MenuItem, { key: `menu-item-${i}` }, mi))))));
}
//# sourceMappingURL=DropdownMenu.js.map