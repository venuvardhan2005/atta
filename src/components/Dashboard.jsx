import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp, 
  QrCode, 
  Camera, 
  Bluetooth,
  CheckCircle,
  XCircle,
  BarChart3,
  Bell,
  BookOpen
} from 'lucide-react';

const Dashboard = ({ onMethodSelect, userRole = 'teacher' }) => {
  const [selectedClass, setSelectedClass] = useState('Computer Science A');

  const attendanceStats = {
    totalStudents: 150,
    presentToday: 128,
    absentToday: 22,
    attendanceRate: 85.3
  };

  const recentClasses = [
    { name: 'Computer Science A', time: '09:00 AM', present: 45, total: 50, status: 'completed' },
    { name: 'Mathematics B', time: '11:00 AM', present: 38, total: 42, status: 'completed' },
    { name: 'Physics C', time: '02:00 PM', present: 35, total: 40, status: 'ongoing' },
    { name: 'Chemistry D', time: '04:00 PM', present: 0, total: 38, status: 'upcoming' }
  ];
  
  const nextClass = recentClasses.find(c => c.status === 'upcoming' || c.status === 'ongoing');

  const attendanceMethods = [
    {
      id: 'qr',
      name: 'QR Code Scan',
      description: 'Quick scanning with session-specific codes',
      icon: QrCode,
      color: 'bg-blue-500',
      time: '~30 seconds'
    },
    {
      id: 'face',
      name: 'Face Recognition',
      description: 'AI-powered facial detection system',
      icon: Camera,
      color: 'bg-green-500',
      time: '~45 seconds'
    },
    {
      id: 'bluetooth',
      name: 'Bluetooth Detection',
      description: 'Proximity-based automatic marking',
      icon: Bluetooth,
      color: 'bg-purple-500',
      time: '~15 seconds'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Teacher Dashboard</h1>
        <p className="text-gray-600">Manage attendance with smart tracking methods</p>
      </motion.div>

      {/* Stats and Next Class */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Next Class Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex flex-col justify-center"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="h-6 w-6 text-indigo-500" />
            <h3 className="text-lg font-bold text-gray-900">Next Class</h3>
          </div>
          {nextClass ? (
            <div>
              <p className="text-xl font-semibold text-indigo-600">{nextClass.name}</p>
              <p className="text-gray-600">at {nextClass.time}</p>
              <span className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  nextClass.status === 'ongoing' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {nextClass.status.charAt(0).toUpperCase() + nextClass.status.slice(1)}
              </span>
            </div>
          ) : (
             <div>
              <p className="text-lg font-semibold text-gray-700">No upcoming classes</p>
              <p className="text-sm text-gray-500">All classes for today are completed.</p>
            </div>
          )}
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Present Today</p>
                  <p className="text-3xl font-bold text-green-600">{attendanceStats.presentToday}</p>
                </div>
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Absent Today</p>
                <p className="text-3xl font-bold text-red-600">{attendanceStats.absentToday}</p>
              </div>
              <XCircle className="h-10 w-10 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                <p className="text-3xl font-bold text-blue-600">{attendanceStats.attendanceRate}%</p>
              </div>
              <TrendingUp className="h-10 w-10 text-blue-500" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Attendance Methods */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Attendance Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {attendanceMethods.map((method) => (
            <motion.div
              key={method.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer"
              onClick={() => onMethodSelect(method.id)}
            >
              <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center mb-4`}>
                <method.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.name}</h3>
              <p className="text-gray-600 mb-3">{method.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Setup time: {method.time}</span>
                <button className="text-blue-600 font-medium hover:text-blue-700">
                  Try Now →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Classes */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Today's Classes</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentClasses.map((classItem, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    classItem.status === 'completed' ? 'bg-green-500' :
                    classItem.status === 'ongoing' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{classItem.name}</h3>
                    <p className="text-sm text-gray-600">{classItem.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {classItem.present}/{classItem.total}
                    </p>
                    <p className="text-sm text-gray-600">
                      {classItem.total > 0 ? Math.round((classItem.present / classItem.total) * 100) : 0}% Present
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    classItem.status === 'completed' ? 'bg-green-100 text-green-800' :
                    classItem.status === 'ongoing' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
