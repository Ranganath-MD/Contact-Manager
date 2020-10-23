import Axios from "axios"

const axios = Axios.create({
    baseURL: "",
    headers: {
        "x-auth": localStorage.getItem("token")
    }
})

export default axios