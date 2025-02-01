import React from 'react';
export type SelectOption = {
    display: string;
    value: string;
};
type Props = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
    options: Array<SelectOption>;
    value: string;
    onValueSelect: (value: string) => void;
    classes?: string;
};
export declare function SelectField({ options, value, onValueSelect, classes, ...passThruProps }: Props): React.JSX.Element;
export {};
//# sourceMappingURL=SelectField.d.ts.map