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
      <picture>
        <source type="image/webp" srcset="${dataComments.user.image.webp}">
        <source type="image/png" srcset="${dataComments.user.image.png}">
        <img src="${dataComments.user.image.png}" alt="user profile picture">
      </picture>
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
          <picture>
            <source type="image/webp" srcset="${dataReplies.user.image.webp}">
            <source type="image/png" srcset="${dataReplies.user.image.png}">
            <img src="${dataReplies.user.image.png}" alt="user profile picture">
          </picture>
          <p>${dataReplies.user.username}</p>
          <p>${dataReplies.createdAt}</p>
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

  // data user
  let userName = data.currentUser.username
  let png = data.currentUser.image.png
  let webp = data.currentUser.image.webp

  // live time
  let timeStamp = Date.now()
  let objectDate = new Date();
  let year = objectDate.getFullYear();
  let month = objectDate.getMonth();
  let day = objectDate.getDate();
  let hour = objectDate.getHours();
  let minute = objectDate.getMinutes();

  const commentObjIn = {
    content: document.getElementById('commentInput').value,
    createdAt: {
      'year': year,
      'month': month,
      'day': day,
      'hour': hour,
      'minute': minute
    },
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



// let objectDate = new Date();

// let minute = objectDate.getMinutes();
// let hour = objectDate.getHours();
// let day = objectDate.getDate();
// let month = objectDate.getMonth();
// let year = objectDate.getFullYear();

// let storageMinute = 57
// let storageHour = 18
// let storageDay = 7
// let storageMonth = 10
// let storageYear = 2022

// if (year - storageYear > 0) {
//   console.log(year - storageYear + ' year ago');
// } else if (month - storageMonth + 1 > 0) {
//   console.log(month - storageMonth + 1 + ' month ago');
// } else if (day - storageDay > 0) {
//   console.log(day - storageDay + ' day ago');
// } else if (hour - storageHour > 0) {
//   console.log(hour - storageHour + ' hour ago');
// } else if (minute - storageMinute > 0) {
//   console.log(minute - storageMinute + ' minute ago');
// } else {
//   console.log('just now');
// }