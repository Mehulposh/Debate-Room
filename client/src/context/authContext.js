import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

//create a context
const AuthContext = createContext();

//function to use context
export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    
    return context;
}

//provider function
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const userInfo = localStorage.getItem("userInfo");
        return userInfo ? JSON.parse(userInfo) : null;
    });

    const [loading, setLoading] = useState(false)

    useEffect(() =>{
        try {
            setLoading(true)
            const token = localStorage.getItem('token');
      
            if(token){
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    },[])


    const login = async (email,password) => {
        try {
            const{data} = await axios.post('/api/auth/login', { email, password });
            console.log(data);
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('userInfo', JSON.stringify(data));
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            setUser(data)

            return {success : true}
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Login failed' 
            };
        }
    }

    const register = async (username , email, password) => {
        try {
            const {data} = await axios.post('/api/auth/register'    , {
                    username,
                    email,
                    password
                });
            
            console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('userInfo', JSON.stringify(data));
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            
            setUser(data);

            return { success: true }
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Registration failed' 
            };
        }
    }


    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };


   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
