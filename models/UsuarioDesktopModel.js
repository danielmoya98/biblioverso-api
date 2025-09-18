// models/UsuarioDesktopModel.js
import pool from "../db.js";

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

// Obtener todos los clientes (rol = 2)
export const getClientes = async () => {
    const query = `
    SELECT id_usuario, usuario, nombre, apellido, email, telefono, direccion,
           genero, fecha_nac, nacionalidad, biografia, foto, id_rol
    FROM usuario
    WHERE id_rol = 2
    ORDER BY id_usuario
  `;
    const { rows } = await pool.query(query);
    return rows;
};

// Crear cliente
export const createCliente = async (cliente) => {
    const query = `
    INSERT INTO usuario (usuario, password, nombre, apellido, email, telefono, direccion, genero,
                         fecha_nac, nacionalidad, biografia, foto, id_rol)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,2)
    RETURNING id_usuario, usuario, email, id_rol
  `;
    const values = [
        cliente.usuario,
        cliente.password,
        cliente.nombre,
        cliente.apellido,
        cliente.email,
        cliente.telefono,
        cliente.direccion,
        cliente.genero,
        cliente.fecha_nac,
        cliente.nacionalidad,
        cliente.biografia,
        cliente.foto,
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

// Actualizar cliente
export const updateCliente = async (cliente) => {
    const query = `
    UPDATE usuario SET usuario=$1, password=$2, nombre=$3, apellido=$4,
                       email=$5, telefono=$6, direccion=$7, genero=$8,
                       fecha_nac=$9, nacionalidad=$10, biografia=$11, foto=$12
    WHERE id_usuario=$13 AND id_rol=2
    RETURNING *
  `;
    const values = [
        cliente.usuario,
        cliente.password,
        cliente.nombre,
        cliente.apellido,
        cliente.email,
        cliente.telefono,
        cliente.direccion,
        cliente.genero,
        cliente.fecha_nac,
        cliente.nacionalidad,
        cliente.biografia,
        cliente.foto,
        cliente.id_usuario,
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

// Eliminar cliente
export const deleteCliente = async (id) => {
    const query = "DELETE FROM usuario WHERE id_usuario=$1 AND id_rol=2";
    const { rowCount } = await pool.query(query, [id]);
    return rowCount > 0;
};

