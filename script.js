fetch('data.json')
  .then((response) => response.json())
  .then((data) => appendData(data))

function appendData(data) {
  const comments = document.getElementById('comments')

  const comment = data.comments
  for (const commentList of comment) {
    console.log(commentList)
    let div = document.createElement('div')
    div.innerHTML = commentList.id
    comments.appendChild(div)

    const reply = commentList.replies
    for (const replyList of reply) {
      console.log(replyList)
      let div = document.createElement('div')
      div.innerHTML = replyList.id
      comments.appendChild(div)
    }
  }
}