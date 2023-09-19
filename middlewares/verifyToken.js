const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

module.exports = async (req, res, next) => {

    // ambil token dari headers
    const token = req.headers.authorization

    // melakukan verifikasi access token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        // cek apakah error
        if(err) {
            return res.status(403).json({
                message: err.message
            })
        }

        // ambil data user, inject ke request
        req.user = decoded
        return next()
    })
}