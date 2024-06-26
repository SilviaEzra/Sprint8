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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("../routes/product"));
const user_1 = __importDefault(require("../routes/user"));
const events_1 = __importDefault(require("../routes/events"));
const connections_1 = __importDefault(require("../db/connections"));
const product_2 = __importDefault(require("./product"));
const user_2 = __importDefault(require("./user"));
const events_2 = __importDefault(require("../models/events"));
const connections_2 = __importDefault(require("../db/connections"));
const cors_1 = __importDefault(require("cors"));
const location_1 = __importDefault(require("../routes/location"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
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
        this.app.use('/api/products', product_1.default);
        this.app.use('/api/users', user_1.default);
        this.app.use('/api/events', events_1.default); // Usa las rutas de eventos
        this.app.use('/api', location_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_2.default.sync();
                yield user_2.default.sync();
                yield events_2.default.sync(); // Sincroniza el modelo de evento
                yield connections_2.default.authenticate();
                yield connections_1.default.authenticate();
                yield connections_1.default.sync();
                console.log('Base de datos conectada');
            }
            catch (error) {
                console.log('No se ha podido conectar a la database:', error);
            }
        });
    }
}
exports.Server = Server;
exports.default = Server;
