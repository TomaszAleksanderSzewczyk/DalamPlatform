import {useState} from 'react'
function UserProfile() {
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
  async function handleUpdate() {
    const response = await fetch('/api/user', {
      method: 'PATCH',
      body: JSON.stringify({
        age,

      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <input value ={age} onChange={ (e) => setAge(e.currentTarget.value)}  ></input>
      <button onClick ={handleUpdate}>Save</button>
      {/* //<ProfileForm onChangePassword={changePasswordHandler} /> */}
    </section>
  );
}

export default UserProfile;