const User = require('../Models/user.model')
const Post = require('../Models/post.model')

const createPost = async (req, res) => {
    const { userID } = req;
    const { postInput } = req.body;

    try {
        const user = await User.findById(userID)
        const post = new Post({
            text: postInput,
            user: userID
        })

        await post.save()
        user.posts.push(post._id)
        await user.save()
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
        res.json({ allPosts })
    } catch (err) {
        res.status(400).json(`Error: ${err.message}`)
    }
}

const likePost = async (req, res) => {
    const { userID, nortification } = req
    const { postID } = req.params

    try {
        const post = await Post.findById(postID)
        const user = await User.findById(post.user)
        if (!post.likes.includes(userID)) {
            post.likes.push(userID)

            // const newNortification = { text: `${user.userName} liked your tweet` }
            // nortification.allNortifications.push(newNortification)
            // await nortification.save()

        } else {
            post.likes.remove(userID)
        }
        await post.save()
        const updatedPost = { name: user.userName, id: postID, input: post.text, likes: post.likes, comments: post.comments }
        res.json({ updatedPost })
    } catch (err) {
        console.log(err.message)
        res.status(400).json(`Error: ${err.message}`)
    }
}

module.exports = { createPost, getUserPosts, likePost }