import React, { InputHTMLAttributes } from 'react';
export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
    onChange?: (v: string) => void;
    className?: string;
};
export declare function _TextInput({ onChange, className, ...props }: InputProps, ref: React.Ref<HTMLInputElement>): React.JSX.Element;
export declare const TextInput: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
    onChange?: ((v: string) => void) | undefined;
    className?: string | undefined;
} & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=TextInput.d.ts.map