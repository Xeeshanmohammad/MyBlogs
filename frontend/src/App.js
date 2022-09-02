import React from 'react'
import Header from "./Components/Header"
import {Route, Routes} from "react-router-dom"
import Auth from './Components/Auth';
import Blogs from './Components/Blogs';
import BlogDetails from './Components/BlogDetails';
import AddBlog from './Components/AddBlog';
import UsersBlog from './Components/UsersBlog';
import { useSelector } from 'react-redux';

function App() {
const isLoggedIn = useSelector(state=>state.isLoggedIn)
console.log(isLoggedIn);
  return <React.Fragment>
       <header>
    <Header/>
       </header>
       <main>
        <Routes>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path='/myBlog' element={<UsersBlog/>}/>
          <Route path='/myBlog/:id' element={<BlogDetails/>}/>
          <Route path='/blogs/add' element={<AddBlog/>}/>

        </Routes>
       </main>
  </React.Fragment>
}

export default App;
