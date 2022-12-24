import { Request, Response, NextFunction } from 'express'
import validator from 'validator'
import ResponseHandler from '../libs/responseHandler'

class UserValidator {

    private responseHandler = new ResponseHandler()

    public signUpValidator = (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json(this.responseHandler.format(400, 'Missing A Required Field'))
            return
        }

        const validEmail = validator.isEmail(email)
        if (!validEmail) {
            res.status(400).json(this.responseHandler.format(400, 'Email Is Not Valid'))
            return
        }

        const validPassword = validator.isStrongPassword(password, { minLenght: 8, minUppercase: 1, minLowercase: 1, minNumber: 1, minSymbol: 1 })
        if (!validPassword) {
            res.status(400).json(this.responseHandler.format(400, 'Password Is Not Valid'))
            return
        }

        next()
    }

    public signInValidator = (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json(this.responseHandler.format(400, 'Missing A Required Field'))
            return
        }

        const validEmail = validator.isEmail(email)
        if (!validEmail) {
            res.status(400).json(this.responseHandler.format(400, 'Email Is Not Valid'))
            return
        }

        next()
    }

    public signOutValidator = (req: Request, res: Response, next: NextFunction) => {

    }

    public refreshValidator = (req: Request, res: Response, next: NextFunction) => {

    }
}

export = UserValidator