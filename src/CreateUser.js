import React, { useState } from "react";

const CreateUser = () => {
    
    function submit(ev){
        ev.preventDefault()
    }
    return(<>
    <h2>Create Account</h2>
        <form onSubmit={ submit }>
            <input type="text" placeholder="First Name"/>
            <input type="text" placeholder="Last Name"/>
            <input type="email" placeholder="Email address"/>
            <input type="password" placeholder="Password"/>
            <button>Create</button>
        </form>
    </>)
}
export default CreateUser