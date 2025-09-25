const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = [
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00'
];

const studentSchedule = {
  'Monday': {
    '09:00 - 10:00': { subject: 'Computer Science', teacher: 'Dr. Smith', room: '101', type: 'lecture' },
    '10:00 - 11:00': { subject: 'Calculus I', teacher: 'Prof. Johnson', room: '203', type: 'lecture' },
    '11:00 - 12:00': { subject: 'Intro to Physics', teacher: 'Dr. Brown', room: '301', type: 'lab' },
    '14:00 - 15:00': { subject: 'World History', teacher: 'Dr. Allen', room: 'H102', type: 'lecture' },
  },
  'Tuesday': {
    '10:00 - 11:00': { subject: 'Organic Chemistry', teacher: 'Prof. Davis', room: '402', type: 'lecture' },
    '11:00 - 12:00': { subject: 'Public Speaking', teacher: 'Prof. Green', room: 'E201', type: 'lecture' },
    '13:00 - 14:00': { subject: 'Computer Science', teacher: 'Dr. Smith', room: '101', type: 'tutorial' },
    '15:00 - 16:00': { subject: 'Intro to Biology', teacher: 'Dr. Wilson', room: 'B105', type: 'lecture' },
  },
  'Wednesday': {
    '09:00 - 10:00': { subject: 'Data Structures', teacher: 'Dr. Smith', room: '102', type: 'lecture' },
    '11:00 - 12:00': { subject: 'Calculus I', teacher: 'Prof. Johnson', room: '203', type: 'lecture' },
    '14:00 - 15:00': { subject: 'Intro to Physics', teacher: 'Dr. Brown', room: '301', type: 'lecture' },
    '16:00 - 17:00': { subject: 'World History', teacher: 'Dr. Allen', room: 'H102', type: 'tutorial' },
  },
  'Thursday': {
    '10:00 - 11:00': { subject: 'Organic Chemistry', teacher: 'Prof. Davis', room: '402', type: 'lab' },
    '13:00 - 14:00': { subject: 'Calculus I', teacher: 'Prof. Johnson', room: '203', type: 'tutorial' },
    '15:00 - 16:00': { subject: 'Intro to Biology', teacher: 'Dr. Wilson', room: 'B105', type: 'lab' },
  },
  'Friday': {
    '09:00 - 10:00': { subject: 'Intro to Physics', teacher: 'Dr. Brown', room: '301', type: 'lecture' },
    '11:00 - 12:00': { subject: 'Data Structures', teacher: 'Dr. Smith', room: '102', type: 'lecture' },
    '14:00 - 15:00': { subject: 'Public Speaking', teacher: 'Prof. Green', room: 'E201', type: 'tutorial' },
  }
};

const teacherSchedule = {
    'Monday': {
      '09:00 - 10:00': { subject: 'Computer Science', class: 'CS-A', room: '101', type: 'lecture' },
      '13:00 - 14:00': { subject: 'Data Structures', class: 'CS-B', room: '102', type: 'lecture' },
    },
    'Tuesday': {
      '13:00 - 14:00': { subject: 'Computer Science', class: 'CS-A', room: '101', type: 'tutorial' },
      '14:00 - 15:00': { subject: 'Office Hours', class: 'All', room: '505', type: 'other' },
    },
    'Wednesday': {
        '09:00 - 10:00': { subject: 'Data Structures', class: 'CS-B', room: '102', type: 'lecture' },
        '11:00 - 12:00': { subject: 'Advanced Algorithms', class: 'CS-C', room: '103', type: 'lecture' },
    },
     'Thursday': {
      '10:00 - 11:00': { subject: 'Data Structures', class: 'CS-B', room: '102', type: 'lab' },
    },
    'Friday': {
        '11:00 - 12:00': { subject: 'Computer Science', class: 'CS-A', room: '101', type: 'lecture' },
        '13:00 - 14:00': { subject: 'Advanced Algorithms', class: 'CS-C', room: '103', type: 'tutorial' },
    }
}


export const studentTimetable = { days, timeSlots, schedule: studentSchedule };
export const teacherTimetable = { days, timeSlots, schedule: teacherSchedule };
