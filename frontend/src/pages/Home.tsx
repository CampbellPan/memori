import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (event.clientX / innerWidth) * 20 - 10; // 调整20和10来控制位移幅度
      const y = (event.clientY / innerHeight) * 20 - 10;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      {/* 顶部导航栏 */}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-end space-x-8">
          <button className="text-amber-500 hover:text-amber-300 transition-all duration-300 font-subTitle">Login</button>
          <button className="text-amber-500 hover:text-amber-300 transition-all duration-300 font-subTitle" 
          onClick={() => navigate('/album')}>Album</button>
        </div>
      </nav>

      {/* 中间内容 */}
      <main
        className="flex-grow flex flex-col items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: "url('./angela.png')",
          backgroundPosition: `${50 + offset.x}% ${50 + offset.y}%`,
        }}
      >
        <h1 className="text-6xl font-bold text-amber-500 mb-4 z-10 font-title">
          MEMORI
        </h1>
        <button className="bg-gray-500 font-subTitle font-bold text-amber-500 px-6 py-3 rounded-full hover:bg-amber-400 hover:text-gray-900 transition-all duration-300 z-10">
          Get Started
        </button>
      </main>

      {/* 底部页脚 */}
      <footer className="bg-gray-800 p-4">
        <div className="container mx-auto text-center text-amber-500">
          <p className="font-subTitle">Contact: your-email@example.com</p>
          <div className="flex font-subTitle justify-center space-x-4 mt-2">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300">LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 