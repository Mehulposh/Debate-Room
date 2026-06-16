import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { Plus, Clock, Users } from 'lucide-react';
import DebateForm from './DebateForm.jsx';
import EmptyMessage from './EmptyMessage.jsx';
import DebateCard from './DebateCard.jsx';
// import {debatesData} from '../../helperData.js'
import api from '../api/axios.js';

const Debates = () => {
    //states for storing data
    const [debates, setDebates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        topic: '',
        timeLimit: 300
    });

    //initialising navigate hook
    const navigate = useNavigate();

    const fetchDebates = async () => {
        try {
            setLoading(true)
            const { data } = await api.get('/api/debates');
            // console.log('fetched debates',data);
            
            setDebates(data.debates);
        } catch (error) {
            console.error('Error fetching debates:', error);
            setLoading(false);
        }finally{
            setLoading(false)
        }
    }

    // console.log('Debates', debates);
    

    //calling getch debates function in useEffect
    useEffect(() => {
        fetchDebates();
    }, []);

    
    const handleCreateDebate = async (e) => {   
        e.preventDefault();
        try {
            const { data } = await api.post('/api/debates', formData);
            // console.log('new debate',data);
            
            navigate(`/debate/${data._id}`);
        } catch (error) {
            console.error('Error creating debate:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (loading) {
        return <div className="loading">Loading debates...</div>;
    }
   
    return (
  <div className='flex flex-col w-full items-center gap-5 min-h-screen py-6 px-4'>
    
    <div className='flex flex-wrap justify-between items-center gap-4 w-full max-w-2xl'>
      <h1 className='text-3xl sm:text-4xl underline text-accent font-semibold'>
        All Debates
      </h1>
      <button
        onClick={() => setShowCreateForm(!showCreateForm)}
        className='btn btn-primary btn-sm sm:btn-md'
      >
        <Plus size={20} />
        Create New Debate
      </button>
    </div>

    <DebateForm
      handleChange={handleChange}
      isOpen={showCreateForm}
      onClose={() => setShowCreateForm(false)}
      handleCreateDebate={handleCreateDebate}
      formdata={formData}
    />

    <div className='w-full max-w-2xl'>
      <div className='flex flex-col gap-3'>
        {debates.map((debate) => (
          <div
            key={debate._id}
            onClick={() => navigate(`/debate/${debate._id}`)}
            className='card w-full bg-base-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow border border-base-300'
          >
            <DebateCard debate={debate} />
          </div>
        ))}
      </div>
    </div>

    {debates.length === 0 && !showCreateForm && <EmptyMessage />}
  </div>
);
}

export default Debates