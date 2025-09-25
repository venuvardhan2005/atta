import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain, CheckCircle, XCircle } from 'lucide-react';

const QuizModal = ({ isOpen, onClose, quiz }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    // Reset state when a new quiz is opened
    if (isOpen) {
      setSelectedOption(null);
      setIsCorrect(null);
    }
  }, [isOpen, quiz]);

  if (!quiz) return null;

  const handleOptionClick = (option) => {
    if (selectedOption) return; // Prevent changing answer
    setSelectedOption(option);
    setIsCorrect(option === quiz.answer);
  };

  const getOptionClasses = (option) => {
    if (!selectedOption) {
      return 'bg-gray-100 hover:bg-gray-200';
    }
    if (option === quiz.answer) {
      return 'bg-green-100 border-green-500 text-green-800';
    }
    if (option === selectedOption && option !== quiz.answer) {
      return 'bg-red-100 border-red-500 text-red-800';
    }
    return 'bg-gray-100 opacity-60';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Brain className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Pop Quiz!</h2>
                    <p className="text-sm text-gray-500">{quiz.subject}</p>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-lg font-semibold text-gray-800 mb-6">{quiz.question}</p>
              <div className="space-y-3">
                {quiz.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    disabled={!!selectedOption}
                    className={`w-full text-left p-4 rounded-lg border-2 border-transparent transition-all duration-300 flex items-center justify-between ${getOptionClasses(option)}`}
                  >
                    <span className="font-medium">{option}</span>
                    {selectedOption && option === quiz.answer && <CheckCircle className="h-5 w-5 text-green-600" />}
                    {selectedOption === option && option !== quiz.answer && <XCircle className="h-5 w-5 text-red-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 rounded-b-xl text-right">
                <button
                    onClick={onClose}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                    Close
                </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuizModal;
