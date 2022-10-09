import React from 'react'
import CommentReply from './CommentReply'
import data from './data/data.json'

function CommentReplyParent() {
  return (
    <>
      {data.comments.map((comment, index) => (
        <div key={data.comments[index].id}>
          <div className='comment__container'>
            <p className='comment__score'>{comment.score}</p>

            <div className='comment__head'>
              <picture className='comment__picture'>
                <source type="image/webp" srcSet={comment.user.image.webp} />
                <source type="image/png" srcSet={comment.user.image.png} />
                <img src={comment.user.image.png} alt="user profile picture" />
              </picture>
              <p>{comment.user.username}</p>
              <p>{comment.createdAt}</p>
            </div>

            <p className='comment__reply'>Reply</p>

            <p className='comment__content'>{comment.content}</p>
          </div>
          <CommentReply commentIndex={index} />
        </div>
      ))}
    </>
  )
}

export default CommentReplyParent