import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
    width?: number;
    height?: number;
    copyValue: string;
};
export declare function CopyButton({ width, height, copyValue, className, children, ...rest }: Props): React.JSX.Element;
export {};
//# sourceMappingURL=CopyButton.d.ts.map