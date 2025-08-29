import React from 'react';

const ErrorLogger = ({ error }) => {
  return (
    <div className="bg-primary/20 text-primary p-4 rounded-3xl mb-6">
      <p className="text-sm">{error}</p>
    </div>
  );
};

export default ErrorLogger;
