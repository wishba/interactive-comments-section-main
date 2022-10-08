import React from 'react'
import data from './data/data.json'

function CommentReply(props) {
  return (
    <>
      {
        data.comments[props.index].replies.map(reply => (
          <p key={reply.id}>{reply.id}</p>
        ))
      }
    </>
  )
}

export default CommentReply