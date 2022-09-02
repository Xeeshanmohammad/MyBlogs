const User = require('../Models/userModel')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

router.post('/signup', async(req,res)=>{
    const {name,email,password} = req.body
    let existingUser;
    try {
        existingUser = await User.findOne({email})
    } catch (error) {
      return  console.log(error);
    }
    if(existingUser){
      return  res.status(403).json({message:'User Already exist'})
    }
    const bcryptPassword = bcrypt.hashSync(password)
    const user = new User({
        name,
        email,
        password:bcryptPassword,
        blogs:[]
    })
    try {
        await user.save()
    } catch (error) {
     return  console.log(error); 
    }
    
    return res.status(201).json({user})
})

router.get('/getAllUser', async(req,res)=>{
    let users;
    try {
        users = await User.find()
    } catch (error) {
        console.log(error);
    }
    if(!users){
     return  res.status(403).json({message:"No user found"})
    }
    return res.status(200).json({users})
})

router.post('/login', async(req,res)=>{
const {email, password} = req.body
let existingUser;
try {
    existingUser = await User.findOne({email})
} catch (error) {
  return  console.log(error);
}
if(!existingUser){
  return  res.status(404).json({message:"User cannot found"})
}
const isPasswordMatch = await bcrypt.compareSync(password, existingUser.password)
if(!isPasswordMatch){
   return res.status(404).json({message:"Invalid Credentials"})
}
return res.status(201).json({message:"Login Successful"})

})

module.exports = router