
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast"
import { registerUser } from "../services/ApiRequests"
import Loader from '../components/Loader'
const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)


    const navigate = useNavigate()

    const register = async () => {
        // const config = { "Content-Type": "application/json" }
        setLoading(true)
        if (password.length < 9) {
            toast.error("Password must be 9 digits or greater!")
            setLoading(false)

            return
        }

        const response = await registerUser({ email, password })
        if (response?.status === 201) {
            toast.success(response?.data?.message)

            setEmail("")
            setPassword("")
            setLoading(false)
            navigate("/login")
        } else {
            setLoading(false)

            toast.error(response?.response?.data?.message)
        }
    }
    return (
        <div style={{
            display: "flex", justifyContent: "center", background: "linear-gradient(to right, #DECBA4, #3E5151)",
            height: "100vh"
        }}>


            <div
                style={{
                    width: 300, height: 500, background: "linear-gradient(to bottom, #DECBA4, #3E5151)",
                    borderRadius: 4, backgroundColor: "grey", marginTop: 100, display: "flex", flexDirection: "column", justifyContent: "center"
                }}>

                <div style={{ textAlign: "center", fontFamily: "arial" }}>
                    <h3> ➤ Video Tube !</h3>
                </div>
                <div style={{ textAlign: "center", fontFamily: "arial" }}>
                    <p style={{ color: "white" }}> Register Here!</p>
                </div>

                <div>
                    <input onChange={(e) => setEmail(e.target.value)} value={email}
                        style={{ border: "none", outline: "none", padding: 6, borderRadius: 3, width: "280px", margin: 5 }} type='text' placeholder='email' />
                </div>

                <div>
                    <input onChange={(e) => setPassword(e.target.value)} value={password}
                        style={{ border: "none", outline: "none", padding: 6, borderRadius: 3, width: "280px", margin: 5 }} type='password' placeholder='password' />
                </div>

                            {loading&& <p style={{color:"white",display:"flex",justifyContent:"center"}}><Loader/></p>}


                <div style={{ textAlign: "center" }}>
                    <button onClick={() => register()} style={{ border: "none", outline: "none", padding: 3, borderRadius: 4, width: 150, cursor: "pointer", background: "red", color: "white" }}>Create your Account</button>
                </div>

                <div style={{ textAlign: "center" }}>
                    <p style={{ cursor: "pointer", color: "white" }} onClick={() => navigate("/login")}>Go to <span style={{ textDecoration: "underline" }}>Login</span></p>
                </div>



            </div>
        </div>
    )
}

export default Register