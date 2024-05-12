// import mongoose from "mongoose"
// const {Schema} = mongoose;

// const LoginSchema=new mongoose.Schema({
    
//     // name: String,

//     email: String,
//     password:String
   
// },{timestamps:true})


import mongoose from "mongoose"

const LoginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        // unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
 
})


export default mongoose.model("Login",LoginSchema)
