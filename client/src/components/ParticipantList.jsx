import React from 'react';
import { Users, Clock } from 'lucide-react';

const ParticipantsList = ({ participants, speakerTimes }) => {
  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSpeakerTime = (userId) => {
    const speakerTime = speakerTimes.find(st => st.userId.toString() === userId.toString());
    return speakerTime ? speakerTime.totalTime : 0;
  };
  
  return (
    <div className='border p-2 '>
      <h3 className='flex items-center gap-3 mb-3 font-semibold text-accent'>
        <Users size={24} />
        Participants ({participants.length})
      </h3>

      {participants?.map((participant) => {
          return (
                <div
                  key={participant._id}                  
                >
                  <div className='bg-slate-500 p-2 rounded w-fit'>
                    <div className='text-gray-300 font-semibold'>
                      {participant.username}
                    </div>
                    <span className={`badge badge-${participant.side} ${participant.side === 'pro' ? "text-accent" : "text-warning"}  font-semibold`}>
                      {participant.side}
                    </span>
                  </div>

                  <div className='flex items-center justify-center gap-2 text-lg font-semibold'>
                    <Clock size={16} />
                    {formatTime(getSpeakerTime(participant.user._id || participant.user))}
                  </div>
                </div>
              );
        })
      }


      {participants.length === 0 && (
        <div className='text-gray-300 '>
          No participants yet
        </div>
      )}
    </div>
  );
};

export default ParticipantsList;