// Models
const User = require('./../models/User')
const bcrypt = require('bcrypt')

exports.getUser = async(req, res) => {
    const id = req.params.id

    // check if user exists
    const user = await User.findById(id, '-password')

    if (!user) {
        return res.status(404).json({msg: "Usuário não encontrado!"})
    }

    res.status(200).json( user )
}


exports.register = async(req, res) => {
    const {name, email, password, confirmpassword} = req.body

    // validations
    if (!name) {
        return res.status(422).json({msg: 'O nome é obrigatório!'})
    }

    if (!email) {
        return res.status(422).json({msg: 'O e-mail é obrigatório!'})
    }

    if (!password) {
        return res.status(422).json({msg: 'A senha é obrigatória!'})
    }

    if (password !== confirmpassword) {
        return res.status(422).json({msg: 'As senhas não conferem!'})
    }

    // check if User exists
    const userExists = await User.findOne({ email: email })

    if (userExists) {
        return res.status(422).json({msg: 'Email já cadastrado!'})
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    // create user
    const user = new User( {
        name,
        email,
        password: passwordHash
    })

    try {
        await user.save()
        res.status(200).json({ msg: 'Usuário criado com sucesso! '})
    } catch(error) {
        res.status(500).json({msg: error })
    }
}
