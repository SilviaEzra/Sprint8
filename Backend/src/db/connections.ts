import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sprint8', 'root', 'admin123', {
  host: 'localhost',
  port: 3308, // Cambia el puerto aquí
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
