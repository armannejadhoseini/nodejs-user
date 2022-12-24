import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

class CryptoService {

    private secret = process.env.JWT_SECRET as string

    public async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
    }

    public async verifyPassword(password: string, hash: string): Promise<Boolean> {
        return await bcrypt.compare(password, hash)
    }

    public async signToken(data: object): Promise<object> {
        data['id'] = uuid()
        const accessToken = await jwt.sign(data, this.secret, { expiresIn: '1h' })
        const refreshToken = await jwt.sign(data, this.secret, { expiresIn: '1y' })
        const token = { accessToken, refreshToken }
        return token
    }

    public async verifyToken(token: string) {
        const tokenData = await jwt.verify(token, this.secret)
        return tokenData
    }

    public async refreshToken(data: object): Promise<string> {
        data['id'] = uuid()
        const accessToken = await jwt.sign(data, this.secret, { expiresIn: '1h' })
        return accessToken
    }
}

export = CryptoService