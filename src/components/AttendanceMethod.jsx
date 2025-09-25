import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, QrCode, Camera, Bluetooth, Clock, Users, Shield } from 'lucide-react';

const AttendanceMethod = ({ onBack, onMethodSelect }) => {
  const methods = [
    {
      id: 'qr',
      name: 'QR Code Scanning',
      description: 'Students scan unique QR codes to mark attendance instantly',
      icon: QrCode,
      color: 'bg-blue-500',
      time: '~30 seconds',
      accuracy: '99%',
      security: 'High',
      pros: [
        'Very fast and easy to use',
        'Works on any smartphone',
        'Session-specific codes prevent fraud',
        'Can be location-restricted'
      ],
      cons: [
        'Requires students to have phones',
        'Possible to share codes (minor risk)'
      ]
    },
    {
      id: 'face',
      name: 'Face Recognition',
      description: 'AI-powered facial detection identifies students automatically',
      icon: Camera,
      color: 'bg-green-500',
      time: '~45 seconds',
      accuracy: '95%',
      security: 'Very High',
      pros: [
        'No proxy attendance possible',
        'Completely hands-free',
        'Can detect late arrivals',
        'Works with existing cameras'
      ],
      cons: [
        'Requires good lighting',
        'Privacy concerns for some',
        'May struggle with masks/glasses'
      ]
    },
    {
      id: 'bluetooth',
      name: 'Bluetooth Proximity',
      description: 'Automatic detection when devices are within classroom range',
      icon: Bluetooth,
      color: 'bg-purple-500',
      time: '~15 seconds',
      accuracy: '92%',
      security: 'Medium',
      pros: [
        'Completely automatic',
        'Works silently in background',
        'No student interaction needed',
        'Battery efficient'
      ],
      cons: [
        'Requires app installation',
        'Bluetooth must be enabled',
        'Range accuracy varies'
      ]
    }
  ];

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
          <h1 className="text-3xl font-bold text-gray-900">Attendance Methods Comparison</h1>
          <p className="text-gray-600">Choose the best method for your classroom needs</p>
        </div>
      </motion.div>

      {/* Method Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {methods.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
          >
            <div className="p-6">
              <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center mb-4`}>
                <method.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{method.name}</h3>
              <p className="text-gray-600 mb-4">{method.description}</p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <Clock className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                  <p className="text-sm font-medium text-gray-900">{method.time}</p>
                  <p className="text-xs text-gray-500">Setup Time</p>
                </div>
                <div className="text-center">
                  <Users className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                  <p className="text-sm font-medium text-gray-900">{method.accuracy}</p>
                  <p className="text-xs text-gray-500">Accuracy</p>
                </div>
                <div className="text-center">
                  <Shield className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                  <p className="text-sm font-medium text-gray-900">{method.security}</p>
                  <p className="text-xs text-gray-500">Security</p>
                </div>
              </div>

              {/* Pros */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-green-700 mb-2">✓ Advantages</h4>
                <ul className="text-xs text-green-600 space-y-1">
                  {method.pros.map((pro, i) => (
                    <li key={i}>• {pro}</li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-orange-700 mb-2">⚠ Considerations</h4>
                <ul className="text-xs text-orange-600 space-y-1">
                  {method.cons.map((con, i) => (
                    <li key={i}>• {con}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onMethodSelect(method.id)}
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Try This Method
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison Table */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Quick Comparison</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">QR Code</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Face Recognition</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Bluetooth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Setup Time</td>
                <td className="px-6 py-4 text-center text-sm text-gray-600">30 seconds</td>
                <td className="px-6 py-4 text-center text-sm text-gray-600">45 seconds</td>
                <td className="px-6 py-4 text-center text-sm text-gray-600">15 seconds</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Student Effort</td>
                <td className="px-6 py-4 text-center text-sm text-gray-600">Low (scan)</td>
                <td className="px-6 py-4 text-center text-sm text-gray-600">None (automatic)</td>
                <td className="px-6 py-4 text-center text-sm text-gray-600">None (automatic)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Fraud Prevention</td>
                <td className="px-6 py-4 text-center text-sm text-gray-600">High</td>
                <td className="px-6 py-4 text-center text-sm text-gray-600">Very High</td>
                <td className="px-6 py-4 text-center text-sm text-gray-600">Medium</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Equipment Needed</td>
                <td className="px-6 py-4 text-center text-sm text-gray-600">Phone/Tablet</td>
                <td className="px-6 py-4 text-center text-sm text-gray-600">Camera</td>
                <td className="px-6 py-4 text-center text-sm text-gray-600">Bluetooth Beacon</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Privacy Level</td>
                <td className="px-6 py-4 text-center text-sm text-gray-600">High</td>
                <td className="px-6 py-4 text-center text-sm text-gray-600">Medium</td>
                <td className="px-6 py-4 text-center text-sm text-gray-600">High</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AttendanceMethod;
