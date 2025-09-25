import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AuthLayout from './components/auth/AuthLayout';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import StudentDashboard from './components/student/StudentDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import ParentDashboard from './components/parent/ParentDashboard';
import Notification from './components/shared/Notification';
import { mockUsers as initialUsers } from './data/users';

function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(initialUsers);
  const [notifications, setNotifications] = useState([]);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);

  const handleLogin = (userData) => {
    const foundUser = users.find(
      (u) => u.email === userData.email && u.password === userData.password && u.role === userData.role
    );
    if (foundUser) {
      setUser(foundUser);
      // Reset notifications for new user
      setNotifications([]);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setUser(null);
    setNotifications([]);
    setShowNotificationPanel(false);
  };

  const handleSignup = (newUserData) => {
    setUsers(prevUsers => [...prevUsers, newUserData]);
  };
  
  // Simulate notifications
  useEffect(() => {
    if (user) {
      const baseNotifications = [
        { id: 1, title: 'System Update', message: 'The attendance system will be under maintenance tonight at 2 AM.' },
        { id: 2, title: 'Holiday Notice', message: 'The college will be closed for a national holiday next Monday.' },
      ];

      if (user.role === 'student' || user.role === 'teacher') {
        const roleSpecificNotifications = [
          ...baseNotifications,
          { id: 3, title: 'Class Starting Soon!', message: 'Your next class, "Physics", is starting in 5 minutes in Room 301.' },
          { id: 4, title: 'Grades Posted', message: 'Your grades for the recent Mathematics quiz have been posted.' },
        ];
        setNotifications(roleSpecificNotifications.map(n => ({...n, read: false})));
      } else {
        setNotifications(baseNotifications.map(n => ({...n, read: false})));
      }
    }
  }, [user]);

  const latestNotification = notifications.find(n => !n.read);

  const dashboardProps = {
    user,
    onLogout: handleLogout,
    notifications,
    setNotifications,
    showNotificationPanel,
    setShowNotificationPanel
  };

  const renderDashboard = () => {
    if (!user) {
      return <AuthLayout onLogin={handleLogin} onSignup={handleSignup} users={users} />;
    }

    switch (user.role) {
      case 'teacher':
        return <TeacherDashboard {...dashboardProps} />;
      case 'student':
        return <StudentDashboard {...dashboardProps} />;
      case 'admin':
        return <AdminDashboard {...dashboardProps} />;
      case 'parent':
        return <ParentDashboard {...dashboardProps} />;
      default:
        return <AuthLayout onLogin={handleLogin} onSignup={handleSignup} users={users} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
       {latestNotification && (
        <Notification
          notification={latestNotification}
          onDismiss={() => {
            setNotifications(notifications.map(n => n.id === latestNotification.id ? {...n, read: true} : n));
          }}
        />
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {renderDashboard()}
      </motion.div>
    </div>
  );
}

export default App;
