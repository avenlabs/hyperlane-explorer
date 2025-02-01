import React from 'react';
import { seedToBgColor } from '../color.js';
export function Circle({ size, title, bgColorSeed, className, children, }) {
    const bgColor = bgColorSeed === null || bgColorSeed == undefined
        ? ''
        : seedToBgColor(bgColorSeed);
    return (React.createElement("div", { style: { width: `${size}px`, height: `${size}px` }, className: `htw-flex htw-items-center htw-justify-center htw-rounded-full htw-transition-all overflow-hidden ${bgColor} ${className}`, title: title }, children));
}
//# sourceMappingURL=Circle.js.map