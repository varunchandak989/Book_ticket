const mongoose = require("mongoose");

const connectDb = async ()=>{
    try {
       await mongoose.connect(process.env.mongo_url);
       console.log("DB Connected")
    } catch (error) {
        console.log("DB Connection Failed ", error)
    }
}

module.exports={
    connectDb
}