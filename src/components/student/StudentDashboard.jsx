import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, QrCode, Calendar, BookOpen, Bell, Flame } from 'lucide-react';
import QRScanner from './QRScanner';
import AttendanceHistory from './AttendanceHistory';
import Timetable from '../shared/Timetable';
import AttendanceBreakdown from '../shared/AttendanceBreakdown';
import NotificationPanel from '../shared/NotificationPanel';
import QuizModal from '../shared/QuizModal';
import { studentTimetable } from '../../data/timetable';
import { studentAttendance } from '../../data/attendance';
import { quizQuestions } from '../../data/quiz';

const StudentDashboard = ({ user, onLogout, notifications, setNotifications, showNotificationPanel, setShowNotificationPanel }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isQuizVisible, setIsQuizVisible] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);

  const handleQuizClick = () => {
    const randomQuiz = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
    setCurrentQuiz(randomQuiz);
    setIsQuizVisible(true);
  };
  
  const renderView = () => {
    switch (currentView) {
      case 'scanner':
        return <QRScanner onBack={() => setCurrentView('dashboard')} user={user} />;
      case 'history':
        return <AttendanceHistory onBack={() => setCurrentView('dashboard')} user={user} />;
      case 'timetable':
        return (
            <div className="max-w-7xl mx-auto">
                <button onClick={() => setCurrentView('dashboard')} className="mb-4 text-blue-600 flex items-center space-x-2">
                  <LogOut className="transform rotate-180"/>
                  <span>Back to Dashboard</span>
                </button>
                <Timetable schedule={studentTimetable} userRole="student" onQuizClick={handleQuizClick} />
            </div>
        );
      default:
        return (
          <div className="max-w-7xl mx-auto">
            {/* Quick Actions & Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              <ActionCard icon={QrCode} title="Scan QR Code" description="Mark class attendance" onClick={() => setCurrentView('scanner')} color="blue" />
              <ActionCard icon={Calendar} title="View Timetable" description="Check your weekly schedule" onClick={() => setCurrentView('timetable')} color="purple" />
              <ActionCard icon={BookOpen} title="View History" description="Review attendance records" onClick={() => setCurrentView('history')} color="green" />
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex flex-col justify-center items-center text-center">
                 <p className="text-sm font-medium text-gray-600">Overall Attendance</p>
                 <p className="text-4xl font-bold text-indigo-600 my-2">89%</p>
                 <div className="flex items-center space-x-2 text-orange-500">
                    <Flame className="h-5 w-5" />
                    <span className="font-semibold">12-Day Streak!</span>
                 </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Attendance Breakdown */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-1"
                >
                    <AttendanceBreakdown attendanceData={studentAttendance} />
                </motion.div>

                {/* Timetable Preview */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2"
                >
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Today's Schedule</h2>
                        <Timetable schedule={studentTimetable} userRole="student" isPreview={true} onQuizClick={handleQuizClick} />
                    </div>
                </motion.div>
            </div>
          </div>
        );
    }
  };

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
      <QuizModal
        isOpen={isQuizVisible}
        onClose={() => setIsQuizVisible(false)}
        quiz={currentQuiz}
      />
      <div className="container mx-auto px-4 py-6">
        {renderView()}
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
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Student Portal</h2>
            <p className="text-sm text-gray-600">Welcome, {user.name} • ID: {user.studentId}</p>
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

const ActionCard = ({ icon: Icon, title, description, onClick, color }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all"
  >
    <div className={`w-12 h-12 bg-${color}-500 rounded-lg flex items-center justify-center mb-4`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </motion.div>
);

export default StudentDashboard;
