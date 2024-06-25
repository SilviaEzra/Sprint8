"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.createEvent = exports.getEvents = void 0;
const events_1 = __importDefault(require("../models/events"));
// Obtener todos los eventos
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield events_1.default.findAll();
        res.json(events);
    }
    catch (error) {
        console.error('Error al obtener los eventos:', error);
        res.status(500).json({ message: 'Error al obtener los eventos' });
    }
});
exports.getEvents = getEvents;
// Crear un nuevo evento
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, start, end, type } = req.body;
    try {
        const newEvent = yield events_1.default.create({ title, start, end, type });
        res.json(newEvent);
    }
    catch (error) {
        console.error('Error al crear un evento:', error);
        res.status(500).json({ message: 'Error al crear un evento' });
    }
});
exports.createEvent = createEvent;
// Eliminar un evento por ID
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const event = yield events_1.default.findByPk(id);
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        yield event.destroy();
        res.json({ message: 'Evento eliminado' });
    }
    catch (error) {
        console.error('Error al eliminar el evento:', error);
        res.status(500).json({ message: 'Error al eliminar el evento' });
    }
});
exports.deleteEvent = deleteEvent;
