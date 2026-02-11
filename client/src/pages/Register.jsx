import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        setLoading(true);
        const result = await register(formData.username, formData.email, formData.password);
        
        if (result.success) {
            navigate('/debates');
        } else {
            setError(result.message);
        }
        
        setLoading(false);
    };

    return(
        <div className='h-screen flex flex-col items-center  '>
            <div className='p-5 mt-5  rounded-lg w-100 border border-primary'>
                    {/* title */}
                    <h1 className='text-3xl underline font-semibold text-primary flex justify-center'>
                        Create Account
                    </h1>

                    {/* error message */}
                    {error && <div className="alert alert-error text-md ">{error}</div>}

                    {/* registration form */}
                    <form  
                        onSubmit={handleSubmit}
                        className='flex flex-col justify-center gap-6 p-3'
                    >
                        <label className='space-y-2 '>
                            <p className='text-lg font-semibold'>User Name :</p>
                            <input 
                                className='input'
                                placeholder='Enter your username'
                                value={formData.username}
                                onChange={handleChange}
                                required
                                type='text'
                                name='username'
                            />
                        </label>
                        <label className='space-y-2 '>
                            <p className='text-lg font-semibold'>Email :</p>
                            <input 
                                className='input'
                                placeholder='Enter your email'
                                value={formData.email}
                                onChange={handleChange}
                                required
                                type='email'
                                name='email'
                            />
                        </label>
                        <label className='space-y-2 '>
                            <p className='text-lg font-semibold'>Password :</p>
                            <input 
                                className='input'
                                placeholder='Enter your password'
                                value={formData.password}
                                onChange={handleChange}
                                required
                                type='password'
                                name='password'
                            />
                        </label>
                        <label className='space-y-2 '>
                            <p className='text-lg font-semibold'>Confirm Password :</p>
                            <input 
                                className='input'
                                placeholder='Enter your passowrd again'
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                type='password'
                                name='confirmpassword'
                            />
                        </label>

                        <button 
                            type='submit'
                            className=  {`${loading ? "btn btn-disabled" : "btn btn-primary"} text-lg`}
                            disabled={loading}
                        >
                            {loading ? 'Creating account...' : 'Register'}
                        </button>
                    </form>

                    {/* link to registration page */}
                    <p className='flex justify-center gap-2' >
                        Already have an account? <Link to="/login" className='text-primary font-semibold underline'>Login</Link>
                    </p>
                
            </div>
        </div>
    )

}

export default Register