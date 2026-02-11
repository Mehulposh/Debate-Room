import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () =>{    
    //state valriables 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    //extracting login function from useAuth hook
    const { login } = useAuth();

    //initialising useNavigate hook
    const navigate = useNavigate();

    //handler function 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        //calling login function
        const result = await login(email, password);
        
        //navigating to debates page on successfull login
        if (result.success) {
            navigate('/debates');
        } else {
            setError(result.message);
        }
        
        setLoading(false);
    }

    return (
        <div className='h-screen flex flex-col items-center  '>
            <div className='p-5 mt-5  rounded-lg w-100 border border-primary'>
                {/* title */}
                <h1 className='text-3xl underline font-semibold text-primary flex justify-center'>
                    Login 
                </h1>

                {/* error message */}
                {error && <div className="alert alert-error text-md ">{error}</div>}

                {/* login form */}
                <form 
                    className='flex flex-col justify-center gap-6 p-3'
                    onSubmit={handleSubmit}
                >
                    <label className='space-y-2 '>
                        <p className='text-lg font-semibold'>Email :</p>
                        <input 
                            className='input' 
                            placeholder='Enter your username'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>

                    <label className='space-y-2'>
                        <p className='text-lg font-semibold'>Password :</p>
                        <input 
                            className='input' 
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            required
                        />
                    </label>

                    <button 
                        className=  {`${loading ? "btn btn-disabled" : "btn btn-primary"} text-lg`}
                        // className='btn btn-disabled'
                        type='submit' 
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {/* link to registration page */}
                <p className='flex justify-center gap-2'>
                    Don't have an account? <Link to="/register" className='text-primary font-semibold underline'>Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login