import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast"
import { uploadVideoToServer } from '../services/ApiRequests'
const Dashboard = () => {
  const navigate = useNavigate()
  const [video, setVideo] = useState(null)
  const [selecting, setSelecting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("")
  const hiddenFileInput = useRef(null);

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")






  const logout = () => {
    localStorage.clear();
  }

  const handleFileChange = (e) => {
    setSelecting(true)
    const file = e.target.files[0];
    console.log(file)
    setVideo(file)
    const previewUrl = URL.createObjectURL(file);
    setVideoPreviewUrl(previewUrl);
    setSelecting(false)
  };

  // 
  const uploadToServer = async () => {


    if (!title || !description) {
      toast.error("Title and Description cant't be empty!")
      return;
    }

    const formData = new FormData();
    formData.append('videoFile', video);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('userId', localStorage.getItem("userId"));


    setUploading(true);


    const config = { 'Content-Type': 'multipart/form-data' }

    const response = await uploadVideoToServer(formData, config)
    if (response?.status === 200) {
      toast.success(response?.data?.message)


    } else {
      toast.error(response?.response?.data?.message)
    }

  };
  // 

  useEffect(() => {

    let getEmail = localStorage.getItem("email")
    if (!getEmail) { navigate("/login") }

  }, [])

  return (
    <div>

      <div style={{ height: "64px", background: "grey", display: "flex", justifyContent: "space-between", padding: 4 }}>
        <div>
          <h2 style={{ fontFamily: "monospace", color: "white" }}>➤ My Video tube </h2>
        </div>

        <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
          <p style={{ color: "white", fontStyle: "italic" }}>hi, {localStorage?.getItem("email")?.split("@")[0]}</p>
          <p onClick={() => logout()} style={{ color: "#811331", cursor: "pointer", fontFamily: "arial", fontWeight: "bold" }}>⏻ Logout</p>
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

      {/* view selected video */}

      {video && <video width="400" loop autoPlay controls>
        <source src={videoPreviewUrl} type="video/mp4" />

        Your browser does not support HTML video.
      </video>}

      {/* view selected video ends*/}



      {/*upload button  */}
      <div style={{ display: "flex", justifyContent: "center", margin: 5 }}>
        <input
          ref={hiddenFileInput}
          type="file"
          id="videoFile"
          accept="video/*"
          onChange={handleFileChange}
          style={{ display: 'block', width: '100%', background: "grey", borderRadius: 3, fontWeight: "bold" }}
        />

      </div>
      {/*upload button ends */}

      {/* remove  selected video */}

      {videoPreviewUrl && <button onClick={() => { setVideoPreviewUrl(""); setVideo(null); hiddenFileInput.current.value = null; setTitle(""); setDescription("") }}
        style={{ background: "red", color: "white", borderRadius: 4, border: "none", padding: 3, cursor: "pointer" }}>Remove Video</button>}

      {/* remove selected video ends */}



      {/* title and desc */}

      {video && <div style={{ display: "flex", flexDirection: "column", gap: 5, margin: 3 }}>
        <input onChange={(e) => setTitle(e.target.value)} value={title} placeholder='set title....' />
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder='set description...'></textarea>
      </div>}




      {/* title and desc */}





      {/* upload to server */}

      <div style={{ textAlign: "center", margin: 9 }}>
        {video && <button onClick={() => uploadToServer()}
          style={{ padding: 4, background: "green", color: "white", borderRadius: 3, border: "none", cursor: "pointer" }}>UPLOAD TO SERVER</button>}

      </div>








    </div>
  )
}

export default Dashboard