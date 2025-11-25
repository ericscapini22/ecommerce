const express = require('express')
const router = express.Router()

const { criar, listar, atualizar,atualizarCompleto, apagar } = require('../controller/produto.controller')

// Middlewares
const authMiddleware = require('../middleware/auth.middleware')
const isAdminMiddleware = require('../middleware/isAdmin.middleware')

// POST /produto
router.post(
    '/',
    authMiddleware,      // precisa estar logado
    isAdminMiddleware,   // precisa ser admin
    criar
)

// GET – Listar produtos (qualquer usuário logado)
router.get(
'/',
authMiddleware,
listar
)

// Atualizar parcialmente produto (ADMIN)
router.patch(
'/:id',
authMiddleware,
isAdminMiddleware,
atualizar
)

// PUT - completo
router.put(
    '/:id', 
    authMiddleware, 
    isAdminMiddleware, 
    atualizarCompleto
)

// DELETE
router.delete(
    '/:id',
    authMiddleware,
    isAdminMiddleware,
    apagar
)

module.exports = router