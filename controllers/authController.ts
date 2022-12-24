import { Request, Response, NextFunction } from 'express'
import ResponseHandler from '../libs/responseHandler'
import CryptoService from '../libs/cryptoService'
import validator from 'validator'

class AuthController {

    private responsehandler = new ResponseHandler()
    private cryptoService = new CryptoService()

    public isUserAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers['token'] as string

        if (!token) {
            res.status(401).json(this.responsehandler.format(401, 'Token Is Required'))
            return
        }

        const validToken = validator.isJWT(token)
        if (!validToken) {
            res.status(401).json(this.responsehandler.format(401, 'Token Is Not Valid'))
            return
        }

        try {
            const userData = await this.cryptoService.verifyToken(token)
            req.body.email = userData['email'] as string

            next()
        } catch (error) {
            next(error)
        }
    }
}

export = AuthController