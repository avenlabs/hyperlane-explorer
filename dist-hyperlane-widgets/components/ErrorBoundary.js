import React, { Component } from 'react';
import { errorToString } from '@hyperlane-xyz/utils';
import { ErrorIcon } from '../icons/Error.js';
import { widgetLogger } from '../logger.js';
export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }
    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo,
        });
        widgetLogger.error('Error caught by error boundary', error, errorInfo);
    }
    render() {
        const errorInfo = this.state.error || this.state.errorInfo;
        if (errorInfo) {
            const details = errorToString(errorInfo, 1000);
            return (React.createElement("div", { className: "htw-flex htw-h-screen htw-w-screen htw-items-center htw-justify-center htw-bg-gray-50" },
                React.createElement("div", { className: "htw-flex htw-flex-col htw-items-center htw-space-y-5" },
                    React.createElement(ErrorIcon, { width: 80, height: 80 }),
                    React.createElement("h1", { className: "htw-text-lg" }, "Fatal Error Occurred"),
                    React.createElement("div", { className: "htw-max-w-2xl htw-text-sm" }, details),
                    this.props.supportLink)));
        }
        return this.props.children;
    }
}
//# sourceMappingURL=ErrorBoundary.js.map