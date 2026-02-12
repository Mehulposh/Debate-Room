import TimeLimitWarning from "./TimeLimitWarning";

const TimerProgress = ({
  totalTime,
  timeLimit,
  formatTime,
}) => {
  const percentageUsed = (totalTime / timeLimit) * 100;
  const isOverLimit = totalTime > timeLimit;

  return (
    <div>
      <div className="flex justify-between mb-2 text-sm font-semibold">
        <span>Total Time Used</span>

        <span className={isOverLimit ? "text-error" : "text-success"}>
          {formatTime(Math.floor(totalTime))} /{" "}
          {formatTime(timeLimit)}
        </span>
      </div>

      <progress
        className={`progress w-full ${
          isOverLimit ? "progress-error" : "progress-success"
        }`}
        value={Math.min(percentageUsed, 100)}
        max="100"
      />

      {isOverLimit && <TimeLimitWarning />}
    </div>
  );
};

export default TimerProgress;
