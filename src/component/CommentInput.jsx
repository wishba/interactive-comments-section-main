import React from 'react'
import data from './data/data.json'

function CommentInput() {
  const handleSubmit = event => event.preventDefault()

  return (
    <form className='form' onSubmit={handleSubmit}>
      <picture className='form__picture'>
        <source type="image/webp" srcSet={data.currentUser.image.webp} />
        <source type="image/png" srcSet={data.currentUser.image.png} />
        <img src={data.currentUser.image.png} alt="user profile picture" />
      </picture>
      <textarea className='form__text-input' name="" id="" cols="" rows=""></textarea>
      <button className='form__button-input' type="submit">SEND</button>
    </form>
  )
}

export default CommentInput