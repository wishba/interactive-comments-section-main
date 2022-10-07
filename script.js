fetch('data.json')
  .then(res => res.json())
  .then(data => {
    appendData(data)
  })

// make sorted array of localStorage key
let keyArray = []
for (let index = 0; index < localStorage.length; index++) {
  const storageKey = localStorage.key(index)
  keyArray.push(storageKey)
}
let shortedKeyArray = keyArray.sort().reverse()

function appendData(data) {
  let commentsContainer = document.getElementById('comments')

  // loop through shortedKeyArray, render sorted localStorage
  for (const iterator of shortedKeyArray) {
    let getStorage = localStorage.getItem(iterator)
    let StorageObject = JSON.parse(getStorage)
    let localStorageContainer = document.createElement('div')
    localStorageContainer.innerHTML = `
      <picture>
        <source type="image/webp" srcset="${StorageObject.user.image.webp}">
        <source type="image/png" srcset="${StorageObject.user.image.png}">
        <img src="${StorageObject.user.image.png}" alt="user profile picture">
      </picture>
      <p>${StorageObject.user.username}</p>
      <p>${StorageObject.content}</p>
      <p>${StorageObject.score}</p>
    `
    commentsContainer.appendChild(localStorageContainer)
  }

  // retrieving data from json
  for (const dataComments of data.comments) {

    // comments
    let comment = document.createElement('div')
    comment.innerHTML = `
      <p>${dataComments.user.username}</p>
      <p>${dataComments.createdAt}</p>
      <p>${dataComments.content}</p>
      <p>${dataComments.score}</p>
    `
    commentsContainer.appendChild(comment)

    // comment replies
    if (dataComments.replies.length == 0) {
      let commentReply = document.createElement('div')
      commentReply.className = 'reply'
      commentReply.innerHTML = `
        <p>empty</p>
      `
      commentsContainer.appendChild(commentReply)
    } else {
      for (const dataReplies of dataComments.replies) {
        let commentReply = document.createElement('div')
        commentReply.className = 'reply'
        commentReply.innerHTML = `
          <p>${dataReplies.user.username}</p>
          <p>@${dataReplies.replyingTo}</p>
          <p>${dataReplies.content}</p>
          <p>${dataReplies.score}</p>
        `
        commentsContainer.appendChild(commentReply)
      }
    }
  }
}

// store data to localStorage
async function handleSubmit() {
  // event.preventDefault()

  const res = await fetch('data.json')
  const data = await res.json()

  let userName = data.currentUser.username
  let png = data.currentUser.image.png
  let webp = data.currentUser.image.webp

  let timeStamp = Date.now()
  const commentObjIn = {
    content: document.getElementById('commentInput').value,
    score: 0,
    user: {
      'image': {
        'png': png,
        'webp': webp
      },
      'username': userName
    },
    replies: []
  }
  const commentJSON = JSON.stringify(commentObjIn)
  localStorage.setItem(timeStamp, commentJSON)
}