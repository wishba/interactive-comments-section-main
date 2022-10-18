fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    appendData(data)
  })

const commentContainer = document.getElementById('commentContainer')

function handleReply(e) {
  e.preventDefault()
}

function appendData(data) {
  const div = document.createElement('div')
  const replyInputTxt = data.comments[0].content
  div.innerHTML = `
    <p>${data.comments[0].content}</p>
    <form onsubmit="handleReply(event)">
      <textarea name="" id="" cols="30" rows="10">${replyInputTxt}</textarea>
      <button type="submit">REPLY</button>
    </form>
  `
  commentContainer.appendChild(div)
}