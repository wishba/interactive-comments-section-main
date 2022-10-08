import React from 'react'
import data from './data/data.json'

function Comment() {
  return (
    <div>
      {data.comments.map(comment => (
        <div key={comment.id}>
          {console.log(comment.replies)}
          <p>{comment.id}</p>

          {comment.replies.map(reply => (
            <div key={reply.id}>
              {console.log(reply.id)}
              <p>{reply.id}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Comment