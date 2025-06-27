const Autor = require('../models/Autor');

exports.getAllAutores = async (req, res) => {
    try {
        const autores = await Autor.getAll();
        res.status(200).json(autores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAutorById = async (req, res) => {
    try {
        const autor = await Autor.getById(req.params.id_autor);
        if (!autor) {
            return res.status(400).json({ error: 'Autor not found' });
        }
        res.status(200).json(autor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.createAutor = async (req, res) => {
    try {
        const autor = await Autor.create(req.body);
        res.status(201).json(autor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateAutor = async (req, res) => {
    try {
        const autor = await Autor.update(req.params.id_autor, req.body);
        if (!autor) {
            return res.status(400).json({ error: 'Autor no encontrado' });
        }
        res.status(200).json(autor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteAutor = async (req, res) => {
    try {
        const autor = await Autor.delete(req.params.id_autor);
        if (!autor) {
            return res.status(400).json({ error: 'Autor not found' });
        }
        res.status(200).json({ message: 'Autor eliminado', autor });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}