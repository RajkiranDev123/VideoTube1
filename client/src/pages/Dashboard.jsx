import React from 'react'
import { useState, useEffect, useRef } from 'react'
import moment from "moment"
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast"
import { uploadVideoToServer, getVideosFromServer, deleteVideoFromServer } from '../services/ApiRequests'
const Dashboard = () => {
  const navigate = useNavigate()
  const [video, setVideo] = useState(null)
  const [allVideos, setAllVideos] = useState([])

  const [selecting, setSelecting] = useState(false)
  const [delLoad, setDelLoad] = useState(false)

  const [uploading, setUploading] = useState(false)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("")
  const hiddenFileInput = useRef(null);
  

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")



  const formatTime = (timestamp) => {
    const now = moment()
    const diff = now.diff(moment(timestamp), "days")
    if (diff < 1) {
      return `Today ${moment(timestamp).format("hh:mm A")}`
    } else if (diff === 1) {
      return `Yesterday ${moment(timestamp).format("hh:mm A")}`

    } else {
      return moment(timestamp).format("MMM D, hh:mm A")

    }
  }

  const getVideos = async (searchByTitle) => {


    const config = {
      "Content-Type": "application/json",
      "authorization": `Bearer ${localStorage.getItem("token")}`,
      "title": searchByTitle ? searchByTitle : ""

    }

    const response = await getVideosFromServer("", config)
    if (response?.status === 200) {
      setAllVideos(response?.data?.allVideos)

      toast.success(response?.data?.message)



    } else {
      toast.error(response?.response?.data?.message)
    }


  }

  const deleteVideo = async (videoId) => {
    setDelLoad(true)

    const config = {
      "Content-Type": "application/json",
      "authorization": `Bearer ${localStorage.getItem("token")}`,
      "vid": videoId


    }

    const response = await deleteVideoFromServer("", config)
    if (response?.status === 200) {


      toast.success(response?.data?.message)
      setDelLoad(false)
      getVideos()



    } else {
      toast.error(response?.response?.data?.message)
      setDelLoad(false)
    }


  }


  const logout = () => {
    localStorage.clear();
    navigate("/login")
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



    setUploading(true);


    const config = {
      'Content-Type': 'multipart/form-data',
      "authorization": `Bearer ${localStorage.getItem("token")}`,

    }

    const response = await uploadVideoToServer(formData, config)
    if (response?.status === 200) {
      console.log(response)
      toast.success(response?.data?.message)
      setVideoPreviewUrl("");
      setVideo(null);
      hiddenFileInput.current.value = null;
      setTitle("");
      setDescription("")
      getVideos()
      setUploading(false)



    } else {
      toast.error(response?.response?.data?.message)
      setUploading(false)
    }

  };
  // 

  useEffect(() => {

    let getEmail = localStorage.getItem("email")
    if (!getEmail) { navigate("/login") }

    getVideos()

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
      <div style={{ display: "flex", gap: 5, justifyContent: "space-evenly", marginTop: 3 }}>
        <div style={{ fontFamily: "arial" }}>My Total Videos : {allVideos && allVideos?.length}</div>

        <div style={{ display: "flex", gap: 1 }}>Search by Title :
          <input type='text' placeholder='title...' onChange={(e) => setTitle(e.target.value)} />
          <button id='u' onClick={() => getVideos(title)}>Search</button>
          <button onClick={() => { setTitle(""); getVideos("") }}>Clear</button>


        </div>
      </div>




      {/* videos */}
      <div>

        <h3 style={{ fontFamily: "arial" }}>My Videos : </h3>

        <div style={{ height: "50vh", overflowY: "scroll", background: "black", borderRadius: 4, display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", padding: 4 }}>

          {allVideos && allVideos?.map((e, i) => {
            return (
              <>
                <div style={{ background: "white", padding: 2, borderRadius: 3 }}>


                  <video width="400" loop controls>
                    <source src={e?.cloudinaryUrl} type="video/mp4" />

                    Your browser does not support HTML video.
                  </video>
                  <p style={{ fontFamily: "monospace" }}>Video No : {i + 1}</p>

                  <p style={{ fontFamily: "monospace" }}>Title : {e?.title}</p>
                  <p style={{ fontFamily: "monospace" }}>Description : {e?.description}</p>
                  <p style={{ fontFamily: "monospace" }}>Upload Date : {e?.createdAt?.slice(0, 10)}{" , " + formatTime(e?.createdAt)}</p>
                  <p>{delLoad && <span style={{ color: "red" }}>Deleteing...</span>}</p>

                  <p><button onClick={() => deleteVideo(e?._id)}
                    style={{ cursor: "pointer", padding: 2, background: "red", color: "white", borderRadius: 3, border: "none" }}>Delete ! </button></p>

                </div>
              </>
            )
          })}


        </div>

      </div>
      {/* videos end */}

      {/* view selected video */}

      {video && <div style={{ textAlign: "center", background: "grey" }}>
        <h3 style={{ color: "white", fontFamily: "arial", padding: 5, borderRadius: 4 }}>Preview!</h3>
        <video style={{ margin: 2, borderRadius: 3 }} width="400" loop controls>
          <source src={videoPreviewUrl} type="video/mp4" />

          Your browser does not support HTML video.
        </video> </div>}

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

      {
        videoPreviewUrl && <button onClick={() => { setVideoPreviewUrl(""); setVideo(null); hiddenFileInput.current.value = null; setTitle(""); setDescription("") }}
          style={{ background: "red", color: "white", borderRadius: 4, border: "none", padding: 3, cursor: "pointer" }}>Remove Video</button>
      }

      {/* remove selected video ends */}



      {/* title and desc */}

      {
        video && <div style={{ display: "flex", flexDirection: "column", gap: 5, margin: 3 }}>
          <input onChange={(e) => setTitle(e.target.value)} value={title} placeholder='set title....' />
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder='set description...'></textarea>
        </div>
      }




      {/* title and desc */}





      {/* upload to server */}
      {uploading && <p style={{ textAlign: "center", color: "red" }}>Uploading... plz wait!</p>}


      <div style={{ textAlign: "center", margin: 9 }}>
        {video && <button onClick={() => uploadToServer()}
          style={{ padding: 4, background: "green", color: "white", borderRadius: 3, border: "none", cursor: "pointer" }}>UPLOAD TO SERVER</button>}

      </div>









    </div >
  )
}

export default Dashboard