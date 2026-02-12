const TimerDisplay = ({ time, isRunning, formatTime }) => {
  return (
    <div
      className="text-center p-8 rounded-xl mb-5"
      style={{ background: isRunning ? "#e8f5e9" : "#f5f5f5" }}
    >
      <div
        className="text-5xl font-bold font-mono"
        style={{ color: isRunning ? "#28a745" : "#333" }}
      >
        {formatTime(time)}
      </div>

      <div className="text-sm text-gray-500 mt-2">
        {isRunning ? "Currently Speaking" : "Timer Stopped"}
      </div>
    </div>
  );
};

export default TimerDisplay;
