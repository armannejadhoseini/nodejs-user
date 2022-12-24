import { Request, Response, NextFunction } from 'express'
import UserModel from '../models/userModel'
import TokenModel from '../models/tokenModel'
import CryptoService from '../libs/cryptoService'
import ResponseHandler from '../libs/responseHandler'

class UserController {

    private responseHandler = new ResponseHandler()
    private cryptoService = new CryptoService()

    public signUp = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body

        try {
            let user = new UserModel({ email, password })
            user = await user.save()

            const token = await this.cryptoService.signToken({ email: user.email })

            res.status(201).json(this.responseHandler.format(201, 'Successfull', token))
        } catch (error) {
            next(error)
        }
    }

    public signIn = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body

        try {
            const user = await UserModel.findOne({ email: email }, '-_id email password')
            if (!user) {
                res.status(404).json(this.responseHandler.format(404, 'User Not Found'))
                return
            }

            const passwordMatch = await this.cryptoService.verifyPassword(password, user.password)
            if (!passwordMatch) {
                res.status(404).json(this.responseHandler.format(401, 'Password Did Not Match'))
                return
            }

            const token = await this.cryptoService.signToken({ email: user.email })

            res.status(200).json(this.responseHandler.format(200, 'Successfull', token))
        } catch (error) {
            next(error)
        }
    }

    public signOut = async (req: Request, res: Response, next: NextFunction) => {
        const { refreshToken } = req.body

        try {
            const tokenData = await this.cryptoService.verifyToken(refreshToken)

            let invalidToken = new TokenModel({ id: tokenData['id'] })
            invalidToken = await invalidToken.save()

            res.status(200).json(this.responseHandler.format(200, 'Successfull'))
        } catch (error) {
            next(error)
        }
    }

    public refresh = async (req: Request, res: Response, next: NextFunction) => {
        const { refreshToken } = req.body

        try {
            const tokenData = await this.cryptoService.verifyToken(refreshToken)

            const isTokenValid = await TokenModel.exists({ id: tokenData['id'] })
            if (isTokenValid) {
                res.status(404).json(this.responseHandler.format(401, 'Refresh Token Is Expired'))
                return
            }

            const accessToken = await this.cryptoService.refreshToken({ email: tokenData['email'] })

            res.status(200).json(this.responseHandler.format(200, 'Successfull', { accessToken }))
        } catch (error) {
            next(error)
        }
    }
}

export = UserController