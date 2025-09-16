import express from "express";
import {getReservasByUsuario, IniciarSesionApp, RegistrarApp} from "../controllers/AppController.js";

const router = express.Router();

// Login
router.post("/login", IniciarSesionApp);

// Registro
router.post("/register", RegistrarApp);

router.get("/reservas/:idUsuario", getReservasByUsuario);

export default router;
