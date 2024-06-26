import { DataTypes, Model, Optional } from 'sequelize';
import db from '../db/connections';

interface EventAttributes {
  id: number;
  title: string;
  start: Date;
  end: Date;
  type: string;
}

interface EventCreationAttributes extends Optional<EventAttributes, 'id'> {}

class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
  public id!: number;
  public title!: string;
  public start!: Date;
  public end!: Date;
  public type!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Event.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'Event',
});

export default Event;
