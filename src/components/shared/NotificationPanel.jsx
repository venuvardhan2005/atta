import React from 'react';
import { motion } from 'framer-motion';
import { Bell, X, Trash2, MailOpen } from 'lucide-react';

const NotificationPanel = ({ notifications, onClose, onClear, onClearAll }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
    >
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Notifications</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <div key={notification.id} className={`p-4 border-b border-gray-100 ${notification.read ? 'opacity-60' : 'hover:bg-gray-50'}`}>
              <p className="font-semibold text-sm text-gray-800">{notification.title}</p>
              <p className="text-sm text-gray-600">{notification.message}</p>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <Bell className="h-10 w-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No new notifications</p>
          </div>
        )}
      </div>
      {notifications.length > 0 && (
        <div className="p-2 bg-gray-50 border-t border-gray-100 grid grid-cols-2 gap-2">
          <button
            onClick={onClear}
            className="w-full flex items-center justify-center space-x-2 text-sm text-blue-600 hover:bg-blue-100 p-2 rounded-lg transition-colors"
          >
            <MailOpen className="h-4 w-4" />
            <span>Mark All Read</span>
          </button>
          <button
            onClick={onClearAll}
            className="w-full flex items-center justify-center space-x-2 text-sm text-red-600 hover:bg-red-100 p-2 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear All</span>
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default NotificationPanel;
