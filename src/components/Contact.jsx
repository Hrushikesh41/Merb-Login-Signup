import React from "react";

const Contact = ()=>{
  return(
    <>
      <h1>Get in Touch</h1>

      <div className="box">
        <form>
          <input type="email" name="email" autoComplete="off" />

          <input type="number" name="contact" autoComplete="off" />

          {/* // Adding button to send message */}
          <button type="submit">Send Message</button>
        </form>
      </div>
    </>
  )
}

export default Contact