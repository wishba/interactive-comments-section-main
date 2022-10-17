fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    jsonData(data)
    storageData(data)
    formData(data)
    submitData(data)
  })

const renderedComment = document.getElementById('comments')

// render data from local JSON
function jsonData(data) {
  const dataComments = data.comments
  for (const comment of dataComments) {
    let div = document.createElement('div')
    div.innerHTML = `
      <p>${comment.score}</p>
      <picture>
        <source srcset="${comment.user.image.webp}" type="image/webp">
        <img src="${comment.user.image.png}" alt="profile picture">
      </picture>
      <p>${comment.user.username}</p>
      <p>${comment.createdAt}</p>
      <p>Reply</p>
      <p>${comment.content}</p>
      <hr>
    `
    renderedComment.appendChild(div)

    const dataReply = comment.replies
    for (const reply of dataReply) {
      let div = document.createElement('div')
      div.innerHTML = `
        <p>${reply.score}</p>
        <picture>
          <source srcset="${reply.user.image.webp}" type="image/webp">
          <img src="${reply.user.image.png}" alt="profile picture">
        </picture>
        <p>${reply.user.username}</p>
        <p>${reply.createdAt}</p>
        <p>Reply</p>
        <p>
          <span>@${reply.replyingTo}</span>
          ${reply.content}
        </p>
        <hr>
      `
      renderedComment.appendChild(div)
    }
  }
}

// render from local storage
function storageData(data) {
  const imagePNG = data.currentUser.image.png
  const imageWebp = data.currentUser.image.webp
  const name = data.currentUser.username

  // store data to local storage
  const storeObject = {
    id: 'test id',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    createdAt: 'some time ago',
    score: 0,
    user: {
      image: {
        png: imagePNG,
        webp: imageWebp
      },
      username: name
    },
    replies: []
  };
  const storageJSON = JSON.stringify(storeObject);
  localStorage.setItem("testKey", storageJSON);

  // retrieving data from local storage
  let storageString = localStorage.getItem("testKey");
  let storageValue = JSON.parse(storageString);

  // create element
  const storageComment = document.createElement("div");
  storageComment.innerHTML = `
    <p>${storageValue.score}</p>
    <picture>
      <source srcset="${storageValue.user.image.webp}" type="image/webp">
      <img src="${storageValue.user.image.png}" alt="profile picture">
    </picture>
    <p>${storageValue.user.username}</p>
    <p>${storageValue.createdAt}</p>
    <p>Reply</p>
    <p>${storageValue.content}</p>
    <hr>
  `

  // render element place it on top
  renderedComment.insertBefore(storageComment, renderedComment.children[0]);
}

// form section
function formData(data) {
  const userPicture = document.getElementById('userPicture')
  userPicture.innerHTML = `
    <source srcset="${data.currentUser.image.webp}" type="image/webp">
    <img src="${data.currentUser.image.png}" alt="profile picture">
  `
}

// submit data
function submitData(data) {
  document.getElementById('form').onsubmit = function (e) {
    console.log('submitted');
    console.log(data);
    e.preventDefault()
  }
}