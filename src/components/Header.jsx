import React from "react";
import { AppBar, Button, Toolbar, Typography, Box,Tabs,Tab } from "@mui/material";
import { useState } from "react";
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import { authActions } from "../store/index";


const Header = () => {

  const dispatch=useDispatch();

  const isLoggedIn=useSelector(state=>state.isLoggedIn)


  const[value,setValue]=useState();
  return (
    <AppBar

    position="sticky"
      sx={{
        
              background: " linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(5,4,72,60) 15%, rgba(9,9,121,1) 35%, rgba(0,2,0,10) 90%);"
      }}
    >
      <Toolbar>
        <Typography variant="h4">Blog Application</Typography>
        { isLoggedIn && <Box display="flex" marginLeft={"auto"} marginRight="auto">
          <Tabs textColor="inherit" value={value} onChange={(e,val)=>setValue(val)}>

            <Tab LinkComponent={Link} to='/blogs' label="All Blogs"/>

            <Tab LinkComponent={Link} to='/myblogs' label="My Blogs"/>
            
            <Tab LinkComponent={Link} to='/blogs/add' label="Add Blog"/>

          </Tabs>
        </Box>}
        
        <Box display="flex" marginLeft="auto">
          {
            !isLoggedIn && <>
<Button
          LinkComponent={Link} to='/auth'
          variant="contained"
          sx={{margin:1,borderRadius:10}}
           color="warning">LogIn</Button>

          <Button 
          LinkComponent={Link} to='/auth'
          variant="contained"
          sx={{margin:1,borderRadius:10}}
          color="warning">SignUp</Button>
            </>
          }
          
          { isLoggedIn && <Button
          
          onClick={()=>dispatch(authActions.logout())}
          LinkComponent={Link} to='/auth'
          variant="contained"
          sx={{margin:1,borderRadius:10}}
          color="warning">logout</Button>
          }
          
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
