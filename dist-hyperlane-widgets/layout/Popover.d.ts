import { PopoverButton, PopoverPanel } from '@headlessui/react';
import React, { ComponentProps, ReactNode } from 'react';
export type PopoverProps = {
    button: ReactNode;
    buttonClassname?: string;
    buttonProps?: ComponentProps<typeof PopoverButton>;
    panelClassname?: string;
    panelProps?: ComponentProps<typeof PopoverPanel>;
    children: ComponentProps<typeof PopoverPanel>['children'];
};
export declare function Popover({ button, buttonClassname, buttonProps, panelClassname, panelProps, children, }: PopoverProps): React.JSX.Element;
//# sourceMappingURL=Popover.d.ts.map