const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },

        correo: {
            type: String,
            required: true,
            trim: true
        },

        problema: {
            type: String,
            required: true,
            trim: true
        },

        prioridad: {
            type: String,
            enum: ["Baja", "Media", "Alta"],
            default: "Media"
        },

        estado: {
            type: String,
            enum: ["Pendiente", "En proceso", "Resuelto"],
            default: "Pendiente"
        },

        fecha: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Ticket", ticketSchema);