const Post = require('../Models/post.model')
const User = require('../Models/user.model');
const { getAllUsers } = require('./user.controller');

const getFeed = async (req, res) => {
    const { userID } = req;
    try {
        const user = await User.findById(userID)
        const { following } = await user.populate({ path: 'following', populate: { path: 'posts' } }).execPopulate()
        let allposts = []
        following.map(user => {
            return user.posts.map(post => allposts.push({ name: user.userName, id: post._id, input: post.text, likes: post.likes, comments: post.comments }))
        })
        res.json({ posts: allposts })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'error while retrieving post data' });
    }
}



module.exports = { getFeed }

