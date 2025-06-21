import express from "express"

import {
    userRegister, getAllUsers

} from "../Controllers/usersControllers.js"


const router = new express.Router()

router.post("/register", userRegister)


router.get("/getAllUsers", getAllUsers)




export default router