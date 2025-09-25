import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, QrCode, RefreshCw, Users, Clock, CheckCircle } from 'lucide-react';
import QRCode from 'qrcode';

const QRCodeScanner = ({ onBack }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [sessionActive, setSessionActive] = useState(false);
  const [attendanceList, setAttendanceList] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes

  const generateQRCode = async () => {
    const sessionId = `session_${Date.now()}`;
    const classCode = 'CS101_A';
    const qrData = JSON.stringify({
      sessionId,
      classCode,
      timestamp: Date.now(),
      expires: Date.now() + 120000 // 2 minutes
    });

    try {
      const url = await QRCode.toDataURL(qrData, {
        width: 300,
        color: {
          dark: '#1f2937',
          light: '#ffffff',
        }
      });
      setQrCodeUrl(url);
      setSessionActive(true);
      setTimeRemaining(120);
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  useEffect(() => {
    let interval;
    if (sessionActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setSessionActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionActive, timeRemaining]);

  // Simulate student check-ins
  useEffect(() => {
    if (sessionActive) {
      const students = [
        'John Smith', 'Emma Johnson', 'Michael Brown', 'Sarah Davis', 'James Wilson',
        'Lisa Anderson', 'David Miller', 'Jessica Taylor', 'Robert Garcia', 'Amanda Martinez'
      ];
      
      const interval = setInterval(() => {
        if (Math.random() > 0.7 && attendanceList.length < students.length) {
          const remainingStudents = students.filter(student => 
            !attendanceList.some(entry => entry.name === student)
          );
          if (remainingStudents.length > 0) {
            const randomStudent = remainingStudents[Math.floor(Math.random() * remainingStudents.length)];
            setAttendanceList(prev => [...prev, {
              name: randomStudent,
              time: new Date().toLocaleTimeString(),
              status: 'present'
            }]);
          }
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [sessionActive, attendanceList]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
          <h1 className="text-3xl font-bold text-gray-900">QR Code Attendance</h1>
          <p className="text-gray-600">Generate session-specific QR codes for quick attendance</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* QR Code Section */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-8"
        >
          <div className="text-center">
            <QrCode className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Session QR Code</h2>
            
            {!sessionActive ? (
              <div>
                <p className="text-gray-600 mb-6">Generate a new QR code to start attendance session</p>
                <button
                  onClick={generateQRCode}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Generate QR Code
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <img src={qrCodeUrl} alt="Attendance QR Code" className="mx-auto rounded-lg shadow-md" />
                </div>
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <span className="text-lg font-semibold text-orange-600">
                    Expires in: {formatTime(timeRemaining)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Students can scan this code to mark attendance</p>
                <button
                  onClick={generateQRCode}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors mx-auto"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Regenerate</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Attendance List */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Live Attendance</h2>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span className="text-lg font-semibold text-gray-900">{attendanceList.length}</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            {attendanceList.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No students have checked in yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {attendanceList.map((student, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100"
                  >
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-600">Checked in at {student.time}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Present
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100"
      >
        <h3 className="text-lg font-semibold text-blue-900 mb-4">How QR Code Attendance Works:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
            <p>Teacher generates a session-specific QR code</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
            <p>Students scan the QR code with their mobile app</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
            <p>Attendance is marked automatically in real-time</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QRCodeScanner;
