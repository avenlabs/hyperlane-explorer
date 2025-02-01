import { Dialog, DialogPanel } from '@headlessui/react';
import React, { ComponentProps, PropsWithChildren } from 'react';
export declare function useModal(): {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};
export type ModalProps = PropsWithChildren<{
    isOpen: boolean;
    close: () => void;
    dialogClassname?: string;
    dialogProps?: ComponentProps<typeof Dialog>;
    panelClassname?: string;
    panelProps?: ComponentProps<typeof DialogPanel>;
    showCloseButton?: boolean;
    title?: string;
}>;
export declare function Modal({ isOpen, close, dialogClassname, dialogProps, panelClassname, panelProps, showCloseButton, title, children, }: ModalProps): React.JSX.Element;
//# sourceMappingURL=Modal.d.ts.map