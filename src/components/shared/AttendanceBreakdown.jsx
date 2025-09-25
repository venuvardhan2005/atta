import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, CheckCircle, Target } from 'lucide-react';

const AttendanceBreakdown = ({ attendanceData }) => {
  const { mandatoryClasses, attendedClasses, subjects } = attendanceData;
  const mandatoryPercentage = (attendedClasses / mandatoryClasses) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Attendance Breakdown</h2>
        <BarChart2 className="h-6 w-6 text-purple-500" />
      </div>

      {/* Mandatory Attendance */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-gray-600"/>
                <h3 className="text-md font-semibold text-gray-800">Mandatory Attendance</h3>
            </div>
            <span className="font-bold text-gray-800">{attendedClasses}/{mandatoryClasses}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-green-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${mandatoryPercentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">{Math.round(mandatoryPercentage)}% complete</p>
      </div>

      {/* Subject-wise Breakdown */}
      <div>
        <h3 className="text-md font-semibold text-gray-800 mb-3">By Subject</h3>
        <div className="space-y-4">
          {subjects.map((subject, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-gray-700">{subject.name}</p>
                <p className={`text-sm font-bold ${subject.percentage < 85 ? 'text-red-500' : 'text-gray-800'}`}>
                  {subject.percentage}%
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className={`${subject.color} h-2 rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${subject.percentage}%` }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceBreakdown;
