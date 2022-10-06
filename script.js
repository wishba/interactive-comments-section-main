fetch('data.json')
  .then(res => res.json())
  .then(data => appendData(data))

// retrieving data from json
function appendData(data) {
  let commentsContainer = document.getElementById('comments')

  for (const dataComments of data.comments) {
    //comments
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

// retrieving data from localStorage
let storedValue = localStorage.getItem('1665065168579')
let storedObj = JSON.parse(storedValue)
for (let i = 0; i < localStorage.length; i++) {
  const storageKey = localStorage.key(i)
  console.log(storageKey);
}

// store data to localStorage
function handleSubmit() {
  event.preventDefault()
  let timeStamp = Date.now()
  const commentObjIn = {
    comment: document.getElementById('commentInput').value
  }
  const commentJSON = JSON.stringify(commentObjIn)
  localStorage.setItem(timeStamp, commentJSON)
}