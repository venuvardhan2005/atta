import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bluetooth, Users, CheckCircle, Wifi, Smartphone, MapPin } from 'lucide-react';

const BluetoothDetection = ({ onBack }) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedDevices, setDetectedDevices] = useState([]);
  const [classroomRange] = useState(10); // 10 meters

  const students = [
    { id: 1, name: 'John Smith', deviceId: 'iPhone_12_JS', signal: -45 },
    { id: 2, name: 'Emma Johnson', deviceId: 'Galaxy_S21_EJ', signal: -38 },
    { id: 3, name: 'Michael Brown', deviceId: 'iPhone_13_MB', signal: -52 },
    { id: 4, name: 'Sarah Davis', deviceId: 'Pixel_6_SD', signal: -41 },
    { id: 5, name: 'James Wilson', deviceId: 'iPhone_14_JW', signal: -47 },
    { id: 6, name: 'Lisa Anderson', deviceId: 'Galaxy_Note_LA', signal: -49 },
    { id: 7, name: 'David Miller', deviceId: 'iPhone_11_DM', signal: -44 },
    { id: 8, name: 'Jessica Taylor', deviceId: 'OnePlus_9_JT', signal: -53 }
  ];

  const startDetection = () => {
    setIsDetecting(true);
    setDetectedDevices([]);
  };

  const stopDetection = () => {
    setIsDetecting(false);
  };

  // Simulate Bluetooth device detection
  useEffect(() => {
    let interval;
    if (isDetecting) {
      interval = setInterval(() => {
        // Randomly detect new devices
        if (Math.random() > 0.7 && detectedDevices.length < students.length) {
          const availableStudents = students.filter(student => 
            !detectedDevices.some(detected => detected.id === student.id)
          );
          if (availableStudents.length > 0) {
            const randomStudent = availableStudents[Math.floor(Math.random() * availableStudents.length)];
            setDetectedDevices(prev => [...prev, {
              ...randomStudent,
              detectedAt: new Date().toLocaleTimeString(),
              distance: Math.floor(Math.random() * 8) + 2 // 2-10 meters
            }]);
          }
        }
        
        // Update signal strengths for existing devices
        setDetectedDevices(prev => prev.map(device => ({
          ...device,
          signal: device.signal + (Math.random() * 6 - 3) // ±3 dBm variation
        })));
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isDetecting, detectedDevices, students]);

  const getSignalStrength = (signal) => {
    if (signal > -40) return { level: 'Strong', color: 'text-green-600', bars: 4 };
    if (signal > -50) return { level: 'Good', color: 'text-blue-600', bars: 3 };
    if (signal > -60) return { level: 'Fair', color: 'text-yellow-600', bars: 2 };
    return { level: 'Weak', color: 'text-red-600', bars: 1 };
  };

  const SignalBars = ({ bars }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4].map(bar => (
        <div
          key={bar}
          className={`w-1 h-3 rounded-full ${
            bar <= bars ? 'bg-current' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );

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
          <h1 className="text-3xl font-bold text-gray-900">Bluetooth Proximity Detection</h1>
          <p className="text-gray-600">Automatic attendance tracking based on device proximity</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Detection Control */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Bluetooth Beacon</h2>
          </div>
          <div className="p-6">
            <div className="text-center">
              {/* Beacon Visualization */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <div className="absolute inset-0 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 bg-blue-200 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                      <Bluetooth className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Detection Waves */}
                {isDetecting && (
                  <>
                    <motion.div
                      className="absolute inset-0 border-2 border-blue-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1.4], opacity: [0.8, 0.4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute inset-0 border-2 border-blue-300 rounded-full"
                      animate={{ scale: [1, 1.3, 1.6], opacity: [0.6, 0.3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                  </>
                )}
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span className="text-lg font-semibold text-gray-900">Classroom Range: {classroomRange}m</span>
                </div>
                <p className="text-sm text-gray-600">
                  Status: {isDetecting ? 
                    <span className="text-green-600 font-medium">Actively Detecting</span> : 
                    <span className="text-gray-500">Standby</span>
                  }
                </p>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                {!isDetecting ? (
                  <button
                    onClick={startDetection}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Start Detection
                  </button>
                ) : (
                  <button
                    onClick={stopDetection}
                    className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    Stop Detection
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Detected Devices */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Detected Devices</h2>
              <div className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5 text-blue-500" />
                <span className="text-lg font-semibold text-gray-900">{detectedDevices.length}</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            {detectedDevices.length === 0 ? (
              <div className="text-center py-8">
                <Bluetooth className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No devices detected yet</p>
                <p className="text-sm text-gray-400 mt-1">Start detection to find nearby devices</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {detectedDevices.map((device, index) => {
                  const signalInfo = getSignalStrength(device.signal);
                  return (
                    <motion.div
                      key={device.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-blue-50 rounded-lg border border-blue-100"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium text-gray-900">{device.name}</p>
                            <p className="text-sm text-gray-600">{device.deviceId}</p>
                          </div>
                        </div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          Present
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Wifi className={`h-4 w-4 ${signalInfo.color}`} />
                          <span className={`${signalInfo.color} font-medium`}>
                            {signalInfo.level}
                          </span>
                          <div className={signalInfo.color}>
                            <SignalBars bars={signalInfo.bars} />
                          </div>
                        </div>
                        <div className="text-gray-600">
                          <span>{device.distance}m away</span>
                          <span className="mx-2">•</span>
                          <span>{device.detectedAt}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
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
        className="mt-8 bg-indigo-50 rounded-xl p-6 border border-indigo-100"
      >
        <h3 className="text-lg font-semibold text-indigo-900 mb-4">How Bluetooth Detection Works:</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-indigo-800">
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
            <p>Bluetooth beacon installed in classroom</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
            <p>Students' devices connect automatically</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
            <p>System detects devices within range</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
            <p>Attendance marked silently</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BluetoothDetection;
