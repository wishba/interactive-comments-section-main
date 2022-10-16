fetch('data.json')
  .then((response) => response.json())
  .then((data) => appendData(data))

const renderedComment = document.getElementById('comments')

// render data from local JSON
function appendData(data) {
  const dataComments = data.comments
  for (const comment of dataComments) {
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

// store data to local storage
const storeObject = {
  id: 'test id',
  content: 'test content'
};
const storageJSON = JSON.stringify(storeObject);
localStorage.setItem("testKey", storageJSON);

// retrieving data from local storage
let storageString = localStorage.getItem("testKey");
let storageValue = JSON.parse(storageString);

// create element
const storageComment = document.createElement("div");
storageComment.innerHTML = `
  <p>${storageValue.id}</p>
  <p>${storageValue.content}</p>
`

// render element place it on top
renderedComment.insertBefore(storageComment, renderedComment.children[0]);
