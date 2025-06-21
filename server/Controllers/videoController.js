import { video } from "../models/videoSchema.js"
import cloudinary from "../config/cloudinary.js"

export const uploadVideo = async (req, res) => {

    try {
        console.log("file",req.file)
        console.log("body",req.body)


        if (!req.file) {
            return res.status(400).json({ message: 'No video file available!' });
        }

        const uploadOptions = {
            resource_type: "video",
            folder: "upload_mp4_videos",

        };

        let cloudinaryResult = await new Promise((resolve, reject) => {

            cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
                uploadOptions,
                (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                }
            );
        });


        // Save video metadata to MongoDB
        const newVideo = new video({
            title: req.body.title || 'Untitled Video',
            description: req.body.description || '',

            cloudinaryUrl: cloudinaryResult.secure_url,
            user: req.body.userId

        });

        const savedVideo = await newVideo.save();

        res.status(200).json({
            message: 'Video uploaded successfully!',
            video: savedVideo,

        });







    } catch (error) {
        console.log("upload error==>", error)
        return res.status(500).json({ message: error.message })
    }
}
