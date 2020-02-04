const store = {
    level: 1,
    score: 0,
    baseURL : (process.env.NODE_ENV == "developement")? "http://localhost:3000" :"/"
}

export default store