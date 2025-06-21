import axios from "axios"

export const wrapper = async (method, url, body, header) => {

    let config = { method, url, data: body, headers: header ? header : { "Content-Type": "application/json" } }
    console.log("config.headers",config.headers)

    return axios(config) 
        .then(data => {
         

            return data
        }).catch(error => {
          
            return error
        })
}