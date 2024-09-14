import dotenv from 'dotenv'
import commander from '../utils/commander.js'

const { mode } = commander.opts()

dotenv.config()

export const configObject = {
    port: process.env.PORT || 8080,
    persistence: process.env.PERSISTENCE || 'MONGO',
    jwt_private_key: process.env.JWT_SECRET_KEY || '',
    base_url: process.env.BASE_URL || '',
    MONGO_URL: process.env.DATABASE_URL,
    gmail_pass: process.env.GMAIL_PASS,
    gmail_email: process.env.GMAIL_USER,
    user_admin: process.env.USER_ADMIN,
}
