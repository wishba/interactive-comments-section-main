import React from 'react'
import data from './data/data.json'

function CommentReply(props) {
  return (
    <>
      {data.comments[props.commentIndex].replies.map(reply => (
        <div key={reply.id} className='comment__container comment__container--reply'>
          <p className='comment__score'>{reply.score}</p>

          <div className='comment__head'>
            <picture>
              <source type="image/webp" srcSet={reply.user.image.webp} />
              <source type="image/png" srcSet={reply.user.image.png} />
              <img src={reply.user.image.png} alt="user profile picture" />
            </picture>
            <p>{reply.user.username}</p>
            <p>{reply.createdAt}</p>
          </div>

          <p className='comment__reply'>Reply</p>

          <p className='comment__content'>
            <span>@{reply.replyingTo}</span>
            {reply.content}
          </p>
        </div>
      ))}
    </>
  )
}

export default CommentReply