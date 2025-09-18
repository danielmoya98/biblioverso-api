import pool from "../db.js";

// Obtener todas las categorías
export const getCategorias = async () => {
    const { rows } = await pool.query(
        "SELECT id_categoria, nombre FROM categoria ORDER BY nombre"
    );
    return rows;
};

// Obtener libros de una categoría
export const getLibrosByCategoria = async (idCategoria) => {
    const { rows } = await pool.query(
        `SELECT l.id_libro, l.titulo, l.portada, c.nombre AS categoria
     FROM libro l
     JOIN categoria c ON l.id_categoria = c.id_categoria
     WHERE c.id_categoria = $1`,
        [idCategoria]
    );
    return rows;
};
