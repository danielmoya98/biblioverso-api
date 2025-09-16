import UsuarioModel from "../models/UsuarioModel.js";
import ReservaModel from "../models/ReservaModel.js";

export const IniciarSesionApp = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UsuarioModel.findByEmail(email, password);
        if (!user) return res.status(401).json({ error: "Credenciales inválidas" });
        res.json({ message: "Login exitoso (App)", user });
    } catch (error) {
        res.status(500).json({ error: "Error en login" });
    }
};

export const RegistrarApp = async (req, res) => {
    const { usuario, email, password } = req.body;

    if (!usuario || !email || !password) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    try {
        const nuevoUsuario = await UsuarioModel.create({ usuario, email, password });
        res.status(201).json({ message: "Usuario creado exitosamente", user: nuevoUsuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar usuario" });
    }
};


export const getReservasByUsuario = async (req, res) => {
    const { idUsuario } = req.params;
    try {
        const reservas = await ReservaModel.findByUsuario(idUsuario);
        res.json({ reservas });
    } catch (error) {
        console.error("Error obteniendo reservas:", error);
        res.status(500).json({ error: "Error obteniendo reservas" });
    }
};

