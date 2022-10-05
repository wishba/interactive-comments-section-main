fetch('data.json')
  .then(res => res.json())
  .then(data => appendData(data))

function appendData(data) {
  for (const iterator of data.comments) {
    console.log(iterator);
    let comments = document.getElementById('comments')
    let div = document.createElement("div")
    div.innerHTML = `
        <picture>
          <source srcset="${iterator.user.image.webp}" type="image/webp">
          <source srcset="${iterator.user.image.png}" type="image/png"> 
          <img src="${iterator.user.image.png}" alt="profile picture">
        </picture>
        <p>${iterator.user.username}</p>
        <p>${iterator.createdAt}</p>
        <p>${iterator.content}</p>
        <p>${iterator.score}</p>
      `;
    comments.appendChild(div);
  }
}