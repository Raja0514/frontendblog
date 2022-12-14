import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Blog from "./Blog";

const Blogs = () => {
  const [blogs, setBlogs] = useState();

  const sendRequest = async () => {
    const res = await axios
      .get("https://lastcheck0.herokuapp.com/api/blogs")
      .catch((err) => console.log(err));

    const data = await res.data;

    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);

  console.log(blogs);

  return (
    <>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog 
            id={blog._id}
            isUser={localStorage.getItem('userId')===blog.user._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            userName={blog.user.name}
          />
        ))}
    </>
  );
};

export default Blogs;
