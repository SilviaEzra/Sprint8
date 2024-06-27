
import { Request, Response } from "express";
import bycrypt from 'bcrypt';
import User from "../models/user";
import jwt from "jsonwebtoken";

export const newUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    console.log('Datos de entrada:', username, password);

    const user = await User.findOne({ where: { username: username }});

    if (user) {
        console.log('Usuario encontrado:', user);
        return res.status(400).json({
            msg: 'Ya existe un usuario con el nombre ' + username
        });
    }

    const hashedPassword = await bycrypt.hash(password, 10);
    console.log('Contraseña hasheada:', hashedPassword);

    try {
        await User.create({
            username: username,
            password: hashedPassword
        });

        console.log('Usuario creado correctamente');

        res.json({
            msg: 'Usuario ' + username + ' creado correctamente',
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(400).json({
            msg: 'Ups, ha habido un error al crear el usuario'
        });
    }
}


export const loginUser = async (req: Request, res: Response) => {

    const { username, password } = req.body;

    // validamos si existe en la base de datos
    const user: any = await User.findOne({ where: { username: username }});

    if(!user){
        return res.status(400).json({
            msg: 'No existe un usuario con el nombre ' + username + ' en la base de datos'
        })
    }

    // validamos password
    
     const passwordValid= await bycrypt.compare(password, user.password)
    if(!passwordValid){
        return res.status(400).json({
            msg: 'Password Incorrecto '
        })

    }  
    
    // Generamos Token

    const token = jwt.sign({
        username: username
    }, process.env.SECRET_KEY || 'pepito123')
    
    
    res.json({token})
    
    
}