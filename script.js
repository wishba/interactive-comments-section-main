fetch('data.json')
  .then((response) => response.json())
  .then((data) => appendData(data))

function appendData(data) {
  const comment = data.comments
  for (const commentList of comment) {
    console.log(commentList);

    const reply = commentList.replies
    for (const replyList of reply) {
      console.log(replyList);
    }
  }
}