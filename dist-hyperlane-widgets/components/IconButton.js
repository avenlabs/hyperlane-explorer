import { clsx } from 'clsx';
import React from 'react';
export function IconButton(props) {
    const { className, children, type, ...rest } = props;
    const base = 'htw-flex htw-items-center htw-justify-center htw-transition-all';
    const onHover = 'hover:htw-opacity-70';
    const onDisabled = 'disabled:htw-opacity-30 disabled:htw-cursor-default';
    const onActive = 'active:htw-opacity-60';
    const allClasses = clsx(base, onHover, onDisabled, onActive, className);
    return (React.createElement("button", { type: type || 'button', className: allClasses, ...rest }, children));
}
//# sourceMappingURL=IconButton.js.map