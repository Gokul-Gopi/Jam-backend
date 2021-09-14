const User = require('../Models/user.model')
const Post = require('../Models/post.model')
const Nortification = require('../Models/nortification.model')

const createPost = async (req, res) => {
    const { userID } = req;
    const { postInput } = req.body;

    try {
        const post = new Post({
            text: postInput,
            user: userID
        })

        await post.save()
        res.status(201).json({ post });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "error while uploading a post" });
    }
}

const getUserPosts = async (req, res) => {
    const { userID } = req
    try {
        const allPosts = await Post.find({ user: userID })
        //maybe populate
        res.json({ allPosts })
    } catch (err) {
        res.status(400).json(`Error: ${err.message}`)
    }
}

const likePost = async (req, res) => {
    const { userID, nortification } = req
    const { postID } = req.params
    const user = await User.findById(userID)

    try {
        const post = await Post.findById(postID)
        if (!post.likes.id(userID)) {
            post.likes = [...post.likes, { _id: userID }]

            const newNortification = { text: `${user.userName} liked your tweet` }
            nortification.allNortifications.push(newNortification)
            await nortification.save()

        } else {
            post.likes.remove(userID)
        }
        await post.save()
        res.json({ post })
    } catch (err) {
        console.log(err.message)
        res.status(400).json(`Error: ${err.message}`)
    }
}

module.exports = { createPost, getUserPosts, likePost }