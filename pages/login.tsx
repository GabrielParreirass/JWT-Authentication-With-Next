import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function Login() {
  const [username, setUsername] = useState("");
  const [psswd, setPsswd] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log("Mandou");

    const credentials = { username, psswd };

    const user = await axios.post("api/auth/login", credentials);

    if(user.status == 200){
        router.push('/dashboard')
    }

    console.log(user);
  };

  const handleGetUser = async () => {
    const user = await axios.get("api/user");
    console.log(user);
  };

  const handleLogOut = async () => {
    const user = await axios.get("api/auth/logout");

    console.log(user);
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <label htmlFor="passwrod">Password</label>
        <input
          type="password"
          name="passowrd"
          id="password"
          onChange={(e) => {
            setPsswd(e.target.value);
          }}
        />

        <button type="submit">Login</button>
      </form>
      <button onClick={() => handleGetUser()}>Get Data</button>
      <button onClick={() => handleLogOut()}>LogOut</button>
    </div>
  );
}

export default Login;
