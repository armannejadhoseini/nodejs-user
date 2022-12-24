import mongoose from 'mongoose'
import CryptoService from '../libs/cryptoService'

const Schema = mongoose.Schema

const cryptoService = new CryptoService()

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

UserSchema.pre('save', async function (done: Function) {
    if (this.isNew) {
        this.password = await cryptoService.hashPassword(this.password)
    }
    
    done()
})

const UserModel = mongoose.model('user', UserSchema)

export = UserModel