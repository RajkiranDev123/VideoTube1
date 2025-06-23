
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast"
import { loginUser } from "../services/ApiRequests"
import { CopyToClipboard } from 'react-copy-to-clipboard';
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const login = async () => {
        // const config = { "Content-Type": "application/json" }
        if (password.length < 9) {
            toast.error("Password must be 9 digits or greater!")
            return
        }

        const response = await loginUser({ email, password })
        if (response?.status === 200) {
            toast.success(response?.data?.message)

            setEmail("")
            setPassword("")
            localStorage.setItem("token", response?.data?.token)
            localStorage.setItem("email", response?.data?.email)
            localStorage.setItem("userId", response?.data?.userId)


            navigate("/")
        } else {
            toast.error(response?.response?.data?.message)
        }
    }
    return (
        <div style={{ display: "flex", justifyContent: "center", background: "linear-gradient(to right, #159957, #155799)", height: "100vh" }}>


            <div
                style={{
                    width: 300, height: 500, background: "linear-gradient(to right, #159957, #155799)",padding:3,
                    borderRadius: 4, backgroundColor: "grey", marginTop: 100, display: "flex", flexDirection: "column", justifyContent: "center"
                }}>

                <div style={{ textAlign: "center", fontFamily: "arial" }}>
                    <h3 style={{color:"white"}}> ➤ Video Tube !</h3>

                    <video style={{ margin: 2, borderRadius: 9 }} width="250" height="110" loop autoPlay controls muted >
                        <source src="/a.mp4" type="video/mp4" />

                        Your browser does not support HTML video.
                    </video>



                </div>
                <div style={{ textAlign: "center", fontFamily: "arial" }}>
                    <p style={{ color: "white" }}> Login Here!</p>
                </div>

                <div>
                    <p style={{ fontSize: 14, color: "white", display: "flex", alignItems: "center", gap: 2, fontStyle: "italic" }}>Test Email :
                        <CopyToClipboard text="user1@gmail.com">
                            <span style={{ cursor: "pointer", color: "white", display: "flex", alignItems: "center" }}> Copy 🗍</span>
                        </CopyToClipboard>
                    </p>
                    <p style={{ fontSize: 14, color: "white", display: "flex", alignItems: "center", gap: 2, fontStyle: "italic" }}>Test Password :
                        <CopyToClipboard text="123456789">
                            <span style={{ cursor: "pointer", color: "white", display: "flex", alignItems: "center" }}> Copy 🗍</span>
                        </CopyToClipboard>
                    </p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email}
                        style={{ border: "none", outline: "none", padding: 6, borderRadius: 3, width: "280px", margin: 5 }} type='text' placeholder='email' />
                </div>

                <div>
                    <input onChange={(e) => setPassword(e.target.value)} value={password}
                        style={{ border: "none", outline: "none", padding: 6, borderRadius: 3, width: "280px", margin: 5 }} type='password' placeholder='password' />
                </div>

                <div style={{ textAlign: "center" }}>
                    <button onClick={() => login()} style={{ border: "none", outline: "none", padding: 3, borderRadius: 4, width: 150, cursor: "pointer", background: "green", color: "white" }}>Login</button>
                </div>

                <div style={{ textAlign: "center" }}>
                    <p style={{ cursor: "pointer", color: "white" }} onClick={() => navigate("/register")}>No Account! <span style={{ textDecoration: "underline" }}>Go to Register</span></p>
                </div>



            </div>
        </div>
    )
}

export default Login