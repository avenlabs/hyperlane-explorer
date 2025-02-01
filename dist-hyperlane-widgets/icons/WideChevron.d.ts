import React from 'react';
import { DefaultIconProps } from './types.js';
export type WideChevronProps = DefaultIconProps & {
    direction: 'n' | 'e' | 's' | 'w';
    rounded?: boolean;
};
declare function _WideChevron({ width, height, direction, color, rounded, className, ...rest }: WideChevronProps): React.JSX.Element;
export declare const WideChevronIcon: React.MemoExoticComponent<typeof _WideChevron>;
export {};
//# sourceMappingURL=WideChevron.d.ts.map