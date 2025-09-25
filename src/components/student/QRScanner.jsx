import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, CheckCircle, AlertCircle, QrCode, X, VideoOff } from 'lucide-react';

const QRScanner = ({ onBack, user }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanError, setScanError] = useState(null);
  
  const startScanner = () => {
    setIsScanning(true);
    setScanResult(null);
    setScanError(null);

    // Simulate scanning process instead of using real camera
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      
      if (success) {
        setScanResult({
          subject: 'Computer Science',
          teacher: 'Dr. Smith',
          time: new Date().toLocaleTimeString(),
          classroom: 'Room 101'
        });
      } else {
        setScanError('Invalid QR code or session expired');
      }
      setIsScanning(false);
    }, 3000);
  };

  const stopScanner = () => {
    setIsScanning(false);
    // Clear any running timeouts if necessary, though the current one auto-finishes
  };

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
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
          <h1 className="text-3xl font-bold text-gray-900">QR Code Scanner</h1>
          <p className="text-gray-600">Scan your teacher's QR code to mark attendance</p>
        </div>
      </motion.div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-8">
          {/* Scanner Area */}
          <div className="text-center mb-8">
            <div className="relative w-full max-w-md aspect-square mx-auto mb-6 bg-gray-900 rounded-lg overflow-hidden">
              {/* This div simulates the camera view */}
              <div className="w-full h-full object-cover" />
              
              {!isScanning && !scanResult && !scanError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                  <QrCode className="h-16 w-16 text-gray-400" />
                  <p className="text-gray-400 mt-2">Camera is off</p>
                </div>
              )}

              {isScanning && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <p className="text-white bg-black/50 px-4 py-2 rounded-lg">Simulating Scan...</p>
                  </div>
                  <motion.div
                    initial={{ y: 0, opacity: 0.8 }}
                    animate={{ y: '100%', opacity: 0.3 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-0 left-0 w-full h-1 bg-green-400"
                  />
                  <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-white/50 rounded"></div>
                </>
              )}

              {scanResult && (
                <div className="absolute inset-0 bg-green-500/90 flex items-center justify-center">
                  <CheckCircle className="h-24 w-24 text-white" />
                </div>
              )}

              {scanError && (
                <div className="absolute inset-0 bg-red-500/90 flex flex-col items-center justify-center p-4">
                  <AlertCircle className="h-16 w-16 text-white" />
                  <p className="text-white text-center mt-4">{scanError}</p>
                </div>
              )}
            </div>

            {/* Status Messages */}
            {scanResult && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-6 p-6 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-center justify-center space-x-2 text-green-700 mb-4">
                  <CheckCircle className="h-6 w-6" />
                  <span className="text-lg font-semibold">Attendance Marked Successfully!</span>
                </div>
                <div className="text-left space-y-2">
                  <p><span className="font-medium">Subject:</span> {scanResult.subject}</p>
                  <p><span className="font-medium">Teacher:</span> {scanResult.teacher}</p>
                  <p><span className="font-medium">Time:</span> {scanResult.time}</p>
                  <p><span className="font-medium">Classroom:</span> {scanResult.classroom}</p>
                </div>
              </motion.div>
            )}

            {/* Controls */}
            <div className="space-y-4">
              {!isScanning && !scanResult && !scanError && (
                <button
                  onClick={startScanner}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto space-x-2"
                >
                  <Camera className="h-6 w-6"/>
                  <span>Start Scan</span>
                </button>
              )}

              {isScanning && (
                <button
                  onClick={stopScanner}
                  className="bg-red-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-red-700 transition-colors"
                >
                  Cancel Scan
                </button>
              )}

              {(scanResult || scanError) && (
                <button
                  onClick={() => {
                    setScanResult(null);
                    setScanError(null);
                    startScanner();
                  }}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors"
                >
                  Scan Again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
