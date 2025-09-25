import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Users, GraduationCap, Plus, Calendar, Bell, BarChart3 } from 'lucide-react';
import CollegeStats from './CollegeStats';
import StudentManagement from './StudentManagement';
import TeacherManagement from './TeacherManagement';
import CreateUser from './CreateUser';
import Timetable from '../shared/Timetable';
import NotificationPanel from '../shared/NotificationPanel';
import DailyAttendanceChart from './DailyAttendanceChart';
import { teacherTimetable } from '../../data/timetable'; // Admins can see a generic timetable

const AdminDashboard = ({ user, onLogout, notifications, setNotifications, showNotificationPanel, setShowNotificationPanel }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const unreadCount = notifications.filter(n => !n.read).length;

  const renderView = () => {
    switch (currentView) {
      case 'students':
        return <StudentManagement onBack={() => setCurrentView('dashboard')} />;
      case 'teachers':
        return <TeacherManagement onBack={() => setCurrentView('dashboard')} />;
      case 'create-student':
        return <CreateUser onBack={() => setCurrentView('students')} userType="student" />;
      case 'create-teacher':
        return <CreateUser onBack={() => setCurrentView('teachers')} userType="teacher" />;
      case 'timetable':
        return (
            <div className="max-w-7xl mx-auto">
                <button onClick={() => setCurrentView('dashboard')} className="mb-4 text-blue-600 flex items-center space-x-2">
                    <LogOut className="transform rotate-180"/>
                    <span>Back to Dashboard</span>
                </button>
                <Timetable schedule={teacherTimetable} userRole="admin" />
            </div>
        );
      default:
        return (
          <div className="max-w-7xl mx-auto">
            <CollegeStats />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-3"
              >
                <DailyAttendanceChart />
              </motion.div>
              <div className="lg:col-span-2 space-y-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setCurrentView('students')} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition-all flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center"><Users className="h-6 w-6 text-white" /></div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Manage Students</h3>
                      <p className="text-sm text-gray-600">View and manage student records</p>
                    </div>
                </motion.div>
                 <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => setCurrentView('teachers')} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition-all flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center"><GraduationCap className="h-6 w-6 text-white" /></div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Manage Teachers</h3>
                      <p className="text-sm text-gray-600">View and manage teacher records</p>
                    </div>
                </motion.div>
                 <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setCurrentView('create-student')} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition-all flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center"><Plus className="h-6 w-6 text-white" /></div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Add New Student</h3>
                      <p className="text-sm text-gray-600">Create a new student profile</p>
                    </div>
                </motion.div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-lg">A</span></div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Admin Portal</h2>
              <p className="text-sm text-gray-600">Welcome, {user.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
             <button
                onClick={() => setCurrentView('timetable')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <Calendar className="h-5 w-5" />
                <span>Master Timetable</span>
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
                  onClear={() => setNotifications(notifications.map(n => ({...n, read: true})))}
                  onClearAll={() => setNotifications([])}
                />
              )}
            </div>
            <button onClick={onLogout} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.div>
      <div className="container mx-auto px-4 py-6">{renderView()}</div>
    </div>
  );
};

export default AdminDashboard;
