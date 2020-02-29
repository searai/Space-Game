import axios from "../axios.js"

export function getAllScores(){

    return new Promise((resolve, reject)=>{
        axios.get("/highscore/getAll")
        .then((scores)=>{
            resolve(scores.data)
        })
        .catch(()=>{
            reject()
        })
    })
  
}

export function postScore(score){
    return new Promise((resolve, reject)=>{
        axios.post("/highscore/add",score)
        .then(()=>resolve())
        .catch(()=>reject())
    })
   
}

