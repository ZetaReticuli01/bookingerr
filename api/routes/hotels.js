import express from "express"
// import Hotel from "../models/Hotel.js"
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
import  {verifyAdmin} from "../utils/verifyToken.js";

const router= express.Router();

// CREATE UPDATE DELETE GET GETALL
// router.post("/:id?limit=5",(req,res)=>{
router.post("/",verifyAdmin, createHotel)

    // const newHotel = new Hotel(req.body)
    // try{
    //     const savedHotel = await newHotel.save()
    //     res.status(200).json(savedHotel)

    // }
    // catch(err){
    // res.status(500).json(err)
    // }


//UPDATE
router.put("/:id",verifyAdmin,  updateHotel)

//DELETE
router.delete("/:id",verifyAdmin, deleteHotel)
//GET
router.get("/find/:id", getHotel)
//GETALL
router.get("/", getHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
    // console.log("HI, i am hotel router")
    // const failed = true;
    // const err = new Error()
    // err.status=404
    // err.message="Sorry not found"
    // if(failed) return next(createError(401,"You are not authenticated"))
    // return next()



export default router