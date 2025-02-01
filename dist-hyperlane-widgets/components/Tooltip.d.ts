import React, { AnchorHTMLAttributes } from 'react';
import { PlacesType } from 'react-tooltip';
type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
    id: string;
    content: string;
    size?: number;
    placement?: PlacesType;
    tooltipClassName?: string;
};
export declare function Tooltip({ id, content, className, placement, size, tooltipClassName, ...rest }: Props): React.JSX.Element;
export {};
//# sourceMappingURL=Tooltip.d.ts.map