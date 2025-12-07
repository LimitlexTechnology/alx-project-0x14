import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-700 p-4 mt-8">
      <div className="max-w-6xl mx-auto text-center">© {new Date().getFullYear()} CineSeek</div>
    </footer>
  );
};

export default Footer;
