import React from 'react';
import {Clock } from 'lucide-react';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import TimerProgress from './TimerProgress';

const Timer = ({ currentTime, isRunning, totalTime, timeLimit, onStart, onStop, canControl }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

 

  return (
    <div className="mb-5 ">
      <h3 className='flex items-center gap-2 mb-5 text-lg font-semibold'>
        <Clock size={24} />
        Speaking Timer
      </h3>

      <TimerDisplay
        time={currentTime}
        isRunning={isRunning}
        formatTime={formatTime}
      />

      {canControl && (
        <TimerControls
          isRunning={isRunning}
          onStart={onStart}
          onStop={onStop}
        />
      )}

      <TimerProgress
        totalTime={totalTime}
        timeLimit={timeLimit}
        formatTime={formatTime}
      />
    </div>
  );
};

export default Timer;