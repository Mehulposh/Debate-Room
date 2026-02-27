import React from "react";
import { Handle, Position } from "reactflow";

const typeStyles = {
  claim: "bg-blue-100 text-blue-700",
  evidence: "bg-green-100 text-green-700",
  rebuttal: "bg-orange-100 text-orange-700",
  counter: "bg-pink-100 text-pink-700"
};

const ArgumentNode = ({ data }) => {
  const borderClass = data?.length > 0
    ? "border-yellow-400"
    : "border-indigo-500";

  return (
    <div
      className={`bg-white border-2 ${borderClass} rounded-lg p-4 min-w-55 shadow-md`}
    >
      <Handle type="target" position={Position.Top} />
      
      <div className="text-xs font-bold text-indigo-500 mb-1">
        {data.speakerName}
      </div>

      <div className="text-sm mb-2 text-black">
        {data.content}
      </div>

      <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${typeStyles[data.type]}`}>
        {data.type}
      </span>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default ArgumentNode;