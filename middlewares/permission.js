module.exports = (...roles) => {
    return (req, res, next) => {
        // ambil role dari data users yang login
        const role = req.user.data.role

        // cek apakah role user include di roles
        if(!roles.includes(role)) {
            return res
                .status(405)
                .json({
                    status: 'error',
                    message: 'you dont have a permission'
                })
        }

        // jika memiliki akses maka next ke task berikutnya
        return next()
    }
}