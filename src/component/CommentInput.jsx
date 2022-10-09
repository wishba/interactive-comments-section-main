import React, { useEffect, useState } from 'react'
import data from './data/data.json'

function CommentInput() {
  const [content, setContent] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem('keyContent')
    const initialValue = JSON.parse(saved)
    return initialValue || ''
  })

  useEffect(() => {
    // storing input content
    localStorage.setItem("keyContent", JSON.stringify(content))
  }, [content])

  return (
    <form
      className='form'
      onSubmit={(event) => event.preventDefault()}
    >
      <picture className='form__picture'>
        <source type="image/webp" srcSet={data.currentUser.image.webp} />
        <source type="image/png" srcSet={data.currentUser.image.png} />
        <img src={data.currentUser.image.png} alt="user profile picture" />
      </picture>
      <textarea
        onChange={(e) => setContent(e.target.value)}
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