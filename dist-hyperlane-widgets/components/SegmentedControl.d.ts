import React from 'react';
interface SegmentedControlProps<O extends string> {
    options: O[];
    onChange: (selected: O | undefined) => void;
    allowEmpty?: boolean;
}
export declare function SegmentedControl<O extends string>({ options, onChange, allowEmpty, }: SegmentedControlProps<O>): React.JSX.Element;
export {};
//# sourceMappingURL=SegmentedControl.d.ts.map