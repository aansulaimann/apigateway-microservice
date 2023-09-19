const jwt = require('jsonwebtoken')
const apiAdapter = require('../../apiAdapter')

const { 
    URL_SERVICE_USER, JWT_SECRET, JWT_SECRET_REFRESH_TOKEN, JWT_ACCESS_TOKEN_EXPIRED 
} = process.env
const api = apiAdapter(URL_SERVICE_USER)

module.exports = async (req, res) => {
    try {
        // ambil data dari body
        const refreshToken = req.body.refresh_token
        const email = req.body.email

        // cek apakah refresh token dikirim
        if(!refreshToken || !email) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid Token'
            })
        }

        // jika refresh token atau email disi
        await api.get('/refresh_tokens', { params: { refresh_token: refreshToken } })

        // verifikasi refresh token
        await jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
            if(err) {
                return res.status(403).json({
                    status: 'error',
                    message: 'Invalid Token'
                })
            }

            // jika token valid, maka cek apakah email yang dikirim sesuai
            if(email !== decoded.data.email) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Email is Not Valid'
                })
            }

            // buat token baru, untuk user agar tetap mendapatkan akses
            const new_token = jwt.sign({data: decoded.data}, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED })

            // kembalikan ke front end, untuk digunakan user
            return res.json({
                status: 'success',
                data: {
                    new_token
                }
            })

        })

    } catch (error) {
        if(error.code === 'ECONNREFUSED') {
            return res.status(500).json({
                status: 'error',
                message: 'service unavailable'
            })
        }

        const {status, data} = error.response
        return res.status(status).json(data)
    }
}