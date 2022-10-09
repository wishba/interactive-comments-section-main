import React from 'react'
import CommentInput from './CommentInput'
import CommentReplyParent from './CommentReplyParent'

function Comment() {
  return (
    <>
      <CommentReplyParent />
      <CommentInput />
    </>
  )
}

export default Comment