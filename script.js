fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    jsonData(data)
    storageData()
    formData(data)
    submitData(data)
  })

const commentContainer = document.getElementById('comments')

// render data from local JSON
function jsonData(data) {
  // render comments
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

    // render replies
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

// render from local storage
function storageData() {

  const storageCommentContainer = document.createElement("div");

  // retrieving data from local storage
  for (const storageKey of sortKey()) {
    let storageString = localStorage.getItem(storageKey);
    let storageValue = JSON.parse(storageString);

    // create element
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

  // render element place it on top
  commentContainer.insertBefore(storageCommentContainer, commentContainer.children[0]);
}

// form
function formData(data) {
  const userPicture = document.getElementById('userPicture')
  userPicture.innerHTML = `
    <source srcset="${data.currentUser.image.webp}" type="image/webp">
    <img src="${data.currentUser.image.png}" alt="profile picture">
  `
}

// form submit data
function submitData(data) {
  document.getElementById('form').onsubmit = function (e) {
    e.preventDefault()

    let timeStamp = Date.now()

    // store data to local storage
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

    // create element
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

    // render element place it on top
    commentContainer.insertBefore(storedComment, commentContainer.children[0]);
  }
}