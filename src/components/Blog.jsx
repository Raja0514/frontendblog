import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Blog = ({ title, description, image, userName, isUser, id }) => {
  console.log(title, isUser);

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/myblogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blogs/${id}`)
      .catch((err) => console.log(err));

    const data = await res.data;

    return data;
  };

  const handleDelete = async () => {
    deleteRequest().then(navigate("/blogs"));
  };

  return (
    <>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 5px #ccc",
          ":hover:": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteOutlineIcon color="error" />
            </IconButton>
          </Box>
        )}

        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName.charAt(0)}
            </Avatar>
          }
          title={title}
          subheader="September 14, 2016"
        />

        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
        />
        <br></br>
        <hr></hr>

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <b>{userName}</b>
            {":"} {description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
export default Blog;
