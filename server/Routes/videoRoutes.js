import express from "express"
import { uploadVideo } from "../Controllers/videoController.js"
import {upload} from "../middlewares/multer.js"


const router = new express.Router()

router.post("/uploadVideoToServer",upload.single('videoFile'), uploadVideo)


// router.post("/login", userLogin)




export default router