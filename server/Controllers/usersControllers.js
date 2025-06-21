
import { users } from "../models/usersSchema.js"



//////////////////////////////////////////////// add new user ///////////////////////////////////////////////////////////////
export const userRegister = async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required!" })
    }
    try {
        let user = await users.findOne({ email: email })

        if (user) {
            return res.status(400).json({ message: "user email already exists!" })
        } else {


            const userData = new users({
                email, password
            })

            await userData.save()
            return res.status(201).json({ userData, message: "Account Created!" })
        }
    } catch (error) {

        return res.status(500).json({ message: error.message })
    }
}
///////////////////////////////////////////////////////getAllUsers//////////////////////////////////////////////////////////////////////////
export const getAllUsers = async (req, res) => {
    const search = req.query.search || ""
    const gender = req.query.gender //default is All
    const status = req.query.status //default is all
    const sort = req.query.sort      // default is new

    const dateRange = req.headers["date-range"]
    console.log("dr==>", dateRange)//2025-03-05--2025-03-05
    let start = dateRange?.split("--")[0] + "T00:00:00Z"
    let end = dateRange?.split("--")[1] + "T23:59:59Z"

    const page = req.query.page || 1
    const ITEM_PER_PAGE = 4

    const query = { fname: { $regex: search, $options: "i" } }
    if (gender !== "All") {
        query.gender = gender
    }
    if (status !== "All") {
        query.status = status
    }
    if (dateRange !== "") {
        query.dateCreated = { $gte: start, $lte: end }
    }
    try {
        const totalDocs = await users.countDocuments(query)
        const skip = (page - 1) * ITEM_PER_PAGE
        const pageCount = Math.ceil(totalDocs / ITEM_PER_PAGE)//pageCount is total pages 8/4=2 pages
        const usersData = await users.find(query).skip(skip).limit(ITEM_PER_PAGE).sort({ dateCreated: sort == "new" ? -1 : 1 })

        return res.status(200).json({
            pagination: {
                pageCount
            },
            usersData
        })
    } catch (error) {
        // console.log(error.message)
        return res.status(500).json(error)
    }
}


