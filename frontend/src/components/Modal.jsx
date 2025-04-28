import React from 'react';

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  hideHeader = false,
  ShowActionBtn = false,
  actionBtnIcon = null,
  actionBtnText = 'Action',
  onActionClick = () => {},
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40">
      {/* Modal Content */}
      <div className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden w-11/12 max-w-lg">
        {/* Modal Header */}
        {!hideHeader && (
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
          
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
              onClick={onClose}
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0l6-6m-6 6l6 6m-6-6l-6 6"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Modal Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">{children}</div>

        {/* Modal Footer (Action Button) */}
        {ShowActionBtn && (
          <div className="flex justify-end p-4 border-t border-gray-200">
            <button
              onClick={onActionClick}
              className="btn-small-light flex items-center gap-2 text-purple-700 hover:text-purple-900"
            >
              {actionBtnIcon && <span>{actionBtnIcon}</span>}
              {actionBtnText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
