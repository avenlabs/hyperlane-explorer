import { clsx } from 'clsx';
import React from 'react';
export function LinkButton(props) {
    const { className, children, ...rest } = props;
    const base = 'htw-flex htw-items-center htw-justify-center htw-transition-all';
    const onHover = 'hover:htw-underline htw-underline-offset-2';
    const onDisabled = 'disabled:htw-opacity-30 disabled:htw-cursor-default';
    const onActive = 'active:htw-opacity-70';
    const allClasses = clsx(base, onHover, onDisabled, onActive, className);
    return (React.createElement("button", { type: "button", className: allClasses, ...rest }, children));
}
//# sourceMappingURL=LinkButton.js.map