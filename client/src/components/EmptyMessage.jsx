import React from 'react'
import { MessageSquare } from 'lucide-react'
const EmptyMessage = () => {
  return (
    <div className="card w-96 bg-base-100 card-xs shadow-sm border">
        <div className="card-body">
            <h2 className="card-title">
                <MessageSquare size={20} />
                No debates yet
            </h2>
            <p>Be the first to create a debate!</p>
            
        </div>
    </div>
    
  )
}

export default EmptyMessage