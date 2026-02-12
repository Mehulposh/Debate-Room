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
            console.log('fetched debates',data);
            
            setDebates(data.debates);
        } catch (error) {
            console.error('Error fetching debates:', error);
            setLoading(false);
        }finally{
            setLoading(false)
        }
    }

    console.log('Debates', debates);
    

    //calling getch debates function in useEffect
    useEffect(() => {
        fetchDebates();
    }, []);

    
    const handleCreateDebate = async (e) => {   
        e.preventDefault();
        try {
            const { data } = await api.post('/api/debates', formData);
            console.log('new debate',data);
            
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
   
    return(
        <div className='flex flex-col justify-center items-center gap-5 p-3'>
            <div className='flex justify-around items-center mt-5 w-screen'>
                <h1 className='text-4xl underline text-accent font-semibold'>
                    All Debates
                </h1>

                <button 
                    onClick={()=> setShowCreateForm(!showCreateForm)}
                    className='btn btn-primary'
                >
                    <Plus size={20}/>
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

            <div className="min-w-3xl mx-auto ">
            <div className=" flex flex-col gap-3 w-full mt-5">
                {debates.map((debate) => (
                    
                    <div 
                        key={debate._id}
                        onClick={() => navigate(`/debate/${debate._id}`)}
                        className="card w-full bg-base-100  card-md shadow-sm cursor-pointer"
                    >
                        <DebateCard 
                            debate={debate}
                        />
                    </div>
                ))}
            </div>
            </div>

            {debates.length === 0 && !showCreateForm && (
                <EmptyMessage 

                />
            )}
        </div>
    )
}

export default Debates