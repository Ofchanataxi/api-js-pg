const express = require('express');
const router = express.Router();

const AutorController = require('../controllers/AutorController');

// Rutas para manejar las operaciones CRUD de autores
router.get('/autores', AutorController.getAllAutores);  
router.get('/autores/:id_autor', AutorController.getAutorById);
router.post('/autores', AutorController.createAutor);
router.put('/autores/:id_autor', AutorController.updateAutor);
router.delete('/autores/:id_autor', AutorController.deleteAutor);

// Exportar el router para usarlo en app.js
module.exports = router;