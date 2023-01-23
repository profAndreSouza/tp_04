// Models
const User = require('./../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async(req, res) => {
    const { email, password } = req.body

    
    // validations
    if (!email) {
        return res.status(422).json({msg: 'O e-mail é obrigatório!'})
    }

    if (!password) {
        return res.status(422).json({msg: 'A senha é obrigatória!'})
    }

    // check if User exists
    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(404).json({msg: 'Usuário não encontrado!'})
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
        return res.status(422).json({msg: 'Senha Inválida!'})
    }

    try {
        const secret = process.env.APP_SECRET
        const token = jwt.sign({
            id: user._id,
        }, secret,)

        res.status(200).json({msg: "Autenticação realizada com sucesso!", token})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error })
    }


}