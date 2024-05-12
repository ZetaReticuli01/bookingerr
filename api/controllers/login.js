import Login from "../models/Login.js";
import bcrypt from 'bcrypt'


export const signUp = async (req, res) => {
    const { email , password } = req.body;

    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
        const user = new Login({
            
            email,
            password:hashedPassword
        });

        // Save the user to the database
        const savedUser = await user.save();

        res.json({
            message: "User created successfully",
            Login: savedUser
        });

    } catch (err) {
        
        console.log('err',err);
        res.status(500).json({ error: "Internal server error" });
    }
};


// const secretKey = 'your-secret-key';


// export const login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const values = await prisma.register.findFirst({
//             select: {
//                 email: true,
//                 password: true,
//                 id: true,
//                 name:true
//             },
//             where: {
//                 email: email,
//             }
//         });

//         if (values) {
//             const dat = await bcrypt.compare(password, values.password);
//             const payload = {
//                 id: values.id,
//                 email: values.email,
//                 name:values.name
//             }
//             if (dat) {
//                 const token = jwt.sign(payload, secretKey , {
//                     expiresIn: '1h',
//                 });
//                 res.status(200).json({ token });
//             } else {
//                 res.status(401).send('Failed');
//             }
//         }

//     } catch (err) {
//         console.log(err)
//     }
// }