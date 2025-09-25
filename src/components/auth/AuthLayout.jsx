import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, UserCheck, Mail, Lock, User, Phone, IdCard, Shield, UserSquare, CheckCircle } from 'lucide-react';

const AuthLayout = ({ onLogin, onSignup, users }) => {
  const [authMode, setAuthMode] = useState('signin');
  const [userRole, setUserRole] = useState('teacher');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    employeeId: '',
    studentId: '',
    childStudentId: '',
    department: ''
  });
  const [error, setError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  const roles = [
    {
      id: 'teacher',
      name: 'Teacher',
      icon: GraduationCap,
      color: 'bg-blue-500',
      description: 'Manage classes and mark attendance'
    },
    {
      id: 'student',
      name: 'Student',
      icon: User,
      color: 'bg-green-500',
      description: 'Check schedule and mark attendance'
    },
    {
      id: 'parent',
      name: 'Parent',
      icon: Shield,
      color: 'bg-yellow-500',
      description: 'Monitor your child\'s attendance'
    },
    {
      id: 'admin',
      name: 'Admin',
      icon: UserCheck,
      color: 'bg-purple-500',
      description: 'Manage the entire system'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSignupSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSignupSuccess(false);

    if (authMode === 'signin') {
      const loginSuccessful = onLogin({ ...formData, role: userRole });
      if (!loginSuccessful) {
        setError('Invalid credentials or role mismatch.');
      }
    } else { // signup
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password, // In a real app, this should be hashed
        role: userRole,
        ...(userRole === 'teacher' && { employeeId: formData.employeeId || `EMP${Date.now() % 1000}`, department: formData.department }),
        ...(userRole === 'student' && { studentId: formData.studentId || `STU${Date.now() % 1000}`, department: formData.department }),
        ...(userRole === 'parent' && { childStudentId: formData.childStudentId }),
        ...(userRole === 'admin' && { adminLevel: 'super' })
      };
      onSignup(newUser);
      setSignupSuccess(true);
      setAuthMode('signin');
      setFormData({
        email: '', password: '', name: '', phone: '', employeeId: '', studentId: '', childStudentId: '', department: ''
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Smart Attendance System</h1>
          <p className="text-gray-600">Choose your role and sign in to continue</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Role Selection */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Role</h2>
            <div className="space-y-4">
              {roles.map((role) => (
                <motion.div
                  key={role.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    userRole === role.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setUserRole(role.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${role.color} rounded-lg flex items-center justify-center`}>
                      <role.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                      <p className="text-sm text-gray-600">{role.description}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      userRole === role.id 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300'
                    }`}>
                      {userRole === role.id && (
                        <div className="w-full h-full bg-white rounded-full scale-50"></div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Authentication Form */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-8"
          >
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => { setAuthMode('signin'); setSignupSuccess(false); setError(''); }}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  authMode === 'signin'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setAuthMode('signup'); setSignupSuccess(false); setError(''); }}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  authMode === 'signup'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sign Up
              </button>
            </div>
            
            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
            {signupSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center"
              >
                <div className="flex items-center justify-center space-x-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  <p className="font-medium">Account created successfully! Please sign in.</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your full name" required />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your email" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your password" required />
                </div>
              </div>

              {authMode === 'signup' && (
                <>
                  {userRole === 'teacher' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                      <div className="relative">
                        <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input type="text" name="employeeId" value={formData.employeeId} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter employee ID" required />
                      </div>
                    </div>
                  )}

                  {userRole === 'student' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                      <div className="relative">
                        <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input type="text" name="studentId" value={formData.studentId} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter student ID" required />
                      </div>
                    </div>
                  )}
                  
                  {userRole === 'parent' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Child's Student ID</label>
                      <div className="relative">
                        <UserSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input type="text" name="childStudentId" value={formData.childStudentId} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your child's student ID" required />
                      </div>
                    </div>
                  )}

                  {(userRole === 'teacher' || userRole === 'student') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                      <select name="department" value={formData.department} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                        <option value="">Select Department</option>
                        <option value="computer-science">Computer Science</option>
                        <option value="mathematics">Mathematics</option>
                        <option value="physics">Physics</option>
                        <option value="chemistry">Chemistry</option>
                      </select>
                    </div>
                  )}

                  {userRole !== 'admin' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter phone number" required />
                      </div>
                    </div>
                  )}
                </>
              )}

              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                {authMode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
