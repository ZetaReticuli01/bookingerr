import express from "express"
import { createRoom, updateRoom, deleteRoom,getRoom,getRooms } from "../controllers/room.js";
import  {verifyAdmin} from "../utils/verifyToken.js";
// import {hotelid} from "../controllers/room.js"




const router= express.Router();


// CREATE UPDATE DELETE GET GETALL
router.post("/:hotelid",verifyAdmin, createRoom)

//UPDATE
router.put("/:id",verifyAdmin,  updateRoom)

//DELETE
router.delete("/:id/:hotelid",verifyAdmin, deleteRoom)
//GET

router.get("/:id", getRoom)
//GETALL
router.get("/", getRooms)

export default router