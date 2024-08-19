interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
/**
 * Modal component that creates a portal and renders its children inside
 * if the isOpen prop is true. It also handles closing the modal when
 * the user clicks outside or presses the Escape key.
 *
 * @param {ModalProps} props - The props for the Modal component.
 * @returns {JSX.Element | null} - The Modal component or null if the portal root is not found.
 */
export declare const Modal: React.FC<ModalProps>;
export {};
