fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    appendData(data)
  })

const commentContainer = document.getElementById('commentContainer')

function appendData(data) {
  const comment = document.createElement('div')
  comment.innerHTML = `
    <p>${data.comments[0].user.username}</p>
    <p>${data.comments[0].content}</p>
  `

  const form = document.createElement('form')

  const textArea = document.createElement('textarea')
  textArea.setAttribute('cols', '30')
  textArea.setAttribute('rows', '10')
  let text = localStorage.getItem("testJSON");
  let obj = JSON.parse(text);
  if (obj === null) {
    textArea.innerText = data.comments[0].content
  } else {
    textArea.innerText = obj.content
  }
  form.appendChild(textArea)

  const replyButton = document.createElement('button')
  replyButton.setAttribute('type', 'submit')
  replyButton.innerText = 'REPLY'
  form.appendChild(replyButton)

  comment.appendChild(form)

  form.addEventListener('submit', function (event) {
    event.preventDefault()
    const myObj = {
      content: textArea.value
    };
    const myJSON = JSON.stringify(myObj);
    localStorage.setItem("testJSON", myJSON);
  })

  commentContainer.appendChild(comment)
}