fetch('data.json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('comments').innerHTML = JSON.stringify(data)
  })