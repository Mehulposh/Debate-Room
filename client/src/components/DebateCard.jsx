import { MessageSquare , Users, Clock } from "lucide-react"
import { formatDistanceToNow } from 'date-fns';

const debate = {
  "_id": {
    "$oid": "698ad3b1c211d8fcacb0ba87"
  },
  "title": "Debate title : Use of AI in Coding",
  "topic": "Use of AI in Coding",
  "creator": {
    "$oid": "698acff36612e76c49f2f701"
  },
  "participants": [
    {
      "user": {
        "$oid": "698acff36612e76c49f2f701"
      },
      "username": "Mehul Poshattiwar",
      "side": "pro",
      "_id": {
        "$oid": "698ad3b1c211d8fcacb0ba88"
      },
      "joinedAt": {
        "$date": "2026-02-10T06:44:01.569Z"
      }
    }
  ],
  "status": "waiting",
  "timeLimit": 300,
  "rules": {
    "allowInterruptions": false,
    "maxArgumentLength": 500
  },
  "speakerTimes": [],
  "arguments": [],
  "createdAt": {
    "$date": "2026-02-10T06:44:01.570Z"
  },
  "__v": 0
}


const DebateCard = () => {
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