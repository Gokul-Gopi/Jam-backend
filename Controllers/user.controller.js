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
        res.status(201).json({ name: userDetails.userName, id: user._id, token, success: true })

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

        const verifyPassword = password === user.password
        if (!verifyPassword) {
            throw new Error('Invalid e-Mail or password!')
        }
        const token = jwt.sign({ userID: user._id }, process.env.Key)
        res.json({ name: userName, id: user._id, token, success: true })

    } catch (err) {
        console.log(err.message)
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
            if (user.followers.includes(userID)) {
                return { name: user.userName, _id: user._id, bio: user.bio, following: true }
            }
            return { name: user.userName, _id: user._id, bio: user.bio, following: false }
        })

        const filterOutCurrentUser = checkFollowing.filter(user => user._id.toString() !== userID)
        res.json({ users: filterOutCurrentUser })

    } catch (err) {
        console.log(err.message)
        res.status(400).json({ Error: err.Message })
    }
}

const followUser = async (req, res) => {
    const { userToFollow } = req.body
    const { userID } = req
    try {
        const followUser = await User.findById(userToFollow)
        const currentUser = await User.findById(userID)

        if (followUser.followers.includes(userID)) {
            followUser.followers.remove({ _id: userID })
            currentUser.following.remove({ _id: userToFollow })
        } else {
            followUser.followers.push({ _id: userID })
            currentUser.following.push({ _id: userToFollow })
        }
        await followUser.save()
        await currentUser.save()
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
        await user.populate({ path: 'posts' }).execPopulate()
        res.json({ userData: { name: user.userName, bio: user.bio }, userPosts: user.posts })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ Error: err.Message })
    }
}


module.exports = { signUpHandler, loginHandler, authVerify, getAllUsers, followUser, getUserDetails }