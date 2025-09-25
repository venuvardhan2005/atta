import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, CheckCircle, XCircle, Clock, Filter } from 'lucide-react';

const AttendanceHistory = ({ onBack, user }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedSubject, setSelectedSubject] = useState('all');

  const attendanceData = [
    { date: '2024-01-15', subject: 'Computer Science', status: 'present', time: '09:00 AM', teacher: 'Dr. Smith' },
    { date: '2024-01-15', subject: 'Mathematics', status: 'present', time: '11:00 AM', teacher: 'Prof. Johnson' },
    { date: '2024-01-15', subject: 'Physics', status: 'absent', time: '02:00 PM', teacher: 'Dr. Brown' },
    { date: '2024-01-14', subject: 'Computer Science', status: 'present', time: '09:00 AM', teacher: 'Dr. Smith' },
    { date: '2024-01-14', subject: 'Chemistry', status: 'present', time: '11:00 AM', teacher: 'Prof. Davis' },
    { date: '2024-01-13', subject: 'Mathematics', status: 'present', time: '11:00 AM', teacher: 'Prof. Johnson' },
    { date: '2024-01-13', subject: 'Physics', status: 'present', time: '02:00 PM', teacher: 'Dr. Brown' },
    { date: '2024-01-12', subject: 'Computer Science', status: 'late', time: '09:15 AM', teacher: 'Dr. Smith' },
  ];

  const subjects = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const filteredData = attendanceData.filter(record => {
    const recordDate = new Date(record.date);
    const monthMatch = recordDate.getMonth() === selectedMonth;
    const subjectMatch = selectedSubject === 'all' || record.subject === selectedSubject;
    return monthMatch && subjectMatch;
  });

  const getAttendanceStats = () => {
    const total = filteredData.length;
    const present = filteredData.filter(r => r.status === 'present').length;
    const late = filteredData.filter(r => r.status === 'late').length;
    const absent = filteredData.filter(r => r.status === 'absent').length;
    
    return {
      total,
      present,
      late,
      absent,
      percentage: total > 0 ? Math.round(((present + late) / total) * 100) : 0
    };
  };

  const stats = getAttendanceStats();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center mb-8"
      >
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mr-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance History</h1>
          <p className="text-gray-600">Track your attendance record and statistics</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8"
      >
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">Total Classes</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">Present</p>
            <p className="text-2xl font-bold text-green-600">{stats.present}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">Late</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">Absent</p>
            <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">Attendance %</p>
            <p className="text-2xl font-bold text-blue-600">{stats.percentage}%</p>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8"
      >
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <div className="flex items-center space-x-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>{month}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Attendance Records */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Attendance Records</h2>
        </div>
        <div className="p-6">
          {filteredData.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No attendance records found for the selected filters</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredData.map((record, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      record.status === 'present' ? 'bg-green-100' :
                      record.status === 'late' ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      {record.status === 'present' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : record.status === 'late' ? (
                        <Clock className="h-5 w-5 text-yellow-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{record.subject}</h3>
                      <p className="text-sm text-gray-600">{record.teacher} • {record.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(record.date).toLocaleDateString('en-US', { 
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record.status === 'present' ? 'bg-green-100 text-green-800' :
                      record.status === 'late' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AttendanceHistory;
