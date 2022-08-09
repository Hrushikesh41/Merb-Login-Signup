import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

const Login = ()=>{

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const getData = async (e)=>{
    e.preventDefault();

    const res = await fetch('http://localhost:3000/signin', {
      method: "POST",
      headers:{
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        email, 
        password
      })
    })

    const result = res.json();

    if(result.status === 422 || result.status === 404 || !result){
      window.alert("Invalid Credentials !!!!")
    }else{
      window.alert("Login Successful !!!");
      history.push("/")
    }
  }
  return(
    <>
      <h1>Login to Continue</h1>

      <div className="box">
        <form method="POST">

          <label htmlFor="email">Email : </label>
          <input type="email" name="email" autoComplete="off" value={email} onChange={(e)=> setEmail(e.target.value)}/>

          <label htmlFor="password">Password : </label>
          <input type="password" name="password" autoComplete="off" value={password} onChange={(e)=> setPassword(e.target.value)}/>

          {/* // Adding button to Login or redirecting the user to registeration page */}
          <button type="submit" onClick={getData}>Login</button>
          <NavLink to="/signup">Create an Account</NavLink>
        </form>
      </div>
    </> 
  )
}

export default Login