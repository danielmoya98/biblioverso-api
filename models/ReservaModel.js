import pool from "../db.js";

const ReservaModel = {
    async findByUsuario(idUsuario) {
        const query = `
      SELECT r.id_reserva, r.fecha_reserva, r.estado,
             l.id_libro, l.titulo, l.portada,
             COALESCE(string_agg(a.nombre, ', '), 'Desconocido') AS autor
      FROM reserva r
      JOIN libro l ON l.id_libro = r.id_libro
      LEFT JOIN libro_autor la ON la.id_libro = l.id_libro
      LEFT JOIN autor a ON a.id_autor = la.id_autor
      WHERE r.id_usuario = $1
      GROUP BY r.id_reserva, l.id_libro
      ORDER BY r.fecha_reserva DESC
    `;
        const result = await pool.query(query, [idUsuario]);
        return result.rows;
    }
};

export default ReservaModel;
