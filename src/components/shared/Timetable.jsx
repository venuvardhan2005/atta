import React from 'react';
import { motion } from 'framer-motion';
import { Book, Video, Brain, Coffee, Sun, Briefcase } from 'lucide-react';

const FreePeriodActivities = ({ onQuizClick }) => (
    <div className="p-2 text-center h-full flex flex-col justify-center items-center">
        <h4 className="font-semibold text-xs text-indigo-700 mb-2">Free Period!</h4>
        <div className="flex justify-center space-x-2">
            <div 
                title="Take a Quiz" 
                onClick={onQuizClick}
                className="cursor-pointer p-1 bg-indigo-100 rounded-full hover:bg-indigo-200 transition-transform hover:scale-110">
                <Brain className="h-4 w-4 text-indigo-600"/>
            </div>
            <div 
                title="Watch Videos" 
                onClick={() => alert('Showing recommended videos for your recent classes...')} 
                className="cursor-pointer p-1 bg-green-100 rounded-full hover:bg-green-200 transition-transform hover:scale-110">
                <Video className="h-4 w-4 text-green-600"/>
            </div>
            <div 
                title="Read Notes" 
                onClick={() => alert('Opening notes for your upcoming classes...')} 
                className="cursor-pointer p-1 bg-blue-100 rounded-full hover:bg-blue-200 transition-transform hover:scale-110">
                <Book className="h-4 w-4 text-blue-600"/>
            </div>
        </div>
    </div>
);

const Timetable = ({ schedule, userRole, isPreview = false, onQuizClick = () => {} }) => {
  const { days, timeSlots, schedule: scheduleData } = schedule;
  const today = new Date().getDay(); // Sunday - 0, Monday - 1, etc.
  const currentDayIndex = today === 0 ? 6 : today - 1; // Adjust to match array index (Mon-Sun)

  if (currentDayIndex > 4 && !isPreview) { // It's a weekend
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
        <Sun className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-yellow-800">It's the Weekend!</h2>
        <p className="text-yellow-700 mt-2">No classes scheduled. Enjoy your break!</p>
      </div>
    );
  }

  const displayedDays = isPreview ? [days[currentDayIndex]] : days.slice(0, 5); // Show only today for preview, else Mon-Fri

  const getClassStyle = (type) => {
    switch (type) {
      case 'lecture': return 'bg-blue-100 border-l-4 border-blue-500';
      case 'lab': return 'bg-green-100 border-l-4 border-green-500';
      case 'tutorial': return 'bg-purple-100 border-l-4 border-purple-500';
      case 'other': return 'bg-gray-100 border-l-4 border-gray-500';
      default: return 'bg-gray-100';
    }
  };

  const getIcon = (type) => {
    switch(type) {
        case 'lecture': return Book;
        case 'lab': return Video; // Using Video as a stand-in for a lab icon
        case 'tutorial': return Brain;
        case 'other': return Briefcase;
        default: return Book;
    }
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100 p-4">
      <div className="grid gap-px bg-gray-200" style={{ gridTemplateColumns: `auto repeat(${displayedDays.length}, 1fr)` }}>
        {/* Time Header */}
        <div className="bg-gray-50 p-2"></div>
        {displayedDays.map((day, dayIndex) => (
          <div key={day} className={`p-2 text-center font-semibold text-sm ${dayIndex + (isPreview ? currentDayIndex : 0) === currentDayIndex ? 'bg-blue-100 text-blue-800' : 'bg-gray-50'}`}>
            {day}
          </div>
        ))}

        {timeSlots.map(time => (
          <React.Fragment key={time}>
            <div className="bg-gray-50 p-2 text-center text-xs font-medium text-gray-600 flex items-center justify-center">{time}</div>
            {displayedDays.map((day, dayIndex) => {
              const classInfo = scheduleData[day]?.[time];
              const isCurrentDay = dayIndex + (isPreview ? currentDayIndex : 0) === currentDayIndex;

              return (
                <div key={`${day}-${time}`} className={`p-1 text-xs ${isCurrentDay ? 'bg-blue-50' : 'bg-white'}`}>
                  {classInfo ? (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`h-full rounded-md p-2 cursor-pointer ${getClassStyle(classInfo.type)}`}
                    >
                      <div className="flex items-start space-x-2">
                        <div>
                          <p className="font-bold text-gray-800">{classInfo.subject || classInfo.class}</p>
                          <p className="text-gray-600">{classInfo.teacher || `Class: ${classInfo.class}`}</p>
                          <p className="text-gray-500">Room: {classInfo.room}</p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    userRole === 'student' && <FreePeriodActivities onQuizClick={onQuizClick} />
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
