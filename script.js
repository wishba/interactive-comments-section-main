// === localStorage format ===
// key: keyIdFromJSON or keyTimestamp,
// comments: [
//   {
//    content,
//    createdAt: someTimeAgo,
//    score: {
//      totalScore,
//      scoreBy: [username, ...]
//    },
//    user: {
//      image: {
//        png,
//        webp
//      },
//    username
//    },
//    replies: [keyIdFromJSON or keyTimestamp, ...],
//   }, ...
// ]

// === features ===
// render all data
// send data
// send reply data
// update currentUser data
// delete currentUser data

// === component ===
// comment  
// comment reply  
// comment currentUser  
// form send  
// form reply  
// form update  



fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    storeComment(data)
    storeReply(data)
  })

function keyArray() {
  let storageKey = []
  for (let i = 0; i < localStorage.length; i++) {
    const element = localStorage.key(i)
    storageKey.push(element)
  }
  return storageKey
}

function storeComment(data) {
  for (const comment of data.comments) {
    let replyArray = []
    for (const reply of comment.replies) {
      const replyKey = 'key' + reply.id
      replyArray.push(replyKey)
    }
    const commentKey = 'key' + comment.id
    const commentObj = {
      content: comment.content,
      createdAt: comment.createdAt,
      score: {
        totalScore: comment.score,
        scoreBy: []
      },
      user: {
        image: {
          png: comment.user.image.png,
          webp: comment.user.image.webp
        }
      },
      username: comment.user.username,
      replies: replyArray
    }

    if (!keyArray().includes(commentKey)) {
      const commentJSON = JSON.stringify(commentObj);
      localStorage.setItem(commentKey, commentJSON);
    }
  }
}

function storeReply(data) {
  for (const comment of data.comments) {
    for (const reply of comment.replies) {
      const replyKey = 'key' + reply.id
      const replyObj = {
        content: reply.content,
        createdAt: reply.createdAt,
        score: {
          totalScore: reply.score,
          scoreBy: []
        },
        user: {
          image: {
            png: reply.user.image.png,
            webp: reply.user.image.webp
          }
        },
        username: reply.user.username,
        replies: []
      }

      if (!keyArray().includes(replyKey)) {
        const replyJSON = JSON.stringify(replyObj);
        localStorage.setItem(replyKey, replyJSON);
      }
    }
  }
}

const formSend = document.getElementById('formSend')
formSend.addEventListener('submit', (e) => {
  e.preventDefault()

  const keyIdFromJSON = 'key5'
  const commentObj = {
    content: 'content',
    createdAt: 'createdAt',
    score: {
      totalScore: 'score',
      scoreBy: []
    },
    user: {
      image: {
        png: 'image.png',
        webp: 'image.webp'
      }
    },
    username: 'username',
    replies: 'replyArray'
  }
  const commentString = JSON.stringify(commentObj)
  localStorage.setItem(keyIdFromJSON, commentString)
})