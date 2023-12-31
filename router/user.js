const express = require ('express')
const { register, login, allUser, updateUser, deleteUser } = require('../contoller/users')
const bcrypt = require('bcrypt')
const authMiddleware = require ('../midleware/auth')


const router = express.Router()
router.post ('/api/users/register' ,register )
router.post ('/api/users/login' ,login )
router.get('/api/users',authMiddleware,allUser)
router.put('/api/users/:id',authMiddleware,updateUser)
router.delete('/api/users/:id',authMiddleware,deleteUser)





module.exports = router