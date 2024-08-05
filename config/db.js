const mongoose= require('mongoose');
const config = require('config')
const db= config.get('mongoURL');

const connectDB= async()=>{
    try{
        await mongoose.connect(db);

        console.log("Mongo DB connected");
    }catch(error){
        console.log(error);
        process.exit();

    }
}
module.exports=connectDB;
