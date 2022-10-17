fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    renderJson(data)
    renderStorage(data)
    replyComment(data)
    formSection(data)
    submitLocal(data)
  })

const commentContainer = document.getElementById('comments')

function replyComment(data) {
  const replyForm = `
    <form action="">
    <picture>
      <source srcset="${data.currentUser.image.webp}" type="image/webp">
      <img src="${data.currentUser.image.png}" alt="profile picture">
    </picture>
      <textarea name="" cols="30" rows="10"></textarea>
      <button type="submit">REPLY</button>
    </form>
  `
  return replyForm
}

function replyCommentToggle() {
  console.log('reply clicked');
}

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
      ${replyComment(data)}
      <hr>
    `
    commentContainer.appendChild(div)

    const commentReply = comment.replies
    for (const reply of commentReply) {
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
        ${replyComment(data)}
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

function renderStorage(data) {
  const storageCommentContainer = document.createElement("div");

  for (const key of sortKey()) {
    // console.log(key);
    let getStorage = localStorage.getItem(key);
    let storageData = JSON.parse(getStorage);
    let storageComment = document.createElement("div");
    storageComment.innerHTML = `
      <p>${storageData.score}</p>
      <picture>
        <source srcset="${storageData.user.image.webp}" type="image/webp">
        <img src="${storageData.user.image.png}" alt="profile picture">
      </picture>
      <p>${storageData.user.username}</p>
      <p>${storageData.createdAt}</p>
      <a href="#" onclick="replyCommentToggle()">Reply</a>
      <p>${storageData.content}</p>
      ${replyComment(data)}
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

    let getStorage = localStorage.getItem(timeStamp);
    let storageData = JSON.parse(getStorage);
    const storedComment = document.createElement("div");
    storedComment.innerHTML = `
    <p>${storageData.score}</p>
      <picture>
        <source srcset="${storageData.user.image.webp}" type="image/webp">
        <img src="${storageData.user.image.png}" alt="profile picture">
      </picture>
      <p>${storageData.user.username}</p>
      <p>${storageData.createdAt}</p>
      <p>Reply</p>
      <p>${storageData.content}</p>
      <hr>
    `
    commentContainer.insertBefore(storedComment, commentContainer.children[0]);
  }
}