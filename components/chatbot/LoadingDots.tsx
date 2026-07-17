import React from "react";

export const LoadingDots: React.FC = () => {
  return (
    <div className="flex space-x-1.5 items-center justify-center py-1 px-2 h-5">
      <div className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce" />
    </div>
  );
};
export default LoadingDots;
