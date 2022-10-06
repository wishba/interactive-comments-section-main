fetch('data.json')
  .then(res => res.json())
  .then(data => appendData(data))

function appendData(data) {
  let commentsContainer = document.getElementById('comments')

  for (const dataComments of data.comments) {
    //comments
    let comment = document.createElement('div')
    comment.innerHTML = `
      <p>${dataComments.user.username}</p>
    `
    commentsContainer.appendChild(comment)

    // comment replies
    if (dataComments.replies.length == 0) {
      let commentReply = document.createElement('div')
      commentReply.innerHTML = `
        <p>empty</p>
      `
      commentsContainer.appendChild(commentReply)
    } else {
      for (const dataReplies of dataComments.replies) {
        let commentReply = document.createElement('div')
        commentReply.innerHTML = `
          <p>${dataReplies.user.username}</p>
          <p>@${dataReplies.replyingTo}</p>
        `
        commentsContainer.appendChild(commentReply)
      }
    }





    // console.log(comments.replies.length);
    // if (comments.replies.length == 0) {
    //   console.log('empty');
    //   commentReply.innerHTML = 'empty'
    // } else {
    //   for (const replies of comments.replies) {
    //     console.log('reply');
    //     commentReply.innerHTML = 'reply'
    //   }
    // }
    // commentsContainer.appendChild(commentReply)
  }

  // for (let index = 0; index < data.comments.length; index++) {
  //   const element = data.comments[index]
  //   // console.log(element.replies.length);

  //   if (element.replies.length == 0) {
  //     // console.log('empty');

  //     let commentReply = document.createElement("div")
  //     commentReply.innerHTML = 'empty'
  //     commentsReplyContainer.appendChild(commentReply)
  //   } else {

  //     for (let i = 0; i < element.replies.length; i++) {
  //       const e = element.replies[i];
  //       // console.log('reply name');

  //       let commentReply = document.createElement("div")
  //       commentReply.innerHTML = 'reply name'
  //       commentsReplyContainer.appendChild(commentReply)
  //     }
  //   }
  // }

  // let commentsContainer = document.getElementById('comments')
  // for (const iterator of data.comments) {
  //   let comment = document.createElement("div")
  //   comment.innerHTML = `
  //     <picture>
  //     <source srcset="${iterator.user.image.webp}" type="image/webp">
  //     <source srcset="${iterator.user.image.png}" type="image/png"> 
  //       <img src="${iterator.user.image.png}" alt="profile picture">
  //     </picture>
  //     <p>${iterator.user.username}</p>
  //     <p>${iterator.createdAt}</p>
  //     <p>${iterator.content}</p>
  //     <p>${iterator.score}</p>
  //   `
  //   commentsContainer.appendChild(comment)
  // }
}