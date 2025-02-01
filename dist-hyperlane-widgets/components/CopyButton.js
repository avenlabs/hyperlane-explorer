import React, { useState, } from 'react';
import { CheckmarkIcon } from '../icons/Checkmark.js';
import { CopyIcon } from '../icons/Copy.js';
import { tryClipboardSet } from '../utils/clipboard.js';
export function CopyButton({ width, height, copyValue, className, children, ...rest }) {
    const [showCheckmark, setShowCheckmark] = useState(false);
    const onClick = async () => {
        const result = await tryClipboardSet(copyValue);
        if (result) {
            setShowCheckmark(true);
            setTimeout(() => setShowCheckmark(false), 2000);
        }
    };
    return (React.createElement("button", { onClick: onClick, type: "button", title: "Copy", className: `htw-flex htw-items-center htw-justify-center htw-gap-2 htw-transition-all ${className}`, ...rest },
        showCheckmark ? (React.createElement(CheckmarkIcon, { width: width, height: height })) : (React.createElement(CopyIcon, { width: width, height: height })),
        children));
}
//# sourceMappingURL=CopyButton.js.map