import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { LogOut, User, MessageSquare } from 'lucide-react';

const Navbar = () => {
    //extract user and logout function from auth context
    const {user, logout}= useAuth()
    // const user = true
    const navigate = useNavigate
    //logout handler
    const handleLogout = () => {
    logout();

    //navigate to login page
    navigate('/login');
  };

  return(
    <nav className='p-5 w-screen  bg-neutral sticky top-0 z-50'>
        <div className='flex items-center justify-between '>
            <Link to='/' className='flex items-center gap-2 btn btn-primary'>
                <MessageSquare size={28}/>
                Debate Room
            </Link>

            {user && (
                <div className='flex items-center justify-between  w-1/3  gap-5'>
                    <Link to='/debates' className='text-lg font-semibold btn btn-primary' >
                        Debates
                    </Link>
                    <Link to='/profile' className='text-sm font-semibold flex items-center gap-2 pb-1 border-b border-primary'>
                        <User size={18}/>
                        <span  className="flex flex-wrap max-w-[100px] leading-tight">{user.username}</span>
                    </Link>
                    <button className='btn btn-primary flex items-center' onClick={handleLogout}>
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            )}
        </div>
    </nav>
  )
}

export default Navbar