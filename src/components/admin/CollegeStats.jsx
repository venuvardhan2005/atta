import React from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Building, TrendingUp, Calendar, BarChart3 } from 'lucide-react';

const CollegeStats = () => {
  const stats = {
    totalStudents: 2847,
    totalTeachers: 156,
    departments: 12,
    attendanceRate: 87.3,
    activeClasses: 45,
    campusBuildings: 8
  };

  const departmentData = [
    { name: 'Computer Science', students: 524, teachers: 28, growth: '+12%' },
    { name: 'Mathematics', students: 387, teachers: 22, growth: '+8%' },
    { name: 'Physics', students: 342, teachers: 19, growth: '+5%' },
    { name: 'Chemistry', students: 298, teachers: 18, growth: '+15%' },
    { name: 'Biology', students: 276, teachers: 16, growth: '+10%' },
    { name: 'English', students: 234, teachers: 14, growth: '+3%' }
  ];

  return (
    <div>
      {/* Main Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8"
      >
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalStudents.toLocaleString()}</p>
            </div>
            <Users className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Teachers</p>
              <p className="text-3xl font-bold text-green-600">{stats.totalTeachers}</p>
            </div>
            <GraduationCap className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-3xl font-bold text-purple-600">{stats.departments}</p>
            </div>
            <Building className="h-12 w-12 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
              <p className="text-3xl font-bold text-orange-600">{stats.attendanceRate}%</p>
            </div>
            <BarChart3 className="h-12 w-12 text-orange-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Classes</p>
              <p className="text-3xl font-bold text-red-600">{stats.activeClasses}</p>
            </div>
            <Calendar className="h-12 w-12 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Campus Buildings</p>
              <p className="text-3xl font-bold text-indigo-600">{stats.campusBuildings}</p>
            </div>
            <Building className="h-12 w-12 text-indigo-500" />
          </div>
        </div>
      </motion.div>

      {/* Department Breakdown */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Department Overview</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departmentData.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                  <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {dept.growth}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Students</span>
                    <span className="font-medium text-gray-900">{dept.students}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Teachers</span>
                    <span className="font-medium text-gray-900">{dept.teachers}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CollegeStats;
