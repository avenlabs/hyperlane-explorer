import React, { memo } from 'react';
import { ColorPalette } from '../color.js';
function _PlusIcon({ color, ...rest }) {
    return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", ...rest },
        React.createElement("path", { d: "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4", fill: color || ColorPalette.Black })));
}
export const PlusIcon = memo(_PlusIcon);
//# sourceMappingURL=Plus.js.map