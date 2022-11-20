import useUserData from "../../hooks/useUser";

export default function Avatar() {
  const { update, userData } = useUserData();

  const uploadPhoto = async (e) => {
    const file = e.target.files?.[0];
    const filename = encodeURIComponent(file.name)
    const fileType = encodeURIComponent(file.type)
  
    const res = await fetch(
      `/api/photos?file=${filename}&fileType=${fileType}`
    )
    const { url, fields } = await res.json()
    const formData = new FormData()
  
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value)
    })
  
    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
    })
    
    update({
      avatar: url + fields.key,
    })
  
    if (upload.ok) {
      console.log('Uploaded successfully!')
    } else {
      console.error('Upload failed.')
    }
  }
    return (
      <>
        {userData?.avatar && (
          <img src={userData.avatar} />
        )}
        <p>Upload a .png or .jpg image (max 1MB).</p>
        <input
          onChange={uploadPhoto}
          type="file"
          accept="image/png, image/jpeg"
        />
      </>
    )
  }