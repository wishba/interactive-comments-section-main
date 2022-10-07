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
  // render profile picture in form  
  let userPicture = document.getElementById('userPicture')
  userPicture.innerHTML = `
    <source type="image/webp" srcset="${data.currentUser.image.webp}">
    <source type="image/png" srcset="${data.currentUser.image.png}">
    <img src="${data.currentUser.image.png}" alt="user profile picture">
  `

  let commentsContainer = document.getElementById('comments')

  // render sorted localStorage
  for (const iterator of shortedKeyArray) {
    let getStorage = localStorage.getItem(iterator)
    let StorageObject = JSON.parse(getStorage)
    let localStorageContainer = document.createElement('div')

    // count time
    let objectDate = new Date();
    let yearNow = objectDate.getFullYear();
    let monthNow = objectDate.getMonth();
    let dayNow = objectDate.getDate();
    let hourNow = objectDate.getHours();
    let minuteNow = objectDate.getMinutes();
    let commentTime = ''
    if (yearNow - StorageObject.createdAt.year > 0) {
      commentTime = yearNow - StorageObject.createdAt.year + ' year ago'
    } else if (monthNow - StorageObject.createdAt.month > 0) {
      commentTime = monthNow - StorageObject.createdAt.month + ' month ago'
    } else if (dayNow - StorageObject.createdAt.day > 0) {
      commentTime = dayNow - StorageObject.createdAt.day + ' day ago'
    } else if (hourNow - StorageObject.createdAt.hour > 0) {
      commentTime = hourNow - StorageObject.createdAt.hour + ' hour ago'
    } else if (minuteNow - StorageObject.createdAt.minute > 0) {
      commentTime = minuteNow - StorageObject.createdAt.minute + ' minute ago'
    } else {
      commentTime = 'just now'
    }

    localStorageContainer.innerHTML = `
      <picture>
        <source type="image/webp" srcset="${StorageObject.user.image.webp}">
        <source type="image/png" srcset="${StorageObject.user.image.png}">
        <img src="${StorageObject.user.image.png}" alt="user profile picture">
      </picture>
      <p>${StorageObject.user.username}</p>
      <p>${commentTime}</p>
      <p>${StorageObject.content}</p>
      <p>${StorageObject.score}</p>
    `
    commentsContainer.appendChild(localStorageContainer)
  }

  // render json
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
    if (dataComments.replies.length > 0) {
      //   let commentReply = document.createElement('div')
      //   commentReply.className = 'reply'
      //   commentReply.innerHTML = `
      //     <p>empty</p>
      //   `
      //   commentsContainer.appendChild(commentReply)
      // } else {
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