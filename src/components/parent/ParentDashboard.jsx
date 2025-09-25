import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Shield, User, BarChart2, Calendar, Bell, MessageSquare } from 'lucide-react';
import { mockUsers } from '../../data/users';
import { studentTimetable } from '../../data/timetable';
import { studentAttendance } from '../../data/attendance';
import Timetable from '../shared/Timetable';
import AttendanceBreakdown from '../shared/AttendanceBreakdown';
import NotificationPanel from '../shared/NotificationPanel';

const ParentDashboard = ({ user, onLogout, notifications, setNotifications, showNotificationPanel, setShowNotificationPanel }) => {
  // Find the child's data using the childStudentId from the parent's user object
  const child = mockUsers.find(u => u.role === 'student' && u.studentId === user.childStudentId);

  if (!child) {
    return (
      <div className="min-h-screen">
        <Header 
          user={user} 
          onLogout={onLogout}
          notifications={notifications}
          setNotifications={setNotifications}
          showNotificationPanel={showNotificationPanel}
          setShowNotificationPanel={setShowNotificationPanel}
        />
        <div className="container mx-auto px-4 py-6 text-center">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="text-gray-600 mt-2">Could not find student with ID: {user.childStudentId}. Please contact administration.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header 
        user={user} 
        onLogout={onLogout}
        notifications={notifications}
        setNotifications={setNotifications}
        showNotificationPanel={showNotificationPanel}
        setShowNotificationPanel={setShowNotificationPanel}
      />
      <div className="container mx-auto px-4 py-6">
        <ChildOverview child={child} />
      </div>
    </div>
  );
};

const Header = ({ user, onLogout, notifications, setNotifications, showNotificationPanel, setShowNotificationPanel }) => {
  const unreadCount = notifications.filter(n => !n.read).length;
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Parent Portal</h2>
            <p className="text-sm text-gray-600">Welcome, {user.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
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
                onClear={() => setNotifications(notifications.map(n => ({...n, read: true})))}
                onClearAll={() => setNotifications([])}
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
  );
};

const ChildOverview = ({ child }) => (
  <div className="max-w-7xl mx-auto">
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between"
    >
      <div className="flex items-center space-x-6">
        <User className="h-16 w-16 text-blue-500" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Monitoring: {child.name}</h1>
          <p className="text-gray-600">Student ID: {child.studentId} • Department: {child.department}</p>
        </div>
      </div>
      <button
        onClick={() => alert(`Sending a message to ${child.name}'s teachers...`)}
        className="mt-4 md:mt-0 flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        <MessageSquare className="h-5 w-5" />
        <span>Contact Teachers</span>
      </button>
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="lg:col-span-1"
      >
        <AttendanceBreakdown attendanceData={studentAttendance} />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="lg:col-span-2"
      >
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Weekly Timetable</h2>
            <Calendar className="h-6 w-6 text-purple-500" />
          </div>
          <Timetable schedule={studentTimetable} userRole="parent" />
        </div>
      </motion.div>
    </div>
  </div>
);

export default ParentDashboard;
