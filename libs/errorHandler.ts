import { Request, Response, NextFunction } from 'express'
import ResponseManager from './responseHandler'

class ErrorHandler {

    private responseManager = new ResponseManager()

    public handle = (err: any, req: Request, res: Response, next: NextFunction) => {
        console.log(err)

        if (err.code == 11000) {
            res.status(409).json(this.responseManager.format(409, 'User Already Exists'))
            return
        }

        res.status(500).json(this.responseManager.format(500, 'Internal Server Error'))
        next()
    }
}

export = ErrorHandler