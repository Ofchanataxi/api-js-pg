const pool = require('../config/db');

class Libro {
    constructor(id_libro, titulo, id_autor, descripcion, genero, anio, editorial) {
        this.id_libro = id_libro;
        this.titulo = titulo;
        this.id_autor = id_autor;
        this.descripcion = descripcion;
        this.genero = genero;
        this.anio = anio;
        this.editorial = editorial;
    }

    static async getAll() {
        const result = await pool.query('SELECT * FROM libro ORDER BY titulo');
        return result.rows.map(row => new Libro(row.id_libro, row.titulo, row.id_autor, row.descripcion, row.genero, row.anio, row.editorial));
    }

    static async getById(id_libro) {
        const result = await pool.query('SELECT * FROM libro WHERE id_libro = $1', [id_libro]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Libro(row.id_libro, row.titulo, row.id_autor, row.descripcion, row.genero, row.anio, row.editorial);
        } else {
            throw new Error('Libro not found');
        }
    }

    static async create(libro) {
        const result = await pool.query(
            'INSERT INTO libro (titulo, id_autor, descripcion, genero, anio, editorial) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [libro.titulo, libro.id_autor, libro.descripcion, libro.genero, libro.anio, libro.editorial]
        );
        const row = result.rows[0];
        return new Libro(row.id_libro, row.titulo, row.id_autor, row.descripcion, row.genero, row.anio, row.editorial);
    }

    static async update(id_libro, libro) {
        const result = await pool.query(
            'UPDATE libro SET titulo = $1, id_autor = $2, descripcion = $3, genero = $4, anio = $5, editorial = $6 WHERE id_libro = $7 RETURNING *',
            [libro.titulo, libro.id_autor, libro.descripcion, libro.genero, libro.anio, libro.editorial, id_libro]
        );
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Libro(row.id_libro, row.titulo, row.id_autor, row.descripcion, row.genero, row.anio, row.editorial);
        } else {
            throw new Error('Libro not found');
        }
    }

    static async delete(id_libro) {
        const result = await pool.query('DELETE FROM libro WHERE id_libro = $1 RETURNING *', [id_libro]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Libro(row.id_libro, row.titulo, row.id_autor, row.descripcion, row.genero, row.anio, row.editorial);
        } else {
            throw new Error('Libro not found');
        }
    }
}