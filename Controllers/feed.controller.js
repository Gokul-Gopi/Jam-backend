const Post = require('../Models/post.model')
const User = require('../Models/user.model')

const getFeed = async (req, res) => {
    const { userID } = req;
    try {
        const user = await User.findById(userID)
        const posts = user.posts
        // const posts = await user.populate(['followers', 'posts']).execPopulate()

        // res.json({ posts: followers.posts })
        // const posts = await Post.find({ user: userID })
        res.json({ posts })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'error while retrieving post data' });
    }
}



module.exports = { getFeed }

