import React from 'react'
import { useState, useEffect, useRef } from 'react'
import moment from "moment"
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast"
import { uploadVideoToServer, getVideosFromServer, deleteVideoFromServer } from '../services/ApiRequests'
import Loader from '../components/Loader'
const Dashboard = () => {
  const navigate = useNavigate()
  const [video, setVideo] = useState(null)
  const [allVideos, setAllVideos] = useState([])

  const [selecting, setSelecting] = useState(false)
  const [delLoad, setDelLoad] = useState("")

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
    setDelLoad(videoId)

    const config = {
      "Content-Type": "application/json",
      "authorization": `Bearer ${localStorage.getItem("token")}`,
      "vid": videoId


    }

    const response = await deleteVideoFromServer("", config)
    if (response?.status === 200) {


      toast.success(response?.data?.message)
      setDelLoad("")
      getVideos()



    } else {
      toast.error(response?.response?.data?.message)
      setDelLoad("")
    }


  }


  const logout = () => {
    localStorage.clear();
    navigate("/login")
  }

  const handleFileChange = (e) => {

    setSelecting(true)
    const file = e.target.files[0];

    //
    const MB = 10
    const fileSizeInMB = file.size / (1024 * 1024); //bytes to mb
    if (fileSizeInMB > MB) {
      toast.error("Video must be less than 10mb!")
      return
    }


    //

    console.log("check file==>", file)
    if (file.type !== "video/mp4") {
      toast.error("Video must be mp4!")
      return
    }
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
    if (!getEmail) {

      navigate("/login")
    } else {
      getVideos()

    }


  }, [])

  return (
    <div style={{ background: "linear-gradient(to right, #5d4157, #a8caba)", padding: 3 }}>

      <div style={{ height: "64px", background: "linear-gradient(to right, #283048, #859398)", display: "flex", justifyContent: "space-between", padding: 4 }}>
        <div>
          <h2 style={{ fontFamily: "monospace", color: "white" }}>➤ My Video tube </h2>
        </div>

        <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
          <p style={{ color: "white", fontStyle: "italic" }}>hi, {localStorage?.getItem("email")?.split("@")[0]}</p>
          <p onClick={() => logout()} style={{ color: "red", cursor: "pointer", fontFamily: "arial", fontWeight: "bold" }}>⏻</p>
        </div>

      </div>


      {/* meta admin*/}
      <div style={{ display: "flex", gap: 5, justifyContent: "space-evenly", marginTop: 3, flexWrap: "wrap" }}>
        <div style={{ fontFamily: "arial", color: "white" }}>My Total Videos : {allVideos && allVideos?.length}</div>

        <div style={{ display: "flex", gap: 1, color: "wheat" }}>
          <input type='text' style={{ borderRadius: 3,border:"none",padding:3 }} placeholder='Search by Title ...' onChange={(e) => setTitle(e.target.value)} />
          <button style={{ background: "green", color: "white", borderRadius: 3, border: "none" }} id='u' onClick={() => getVideos(title)}>Search</button>
          <button style={{ background: "red", color: "white", borderRadius: 3, border: "none" }} onClick={() => { setTitle(""); getVideos("") }}>Clear</button>


        </div>
      </div>




      {/* videos */}
      <div>

        <h3 style={{ fontFamily: "arial", color: "wheat" }}>My Videos : </h3>

        <div style={{ height: "50vh", overflowY: "scroll", background: "linear-gradient(to right, #1d2b64, #f8cdda)", borderRadius: 4, display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", padding: 4 }}>

          {allVideos && allVideos?.map((e, i) => {
            return (
              <>
                <div style={{ background: "white", padding: 2, borderRadius: 3 }}>


                  <video width="310" loop controls>
                    <source src={e?.cloudinaryUrl} type="video/mp4" />

                    Your browser does not support HTML video.
                  </video>
                  <p style={{ fontFamily: "monospace" }}>Video No : {i + 1}</p>

                  <p style={{ fontFamily: "monospace" }}>Title : {e?.title}</p>
                  <p style={{ fontFamily: "monospace" }}>Description : {e?.description}</p>
                  <p style={{ fontFamily: "monospace" }}>Upload Date : {e?.createdAt?.slice(0, 10)}{" , " + formatTime(e?.createdAt)}</p>
                  <p>{delLoad==e?._id  &&  <span style={{ color: "red" }}><Loader/></span>}</p>

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

      {video && <div style={{ textAlign: "center", background: "black" }}>
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
          <input style={{border:"none",outline:"none"}} onChange={(e) => setTitle(e.target.value)} value={title} placeholder='set title....' />
          <textarea style={{border:"none",outline:"none"}} onChange={(e) => setDescription(e.target.value)} value={description} placeholder='set description...'></textarea>
        </div>
      }




      {/* title and desc */}





      {/* upload to server */}
      {uploading && <p style={{ textAlign: "center", color: "white",display:"flex",justifyContent:"center" }}>Uploading &nbsp; <Loader/></p>}


      <div style={{ textAlign: "center", margin: 9 }}>
        {video && <button onClick={() => uploadToServer()}
          style={{ padding: 4, background: "green", color: "white", borderRadius: 3, border: "none", cursor: "pointer", fontFamily: "monospace" }}>UPLOAD TO SERVER</button>}

      </div>









    </div >
  )
}

export default Dashboard