import { MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import React, { ComponentProps, ReactNode } from 'react';
export type DropdownMenuProps = {
    button: ReactNode;
    buttonClassname?: string;
    buttonProps?: ComponentProps<typeof MenuButton>;
    menuClassname?: string;
    menuProps?: ComponentProps<typeof MenuItems>;
    menuItems: Array<ComponentProps<typeof MenuItem>['children']>;
};
export declare function DropdownMenu({ button, buttonClassname, buttonProps, menuClassname, menuProps, menuItems, }: DropdownMenuProps): React.JSX.Element;
//# sourceMappingURL=DropdownMenu.d.ts.map