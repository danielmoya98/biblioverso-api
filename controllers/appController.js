import UsuarioModel from "../models/UsuarioModel.js";
import ReservaModel from "../models/ReservaModel.js";
import FavoritoModel from "../models/FavoritoModel.js";
import { getCategorias, getLibrosByCategoria } from "../models/categoriaModel.js";


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


export const agregarFavorito = async (req, res) => {
    const { idUsuario, idLibro } = req.body;

    if (!idUsuario || !idLibro) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    try {
        const favorito = await FavoritoModel.agregarFavorito(idUsuario, idLibro);
        if (!favorito) {
            return res.status(200).json({ message: "El libro ya estaba en favoritos" });
        }
        res.status(201).json({ message: "Libro agregado a favoritos", favorito });
    } catch (error) {
        console.error("Error al agregar favorito:", error);
        res.status(500).json({ error: "Error interno al agregar favorito" });
    }
};

export const obtenerFavoritos = async (req, res) => {
    const { idUsuario } = req.params;

    try {
        const favoritos = await FavoritoModel.obtenerFavoritosPorUsuario(idUsuario);
        res.json({ favoritos });
    } catch (error) {
        console.error("Error al obtener favoritos:", error);
        res.status(500).json({ error: "Error interno al obtener favoritos" });
    }
};

export const listarCategorias = async (req, res) => {
    try {
        const categorias = await getCategorias();
        res.json(categorias);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener categorías" });
    }
};

export const listarLibrosPorCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const libros = await getLibrosByCategoria(id);
        res.json(libros);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener libros por categoría" });
    }
};



