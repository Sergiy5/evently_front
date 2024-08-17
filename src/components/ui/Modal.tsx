import { useEffect } from 'react';
import { createPortal } from 'react-dom';

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
export const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  /**
   * Sets the overflow style of the body to hidden when the modal is open,
   * and unset when it is closed.
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  /**
   * Adds and removes the keydown event listener for the Escape key.
   * Calls the onClose function when the Escape key is pressed.
   */
  useEffect(() => {
    if (onClose) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
      } else {
        document.removeEventListener('keydown', handleKeyDown);
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  // Return null if the modal is not open
  if (!isOpen) return null;

  // Get the portal root element
  const portalRoot = document.getElementById('portal-root');

  // Return null if the portal root is not found
  if (!portalRoot) return null;

  // Create the portal and return it
  return createPortal(
    // The modal component
    <div
      // Close the modal when clicking outside
      onClick={onClose}
      // Add a transparent background to the modal
      className="fixed inset-0 z-50 bg-black bg-opacity-50"
    >
      <div
        className="relative flex items-center justify-center py-6 px-12 rounded shadow-lg"
        role="dialog"
        aria-modal="true"
      >
        {onClose && (
          // Close button
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-textColor hover:text-accentColor"
            aria-label="Close Modal"
          >
            X
            {/* <CrossIcon
              className={` w-[30px] h-[30px] lg:w-[38px] lg:h-[42px] stroke-textColor
              /> */}
          </button>
        )}
        {children}
      </div>
    </div>,
    portalRoot
  );
};
