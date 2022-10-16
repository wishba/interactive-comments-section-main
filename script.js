fetch('data.json')
  .then((response) => response.json())
  .then((data) => appendData(data))

const renderedComment = document.getElementById('comments')

function appendData(data) {
  const dataComments = data.comments
  for (const comment of dataComments) {
    console.log(comment)
    let div = document.createElement('div')
    div.innerHTML = `
      <p>${comment.score}</p>
      <picture>
        <source srcset="${comment.user.image.webp}" type="image/webp">
        <img src="${comment.user.image.png}" alt="profile picture">
      </picture>
      <p>${comment.user.username}</p>
      <p>${comment.createdAt}</p>
      <p>Reply</p>
      <p>${comment.content}</p>
      <hr>
    `
    renderedComment.appendChild(div)

    const dataReply = comment.replies
    for (const reply of dataReply) {
      console.log(reply)
      let div = document.createElement('div')
      div.innerHTML = `
        <p>${reply.score}</p>
        <picture>
          <source srcset="${comment.user.image.webp}" type="image/webp">
          <img src="${comment.user.image.png}" alt="profile picture">
        </picture>
        <p>${reply.user.username}</p>
        <p>${reply.createdAt}</p>
        <p>Reply</p>
        <p>
          <span>@${reply.replyingTo}</span>
          ${reply.content}
        </p>
        <hr>
      `
      renderedComment.appendChild(div)
    }
  }
}