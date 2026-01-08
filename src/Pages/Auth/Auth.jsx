import React, { useContext, useState } from 'react'
import classes from './Signup.module.css'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import { auth } from '../../Utility/firebase';
import {ClipLoader} from "react-spinners"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { DataContext } from '../../Components/DataProvider/DataProvider'
import { Type } from '../../Utility/action.type'

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false
  })

  const [{ user }, dispatch] = useContext(DataContext)
  const navigate = useNavigate()
  const navStateData = useLocation()
  
  const authHandler = async(e) => {
    e.preventDefault();
    if (e.target.name === "signin") {
      //firebase
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password).then((userInfo) => {
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user
          
        });
        setLoading({ ...loading, signIn: false });
        navigate(navStateData?.state?.redirect || "/");
        
      }).catch((err) => {
        setError(err.message); 
        setLoading({ ...loading, signIn: false });
      })
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password).then((userInfo) => {
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user
        });
        setLoading({ ...loading, signUp: false });
        navigate(navStateData?.state?.redirect || "/");
      }).catch((err) => {
        console.log(err);
        setError(err.message);   
        setLoading({ ...loading, signUp: false });
      });
    }
  };
  
  return (
    <section className={classes.login}>
    {/* logo */}
    <Link to='/'>
      <img src="https://www.shutterstock.com/image-vector/kiev-ukraine-september-24-2023-600nw-2365975827.jpg" alt="" />
    </Link>
    {/* form */}
    <div className={classes.login_container}>
        <h1>Sign in</h1>
        {
          navStateData?.state?.msg && (
            <small
              style={{
                padding: "5px",
                textAlign: "center",
                color: "red",
                fontWeight:"bold"
              }}>
              {navStateData?.state?.msg}
            </small>
          )}
      <form action="">
        <div>
          <label htmlFor="email">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)}
            type="text"
            id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)}
            type="text"
            id="password" />
        </div>
        <button type='submit'
          onClick={authHandler}
          name='signin'
            className={classes.btn}>
            {
              loading.signIn ? (<ClipLoader color="aqua" size={20} />):("Sign In")
            }
            
        </button>
      </form>
      {/* agreement */}
      <p>
        By singing-in you agree to the AMAZON FAKE CLONE conditions of use and sale. Please see our privacy Notice and our interest-based Notice.
      </p>
      {/* create account */}
      <button type='submit'
        onClick={authHandler}
        name='signup'
          className={classes.login_btn}>
           {
              loading.signUp ? (<ClipLoader color="aqua" size={20} />):("Create Your Amazon Account")
            }
          
        </button>
        {
          error && <p className={classes.error}>{error}</p>
        }
     </div>
    </section>
  )
}

export default Auth
