fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    renderJson(data)
    renderStorage()
    formSection(data)
    submitLocal(data)
  })

const commentContainer = document.getElementById('comments')

function renderJson(data) {
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
    commentContainer.appendChild(div)

    const dataReply = comment.replies
    for (const reply of dataReply) {
      let div = document.createElement('div')
      div.innerHTML = `
        <p>${reply.score}</p>
        <picture>
          <source srcset="${reply.user.image.webp}" type="image/webp">
          <img src="${reply.user.image.png}" alt="profile picture">
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
      commentContainer.appendChild(div)
    }
  }
}

function sortKey() {
  let keyArray = []
  for (let index = 0; index < localStorage.length; index++) {
    const storageKey = localStorage.key(index)
    keyArray.push(storageKey)
  }
  let shortedKeyArray = keyArray.sort().reverse()
  return shortedKeyArray
}

function renderStorage() {

  const storageCommentContainer = document.createElement("div");

  for (const storageKey of sortKey()) {
    let storageString = localStorage.getItem(storageKey);
    let storageValue = JSON.parse(storageString);

    let storageComment = document.createElement("div");
    storageComment.innerHTML = `
      <p>${storageValue.score}</p>
      <picture>
        <source srcset="${storageValue.user.image.webp}" type="image/webp">
        <img src="${storageValue.user.image.png}" alt="profile picture">
      </picture>
      <p>${storageValue.user.username}</p>
      <p>${storageValue.createdAt}</p>
      <p>Reply</p>
      <p>${storageValue.content}</p>
      <hr>
    `
    storageCommentContainer.appendChild(storageComment)
  }

  commentContainer.insertBefore(storageCommentContainer, commentContainer.children[0]);
}

function formSection(data) {
  const userPicture = document.getElementById('userPicture')
  userPicture.innerHTML = `
    <source srcset="${data.currentUser.image.webp}" type="image/webp">
    <img src="${data.currentUser.image.png}" alt="profile picture">
  `
}

function submitLocal(data) {
  document.getElementById('form').onsubmit = function (e) {
    e.preventDefault()

    let timeStamp = Date.now()

    let inputContent = document.getElementById('inputContent').value
    let inputPng = data.currentUser.image.png
    let inputWebp = data.currentUser.image.webp
    let inputUsername = data.currentUser.username
    const formInput = {
      id: 'test id',
      content: inputContent,
      createdAt: 'some time ago',
      score: 0,
      user: {
        image: {
          png: inputPng,
          webp: inputWebp
        },
        username: inputUsername
      },
      replies: []
    };
    const formJson = JSON.stringify(formInput);
    localStorage.setItem(timeStamp, formJson);

    let getData = localStorage.getItem(timeStamp);
    let objectData = JSON.parse(getData);

    const storedComment = document.createElement("div");
    storedComment.innerHTML = `
    <p>${objectData.score}</p>
      <picture>
        <source srcset="${objectData.user.image.webp}" type="image/webp">
        <img src="${objectData.user.image.png}" alt="profile picture">
      </picture>
      <p>${objectData.user.username}</p>
      <p>${objectData.createdAt}</p>
      <p>Reply</p>
      <p>${objectData.content}</p>
      <hr>
    `

    commentContainer.insertBefore(storedComment, commentContainer.children[0]);
  }
}