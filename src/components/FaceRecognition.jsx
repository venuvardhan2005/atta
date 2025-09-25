import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Users, CheckCircle, XCircle, Play, Square } from 'lucide-react';

const FaceRecognition = ({ onBack }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedStudents, setDetectedStudents] = useState([]);
  const [scanProgress, setScanProgress] = useState(0);

  const students = [
    { id: 1, name: 'John Smith', enrolled: true },
    { id: 2, name: 'Emma Johnson', enrolled: true },
    { id: 3, name: 'Michael Brown', enrolled: true },
    { id: 4, name: 'Sarah Davis', enrolled: true },
    { id: 5, name: 'James Wilson', enrolled: true },
    { id: 6, name: 'Lisa Anderson', enrolled: true },
    { id: 7, name: 'David Miller', enrolled: true },
    { id: 8, name: 'Jessica Taylor', enrolled: true },
    { id: 9, name: 'Robert Garcia', enrolled: true },
    { id: 10, name: 'Amanda Martinez', enrolled: true }
  ];

  const startScanning = () => {
    setIsScanning(true);
    setScanProgress(0);
    setDetectedStudents([]);
  };

  const stopScanning = () => {
    setIsScanning(false);
    setScanProgress(0);
  };

  // Simulate face detection progress
  useEffect(() => {
    let interval;
    if (isScanning) {
      interval = setInterval(() => {
        setScanProgress(prev => {
          const newProgress = Math.min(prev + 2, 100);
          
          // Randomly detect students during scanning
          if (Math.random() > 0.85 && detectedStudents.length < 8) {
            const availableStudents = students.filter(student => 
              !detectedStudents.some(detected => detected.id === student.id)
            );
            if (availableStudents.length > 0) {
              const randomStudent = availableStudents[Math.floor(Math.random() * availableStudents.length)];
              setDetectedStudents(prev => [...prev, {
                ...randomStudent,
                detectedAt: new Date().toLocaleTimeString(),
                confidence: Math.floor(Math.random() * 20) + 80 // 80-100% confidence
              }]);
            }
          }
          
          if (newProgress >= 100) {
            setIsScanning(false);
          }
          
          return newProgress;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isScanning, detectedStudents, students]);

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
          <h1 className="text-3xl font-bold text-gray-900">Face Recognition Attendance</h1>
          <p className="text-gray-600">AI-powered facial detection for automatic attendance marking</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Camera View */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Camera View</h2>
          </div>
          <div className="p-6">
            <div className="relative">
              {/* Simulated Camera Feed */}
              <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
                <Camera className="h-16 w-16 text-gray-500" />
                
                {/* Face Detection Overlay */}
                {isScanning && (
                  <>
                    <div className="absolute top-4 left-4 w-16 h-20 border-2 border-green-400 rounded">
                      <div className="absolute -top-6 left-0 bg-green-400 text-white text-xs px-2 py-1 rounded">
                        John S.
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 w-16 h-20 border-2 border-green-400 rounded">
                      <div className="absolute -top-6 right-0 bg-green-400 text-white text-xs px-2 py-1 rounded">
                        Emma J.
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-8 w-16 h-20 border-2 border-yellow-400 rounded">
                      <div className="absolute -top-6 left-0 bg-yellow-400 text-white text-xs px-2 py-1 rounded">
                        Detecting...
                      </div>
                    </div>
                  </>
                )}
                
                {/* Scanning Animation */}
                {isScanning && (
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
                  />
                )}
              </div>

              {/* Progress Bar */}
              {isScanning && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Scanning Progress</span>
                    <span>{scanProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-blue-600 h-2 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${scanProgress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="flex justify-center space-x-4">
                {!isScanning ? (
                  <button
                    onClick={startScanning}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Play className="h-5 w-5" />
                    <span>Start Scanning</span>
                  </button>
                ) : (
                  <button
                    onClick={stopScanning}
                    className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    <Square className="h-5 w-5" />
                    <span>Stop Scanning</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Detection Results */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Detected Students</h2>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-500" />
                <span className="text-lg font-semibold text-gray-900">{detectedStudents.length}</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            {detectedStudents.length === 0 ? (
              <div className="text-center py-8">
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No students detected yet</p>
                <p className="text-sm text-gray-400 mt-1">Start scanning to detect faces</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {detectedStudents.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100"
                  >
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-600">
                          Detected at {student.detectedAt} • {student.confidence}% confidence
                        </p>
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
        className="mt-8 bg-purple-50 rounded-xl p-6 border border-purple-100"
      >
        <h3 className="text-lg font-semibold text-purple-900 mb-4">How Face Recognition Works:</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-purple-800">
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
            <p>Camera captures classroom view</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
            <p>AI detects and identifies faces</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
            <p>Matches with student database</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
            <p>Automatically marks attendance</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FaceRecognition;
