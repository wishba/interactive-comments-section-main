// === localStorage format ===
// key: keyIdFromJSON or keyTimestamp,
// comments: [
//   {
//    content,
//    createdAt: someTimeAgo,
//    score: {
//      totalScore,
//      whoGiveScore: [username, ...]
//    },
//    user: {
//      image: {
//        png,
//        webp,
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
  .then((data) => appendData(data))

function appendData(data) {
  const comment = data.comments
  for (const commentList of comment) {
    console.log(commentList);

    const reply = commentList.replies
    for (const replyList of reply) {
      console.log(replyList);
    }
  }
}