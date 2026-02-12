import { MessageSquare , Users, Clock } from "lucide-react"
import { formatDistanceToNow } from 'date-fns';


const DebateCard = ({debate}) => {
  console.log('Debate id', debate._id);
  console.log("creator:", debate.creator);
  if(!debate) return null
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
                {debate.participants?.length || 0}
              </span>
              <span  className="flex flex-col gap-2 text-secondary font-semibold" >
                <MessageSquare size={16} />
                {debate.arguments?.length || 0}
              </span>
              <span  className="flex flex-col gap-2 text-accent font-semibold" >
                <Clock size={16} />
                {debate.createdAt
                    ? formatDistanceToNow(new Date(debate.createdAt), {
                        addSuffix: true,
                    })
                    : "Unknown time"
                }
              </span>
        </div>

        <div >
            <small className=" text-info">
                Created by : <strong className="text-warning">{debate.creator?.username || 'ddgwgwgrwrg'}</strong>
            </small>
        </div>
    </div>
  )
}

export default DebateCard