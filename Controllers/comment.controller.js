const Comment = require('../Models/comment.model')
const Post = require('../Models/post.model')
const User = require('../Models/user.model')

const createComment = async (req, res) => {
    const { userID, nortification } = req
    const { postID } = req.params
    const { commentInput } = req.body

    try {
        const post = await Post.findById(postID)
        const user = await User.findById(userID)
        const newComment = {
            postID,
            userID,
            userName: user.userName,
            text: commentInput
        }
        const comment = new Comment(newComment)
        await comment.save()

        const newNortification = { text: `${user.userName} commented on your tweet` }
        post.comments.push(comment)
        nortification.allNortifications.push(newNortification)
        await nortification.save()

        await post.save()
        await post.populate('comments.comment').execPopulate()

        res.json({ post })

    } catch (err) {
        console.log(err)
        res.json(`Error: ${err.message}`)
    }
}


module.exports = { createComment }