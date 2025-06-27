const express = require('express');
const router = express.Router();
const AutorController = require('../controllers/AutorController');

router.get('/autores', AutorController.getAllAutores);
router.get('/autores/:id_autor', AutorController.getAutorById);
router.post('/autores', AutorController.createAutor);
router.put('/autores/:id_autor', AutorController.updateAutor);
router.delete('/autores/:id_autor', AutorController.deleteAutor);

module.exports = router;