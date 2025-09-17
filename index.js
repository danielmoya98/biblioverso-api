import express from "express";
import dotenv from "dotenv";
import appRoutes from "./routes/appRoutes.js";
import desktopRoutes from "./routes/desktopRoutes.js";


dotenv.config();

const app = express();
app.use(express.json());

// Rutas separadas por cliente
app.use("/api/v1/app", appRoutes);
app.use("/api/v1/desktop", desktopRoutes);
// app.use("/api/v1/web", webRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 API running on port ${PORT}`);
});
