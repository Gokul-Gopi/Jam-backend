const Post = require('../Models/post.model')

const getFeed = async (req, res) => {
    const { userID } = req;

    try {
        const posts = await Post.find({ user: userID })
        res.json({ posts })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'error while retrieving post data' });
    }
}



module.exports = { getFeed }

