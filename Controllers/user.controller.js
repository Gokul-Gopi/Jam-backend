const User = require('../Models/user.model')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
dotenv.config()

const signUpHandler = async (req, res) => {
    const userDetails = req.body
    try {
        const user = new User({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            userName: userDetails.userName,
            bio: userDetails.bio,
            email: userDetails.email,
            password: userDetails.pwd
        })

        await user.save()

        const token = jwt.sign({ userID: user._id }, process.env.Key)
        res.status(201).json({ name: userDetails.userName, token, success: true })

    } catch (err) {
        res.status(401).json({ message: err.message })
    }
}

const loginHandler = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName })
        if (!user) {
            throw new Error("User doesn't exist !")
        }

        const verifyPassword = await bcrypt.compare(password, user.password)
        if (!verifyPassword) {
            throw new Error('Invalid e-Mail or password!')
        }
        const token = jwt.sign({ userID: user._id }, process.env.Key)
        res.json({ name: userName, token, success: true })

    } catch (err) {
        return res.status(401).json({ message: err.message })
    }
}

const authVerify = (req, res, next) => {
    const key = process.env.Key
    const token = req.headers?.authorization.split(',')[0]

    try {
        const decoded = jwt.verify(token, key)
        req.userID = decoded.userID
        next()

    } catch (err) {
        res.status(401).json({ message: err.Message })
        console.log(err.message)
    }
}

const getAllUsers = async (req, res) => {
    const { userID } = req
    try {
        const users = await User.find({})
        const currentUser = await User.findById(userID)
        const checkFollowing = users.map(user => {
            if (user.followers.id(userID)) {
                return { name: user.userName, _id: user._id, bio: user.bio, following: true }
            }
            return { name: user.userName, _id: user._id, bio: user.bio, following: false }
        })
        const filterOutCurrentUser = checkFollowing.filter(user => user._id.toString() !== userID)
        res.json({ users: filterOutCurrentUser })

    } catch (err) {
        res.status(400).json({ Error: err.Message })
    }
}

const followUser = async (req, res) => {
    const { userToFollow } = req.body
    const { userID: currentUser } = req
    try {
        const user = await User.findById(userToFollow)
        if (user.followers.id(currentUser)) {
            user.followers.remove({ _id: currentUser })
        } else {
            user.followers.push({ _id: currentUser })
        }
        await user.save()
        res.json({ updatedFollowers: userToFollow })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ Error: err.Message })
    }
}

const getUserDetails = async (req, res) => {
    const { userID } = req

    try {
        const user = await User.findById(userID)
        res.json({ userDetails: user })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ Error: err.Message })
    }
}


module.exports = { signUpHandler, loginHandler, authVerify, getAllUsers, followUser, getUserDetails }