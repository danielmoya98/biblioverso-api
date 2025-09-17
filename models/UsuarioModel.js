import pool from "../db.js";

const UsuarioModel = {
    async findByEmail(email, password) {
        const query = `
            SELECT u.*, r.nombre as rol_nombre
            FROM usuario u
                     INNER JOIN rol r ON u.id_rol = r.id_rol
            WHERE u.email = $1
              AND u.password = $2
              AND u.id_rol = 2
                LIMIT 1
        `;
        const result = await pool.query(query, [email, password]);
        return result.rows[0]; // null si no existe
    },
    async create({ usuario, email, password }) {
        const query = `
      INSERT INTO usuario (usuario, email, password, id_rol)
      VALUES ($1, $2, $3, 2)
      RETURNING id_usuario, usuario, email, id_rol
    `;
        const values = [usuario, email, password];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

};

export default UsuarioModel;
