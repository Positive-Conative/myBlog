import { Request, Response, NextFunction } from 'express';

const indexController = {
    mainBoard(req: Request, res: Response) {
        res.send("This is main.");
    }
}

export = indexController;