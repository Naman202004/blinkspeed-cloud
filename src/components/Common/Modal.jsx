import React from 'react';
import { X, AlertCircle } from 'lucide-react';

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  icon: Icon = AlertCircle,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[1000] transition-opacity"
        style={{ backgroundColor: 'rgba(42, 0, 122, 0.5)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
        <div
          className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
              <Icon size={28} className="text-gray-600" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
            {title}
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-600 text-center mb-6 leading-relaxed">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            {secondaryButtonText && (
              <button
                onClick={onSecondaryClick || onClose}
                className="flex-1 border border-purple-600 text-purple-600 font-medium py-2.5 px-4 rounded-md hover:bg-purple-50 transition-colors"
              >
                {secondaryButtonText}
              </button>
            )}
            {primaryButtonText && (
              <button
                onClick={onPrimaryClick}
                className="flex-1 bg-purple-600 text-white font-medium py-2.5 px-4 rounded-md hover:bg-purple-700 transition-colors"
              >
                {primaryButtonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
