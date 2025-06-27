import { Request, Response } from 'express'
import { Task } from '../models/task'

export const getTasks = async (req: Request, res: Response) => {
    const userId = req.body.user.id;

    try {
        const listTasks = await Task.findAll({ where: { userId: userId } });
        res.json(listTasks)
    } catch (error) {
        res.status(400).json({ msg: 'Error al obtener las tareas', error })
    }
}

export const getTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.body.user.id;

    const task = await Task.findOne({ where: { id, userId } });

    if (task) {
        res.json(task)
    } else {
        res.status(404).json({
            msg: `No existe una Tarea con el id ${id}`
        });
    }
}

export const postTask = async (req: Request, res: Response) => {
    const { title, description, status } = req.body;
    const userId = req.body.user.id;

    try {
        const task = await Task.create({
            title: title,
            description: description,
            status: status,
            userId: userId
        })
        res.json({
            msg: `La tarea fue creada con exito!`,
            result: task
        })
    } catch (error) {
        res.status(400).json({ msg: 'Error al crear la tarea', error })
    }

}

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.body.user.id;

    const task = await Task.findOne({ where: { id, userId } });

    if (task) {
        await task.destroy();
        res.json({ msg: 'Tarea eliminada correctamente' });
    } else {
        res.status(404).json({ msg: 'Tarea no encontrada o no autorizada' });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
        const task = await Task.findByPk(id);

        if (task) {
            await task.update({
                title: title,
                description: description,
                status: status
            });

            res.json({
                msg: 'La tarea fue actualizada con exito '
            });
        } else {
            res.status(404).json({
                msg: `No existe una tarea con el id ${id}`
            });
        }
    } catch (error) {
        res.json({
            msg: `Ocurrio un error, comuniquese con soporte`
        });
    }
}
