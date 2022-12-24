import dotenv from 'dotenv'
import ServerManager from './libs/server'

dotenv.config()

const server = new ServerManager()
server.init()