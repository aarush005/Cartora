const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// Register User
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email is already in use",
            });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 12);

        // Save user to DB
        const newUser = new User({
            userName,
            email,
            password: hashPassword // ✅ Fix applied here
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            msg: "User created successfully",
        });

    } catch (e) {
        console.error("Error in registerUser:", e);
        res.status(500).json({
            success: false,
            message: "Error registering user"
        });
    }
};



// Login User

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {

        const checkUser = await User.findOne({ email });
        if (!checkUser)
            return res.status(400).json({
                success: false,
                message: "User With this email doesn't Exists"
            });

        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password)
        if (!checkPasswordMatch)
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });


            // Generate JWT token

            const token = jwt.sign({
                id: checkUser._id, 
                role: checkUser.role,
                email: checkUser.email
            }, 'CLIENT_SECRET_KEY', {expiresIn: '120m'}
        )
        res.cookie('token', token, {httpOnly: true, secure : false}).json({
            success: true,
            message: "User logged in successfully",
            user : {
                email : checkUser.email,
                role : checkUser.role,
                id: checkUser._id
            }
        })

    } catch (e) {
        console.error("Error in login:", e);
        res.status(500).json({
            success: false,
            message: "Error logging in user"
        });

    }
}





//Logout

const logoutUser = (req, res)=>{
    res.clearCookie('token').json({
        success: true,
        message: "User logged out successfully"
    })

}



// auth middleware
const authMiddleware = async(req, res,next)=>{
    const token = req.cookies.token
    if(!token) return res.status(401).json({
        success: false,
        message: "Unauthorized User!"
        })

        try{
            const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
            req.user = decoded;
            next()
            }catch(e){
                res.status(401).json({
                    success: false,
                    message: "Unauthorized User!"
                    })
        }
}

module.exports = { registerUser, loginUser, logoutUser, authMiddleware};
