import React, { useEffect, useState,useRef } from "react";
import {useNavigate,useParams} from "react-router-dom";
import axios from "axios";
import { Typography, Box, InputLabel, TextField, Button } from "@mui/material";


const Blogdetail = () => {

const navigate=useNavigate();

const temp=useRef();
  
  const [inputs, setInputs] = useState({
    
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [blog, setBlog] = useState();

  const id = useParams().id;

  console.log(id);

  const fetchDetail = async() => {
    const res =  await axios
      .get(`https://lastcheck0.herokuapp.com/api/blogs/${id}`)
      .catch((err) => console.log(err));

    const data =  await res.data;

    console.log(data);

    

    return data;
  };

  useEffect(() => {
    fetchDetail().then((data) => {
      setBlog(data.findid)
      setInputs({Title:data.findid.title,Description:data.findid.description})
    
      temp.current=fetchDetail();
    
  });
  },[]);


  const sendRequest=async()=>{

    const res= await axios.put(`https://lastcheck0.herokuapp.com/api/blogs/update/${id}`,{

     title:inputs.Title,
     description:inputs.Description

    }).catch(err=>console.log(err))
    
    const data= await res.data;

    return data

  }


  console.log(blog);

const handleSubmit=(e)=>{

  e.preventDefault()

  console.log(inputs)

  sendRequest().then(data=>console.log(data)).then(()=>navigate("/myblogs"))
  
}


  return (
    <>
      {
        inputs && (<form onSubmit={handleSubmit}>
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
            Update your Blog
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
          
          <Button
            variant="contained"
            sx={{ backgroundColor: "green" }}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>)
      }
      
    </>
  );
};
export default Blogdetail;
