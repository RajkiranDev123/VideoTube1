import { wrapper } from "./wrapperService";
import { BASE_URL } from "./baseURL"


export const registerUser = async (data, header) => {
    return await wrapper("POST", `${BASE_URL}/api/v1/users/register`, data, header)

}

//fetchAllUsers
export const fetchAllUsers = async (search, gender, status, sort, page, header) => {
 
    return await wrapper("GET", `${BASE_URL}/api/v1/users/getAllUsers?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`, "", header)
}
