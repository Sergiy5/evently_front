import React, { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { RxCross2 } from 'react-icons/rx';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {


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
    <div className="fixed flex items-center justify-center inset-0 z-50 bg-black bg-opacity-50">
      <div
        className="relative rounded shadow-lg"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute z-10 top-3 right-4 translate-y-3 px-2 active:outline-none bg-transparent text-black hover:text-primary"
          aria-label="Close Modal"
        >
          <RxCross2 className="w-8 h-8" />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
