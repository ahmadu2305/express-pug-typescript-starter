import { Router, Request, Response } from 'express';

const router = Router();

export function setRoutes(app: Router) {
    app.get('/', (req: Request, res: Response) => {
        res.render('index');
    });
}