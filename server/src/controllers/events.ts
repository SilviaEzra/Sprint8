import { Request, Response } from 'express';
import Event from '../models/events';

// Obtener todos los eventos
export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    console.error('Error al obtener los eventos:', error);
    res.status(500).json({ message: 'Error al obtener los eventos' });
  }
};

// Crear un nuevo evento
export const createEvent = async (req: Request, res: Response) => {
  const { title, start, end, type } = req.body;
  
  try {
    const newEvent = await Event.create({ title, start, end, type });
    res.json(newEvent);
  } catch (error) {
    console.error('Error al crear un evento:', error);
    res.status(500).json({ message: 'Error al crear un evento' });
  }
};

// Eliminar un evento por ID
export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    await event.destroy();
    res.json({ message: 'Evento eliminado' });
  } catch (error) {
    console.error('Error al eliminar el evento:', error);
    res.status(500).json({ message: 'Error al eliminar el evento' });
  }
};
