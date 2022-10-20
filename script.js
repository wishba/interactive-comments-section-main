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
    storeJSON(data)
  })

function storeJSON(data) {
  for (const dataComment of data.comments) {
    let replyArray = []
    for (const dataReply of dataComment.replies) {
      replyArray.push('key' + dataReply.id)

      const keyIdFromJSON = 'key' + dataReply.id
      const replyObj = {
        content: dataReply.content,
        createdAt: dataReply.createdAt,
        score: {
          totalScore: dataReply.score,
          scoreBy: []
        },
        user: {
          image: {
            png: dataReply.user.image.png,
            webp: dataReply.user.image.webp
          }
        },
        username: dataReply.user.username,
        replies: []
      }
      const replyString = JSON.stringify(replyObj)
      localStorage.setItem(keyIdFromJSON, replyString)
    }

    const keyIdFromJSON = 'key' + dataComment.id
    const commentObj = {
      content: dataComment.content,
      createdAt: dataComment.createdAt,
      score: {
        totalScore: dataComment.score,
        scoreBy: []
      },
      user: {
        image: {
          png: dataComment.user.image.png,
          webp: dataComment.user.image.webp
        }
      },
      username: dataComment.user.username,
      replies: replyArray
    }
    const commentString = JSON.stringify(commentObj)
    localStorage.setItem(keyIdFromJSON, commentString)
  }
}