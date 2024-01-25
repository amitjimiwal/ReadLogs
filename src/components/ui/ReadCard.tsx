import React from 'react'
import Read from '@/models/read'
const ReadCard :React.FC<Read> = ({title,readUrl,isRead,priority,userID}) => {
  return (
    <div>
      <div>
          {title} {isRead} {priority} {userID}
      </div>        
      <div>
          {readUrl}
      </div>
    </div>
  )
}

export default ReadCard
