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

//getVideos
export const getVideosFromServer = async (data, header) => {
    console.log(9, header)
    return await wrapper("get", `${BASE_URL}/api/v1/video/getVideosFromServer`,{}, header)
}

//deleteVideoFromServer
export const deleteVideoFromServer = async (data, header) => {
    console.log(9, header)
    return await wrapper("delete", `${BASE_URL}/api/v1/video/delVideoFromServer`,{}, header)
}

