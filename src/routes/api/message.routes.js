import { Router } from 'express'
import messageManagerMongoose from '../../daos/mongo/messageManagerMongoose.js'
const messageManager = new messageManagerMongoose()

import { passportCall } from '../../middlewares/passportCall.middleware.js'
import { authorization } from '../../middlewares/authorization.middleware.js'

const router = Router()

router.get('/', passportCall('jwt'), authorization('user'), (req, res) => {
    const { socketServer } = req
    socketServer.on('connection', async (socket) => {
        socket.on('message', async (data) => {
            const result = messageManager.addMessage(data)
            const mensajes = await messageManager.getMessages()
            socket.emit('messageLogs', mensajes)
        })
    })
    res.render('chat')
})

export default router
