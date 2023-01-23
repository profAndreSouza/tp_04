const express = require('express')
const router = express.Router()
const userController = require('./../controllers/userController')
const checkToken = require('./../auth/checkToken')

// Public Route
router.post("/register", userController.register)

// Private Route
router.get('/:id', checkToken, userController.getUser)

module.exports = router
