'use client';
import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Notification = ({ type = 'success', message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      case 'info':
        return <Info className="h-6 w-6 text-blue-500" />;
      default:
        return <CheckCircle className="h-6 w-6 text-green-500" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'border-green-500 bg-green-50';
      case 'error':
        return 'border-red-500 bg-red-50';
      case 'info':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-green-500 bg-green-50';
    }
  };

  return (
    <div
      className={`animate-in slide-in-from-top-5 fixed top-4 right-4 z-500 flex max-w-md min-w-[320px] items-start gap-3 rounded-lg border-l-4 p-4 shadow-lg backdrop-blur-sm ${getStyles()}`}
      role="alert"
    >
      <div className="shrink-0">{getIcon()}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 rounded-lg p-1 transition-colors hover:bg-gray-200/50"
          aria-label="Close notification"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      )}
    </div>
  );
};

export default Notification;
