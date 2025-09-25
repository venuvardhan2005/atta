// Mock user data for demonstration
export const mockUsers = [
  // Students
  {
    id: 1,
    name: 'Amanda Martinez',
    email: 'student@test.com',
    password: 'password',
    role: 'student',
    studentId: 'CS2024007',
    department: 'Computer Science',
  },
  // Teachers
  {
    id: 2,
    name: 'Dr. Robert Smith',
    email: 'teacher@test.com',
    password: 'password',
    role: 'teacher',
    employeeId: 'EMP001',
    department: 'Computer Science',
  },
  // Admins
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@test.com',
    password: 'password',
    role: 'admin',
    adminLevel: 'super',
  },
  // Parents
  {
    id: 4,
    name: 'Carlos Martinez',
    email: 'parent@test.com',
    password: 'password',
    role: 'parent',
    childStudentId: 'CS2024007', // Linked to Amanda Martinez
  },
];
