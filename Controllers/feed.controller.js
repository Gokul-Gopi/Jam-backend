const Post = require('../Models/post.model')
const User = require('../Models/user.model');
const { getAllUsers } = require('./user.controller');

const getFeed = async (req, res) => {
    const { userID } = req;
    try {
        const user = await User.findById(userID)
        const { followers } = await user.populate({ path: 'followers', populate: { path: 'posts' } }).execPopulate()
        const response = followers.map(({ userName, _id, posts }) => ({ userName, _id, posts }))
        res.json({ posts: response })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'error while retrieving post data' });
    }
}



module.exports = { getFeed }

