
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast"
import { registerUser } from "../services/ApiRequests"
const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const register = async () => {
        // const config = { "Content-Type": "application/json" }

        const response = await registerUser({ email, password })
        if (response?.status === 201) {
            toast.success(response?.data?.message)

            setEmail("")
            setPassword("")
        } else {
            toast.error(response?.response?.data?.message)
        }
    }
    return (
        <div style={{ display: "flex", justifyContent: "center", background: "#36454F", height: "100vh" }}>


            <div
                style={{
                    width: 300, height: 500, background: "#C0C0C0",
                    borderRadius: 4, backgroundColor: "grey", marginTop: 100, display: "flex", flexDirection: "column", justifyContent: "center"
                }}>

                <div style={{ textAlign: "center", fontFamily: "arial" }}>
                    <h3> ➤ Video Tube !</h3>
                </div>
                <div style={{ textAlign: "center", fontFamily: "arial" }}>
                    <p> Register Here!</p>
                </div>

                <div>
                    <input onChange={(e) => setEmail(e.target.value)} value={email}
                        style={{ border: "none", outline: "none", padding: 6, borderRadius: 3, width: "280px", margin: 5 }} type='text' placeholder='email' />
                </div>

                <div>
                    <input onChange={(e) => setPassword(e.target.value)} value={password}
                        style={{ border: "none", outline: "none", padding: 6, borderRadius: 3, width: "280px", margin: 5 }} type='password' placeholder='password' />
                </div>

                <div style={{ textAlign: "center" }}>
                    <button onClick={() => register()} style={{ border: "none", outline: "none", padding: 3, borderRadius: 4, width: 150, cursor: "pointer" }}>Create your Account</button>
                </div>

                <div style={{ textAlign: "center" }}>
                    <p style={{ cursor: "pointer", color: "white" }} onClick={() => navigate("/login")}>Go to Login</p>
                </div>



            </div>
        </div>
    )
}

export default Register