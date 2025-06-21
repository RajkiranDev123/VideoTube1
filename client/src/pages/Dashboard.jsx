import React from 'react'
import { useState, useEffect } from 'react'
const Dashboard = () => {
  const [count, setCount] = useState(0)
  return (
    <div>

      <div style={{ height: "64px", background: "grey", display: "flex", justifyContent: "space-between", padding: 4 }}>
        <div>
          <h2 style={{ fontFamily: "monospace", color: "white" }}>➤ My Video tube </h2>
        </div>

        <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
          <p style={{ color: "white", fontStyle: "italic" }}>hi, uijliuytyukjly</p>
          <p style={{ color: "#811331", cursor: "pointer", fontFamily: "arial", fontWeight: "bold" }}>⏻ Logout</p>
        </div>

      </div>


      {/* meta admin*/}
      <div>
        meta admin
      </div>

      {/* meta client */}
       <div>
        meta client
      </div>


      {/* videos */}
      <div>

        <p>Videos :</p>

        <div style={{ background: "black", borderRadius: 4 }}>
          kljhg
        </div>

      </div>
      {/* videos end */}


      {/*upload button  */}
<div style={{display:"flex",justifyContent:"center",margin:5}}>
      <input type='file' placeholder='upload videos'/>

</div>







    </div>
  )
}

export default Dashboard