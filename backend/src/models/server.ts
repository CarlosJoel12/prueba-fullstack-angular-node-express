import express, { Application } from 'express';
import cors from 'cors';
import routesTask from '../routes/task';
import routesUser from '../routes/user';
import { Task } from './task';
import { User } from './user';

class Server {
    private app: Application;
    private port: string;

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
            console.log('Aplicación corriendo en el puerto ' + this.port);

        })
    }

    routes() {
        this.app.use('/task', routesTask);
        this.app.use('/auth', routesUser);
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnect() {

        try {
            User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
            Task.belongsTo(User, { foreignKey: 'userId' });

            await User.sync();
            await Task.sync();

        } catch (error) {
            console.log(error);
            console.log('Error al conectarse a la base de datos');
        }

    }
}

export default Server;

