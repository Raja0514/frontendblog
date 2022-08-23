import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import Userblog from "./components/Userblog";
import Blogdetail from "./components/Blogdetail";
import Addblog from "./components/Addblog";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/index";


function App() {

  const dispatch=useDispatch();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  useEffect(()=>{
    if(localStorage.getItem("userId")){

      dispatch(authActions.login())
    }
  },[dispatch])

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <Route path="/auth" element={<Auth />} />
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/add" element={<Addblog />} />
              <Route path="/myblogs" element={<Userblog />} />
              <Route path="/myblogs/:id" element={<Blogdetail />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}
export default App;
