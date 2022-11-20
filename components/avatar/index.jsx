import useUserData from "../../hooks/useUser";
import styles from "../../styles/avatar.module.css"
import Avatar  from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Button } from "@mui/material";
import PortraitIcon from '@mui/icons-material/Portrait';
export default function AvatarComponent() {
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
      <div className={styles.avatar369}>
        {userData?.avatar && (
            <>
           <Avatar style={{ justifyContent: "center", display: "flex" }} sx={{ height: '600px', width: '600px' }} alt="Remy Sharp" src={userData.avatar} />
           <Button
           startIcon={<PortraitIcon />}
           className={styles.avatarButton}
        sx={ { borderRadius: 28 } }
        onChange={uploadPhoto}
  variant="contained"
  component="label"
>
Change
  <input
    type="file"
    hidden
    accept="image/png, image/jpeg"
  />
</Button>
           </>
        )}
</div>
        
      </>
    )
  }