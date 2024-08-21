import React, { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  }

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

  if (!isOpen) return null;

  const modalRoot = document.getElementById('portal-root');

  if (!modalRoot) return null;

  return createPortal(
    <div
      // onClick={onClose}
      className="fixed inset-0 z-50 bg-black bg-opacity-50"
    >
      <div
        className="relative flex items-center justify-center py-6 px-12 rounded shadow-lg"
        role="dialog"
        aria-modal="true"
      >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-transparent rounded-full px-2 active:outline-none border-gray-600 border-solid text-gray-600 hover:text-primary"
            aria-label="Close Modal"
          >X
            {/* <CrossIcon
              className={` w-[30px] h-[30px] lg:w-[38px] lg:h-[42px] stroke-textColor
                         transition duration-300 hover:stroke-accentColor`}
            /> */}
          </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
