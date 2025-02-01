import React from 'react';
import { DefaultIconProps } from './types.js';
type Props = DefaultIconProps & {
    direction: 'n' | 'e' | 's' | 'w';
};
declare function _ArrowIcon({ color, className, direction, ...rest }: Props): React.JSX.Element;
export declare const ArrowIcon: React.MemoExoticComponent<typeof _ArrowIcon>;
export {};
//# sourceMappingURL=Arrow.d.ts.map