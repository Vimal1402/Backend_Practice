const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const authRouter = express.Router()
const crypto = require('crypto');

authRouter.post("/register", async (req, res) => {
    const { email, name, password } = req.body

    const isUserAlreadyexists = await userModel.findOne({email});

    if(isUserAlreadyexists){
        return res.status(409).json({
            message: "User already exists"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        email, password: hash, name
    })

    const token = jwt.sign({
        id: user._id,
        email: user.email,
    },
    process.env.JWT_SECRET,{expiresIn:"1h"}
)
    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "User registered",
        user,
        token
    })
})

authRouter.get('/get-me', async(req, res) =>{
    console.log(req.cookies);
    const token = req.cookies.jwt_token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findById(decoded.id)
    res.json({
        name: user.name,
        email: user.email,
    })
    console.log(decoded);
})

authRouter.post("/protected", (req, res) => {
    console.log(req.cookies);

    res.status(200).json({
        message: "This is protected route"
    })
})



authRouter.post("/login", async (req, res) => {
    const {email, password} = req.body
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }
    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex");
    if(!isPasswordMatched){
        res.status(401).json({
            message: "Invalid Password"
        })
    }
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("jwt_token", token)
    res.status(201).json({
        message: "user logged in",
        user
    })
})




module.exports = authRouter