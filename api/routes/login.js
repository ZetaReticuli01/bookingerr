import express from "express"
// import Hotel from "../models/Hotel.js"
// import  {verifyAdmin} from "../utils/verifyToken.js";
import  { signUp } from "../controllers/login.js"

const router= express.Router();

// CREATE UPDATE DELETE GET GETALL
// router.post("/:id?limit=5",(req,res)=>{
router.post("/register", signUp)


export default router