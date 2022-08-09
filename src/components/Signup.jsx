import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

const Singup = ()=>{

  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    email:"",
    password:"",
    contact:""
  })

  const handleInput = (e)=>{
    
  var name = e.target.name;
  var value = e.target.value

    setUser({...user, [name]: value})
  }

  // creating a function to send data in DB
  const sendData = async (e)=>{
    e.preventDefault();

    const {name, email, password, contact} = user;

     const res = await fetch("http://localhost:3000/register",{
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name, email, password, contact
      })
    })

    const result = await res.json();
    
    if(result.status === 500 || !result){
      window.alert("Error Occurred");
      console.log("Error Occurred");
    }else{
      window.alert("Registration Successful");
      console.log("registration Successful");

      history.push("/signin")
    }
  }


  return(
    <>
      <h1>Sign Up to Register</h1>
      <div className="box">
        <form method="POST">
          <label htmlFor="name">Name : </label>
          <input type="text" name="name" autoComplete="off" value={user.name} onChange={handleInput} />

          <label htmlFor="email">Email : </label>
          <input type="email" name="email" autoComplete="off" value={user.email} onChange={handleInput} />

          <label htmlFor="password">Password : </label>
          <input type="password" name="password" autoComplete="off" value={user.password} onChange={handleInput} />

          <label htmlFor="contact">contact : </label>
          <input type="number" name="contact" autoComplete="off" value={user.contact} onChange={handleInput} />

          <button type="submit" onClick={sendData}>Register</button>
          {/* // Adding button to register and redirecting the user to login page */}
          <NavLink to="/signin">Already a User</NavLink>

        </form>
      </div>
    </>
  )
}

export default Singup