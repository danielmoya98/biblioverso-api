// models/UsuarioDesktopModel.js
import pool from "../db.js";
import bcrypt from "bcrypt";

// Buscar usuario por username o email
export const findUserByUsernameOrEmailDesktop = async (username) => {
    const query = `
    SELECT u.id_usuario, u.cl_usuario, u.usuario, u.password, u.nombre, u.apellido, 
           u.email, u.telefono, u.direccion, u.genero, u.fecha_nac, u.nacionalidad, 
           u.biografia, u.foto, u.id_rol, u.fecha_creacion, u.fecha_actualizacion,
           r.nombre AS rol_nombre, r.descripcion AS rol_descripcion
    FROM usuario u
    LEFT JOIN rol r ON u.id_rol = r.id_rol
    WHERE u.usuario = $1 OR u.email = $1
    LIMIT 1
  `;

    const { rows } = await pool.query(query, [username]);
    return rows[0];
};

export const validatePasswordDesktop = async (plainPassword, hashedPassword) => {
    if (!hashedPassword) return false;
    // compara directo sin bcrypt
    return plainPassword === hashedPassword;
};

