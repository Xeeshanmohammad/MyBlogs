const mongoose = require('mongoose')

const connectDb = ()=>{
    return mongoose.connect(process.env.MONGO_URI,{

    }).then(()=>console.log('Database is connected '))
    .catch((error)=>console.log('Database is not connected'))
}

module.exports = connectDb