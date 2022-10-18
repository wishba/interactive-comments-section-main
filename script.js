fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    appendData(data)
  })

const commentContainer = document.getElementById('commentContainer')

function appendData(data) {
  const comment = document.createElement('div')

  let getStorage = localStorage.getItem("testJSON");
  let storage = JSON.parse(getStorage);

  const commentContent = document.createElement('p')
  if (storage === null) {
    commentContent.innerText = data.comments[0].content
  } else {
    commentContent.innerText = storage.content
  }
  comment.appendChild(commentContent)

  const replyToggle = document.createElement('a')
  replyToggle.setAttribute('href', 'javascript:void(0)')
  replyToggle.innerText = 'Reply'
  comment.appendChild(replyToggle)

  const form = document.createElement('form')
  form.style.display = 'none'
  replyToggle.addEventListener('click', function () {
    form.style.display = 'block'
  })

  const textArea = document.createElement('textarea')
  textArea.setAttribute('cols', '30')
  textArea.setAttribute('rows', '10')
  if (storage === null) {
    textArea.innerText = data.comments[0].content
  } else {
    textArea.innerText = storage.content
  }
  form.appendChild(textArea)

  const replyButton = document.createElement('button')
  replyButton.setAttribute('type', 'submit')
  replyButton.innerText = 'REPLY'
  form.appendChild(replyButton)

  comment.appendChild(form)

  form.addEventListener('submit', function (event) {
    event.preventDefault()

    const inputObj = {
      content: textArea.value
    };
    const input = JSON.stringify(inputObj);
    localStorage.setItem("testJSON", input);

    commentContent.innerText = textArea.value

    form.style.display = 'none'
  })

  commentContainer.appendChild(comment)
}