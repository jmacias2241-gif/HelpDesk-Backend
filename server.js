const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const ticketRoutes = require("./routes/ticketRoutes");

const app = express();


// ========================================
// MIDDLEWARES
// ========================================

app.use(cors());
app.use(express.json());


// ========================================
// RUTA PRINCIPAL
// ========================================

app.get("/", (req, res) => {
    res.json({
        mensaje: "API Help Desk funcionando",
        estado: "OK"
    });
});


// ========================================
// RUTAS DE TICKETS
// ========================================

app.use("/api/tickets", ticketRoutes);


// ========================================
// CONEXIÓN MONGODB
// ========================================

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Atlas conectado correctamente");
    })
    .catch((error) => {
        console.error(
            "Error al conectar con MongoDB:",
            error.message
        );
    });


// ========================================
// SERVIDOR
// ========================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});