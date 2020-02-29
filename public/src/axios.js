import axios from "axios"

const instance = axios.create({
    baseURL: process.env.NODE_ENV == "development"? "http://localhost:3000" : "/",
    timeout: 1000,

  });
  
export default instance