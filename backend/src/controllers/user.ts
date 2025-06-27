import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import jwt from 'jsonwebtoken'

export const newUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (user) {
        res.status(400).json({
            msg: `Ya existe un usuario con el correo electronico ${email}`,
        });
        return;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword,
        });

        res.json({
            msg: `User ${name} created successfully`,
        });
    } catch (error) {
        res.status(400).json({
            msg: "Hubo un error",
            error: error
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const {  email, password } = req.body;

    const user: any = await User.findOne({ where: { email: email } });

    if (!user) {
        res.status(400).json({
            msg: `No existe un usuario con el correo electronico ${email} en la base de datos`
        });
        return;
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
        res.status(400).json({
            msg: `Password incorrecto`
        });
        return;
    }

    //{ expiresIn: '10000' }
    const token = jwt.sign({
        name: user.name,
        email: email,
        id: user.id
    },
        'carlos12'
    );

    res.json(
        token
    );

};
