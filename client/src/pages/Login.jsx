import React from 'react'

const Login = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", background: "#36454F", height: "100vh" }}>
            <div
                style={{
                    width: 300, height: 500, background: "#C0C0C0",
                    borderRadius: 4, backgroundColor: "grey", marginTop: 100, display: "flex", flexDirection: "column", justifyContent: "center"
                }}>
                   
                     <div style={{textAlign:"center",fontFamily:"arial"}}>
                    <h3> ➤ Video Tube !</h3>
                </div>
                <div style={{textAlign:"center",fontFamily:"arial"}}>
                    <p> 🔑Login Here!</p>
                </div>

                <div>
                    <input
                        style={{ border: "none", outline: "none", padding: 6, borderRadius: 3, width: "280px", margin: 5 }} type='text' placeholder='email' />
                </div>

                <div>
                    <input
                        style={{ border: "none", outline: "none", padding: 6, borderRadius: 3, width: "280px", margin: 5 }} type='password' placeholder='password' />
                </div>

                <div style={{ textAlign: "center" }}>
                    <button style={{ border: "none", outline: "none", padding: 3, borderRadius: 4, width: 150,cursor:"pointer" }}>Login</button>
                </div>



            </div>
        </div>
    )
}

export default Login