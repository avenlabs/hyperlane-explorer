import React, { memo } from 'react';
import { ColorPalette } from '../color.js';
function _ChevronIcon({ color, className, direction, ...rest }) {
    let directionClass;
    switch (direction) {
        case 'n':
            directionClass = 'htw-rotate-180';
            break;
        case 'e':
            directionClass = '-htw-rotate-90';
            break;
        case 's':
            directionClass = '';
            break;
        case 'w':
            directionClass = 'htw-rotate-90';
            break;
        default:
            throw new Error(`Invalid direction ${direction}`);
    }
    return (React.createElement("svg", { width: "4", height: "6", viewBox: "0 0 16 9", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: `${directionClass} ${className}`, ...rest },
        React.createElement("path", { d: "M15.1 1.4 13.8.1 8 5.9 2.2.2 1 1.6l7.2 7 7-7.2Z", fill: color || ColorPalette.Black })));
}
export const ChevronIcon = memo(_ChevronIcon);
//# sourceMappingURL=Chevron.js.map