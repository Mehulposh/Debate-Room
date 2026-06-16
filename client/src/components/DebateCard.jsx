import { MessageSquare , Users, Clock } from "lucide-react"
import { formatDistanceToNow } from 'date-fns';


const DebateCard = ({ debate }) => {
  if (!debate) return null;
  return (
    <div className='p-4 w-full'>

      {/* Title + Status */}
      <div className='flex flex-col items-center gap-1 mb-3'>
        <h3 className='font-bold text-lg text-secondary underline text-center leading-snug'>
          {debate.title}
        </h3>
        <p className='text-sm text-primary'>
          Status:{' '}
          <span className='font-semibold text-accent'>{debate.status}</span>
        </p>
      </div>

      {/* Topic */}
      {debate.topic && (
        <p className='text-sm font-semibold text-primary text-center mb-3'>
          {debate.topic}
        </p>
      )}

      {/* Meta — fixed 3-column grid so nothing clips */}
      <div className='grid grid-cols-3 items-center mb-3'>
        <span className='flex flex-col items-center gap-1 text-success font-semibold text-xs'>
          <Users size={15} />
          {debate.participants?.length || 0}
        </span>
        <span className='flex flex-col items-center gap-1 text-secondary font-semibold text-xs'>
          <MessageSquare size={15} />
          {debate.arguments?.length || 0}
        </span>
        <span className='flex flex-col items-center gap-1 text-accent font-semibold text-xs text-center'>
          <Clock size={15} />
          {debate.createdAt
            ? formatDistanceToNow(new Date(debate.createdAt), { addSuffix: true })
            : 'Unknown'}
        </span>
      </div>

      {/* Creator */}
      <small className='text-info text-xs'>
        Created by:{' '}
        <strong className='text-warning'>{debate.creator?.username || 'Unknown'}</strong>
      </small>
    </div>
  );
};

export default DebateCard;
