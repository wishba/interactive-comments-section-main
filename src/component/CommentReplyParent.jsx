import React from 'react'
import CommentReply from './CommentReply'
import data from './data/data.json'

function CommentReplyParent() {
  return (
    <>
      {data.comments.map((comment, index) => (
        <div key={data.comments[index].id}>
          <div>
            <p>index: {index}</p>
          </div>
          <CommentReply commentIndex={index} />
        </div>
      ))}
    </>
  )
}

export default CommentReplyParent