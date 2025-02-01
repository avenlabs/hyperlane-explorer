import React, { forwardRef } from 'react';
export function _TextInput({ onChange, className, ...props }, ref) {
    const handleChange = (e) => {
        if (onChange)
            onChange(e?.target?.value || '');
    };
    return (React.createElement("input", { ref: ref, type: "text", autoComplete: "off", onChange: handleChange, className: `htw-bg-gray-100 focus:htw-bg-gray-200 disabled:htw-bg-gray-500 htw-outline-none focus:htw-outline-none htw-transition-all htw-duration-300 ${className}`, ...props }));
}
export const TextInput = forwardRef(_TextInput);
//# sourceMappingURL=TextInput.js.map