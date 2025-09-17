import {
    findUserByUsernameOrEmailDesktop,
    validatePasswordDesktop
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
        res.status(500).json({ message: "Error en el servidor", error: err.message });
    }
};
