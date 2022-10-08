import React from 'react'
import data from './data/data.json'

function CommentReply(props) {
  return (
    <>
      {data.comments[props.commentIndex].replies.map(reply => (
        <div key={reply.id}>
          <p>{reply.score}</p>

          <picture>
            <source type="image/webp" srcSet={reply.user.image.webp} />
            <source type="image/png" srcSet={reply.user.image.png} />
            <img src={reply.user.image.png} alt="user profile picture" />
          </picture>
          <p>{reply.user.username}</p>
          <p>{reply.createdAt}</p>

          <p>Reply</p>

          <p>@{reply.replyingTo}</p>
          <p>{reply.content}</p>
        </div>
      ))}
    </>
  )
}

export default CommentReply