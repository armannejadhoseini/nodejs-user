import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import UserRouter from '../routers/userRouter'
import ErrorHandler from './errorHandler'

class ServerManager {

    private app = express()
    private port = process.env.PORT as string
    private mongodbUrl = process.env.DB_URL as string
    private userRouter: UserRouter
    private errorHandler = new ErrorHandler()

    constructor() {  
        this.app = express()
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())

        this.userRouter = new UserRouter()
    }

    public async init() {
        await this.connectToDB()
        await this.startServer()
        await this.setRoutes()
    }

    public async startServer() {
        await this.app.listen(this.port)
        console.log('Listening On Port :', this.port)
    }

    public async connectToDB() {
        mongoose.set('strictQuery', false)
        await mongoose.connect(this.mongodbUrl)
        console.log('Connected To MongoDB')
    }

    public setRoutes() {
        this.app.use('/user', this.userRouter.routes())
        this.app.use(this.errorHandler.handle)
    }
}

export = ServerManager