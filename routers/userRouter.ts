import { Router } from 'express'
import UserValidator from '../validators/userValidator'
import UserController from '../controllers/userController'

class UserRouter {

    private router = Router()
    private userValidator = new UserValidator()
    private userController = new UserController()

    constructor() {
        this.init()
    }

    public init() {
        this.router.post('/signup', this.userValidator.signUpValidator, this.userController.signUp)
        this.router.post('/signin', this.userValidator.signInValidator, this.userController.signIn)
        this.router.post('/signout', this.userValidator.signOutValidator, this.userController.signOut)
        this.router.post('/refresh', this.userValidator.refreshValidator, this.userController.refresh)
    }

    public routes(): Router {
        return this.router
    }
}

export = UserRouter