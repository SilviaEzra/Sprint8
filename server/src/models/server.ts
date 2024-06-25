import express, { Application } from "express";
import routesProduct from '../routes/product';
import routesUser from '../routes/user';
import routesEvent from '../routes/events'; 
import sequelize from "../db/connections";
import Product from './product';
import User from "./user";
import Event from '../models/events'; 
import db from '../db/connections';
import cors from 'cors';
import Location from "../routes/location";

export class Server {
  private app: Application;
  private port: string | undefined;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3001';
    this.listen();
    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('App corriendo en el puerto ' + this.port);
    });
  }

  routes() {
    this.app.use('/api/products', routesProduct);
    this.app.use('/api/users', routesUser);
    this.app.use('/api/events', routesEvent); // Usa las rutas de eventos
    this.app.use('/api', Location);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  async dbConnect() {
    try {
      await Product.sync();
      await User.sync();
      await Event.sync(); // Sincroniza el modelo de evento
      await db.authenticate();
      await sequelize.authenticate();
      await sequelize.sync();
      console.log('Base de datos conectada');
    } catch (error) {
      console.log('No se ha podido conectar a la database:', error);
    }
  }
}

export default Server;
