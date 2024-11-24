import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [animationState, setAnimationState] = useState(false); // 动画状态
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

  function handleLoginModal() {
    setAnimationState(true); // 开启动画
    setTimeout(() => setLoginModalVisible(true), 300); // 延迟显示模态框
  }

  function handleCloseLoginModal() {
    setAnimationState(false); // 关闭动画
    setTimeout(() => setLoginModalVisible(false), 300); // 延迟隐藏模态框
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      {/* 顶部导航栏 */}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-end space-x-8">
          <button
            className="text-amber-500 hover:text-amber-300 transition-all duration-300 font-subTitle"
            onClick={handleLoginModal}>Login</button>

          <button className="text-amber-500 hover:text-amber-300 transition-all duration-300 font-subTitle"
            onClick={() => navigate('/album')}>Album</button>
        </div>
      </nav>


      {/* 中间内容 */}
      <main
        className={`flex-grow flex flex-col items-center justify-center text-center bg-cover bg-center `}
        style={{
          backgroundImage: "url('./angela.png')",
          backgroundPosition: `${50 + offset.x}% ${50 + offset.y}%`,
        }}
      >
        <h1 className={`text-6xl font-bold text-amber-500 mb-4 z-10 font-title transition-all duration-300 ${
          animationState ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        } `}>
          MEMORI
        </h1>
        <button className={`bg-gray-500 font-subTitle font-bold text-amber-500 px-6 py-3 rounded-full hover:bg-amber-400 hover:text-gray-900 z-10 transition-all duration-300 ${
          animationState ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}>
          Get Started
        </button>
      </main>


      {/* 登录模态框 */}
      {loginModalVisible && (
        <div
          className={`font-title fixed top-0 right-0 w-full h-full flex items-center justify-center z-10 transition-all duration-300 ${
            animationState ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
        >
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-96">
            <div className='flex justify-between'>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Login</h2>
              <button
                onClick={handleCloseLoginModal}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-800 text-gray-800 text-lg transition-transform transform hover:scale-110"
              >
                <FaTimes />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-gray-800">Username/email</label>
                <input type="text" id="username" className="w-full border border-gray-300 rounded p-2" />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-800">Password</label>
                <input type="password" id="password" className="w-full border border-gray-300 rounded p-2" />
              </div>
              <button type="submit" className="w-full bg-amber-500 text-white font-bold py-2 rounded hover:bg-amber-400 transition-all duration-300">
                Login
              </button>
            </form>
            <button className="mt-2 w-full bg-amber-800 text-white font-bold py-2 rounded hover:bg-amber-600 transition-all duration-300">
              <img src="./google.png" alt="Google" className="w-5 h-5 inline-block mr-2" />
              Login with Google</button>

            <p className='mt-2 text-sm font-title'>Don't have an account? Sign up</p>
          </div>
        </div>
      )}


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