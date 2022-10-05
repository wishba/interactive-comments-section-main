fetch('data.json')
  .then(res => res.json())
  .then(data => appendData(data))

function appendData(data) {
  let comments = document.getElementById('comments')
  let div = document.createElement("div")
  div.innerHTML = `
    <picture>
      <source srcset="${data.comments[0].user.image.webp}" type="image/webp">
      <source srcset="${data.comments[0].user.image.png}" type="image/png"> 
      <img src="${data.comments[0].user.image.png}" alt="profile picture">
    </picture>
    <p>${data.comments[0].user.username}</p>
    <p>${data.comments[0].createdAt}</p>
    <p>${data.comments[0].content}</p>
    <p>${data.comments[0].score}</p>
  `;
  comments.appendChild(div);

  console.log(data.comments[0]);
  console.log((data.comments).length);
}