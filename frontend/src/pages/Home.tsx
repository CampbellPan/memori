import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const Home: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [signUpModalVisible, setSignUpModalVisible] = useState(false); // 注册模态框状态
  const [animationState, setAnimationState] = useState(false); // 动画状态
  const navigate = useNavigate();

  const { isLoggedIn, login, logout } = useAuth();

  const usernameOrEmailRef = useRef<HTMLInputElement>(null); // 用户名或邮箱
  const passwordRef = useRef<HTMLInputElement>(null); // 密码

  const newUsernameRef = useRef<HTMLInputElement>(null);
  const newEmailRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  const location = useLocation();
  const message = location.state?.message || '';
  



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
    setLoginModalVisible(true); // 首先让模态框渲染到 DOM
    setTimeout(() => {
      setAnimationState(true); // 等待模态框渲染后，启动动画
    }, 10); // 这里设置一个短暂的延迟

    //顺序：渲染模态框 -> 启动动画。否则动画可能不生效
  }

  function handleCloseLoginModal() {
    setAnimationState(false); // 启动退出动画
    setTimeout(() => {
      setLoginModalVisible(false); // 等待动画完成后移除模态框
    }, 300); // 延迟时间需要与 CSS 动画时间一致
  }

  function handleSignUpModal() {
    setLoginModalVisible(false); // 关闭登录模态框
    setSignUpModalVisible(true); // 打开注册模态框
    setTimeout(() => {
      setAnimationState(true); // 启动动画
    }, 10);
  }

  function handleCloseSignUpModal() {
    setAnimationState(false);
    setTimeout(() => {
      setSignUpModalVisible(false);
    }, 300);
  }

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';


  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const usernameOrEmail = usernameOrEmailRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('登录成功！');
        login(data.token);
        console.log("已登录,isLoggedIn:", isLoggedIn);
        setLoginModalVisible(false);
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || '登录失败';
        alert(errorMessage);
      }
    } catch (error) {
      console.error('登录请求失败:', error);
      alert('服务器出错，请稍后再试');
    }
  };

  const handleSignUpSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // 从 useRef 获取输入值
    const username = newUsernameRef.current?.value || '';
    const email = newEmailRef.current?.value || '';
    const password = newPasswordRef.current?.value || '';

    // 构建请求体
    const requestData = {
      username,
      email,
      password,
      avatar: 'avatar.jpg', // 默认头像
    };

    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('注册成功！请登录');
        // 关闭注册模态框或清理状态
      } else {
        const errorData = await response.json();
        const errorMessages =
          errorData.errors?.map((err: any) => err.msg).join('\n') || errorData.message;
        alert(`注册失败: ${errorMessages}`);
      }
    } catch (error) {
      console.error('注册请求失败:', error);
      alert('注册失败：服务器出错，请稍后再试');
    }
  };

  function handleLogout() {
    logout(); // 调用 AuthContext 的 logout 方法
    console.log('已退出登录, isLoggedIn:', isLoggedIn); // 注意这里的 isLoggedIn 是异步更新的
    alert('已退出登录');
  }

  function handleAlbum() {
    // 获取token中的用户信息
    const token = localStorage.getItem('token');
    if (!token) {
      alert('请先登录');
      return;
    }

    // 解析token
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    //atob() 方法是JavaScript 内置的全局方法，用于将 Base64 编码的字符串解码为普通字符串。
    const userId = payload.userId;
    if (userId) {
      navigate(`/album/${userId}`);
    } else {
      alert('无法获取用户ID，请重新登录！');
    }
  }
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      {message && <p className="text-amber-200 bg-gray-600 text-center">{message}</p>}
      {/* 顶部导航栏 */}
      <nav className="bg-gray-800 p-4">
        <div className="container font-title mx-auto flex justify-end space-x-8">
        {!isLoggedIn ? (
            <button className="text-amber-500 hover:text-amber-300" onClick={handleLoginModal}>
              Login
            </button>
          ) : (
            <>
              <button
                className="text-amber-500 hover:text-amber-300"
                onClick={handleAlbum}
              >
                Album
              </button>
              <button className="text-red-500 hover:text-red-300" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
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
        <h1 className={`text-6xl font-bold text-amber-500 mb-4 z-10 font-title transition-all duration-300 ${animationState ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
          } `}>
          MEMORI
        </h1>
        <button className={`bg-gray-500 font-subTitle font-bold text-amber-500 px-6 py-3 rounded-full hover:bg-amber-400 hover:text-gray-900 z-10 transition-all duration-300 ${animationState ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
          }`}>
          Get Started
        </button>
      </main>


      {/* 登录模态框 */}
      {loginModalVisible && (
        <div
          className={`font-title fixed top-0 right-0 w-full h-full flex items-center justify-center z-10 transition-all duration-300 ${animationState ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
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
                <input type="text" id="usernameOrEmail" ref={usernameOrEmailRef} className="w-full border border-gray-300 rounded p-2" />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-800">Password</label>
                <input type="password" id="password" ref={passwordRef} className="w-full border border-gray-300 rounded p-2" />
              </div>
              <button type="submit" className="w-full bg-amber-500 text-white font-bold py-2 rounded hover:bg-amber-400 transition-all duration-300"
                onClick={handleLoginSubmit}
              >
                Login
              </button>
            </form>
            <button className="mt-2 w-full bg-amber-800 text-white font-bold py-2 rounded hover:bg-amber-600 transition-all duration-300">
              <img src="./google.png" alt="Google" className="w-5 h-5 inline-block mr-2" />
              Login with Google</button>

            <p
              className="mt-2 text-sm font-title text-gray-800 hover:underline cursor-pointer"
              onClick={handleSignUpModal}
            >
              Don't have an account? Sign up
            </p>
          </div>
        </div>
      )}

      {/* 注册模态框 */}
      {signUpModalVisible && (
        <div
          className={`font-title fixed top-0 right-0 w-full h-full flex items-center justify-center z-10 transition-all duration-300 ${animationState ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}
        >
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-96">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign Up</h2>
              <button
                onClick={handleCloseSignUpModal}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-800 text-gray-800 text-lg transition-transform transform hover:scale-110"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              <div>
                <label htmlFor="new-username" className="block text-gray-800">
                  Username
                </label>
                <input
                  type="text"
                  id="new-username"
                  ref={newUsernameRef}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                <label htmlFor="new-email" className="block text-gray-800">
                  Email
                </label>
                <input
                  type="email"
                  id="new-email"
                  ref={newEmailRef}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                <label htmlFor="new-password" className="block text-gray-800">
                  Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  ref={newPasswordRef}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-500 text-white font-bold py-2 rounded hover:bg-amber-400 transition-all duration-300"
              >
                Sign Up
              </button>
            </form>
            <button className="mt-2 w-full bg-amber-800 text-white font-bold py-2 rounded hover:bg-amber-600 transition-all duration-300">
              <img src="./google.png" alt="Google" className="w-5 h-5 inline-block mr-2" />
              Sign up with Google</button>
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