import React from 'react'
import CommentReply from './CommentReply'
import data from './data/data.json'

function CommentReplyParent() {
  return (
    <>
      {data.comments.map((comment, index) => (
        <div>
          <p>index: {index}</p>
          <CommentReply commentIndex={index} />
        </div>
      ))}
    </>
  )
}

export default CommentReplyParent