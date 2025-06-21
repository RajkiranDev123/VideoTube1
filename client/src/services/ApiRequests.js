import { wrapper } from "./wrapperService";
import { BASE_URL } from "./baseURL"


export const registerUser = async (data, header) => {
    return await wrapper("POST", `${BASE_URL}/api/v1/users/register`, data, header)

}

//login
export const loginUser = async (data) => {

    return await wrapper("POST", `${BASE_URL}/api/v1/users/login`, data)
}


//uploadVideoToServer
export const uploadVideoToServer = async (data, header) => {

    return await wrapper("POST", `${BASE_URL}/api/v1/video/uploadVideoToServer`, data, header)
}
