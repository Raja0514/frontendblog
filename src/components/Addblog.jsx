import React, { useState } from "react";
import { Typography, Box, InputLabel, TextField, Button } from "@mui/material";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const Addblog = () => {

  const navigate=useNavigate();
  
  const [inputs, setInputs] = useState({
    Title: "",
    Description: "",
    Image: "",
  });

  const sendRequest=async()=>{
    
    const res=await axios.post("https://lastcheck0.herokuapp.com/api/blogs/add",{

    title:inputs.Title,
    description:inputs.Description,
    image:inputs.Image,
    user:localStorage.getItem('userId')

    }).catch(err=>console.log(err))

    const data = await res.data;

    return data;
    


  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    sendRequest().then((data)=>console.log(data)).then(()=>navigate("/blogs"))
  };

  
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor="green"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={4}
          display="flex"
          flexDirection={"column"}
          width={"80%"}
        >
          <Typography
            fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}
          >
            Post your Blog
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name={"Title"}
            onChange={handleChange}
            value={inputs.Title}
            margin="normal"
            variant="outlined"
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name={"Description"}
            onChange={handleChange}
            value={inputs.Description}
            margin="normal"
            variant="outlined"
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image
          </InputLabel>
          <TextField
            name={"Image"}
            onChange={handleChange}
            value={inputs.Image}
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "green" }}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};
export default Addblog;
