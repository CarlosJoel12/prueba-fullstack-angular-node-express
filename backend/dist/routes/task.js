"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_1 = require("../controllers/task");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, task_1.getTasks);
router.get('/:id', validate_token_1.default, task_1.getTask);
router.post('/', validate_token_1.default, task_1.postTask);
router.delete('/:id', validate_token_1.default, task_1.deleteTask);
router.put('/:id', task_1.updateTask);
exports.default = router;
