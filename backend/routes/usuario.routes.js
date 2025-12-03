const express = require('express')
const router = express.Router()

const usuarioController = require('../controller/usuario.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/', usuarioController.cadastrar)
router.get('/', usuarioController.listar)
router.get('/me', authMiddleware, usuarioController.getUsuarioLogado)
router.patch('/me', authMiddleware, usuarioController.atualizar)
router.delete('/me', authMiddleware, usuarioController.apagar)

module.exports = router