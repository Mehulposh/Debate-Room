import { Play, Square } from "lucide-react";

const TimerControls = ({ isRunning, onStart, onStop }) => {
  return (
    <div className="flex gap-3 mb-5">
      {!isRunning ? (
        <button
          onClick={onStart}
          className="btn btn-success flex-1 flex items-center justify-center gap-2"
        >
          <Play size={20} />
          Start Writing
        </button>
      ) : (
        <button
          onClick={onStop}
          className="btn btn-error flex-1 flex items-center justify-center gap-2"
        >
          <Square size={20} />
          Stop Writing
        </button>
      )}
    </div>
  );
};

export default TimerControls;
