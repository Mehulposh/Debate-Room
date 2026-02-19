import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useSocket } from '../hooks/useSocket.js';
import ArgumentMapper from '../components/ArgumentMapper';
import Timer from '../components/Timmer';
import ArgumentForm from '../components/ArgumentForm';
import ParticipantsList from '../components/ParticipantList.jsx';
import {  AlertCircle } from 'lucide-react';
import api from '../api/axios.js';

const DebateRoom = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const socket = useSocket();
  
  const [debate, setDebate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [timerStart, setTimerStart] = useState(null);
  const [joined, setJoined] = useState(false);

  const fetchDebate = useCallback(async () => {
    try {
        setLoading(true)

        const { data } = await api.get(`/api/debates/${id}`);
        setDebate(data);
        
        const userInDebate = data.participants.some(
            p => p.user._id === user._id
        );
        setJoined(userInDebate);
        
    } catch (error) {
      console.error('Error fetching debate:', error);
      
    }finally{
        setLoading(false);
    }
  }, [id, user._id]);

  useEffect(() => {
    fetchDebate();
  }, [fetchDebate]);

 useEffect(() => {
  if (!socket) return;

  socket.emit('join-debate', id);

  const refresh = () => fetchDebate();

  socket.on('participant-joined', refresh);
  socket.on('argument-added', refresh);
  socket.on('status-changed', refresh);

  socket.on('timer-started', ({ timestamp }) => {
    setIsTimerRunning(true);
    setTimerStart(timestamp);

  });
  console.log(timerStart);
  
  socket.on('timer-stopped', () => {
    setIsTimerRunning(false);
    setCurrentTime(0);
    setTimerStart(null);
    fetchDebate();
  });

  return () => {
    socket.emit('leave-debate', id);

    socket.off('participant-joined', refresh);
    socket.off('argument-added', refresh);
    socket.off('status-changed', refresh);
    socket.off('timer-started');
    socket.off('timer-stopped');
  };
}, [socket, id, fetchDebate, timerStart]);


  useEffect(() => {
    let interval;
    if (isTimerRunning && timerStart) {
      interval = setInterval(() => {
        setCurrentTime(Math.floor((Date.now() - timerStart) / 1000));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerStart]);

  const handleJoinDebate = async (side) => {
    try {
      await api.post(`/api/debates/${id}/join`, { side });
      fetchDebate();
    } catch (error) {
      console.error('Error joining debate:', error);
    }
  };

  const handleStartTimer = () => {
    if (socket && !isTimerRunning) {
      socket.emit('start-timer', {
        debateId: id,
        userId: user._id,
        username: user.username
      });
    }
  };

  const handleStopTimer = async () => {
    if (socket && isTimerRunning) {
      const duration = currentTime * 1000;
      socket.emit('stop-timer', {
        debateId: id,
        userId: user._id
      });

      try {
        await api.put(`/api/debates/${id}/speaker-time`, {
          userId: user._id,
          timeSegment: {
            start: new Date(timerStart),
            end: new Date(),
            duration
          }
        });
      } catch (error) {
        console.error('Error updating speaker time:', error);
      }
    }
  };

  const handleStatusChange = async (status) => {
    try {
      await api.put(`/api/debates/${id}/status`, { status });
      if (socket) {
        socket.emit('debate-status-change', { debateId: id, status });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleAddArgument = async (argumentData) => {
    try {
      await api.post(`/api/debates/${id}/arguments`, argumentData);
      if (socket) {
        socket.emit('new-argument', { debateId: id, argument: argumentData });
      }
    } catch (error) {
      console.error('Error adding argument:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading debate...</div>;
  }

  if (!debate) {
    return <div className="container"><div className="card">Debate not found</div></div>;
  }

  const isCreator = debate?.creator._id === user._id;
  const userSpeakerTime = debate.speakerTimes.find(
    st => st?.userId.toString() === user?._id.toString()
  );
  const totalUserTime = userSpeakerTime ? userSpeakerTime?.totalTime / 1000 : 0;

  return (
    <div className="px-10 m-0 max-w-screen ">
      <div className="px-4 mt-5">
        <div className='flex items-center justify-between mb-3'>
          <div className='space-y-2'>
            <h1 className='text-2xl font-semibold text-secondary underline'>{debate.title}</h1>
            <p className='text-lg font-sans text-warning' >{debate.topic}</p>
          </div>
          <span className={`badge badge-outline badge-${debate.status}  text-lg `} >
            {debate.status}
          </span>
        </div>

        {!joined && (
          <div className="alert alert-error" >
            <AlertCircle size={20} />
            <div>
              <strong>You haven't joined this debate yet.</strong>
              <div >
                <button onClick={() => handleJoinDebate('pro')} className="btn btn-success">
                  Join as Pro
                </button>
                <button onClick={() => handleJoinDebate('con')} className="btn btn-danger">
                  Join as Con
                </button>
                <button onClick={() => handleJoinDebate('neutral')} className="btn btn-secondary">
                  Join as Neutral
                </button>
              </div>
            </div>
          </div>
        )}

        {isCreator && (
          <div className="flex gap-3 mb-5 flex-wrap justify-start">

            {debate.status === "waiting" && (
              <button
                onClick={() => handleStatusChange("active")}
                className="btn btn-success"
              >
                Start Debate
              </button>
            )}

            {debate.status === "active" && (
              <>
                <button
                  onClick={() => handleStatusChange("paused")}
                  className="btn btn-warning"
                >
                  Pause Debate
                </button>

                <button
                  onClick={() => handleStatusChange("completed")}
                  className="btn btn-error"
                >
                  End Debate
                </button>
              </>
            )}

            {debate.status === "paused" && (
              <button
                onClick={() => handleStatusChange("active")}
                className="btn btn-success"
              >
                Resume Debate
              </button>
            )}

          </div>
        )}

      </div>

      <div className="grid grid-cols-[1fr_2fr] gap-5 p-2 mb-5 w-full">
        <div>
          <Timer 
            currentTime={currentTime}
            isRunning={isTimerRunning}
            totalTime={totalUserTime}
            timeLimit={debate.timeLimit}
            onStart={handleStartTimer}
            onStop={handleStopTimer}
            canControl={joined && debate.status === 'active'}
          />
          
          <ParticipantsList 
            participants={debate.participants}
            speakerTimes={debate.speakerTimes}
          />
        </div>

        <div className="card">
          <h3 className='mb-5 text-lg font-semibold'>Argument Map</h3>
          <ArgumentMapper 
            arguments={debate.arguments}
            debateId={id}
          />
        </div>
      </div>

      {joined && debate.status === 'active' && (
        <ArgumentForm onSubmit={handleAddArgument} />
      )}
    </div>
  );
};

export default DebateRoom;