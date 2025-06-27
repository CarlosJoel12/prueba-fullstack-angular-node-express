import { Sequelize } from "sequelize";


const sequelize = new Sequelize('dbtest', 'root', 'carlos12', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;