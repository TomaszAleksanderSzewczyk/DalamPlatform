import styles from './user-profile.module.css'
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import useUserData from "../../hooks/useUser";
import UserCredencialsForm from "../userCredencialsForm/userCredencialsForm";
import { useRef } from "react";
import Avatar from "../avatar";

function UserProfile() {
  const session = useSession();
  const { userData, update } = useUserData();

  const inputRef = useRef();
  const triggerFileSelectPopup = () => inputRef.current.click();
  const [image, setImage] = useState(null);
	const [croppedArea, setCroppedArea] = useState(null);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       window.location.href = '/auth';
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  const [age, setAge] = useState("");
  const handleUpdate = () => {
    update({ age });
  };




  return (
    <>
      <Avatar/>
      <UserCredencialsForm />
      
      <section>
        <h1>Your User Profile</h1>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
        <input
          value={age}
          onChange={(e) => setAge(e.currentTarget.value)}
        ></input>


        <button onClick={handleUpdate}>Save</button>
        <button onClick={signOut}>Sign out</button>
        {/* //<ProfileForm onChangePassword={changePasswordHandler} /> */}
      </section>
    </>
  );
}

export default UserProfile;
