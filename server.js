const express = require('express');
const app = express();
const dotenv = require('dotenv')
const connectToMongo = require('./connentToDB')
const userRoutes = require('./Routes/user.routes')
const feedRoutes = require('./Routes/feed.routes')
const nortificationRoutes = require('./Routes/nortification.routes')
const commentRoutes = require('./Routes/comment.routes')
const postRoutes = require('./Routes/post.routes')
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config()
connectToMongo()
app.use(cors())
app.use(bodyParser.json())


app.use('/user', userRoutes)
app.use('/feed', feedRoutes)
app.use('/nortification', nortificationRoutes)
app.use('/post', postRoutes)
app.use('/comment', commentRoutes)


app.get('/', (req, res) => {
    res.send('API is running...')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${5000}...`))