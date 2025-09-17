import express from "express";
import {
    agregarFavorito,
    getReservasByUsuario,
    IniciarSesionApp,
    obtenerFavoritos,
    RegistrarApp
} from "../controllers/appController.js";

const router = express.Router();

// Login
router.post("/login", IniciarSesionApp);

// Registro
router.post("/register", RegistrarApp);

router.get("/reservas/:idUsuario", getReservasByUsuario);

// Agregar libro a favoritos
router.post("/favoritos", agregarFavorito);

// Obtener libros favoritos de un usuario
router.get("/favoritos/:idUsuario", obtenerFavoritos);

export default router;
