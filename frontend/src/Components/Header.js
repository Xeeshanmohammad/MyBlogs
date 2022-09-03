import React, { useState } from 'react'
import {AppBar, Toolbar, Typography,Box, Button, Tab, Tabs} from "@mui/material" 
//from materialui
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { authAction } from '../Store'

function Header() { 
  const dispath = useDispatch()
  const isLoggedIn = useSelector((state)=>state.isLoggedIn)
  const [value, setValue] = useState(false)
  return (
    //from cssgradiants.io
   <AppBar 
   position='sticky'
   sx={{background:" linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,9,0.19371498599439774) 2%, rgba(0,172,255,1) 52%)"}}>         
    <Toolbar>
        <Typography variant='h4'>BlogsApp</Typography>
        {isLoggedIn && <Box display="flex" marginLeft="auto" marginRight="auto">
          <Tabs 
          textColor='inherit'
          value={value} onChange = {(e,val)=>setValue(val)}>
            <Tab LinkComponent={Link} to="/blogs" label = "All Blogs"/>
            <Tab LinkComponent={Link} to="/myBlog" label = "My Blogs"/>
          </Tabs>
        </Box>}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (<> <Button  LinkComponent={Link} to="/auth" variant='contained' sx={{margin:1, borderRadius:10}} color='warning'>login</Button>

          <Button LinkComponent={Link} to="/auth" variant='contained' sx={{margin:1 ,borderRadius:10}} color='warning'>signup</Button></>)}

       {isLoggedIn &&( <Button onClick={()=>dispath(authAction.logout())} LinkComponent={Link} to="/auth" variant='contained' sx={{margin:1 ,borderRadius:10}} color='warning'>logout</Button>)}
        </Box>
    </Toolbar>
   </AppBar>
  )
}

export default Header
