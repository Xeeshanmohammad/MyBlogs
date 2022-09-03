import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authAction } from "../Store/index";
import { useNavigate } from "react-router-dom";

function Auth() {

  const navigate = useNavigate()
  
const dispath = useDispatch()

  const [isSignup, setIsSignup] = useState();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
    const res = await axios.post(`http://localhost:2717/api/user/${type}`, {
        name: input.name,
        email: input.email,
        password: input.password,
      }).catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    if (isSignup) {
      sendRequest("signup").then(()=>dispath(authAction.login())).then(()=>navigate('/blogs')).then((data) => console.log(data));
    } else {
      sendRequest().then(()=>dispath(authAction.login())).then(()=>navigate('/blogs')).then((data) => console.log(data));
    }
 
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={300}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h3" textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={input.name}
              type="name"
              placeholder="Name"
              margin="normal"
            />
          )}
          {""}
          <TextField
            name="email"
            onChange={handleChange}
            value={input.email}
            type="email"
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={input.password}
            type="password"
            placeholder="Password"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3 }}
            color="warning"
          >
            submit
          </Button>
          <Button
            onClick={() => setIsSignup(isSignup)}
            sx={{ borderRadius: 3 }}
          >
            change to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Auth;
