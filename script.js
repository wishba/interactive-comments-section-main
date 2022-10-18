fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    appendData(data)
  })

const commentContainer = document.getElementById('commentContainer')

function appendData(data) {
  for (const dataComment of data.comments) {
    const comment = document.createElement('div')

    const key = 'key' + dataComment.id

    let getStorage = localStorage.getItem(key)
    let storage = JSON.parse(getStorage)

    const commentContent = document.createElement('p')
    if (storage === null) {
      commentContent.innerText = dataComment.content
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
    replyToggle.addEventListener('click', () => form.style.display = 'block')

    const textArea = document.createElement('textarea')
    textArea.setAttribute('cols', '30')
    textArea.setAttribute('rows', '10')
    if (storage === null) {
      textArea.innerText = dataComment.content
    } else {
      textArea.innerText = storage.content
    }
    form.appendChild(textArea)

    const replyButton = document.createElement('button')
    replyButton.setAttribute('type', 'submit')
    replyButton.innerText = 'REPLY'
    form.appendChild(replyButton)

    comment.appendChild(form)

    form.addEventListener('submit', (event) => {
      event.preventDefault()

      const inputObj = {
        content: textArea.value
      }
      const input = JSON.stringify(inputObj)
      localStorage.setItem(key, input)

      commentContent.innerText = textArea.value

      form.style.display = 'none'
    })

    commentContainer.appendChild(comment)
  }
}