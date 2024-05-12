// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// // import authRoute from "./routes/auth.js";
// // import usersRoute from "./routes/users.js";
// import hotelsRoute from "./routes/hotels.js";
// import roomsRoute from "./routes/rooms.js";
// import loginRoute from "./routes/login.js"
// import cookieParser from "cookie-parser";
// import Login from "./models/Login.js";
// import cors from 'cors';
// import bcrypt from 'bcrypt'

// const app = express();
// // const cors = require('cors')

// dotenv.config();

// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }));

// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // app.use("/api/auth", authRoute);
// // app.use("/api/users", usersRoute);
// app.use("/api/hotels", hotelsRoute);
// app.use("/api/rooms", roomsRoute);
// app.use('/api/login', loginRoute)

// app.use((err, req, res, next) => {
//     const errorStatus = err.status || 500;
//     const errorMessage = err.message || "Something went wrong";
//     return res.status(errorStatus).json({
//         success: false,
//         status: errorStatus,
//         message: errorMessage,
//         stack: err.stack,
//     });
// });

// const connect = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO);
//         console.log("Connected to MongoDB");
//     } catch (error) {
//         throw error;
//     }
// };

// mongoose.connection.on('disconnected', () => {
//     console.log("Disconnected from MongoDB");
// });

// mongoose.connection.on('connected', () => {
//     console.log("Connected to MongoDB");
// });

// app.post('/register', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(password, saltRounds);

//         const newUser = new Login({
            
//             email,
//             password:hashedPassword
//         });

//         const savedUser = await newUser.save();

//         res.json({
//             message: "User created successfully",
//             Login: savedUser
//         });

//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Internal server error" });
//     }
// })

// app.listen(8080, () => {
//     connect();
//     console.log("Connected to backend!");
// });



import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
// import loginRoute from "./routes/login.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import bcrypt from "bcrypt"
import Login from "./models/Login.js";
import jwt from "jsonwebtoken"
const app = express();
// const cors = require('cors')

dotenv.config();

app.use(cors({
    origin: 'http://localhost:5143',
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// app.use("/api/register", loginRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});


app.post('/reg', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new Login({
            name,
            email,
            password:hashedPassword
        });

        const savedUser = await newUser.save();

        res.json({
            message: "User created successfully",
            Login: savedUser
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
})

const secretKey = 'your-secret-key';

// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const newUser = new Login({
//             email,
//             password
//         });

//         if (newUser) {
//             const dat = await bcrypt.compare(password, newUser.password);
//             const payload = {
//                 id: newUser.id,
//                 email: newUser.email,
//             };
//              if (dat) {
//                 const token = jwt.sign(payload, secretKey , {
//                     expiresIn: '1h',
//                 });
//                 res.status(200).json({ token });
//             } else {
//                 res.status(401).send('Failed');
//             }
//         }
        

//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Internal server error" });
//     }
// })

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await Login.findOne({ email });

        if (!existingUser) {
            return res.status(401).send('Invalid email or password');
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch) {
            return res.status(401).send('Invalid email or password');
        }

        const token = jwt.sign({ id: existingUser.id, email: existingUser.email }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on('disconnected', () => {
    console.log("Disconnected from MongoDB");
});

mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});

app.listen(8080, () => {
    connect();
    console.log("Connected to backend!");
});





