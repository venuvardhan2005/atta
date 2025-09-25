import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Calendar, Bell } from 'lucide-react';
import Dashboard from '../Dashboard';
import QRCodeScanner from '../QRCodeScanner';
import FaceRecognition from '../FaceRecognition';
import BluetoothDetection from '../BluetoothDetection';
import AttendanceMethod from '../AttendanceMethod';
import Timetable from '../shared/Timetable';
import NotificationPanel from '../shared/NotificationPanel';
import { teacherTimetable } from '../../data/timetable';

const TeacherDashboard = ({ user, onLogout, notifications, setNotifications, showNotificationPanel, setShowNotificationPanel }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onMethodSelect={setCurrentView} userRole="teacher" />;
      case 'qr':
        return <QRCodeScanner onBack={() => setCurrentView('dashboard')} />;
      case 'face':
        return <FaceRecognition onBack={() => setCurrentView('dashboard')} />;
      case 'bluetooth':
        return <BluetoothDetection onBack={() => setCurrentView('dashboard')} />;
      case 'methods':
        return <AttendanceMethod onBack={() => setCurrentView('dashboard')} onMethodSelect={setCurrentView} />;
      case 'timetable':
        return (
            <div className="max-w-7xl mx-auto">
                <button onClick={() => setCurrentView('dashboard')} className="mb-4 text-blue-600 flex items-center space-x-2">
                    <LogOut className="transform rotate-180"/>
                    <span>Back to Dashboard</span>
                </button>
                <Timetable schedule={teacherTimetable} userRole="teacher" />
            </div>
        );
      default:
        return <Dashboard onMethodSelect={setCurrentView} userRole="teacher" />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Teacher Portal</h2>
              <p className="text-sm text-gray-600">Welcome, {user.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
                onClick={() => setCurrentView('timetable')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <Calendar className="h-5 w-5" />
                <span>Timetable</span>
            </button>
            <div className="relative">
              <button
                onClick={() => setShowNotificationPanel(prev => !prev)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotificationPanel && (
                <NotificationPanel 
                  notifications={notifications} 
                  onClose={() => setShowNotificationPanel(false)}
                  onClear={() => setNotifications([])}
                />
              )}
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {renderView()}
      </div>
    </div>
  );
};

export default TeacherDashboard;
