const express = require("express");
const router = express.Router();

const Ticket = require("../models/Ticket");


// ========================================
// GET - Obtener todos los tickets
// ========================================
router.get("/", async (req, res) => {
    try {

        const tickets = await Ticket.find().sort({ fecha: -1 });

        res.status(200).json(tickets);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener los tickets",
            error: error.message
        });

    }
});


// ========================================
// GET - Obtener ticket por ID
// ========================================
router.get("/:id", async (req, res) => {
    try {

        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({
                mensaje: "Ticket no encontrado"
            });
        }

        res.status(200).json(ticket);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al buscar el ticket",
            error: error.message
        });

    }
});


// ========================================
// POST - Crear ticket
// ========================================
router.post("/", async (req, res) => {
    try {

        const nuevoTicket = new Ticket(req.body);

        const ticketGuardado = await nuevoTicket.save();

        res.status(201).json(ticketGuardado);

    } catch (error) {

        res.status(400).json({
            mensaje: "Error al crear el ticket",
            error: error.message
        });

    }
});


// ========================================
// PUT - Actualizar ticket
// ========================================
router.put("/:id", async (req, res) => {
    try {

        const ticketActualizado = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!ticketActualizado) {
            return res.status(404).json({
                mensaje: "Ticket no encontrado"
            });
        }

        res.status(200).json(ticketActualizado);

    } catch (error) {

        res.status(400).json({
            mensaje: "Error al actualizar el ticket",
            error: error.message
        });

    }
});


// ========================================
// DELETE - Eliminar ticket
// ========================================
router.delete("/:id", async (req, res) => {
    try {

        const ticketEliminado = await Ticket.findByIdAndDelete(
            req.params.id
        );

        if (!ticketEliminado) {
            return res.status(404).json({
                mensaje: "Ticket no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Ticket eliminado correctamente",
            ticket: ticketEliminado
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al eliminar el ticket",
            error: error.message
        });

    }
});


module.exports = router;
