//这个组件用来将子组件包裹起来，如果用户没有登录，就跳转到登录页面

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? 
    <>{children}
    </> : 
    <Navigate to="/" replace state={{ message: '请先登录' }}/>;
}

export default PrivateRoute;