import React, { Component, PropsWithChildren, ReactNode } from 'react';
type Props = PropsWithChildren<{
    supportLink?: ReactNode;
}>;
interface State {
    error: any;
    errorInfo: any;
}
export declare class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props);
    componentDidCatch(error: any, errorInfo: any): void;
    render(): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null | undefined;
}
export {};
//# sourceMappingURL=ErrorBoundary.d.ts.map