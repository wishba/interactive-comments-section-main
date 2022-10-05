fetch('data.json')
  .then(res => res.json())
  .then(data => appendData(data))

function appendData(data) {
  let comments = document.getElementById('comments')
  comments.innerHTML = `
    <p>${data.comments[0].user.username}</p>
    <p>${data.comments[0].createdAt}</p>
    <p>${data.comments[0].content}</p>
    <p>${data.comments[0].score}</p>
  `;
}