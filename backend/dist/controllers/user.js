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
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const user = yield user_1.User.findOne({ where: { email: email } });
    if (user) {
        res.status(400).json({
            msg: `Ya existe un usuario con el correo electronico ${email}`,
        });
        return;
    }
    const hashPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        yield user_1.User.create({
            name: name,
            email: email,
            password: hashPassword,
        });
        res.json({
            msg: `User ${name} created successfully`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Hubo un error",
            error: error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.User.findOne({ where: { email: email } });
    if (!user) {
        res.status(400).json({
            msg: `No existe un usuario con el correo electronico ${email} en la base de datos`
        });
        return;
    }
    const passwordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        res.status(400).json({
            msg: `Password incorrecto`
        });
        return;
    }
    //{ expiresIn: '10000' }
    const token = jsonwebtoken_1.default.sign({
        name: user.name,
        email: email,
        id: user.id
    }, 'carlos12');
    res.json(token);
});
exports.loginUser = loginUser;
