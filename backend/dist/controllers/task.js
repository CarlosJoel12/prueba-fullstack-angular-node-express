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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteTask = exports.postTask = exports.getTask = exports.getTasks = void 0;
const task_1 = require("../models/task");
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.user.id;
    try {
        const listTasks = yield task_1.Task.findAll({ where: { userId: userId } });
        res.json(listTasks);
    }
    catch (error) {
        res.status(400).json({ msg: 'Error al obtener las tareas', error });
    }
});
exports.getTasks = getTasks;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.body.user.id;
    const task = yield task_1.Task.findOne({ where: { id, userId } });
    if (task) {
        res.json(task);
    }
    else {
        res.status(404).json({
            msg: `No existe una Tarea con el id ${id}`
        });
    }
});
exports.getTask = getTask;
const postTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status } = req.body;
    const userId = req.body.user.id;
    try {
        const task = yield task_1.Task.create({
            title: title,
            description: description,
            status: status,
            userId: userId
        });
        res.json({
            msg: `La tarea fue creada con exito!`,
            result: task
        });
    }
    catch (error) {
        res.status(400).json({ msg: 'Error al crear la tarea', error });
    }
});
exports.postTask = postTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.body.user.id;
    const task = yield task_1.Task.findOne({ where: { id, userId } });
    if (task) {
        yield task.destroy();
        res.json({ msg: 'Tarea eliminada correctamente' });
    }
    else {
        res.status(404).json({ msg: 'Tarea no encontrada o no autorizada' });
    }
});
exports.deleteTask = deleteTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        const task = yield task_1.Task.findByPk(id);
        if (task) {
            yield task.update({
                title: title,
                description: description,
                status: status
            });
            res.json({
                msg: 'La tarea fue actualizada con exito '
            });
        }
        else {
            res.status(404).json({
                msg: `No existe una tarea con el id ${id}`
            });
        }
    }
    catch (error) {
        res.json({
            msg: `Ocurrio un error, comuniquese con soporte`
        });
    }
});
exports.updateTask = updateTask;
