import { DataTypes } from "sequelize"
import  sequelize  from "../db/connections"

const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    nota: {
        type: DataTypes.NUMBER
    },
    tipo: {
        type: DataTypes.STRING
    },
    ubicacion: {
        type: DataTypes.STRING
    },
},{
    createdAt: false,
    updatedAt: false
});

export default Product;