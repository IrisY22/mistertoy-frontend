import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/user.service";

export function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login({ username, password });
    } catch (err) {
      console.log("err: " + err);
    }
    afterLoginClick();
  };

  function afterLoginClick() {
    console.log(userService.getLoggedinUser());
    if (!username || !password) {
      alert("Please enter your username and password");
    } else if (!userService.getLoggedinUser()) {
      alert("Wrong username or password");
    } else {
      navigate(`/`);
    }
  }

  return (
    <div>
      <button onClick={() => navigate(`/`)}>Back</button>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
