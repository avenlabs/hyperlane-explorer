import { clsx } from 'clsx';
import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { Circle } from '../icons/Circle.js';
import { QuestionMarkIcon } from '../icons/QuestionMark.js';
export function Tooltip({ id, content, className, placement = 'top-start', size = 16, tooltipClassName, ...rest }) {
    return (React.createElement(React.Fragment, null,
        React.createElement("a", { className: `hover:htw-scale-105 hover:htw-opacity-70 ${className}`, "data-tooltip-place": placement, "data-tooltip-id": id, "data-tooltip-html": content, "data-tooltip-class-name": clsx('htw-max-w-[calc(100%-10px)] sm:htw-max-w-[526px]', tooltipClassName), ...rest },
            React.createElement(Circle, { size: size, className: "htw-bg-gray-200 htw-border-gray-300" },
                React.createElement(QuestionMarkIcon, { width: size - 2, height: size - 2, className: "htw-opacity-60" }))),
        React.createElement(ReactTooltip, { id: id })));
}
//# sourceMappingURL=Tooltip.js.map