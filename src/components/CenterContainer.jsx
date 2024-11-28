import React from "react";

function CenterContainer({ children }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-400">
      {children}
    </div>
  );
}

export default CenterContainer;
