// routes/desktopRoutes.js
import { Router } from "express";
import { loginDesktop ,obtenerClientes , eliminarCliente , crearCliente , actualizarCliente } from "../controllers/desktopController.js";

const router = Router();

router.post("/login", loginDesktop);

router.get("/clientes", obtenerClientes);
router.post("/clientes", crearCliente);
router.put("/clientes/:id", actualizarCliente);
router.delete("/clientes/:id", eliminarCliente);

export default router;
