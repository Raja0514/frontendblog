import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';

const Userblog = () => {

  const[user,setUser]=useState();

  const id=localStorage.getItem('userId')
  const sendRequest=async()=>{

    const res=await axios.get(`https://lastcheck0.herokuapp.com/api/blogs/user/${id}`).catch(err=>console.log(err))
    
    const data= await res.data;

    return data;

  }
  useEffect(()=>{

    sendRequest().then((data)=>setUser(data.user))

  },[])

  console.log(user)
  return (
    <>
      {user && user.blogs && user.blogs.map((blog, index) => (
          <Blog 
          isUser={true}
          id={blog._id}
          
          description={blog.description}
            title={blog.title}
            image={blog.image}
            userName={user.name}
          />
        ))}
    </>
  )
}

export default Userblog
