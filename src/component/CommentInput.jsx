import React, { useState } from 'react'
import data from './data/data.json'

function CommentInput() {
  const [contentInput, setContentInput] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    //store to localStorage
    const commentObject = {
      id: 'tes',
      content: contentInput,
      createdAt: 'tes',
      score: 'tes',
      user: 'tes',
      image: 'tes',
      png: 'tes',
      webp: 'tes',
      username: 'tes',
      replies: 'tes' // (later filled with array of localStorage keys)
    }
    const commentJSON = JSON.stringify(commentObject)
    localStorage.setItem('testKey', commentJSON)
  }

  return (
    <form
      className='form'
      onSubmit={handleSubmit}
    >
      <picture className='form__picture'>
        <source type="image/webp" srcSet={data.currentUser.image.webp} />
        <source type="image/png" srcSet={data.currentUser.image.png} />
        <img src={data.currentUser.image.png} alt="user profile picture" />
      </picture>
      <textarea
        onChange={(e) => setContentInput(e.target.value)}
        className='form__text-input'
        name=""
        cols=""
        rows=""
      ></textarea>
      <button className='form__button-input' type="submit">SEND</button>
    </form>
  )
}

export default CommentInput