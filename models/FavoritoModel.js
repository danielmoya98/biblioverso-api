import pool from "../db.js";

const FavoritoModel = {
    async agregarFavorito(idUsuario, idLibro) {
        const query = `
            INSERT INTO favoritos (id_usuario, id_libro)
            VALUES ($1, $2)
            ON CONFLICT (id_usuario, id_libro) DO NOTHING
            RETURNING *;
        `;
        const result = await pool.query(query, [idUsuario, idLibro]);
        return result.rows[0]; // puede ser undefined si ya existía
    },

    async obtenerFavoritosPorUsuario(idUsuario) {
        const query = `
            SELECT f.id_favorito, f.fecha_agregado,
                   l.id_libro, l.titulo, l.portada, l.sinopsis
            FROM favoritos f
            JOIN libro l ON l.id_libro = f.id_libro
            WHERE f.id_usuario = $1
            ORDER BY f.fecha_agregado DESC;
        `;
        const result = await pool.query(query, [idUsuario]);
        return result.rows;
    }
};

export default FavoritoModel;
