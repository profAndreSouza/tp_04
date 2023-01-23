const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    const secret = process.env.APP_SECRET

    if (!token) {
        return res.status(401).json({ msg: "Acesso negado!"})
    }

    try {
        jwt.verify(token, secret)
        next()
    } catch (error) {
        res.status(400).json({msg: "Token inválido!"})
    }

}