import Header from "./Components/Header";
import Blogs from "./Components/Blogs";
import UsersBlog from "./Components/UsersBlog";
import BlogDetails from "./Components/BlogDetails";
import AddBlog from "./Components/AddBlog";

import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./Components/Auth";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./Store";
function App() {
  const dispath = useDispatch();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispath(authActions.login());
    }
  }, [dispath]);
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <Route path="/auth" element={<Auth />} />
          ) : (
            <>
              <Route path="/blogs" element={<Blogs/>} />
              <Route path="/blogs/addBlog" element={<AddBlog/>} />
              <Route path="/myBlogs" element={<UsersBlog/>} />
              <Route path="/myBlogs/:id" element={<BlogDetails />} />{" "}
            </>
          )}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;