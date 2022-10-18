fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    appendData(data)
  })

const commentContainer = document.getElementById('commentContainer')

function appendData(data) {
  // comment
  const div = document.createElement('div')
  div.innerHTML = `
    <p>${data.comments[0].content}</p>
  `

  // reply form
  const form = document.createElement('form')
  form.addEventListener('submit', function (event) {
    event.preventDefault()
  })
  form.innerHTML = `
    <textarea name="" id="" cols="30" rows="10">${data.comments[0].content}</textarea>
    <button type="submit">REPLY</button>
  `
  div.appendChild(form)

  // append
  commentContainer.appendChild(div)
}