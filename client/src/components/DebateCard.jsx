import { MessageSquare , Users, Clock } from "lucide-react"
import { formatDistanceToNow } from 'date-fns';


const DebateCard = ({debate}) => {
  return (
    <div className="card-body w-full ">
        <div className="flex flex-col items-center gap-3">
            <h3 className="card-title font-bold text-xl text-secondary underline">{debate.title}</h3>
            <p className="text- md text-primary">
                Status : {' '}
                <span className="font-semibold text-accent ">
                    {debate.status}
                </span>
            </p>
        </div>
        <p className="text-lg font-semibold text-primary">{debate.topic}</p>

        <div className="flex justify-around items-center mt-3" >
              <span className="flex flex-col gap-2 text-success font-semibold" >
                <Users size={16} />
                {debate.participants.length}
              </span>
              <span  className="flex flex-col gap-2 text-secondary font-semibold" >
                <MessageSquare size={16} />
                {debate.arguments.length}
              </span>
              <span  className="flex flex-col gap-2 text-accent font-semibold" >
                <Clock size={16} />
                {formatDistanceToNow(new Date(debate.createdAt.$date), { addSuffix: true })}
              </span>
        </div>

        <div >
            <small className=" text-info">
                Created by : <strong className="text-warning">{debate.creator.username || 'ddgwgwgrwrg'}</strong>
            </small>
        </div>
    </div>
  )
}

export default DebateCard