import mongoose from "mongoose"
const {Schema} = mongoose;

const RoomSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    maxPeople:{
        type:Number,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    roomNumbers:[
        {number:Number, unavailableDates:{type:[Date]}
    }
],


},{timestamps:true})
// [
//     {number:101,unavailableDates:[01.04.2024,02.04.2024]}
//     {number:102,unavailableDates:[]}
//     {number:103,unavailableDates:[]}
//     {number:104,unavailableDates:[]}
//     {number:105,unavailableDates:[]}
   
// ]

export default mongoose.model("Room",RoomSchema)