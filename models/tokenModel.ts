import mongoose from 'mongoose'
const Schema = mongoose.Schema

const TokenSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    }
})

const TokenModel = mongoose.model('token', TokenSchema)

export = TokenModel