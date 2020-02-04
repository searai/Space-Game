
// function addScores(){
//     fetch("/getAllComments")
//     .then(response=>response.json())
//     .then(comments=>{
//         comments.forEach(comment=>{
//             const commentNode = template.content.cloneNode(true)
//             commentNode.querySelector("#author").innerHTML =comment.author
//             commentNode.querySelector("#body").innerHTML = comment.body
//             forum.appendChild(commentNode)
//         })
//     })

// }

document.querySelector("#test").addEventListener("click", ()=>{
    fetch("http://localhost:3000/data")
    .then(response=>console.log(response))
   
})
