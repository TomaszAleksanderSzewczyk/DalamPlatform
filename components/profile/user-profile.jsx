import { signOut, useSession } from 'next-auth/react';
import {useState} from 'react'
import useUserData from '../../hooks/useUser';
import UserCredencialsForm from '../userCredencialsForm/userCredencialsForm';
function UserProfile() {
  const session = useSession();
  const { userData, update } = useUserData();
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
  }

  return (
    <>    
    <UserCredencialsForm/>
    <section>
      <h1>Your User  Profile</h1>
      <pre>
        {JSON.stringify(session, null, 2)}
      </pre>
      <pre>
        {JSON.stringify(userData, null, 2)}
      </pre>
      <input value ={age} onChange={ (e) => setAge(e.currentTarget.value)}  ></input>
      <button onClick ={handleUpdate}>Save</button>
      <button onClick={signOut}>Sign out</button>
      {/* //<ProfileForm onChangePassword={changePasswordHandler} /> */}
    </section>
    </>

  );
}

export default UserProfile;