import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto flex items-center">
        <h1 className="text-xl font-bold">CineSeek</h1>
      </div>
    </header>
  );
};

export default Header;
