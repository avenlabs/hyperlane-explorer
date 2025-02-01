import React, { memo } from 'react';
import { ColorPalette } from '../color.js';
function _CheckmarkIcon({ color, ...rest }) {
    return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", ...rest },
        React.createElement("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z", fill: color || ColorPalette.Black })));
}
export const CheckmarkIcon = memo(_CheckmarkIcon);
//# sourceMappingURL=Checkmark.js.map