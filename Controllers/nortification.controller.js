const User = require('../Models/user.model')
const Nortification = require('../Models/nortification.model')

const getNortifications = async (req, res) => {
    const { nortification } = req
    res.json({ nortification: nortification.allNortifications })
}

const setUpNortificationBox = async (req, res, next) => {
    const { userID } = req

    try {
        const userNortificationBox = await Nortification.findOne({ user: userID })
        if (!userNortificationBox) {
            const nortification = new Nortification({ user: userID, allNortifications: [] })
            await nortification.save()
            req.nortification = nortification
        } else {
            req.nortification = userNortificationBox
        }
        next()
    } catch (err) {
        res.status(404).json(`Error: ${err.message}`)
    }

}

module.exports = { getNortifications, setUpNortificationBox }