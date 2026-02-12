import React from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { User, Mail, Calendar, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className='flex justify-center w-screen '>
    <div className="card w-full max-w-2xl border border-primary mt-5" >
      <div className="card-body space-y-3">
        <h1 className='card-title flex justify-center text-2xl text-primary font-semibold underline '>Your Profile</h1>

        <div className="flex justify-center">
          <div className="avatar">
            <div className="w-32 border rounded-full">
              <img src={user?.avatar} alt={user?.username} />
            </div>
          </div>
        </div>
          
          <div className="text-center">
            <h2 className='text-lg' >{user.username}</h2>
            <div className='flex items-center gap-2 text-gray-500'>
              <Mail size={18} />
              {user?.email}
            </div>
            <div className='flex items-center gap-2 text-gray-500'>
              <Calendar size={18} />
              Joined {format(new Date(user?.createdAt), 'MMMM d, yyyy')}
            </div>
          </div>
        

        <div className='flex justify-around items-center bg-white rounded p-20'>
          <div className='flex flex-col justify-center items-center'>
            <MessageSquare size={32} className='text-gray-500 m-3' />
            <div className='text-gray-500 font-bold text-xl'>
              {user.debatesParticipated?.length || 0}
            </div>
            <div className='text-gray-500 text-2xl font-semibold'>Debates</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;