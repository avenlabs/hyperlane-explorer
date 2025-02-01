import React, { memo } from 'react';
import { ColorPalette } from '../color.js';
function _RefreshIcon({ color, ...rest }) {
    return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 -960 960 960", ...rest },
        React.createElement("path", { d: "M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z", fill: color || ColorPalette.Black })));
}
export const RefreshIcon = memo(_RefreshIcon);
//# sourceMappingURL=Refresh.js.map