import React, { memo } from 'react';
import { ColorPalette } from '../color.js';
function _Spinner({ color, className, ...rest }) {
    return (React.createElement("svg", { className: `htw-animate-spin htw-text-black ${className}`, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", ...rest },
        React.createElement("circle", { className: "htw-opacity-25", stroke: color || ColorPalette.Black, strokeWidth: "4", cx: "12", cy: "12", r: "10" }),
        React.createElement("path", { className: "htw-opacity-75", fill: color || ColorPalette.Black, d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })));
}
export const SpinnerIcon = memo(_Spinner);
//# sourceMappingURL=Spinner.js.map