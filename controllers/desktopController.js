import {
    findUserByUsernameOrEmailDesktop,
    validatePasswordDesktop, getClientes ,createCliente , updateCliente , deleteCliente
} from "../models/UsuarioDesktopModel.js";

export const loginDesktop = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Faltan credenciales" });
        }

        const user = await findUserByUsernameOrEmailDesktop(username);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const isValidPassword = await validatePasswordDesktop(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Solo permitir rol = 1
        if (user.id_rol !== 1) {
            return res.status(403).json({
                message: "Acceso denegado. Solo usuarios administradores pueden acceder."
            });
        }

        delete user.password; // limpiar antes de enviar

        res.json({
            message: "Login exitoso (Desktop - Admin)",
            user,
        });
    } catch (err) {
        console.error("Error en loginDesktop:", err.message);
        res.status(500).json({message: "Error en el servidor", error: err.message});
    }
};

// GET clientes
export const obtenerClientes = async (req, res) => {
    try {
        const clientes = await getClientes();
        res.json(clientes);
    } catch (err) {
        res.status(500).json({ error: "Error obteniendo clientes", details: err.message });
    }
};

// POST crear cliente
export const crearCliente = async (req, res) => {
    try {
        const cliente = await createCliente(req.body);
        res.status(201).json(cliente);
    } catch (err) {
        res.status(500).json({ error: "Error creando cliente", details: err.message });
    }
};

// PUT actualizar cliente
export const actualizarCliente = async (req, res) => {
    try {
        const cliente = await updateCliente({ ...req.body, id_usuario: req.params.id });
        if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });
        res.json(cliente);
    } catch (err) {
        res.status(500).json({ error: "Error actualizando cliente", details: err.message });
    }
};

// DELETE cliente
export const eliminarCliente = async (req, res) => {
    try {
        const success = await deleteCliente(req.params.id);
        if (!success) return res.status(404).json({ error: "Cliente no encontrado" });
        res.json({ message: "Cliente eliminado" });
    } catch (err) {
        res.status(500).json({ error: "Error eliminando cliente", details: err.message });
    }
};