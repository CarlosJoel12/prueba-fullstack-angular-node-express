import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization'];

    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        try {
            const bearerToken = headerToken.slice(7);
            const decoded = jwt.verify(bearerToken, 'carlos12') as { email: string, name: string, id: number };

            req.body.user = decoded; 
            next();
        } catch (error) {
            res.status(401).json({
                msg: 'token no valido'
            });
        }

    } else {
        res.status(401).json({
            msg: 'Acceso denegado'
        });
    }


}

export default validateToken;