const express = require('express');

const router = express.Router();

const {
    listarProdutos,
    calcular
} = require('../controladores/calculadoraControlador');

router.get('/produtos', listarProdutos);

router.post('/calcular', calcular);

module.exports = router;