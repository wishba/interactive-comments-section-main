fetch('data.json')
  .then(res => res.json())
  .then(data => appendData(data))

function appendData(data) {
  for (const iterator of data.comments) {
    let commentsContainer = document.getElementById('comments')
    let comment = document.createElement("div")
    let commentChild = 'tes'
    comment.innerHTML = `
      <picture>
      <source srcset="${iterator.user.image.webp}" type="image/webp">
      <source srcset="${iterator.user.image.png}" type="image/png"> 
        <img src="${iterator.user.image.png}" alt="profile picture">
      </picture>
      <p>${iterator.user.username}</p>
      <p>${iterator.createdAt}</p>
      <p>${iterator.content}</p>
      <p>${iterator.score}</p>
      <p>${commentChild}</p>
    `;
    commentsContainer.appendChild(comment);
  }

  for (let index = 0; index < data.comments.length; index++) {
    const element = data.comments[index];
    console.log(element.replies.length);
    if (element.replies.length == 0) {
      console.log('empty');
    } else {
      for (let i = 0; i < element.replies.length; i++) {
        const e = element.replies[i];
        console.log(e);
      }
    }
  }
}