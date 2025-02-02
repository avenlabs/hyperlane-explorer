import React, { memo } from 'react';
import { ColorPalette } from '../color.js';
function _BoxArrowIcon({ color, ...rest }) {
    return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", ...rest },
        React.createElement("path", { fillRule: "evenodd", d: "M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5", fill: color || ColorPalette.Black }),
        React.createElement("path", { fillRule: "evenodd", d: "M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z", fill: color || ColorPalette.Black })));
}
export const BoxArrowIcon = memo(_BoxArrowIcon);
//# sourceMappingURL=BoxArrow.js.map