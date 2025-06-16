import React from "react";

function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-teal-950 bg-opacity-70">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 border-4 border-t-transparent border-yellow-500 rounded-full animate-spin"></div>
        <p className="text-yellow-500 font-medium">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
