import React from 'react'
import CommentReply from './CommentReply'
import data from './data/data.json'

function CommentReplyParent() {
  return (
    <>
      {data.comments.map((comment, index) => (
        <div key={data.comments[index].id}>
          <div>
            <p>{comment.score}</p>

            <picture>
              <source type="image/webp" srcSet={comment.user.image.webp} />
              <source type="image/png" srcSet={comment.user.image.png} />
              <img src={comment.user.image.png} alt="user profile picture" />
            </picture>
            <p>{comment.user.username}</p>
            <p>{comment.createdAt}</p>

            <p>Reply</p>

            <p>{comment.content}</p>
          </div>
          <CommentReply commentIndex={index} />
        </div>
      ))}
    </>
  )
}

export default CommentReplyParent