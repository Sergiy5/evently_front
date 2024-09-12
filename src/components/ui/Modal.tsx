import clsx from 'clsx';
import React, { useEffect, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { RxCross2 } from 'react-icons/rx';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsOpenModal(true);
      setTimeout(() => {
        document.body.style.overflow = 'hidden';
        
      }, 300 )
    } else {
      setIsOpenModal(false);
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
          setIsOpenModal(false);

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
      className={clsx(
        `fixed inset-0 flex items-center justify-center z-50 bg-black transition-all`,
        { 'bg-opacity-50': isOpenModal },
        { 'bg-opacity-0': !isOpenModal }
      )}
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className={clsx(`relative rounded-[20px] shadow-lg bg-white transition-all `,
          {'scale-100': isOpenModal},
          {'scale-75': !isOpenModal},
        )}
        onClick={e => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 z-10 p-2 text-black bg-transparent hover:text-primary"
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

// import React, { useEffect, ReactNode } from 'react';
// import { createPortal } from 'react-dom';
// import { RxCross2 } from 'react-icons/rx';

// interface ModalProps {
//   children: ReactNode;
//   isOpen: boolean;
//   onClose?: () => void;
// }

// export const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   useEffect(() => {
//     if (onClose) {
//       const handleKeyDown = (e: KeyboardEvent) => {
//         if (e.key === 'Escape') {
//           onClose();
//         }
//       };
//       if (isOpen) {
//         document.addEventListener('keydown', handleKeyDown);
//       } else {
//         document.removeEventListener('keydown', handleKeyDown);
//       }

//       return () => {
//         document.removeEventListener('keydown', handleKeyDown);
//       };
//     }
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   const modalRoot = document.getElementById('portal-root');

//   if (!modalRoot) return null;

//   return createPortal(
//     <div className="fixed flex items-center justify-center inset-0 z-50 bg-black bg-opacity-50">
//       <div
//         className="relative rounded shadow-lg"
//         role="dialog"
//         aria-modal="true"
//       >
//         <button
//           onClick={onClose}
//           className="absolute z-10 top-3 right-4 translate-y-3 px-2 active:outline-none bg-transparent text-black hover:text-primary"
//           aria-label="Close Modal"
//         >
//           <RxCross2 className="w-8 h-8" />
//         </button>
//         {children}
//       </div>
//     </div>,
//     modalRoot
//   );
// };
