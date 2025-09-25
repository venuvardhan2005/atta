import React from 'react';
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { dailyAttendanceData } from '../../data/attendance';

const DailyAttendanceChart = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Present', 'Absent'],
      bottom: 10,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: dailyAttendanceData.labels,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Students',
      }
    ],
    series: [
      {
        name: 'Present',
        type: 'bar',
        barWidth: '40%',
        data: dailyAttendanceData.present,
        itemStyle: {
          color: '#22c55e' // green-500
        },
        emphasis: {
            focus: 'series'
        },
        animationDelay: function (idx) {
            return idx * 100;
        }
      },
      {
        name: 'Absent',
        type: 'bar',
        barWidth: '40%',
        data: dailyAttendanceData.absent,
        itemStyle: {
          color: '#ef4444' // red-500
        },
        emphasis: {
            focus: 'series'
        },
        animationDelay: function (idx) {
            return idx * 100 + 100;
        }
      }
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
        return idx * 5;
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Daily Attendance Overview</h2>
        <BarChart3 className="h-6 w-6 text-indigo-500" />
      </div>
      <ReactECharts
        option={option}
        style={{ height: '350px', width: '100%' }}
        notMerge={true}
        lazyUpdate={true}
      />
    </motion.div>
  );
};

export default DailyAttendanceChart;
