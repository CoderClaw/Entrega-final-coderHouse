import { productService, cartService } from '../service/index.js'
import { logger } from '../utils/logger.js'

class CartController {
    constructor() {}

    createCart = async (req, res) => {
        try {
            cartService.createCart()
            return res
                .status(200)
                .send({
                    status: 'success',
                    payload: 'El carrito fue creado correctamente',
                })
        } catch (error) {
            logger.error(error)
            return res.status(500).send('Ocurrio un error inesperado')
        }
    }

    getCart = async (req, res) => {
        try {
            const { cid } = req.params
            const carrito = await cartService.getCart(cid)
            if (!carrito) {
                return res
                    .status(404)
                    .send(`No existe el carrito con ID ${cid} `)
            }
            return res.status(200).send({ status: 'success', payload: carrito })
        } catch (error) {
            logger.error(error)
            return res.status(500).send('Ocurrio un error inesperado')
        }
    }

    addCart = async (req, res) => {
        try {
            const { cid, pid } = req.params
            let { quantity } = req.body

            const carrito = await cartService.getCart(cid)
            if (!carrito) {
                return res
                    .status(404)
                    .send(`No existe el carrito con ID ${cid} `)
            }
            const producto = await productService.getProduct(pid)
            if (!producto) {
                return res
                    .status(404)
                    .send(`No existe el producto con ID ${pid}`)
            }

            if (typeof quantity === 'undefined') {
                quantity = 1
            }
            const result = await cartService.addCart(cid, pid, quantity)
            return res
                .status(200)
                .send({
                    status: 'success',
                    payload: `El producto ID ${pid} fue agregado al carrito Id ${cid}`,
                })
        } catch (error) {
            logger.error(error)
            return res.status(500).send('Ocurrio un error inesperado')
        }
    }

    deleteCartProduct = async (req, res) => {
        try {
            const { cid, pid } = req.params
            const carrito = await cartService.getCart(cid)
            if (!carrito) {
                return res
                    .status(404)
                    .send(`No existe el carrito con ID ${cid} `)
            }
            const result = await cartService.deleteProcuct(cid, pid)
            return res
                .status(200)
                .send({
                    status: 'success',
                    payload: `El producto ID ${pid} fue eliminado del carrito Id ${cid}`,
                })
        } catch (error) {
            logger.error(error)
            return res.status(500).send('Ocurrio un error inesperado')
        }
    }

    deleteCart = async (req, res) => {
        try {
            const { cid } = req.params
            const carrito = await cartService.getCart(cid)
            if (!carrito) {
                return res
                    .status(404)
                    .send(`No existe el carrito con ID ${cid} `)
            }
            const result = await cartService.deleteCart(cid)
            return res
                .status(200)
                .send({
                    status: 'success',
                    payload: `Se vacio todo el carrito Id ${cid}`,
                })
        } catch (error) {
            logger.error(error)
            return res.status(500).send('Ocurrio un error inesperado')
        }
    }

    updateCartProduct = async (req, res) => {
        const { cid, pid } = req.params
        const carrito = await cartService.getCart(cid)
        if (!carrito) {
            return res.status(404).send(`No existe el carrito con ID ${cid} `)
        }
        const result = await cartService.addCart(cid, pid, req.body.quantity)
        return res
            .status(200)
            .send({
                status: 'success',
                payload: `Se actualizo la cantidad del producto en el carrito Id ${cid}`,
            })
    }

    addManyCartProducts = async (req, res) => {
        const { cid } = req.params

        const carrito = await cartService.getCart(cid)
        if (!carrito) {
            return res.status(404).send(`No existe el carrito con ID ${cid} `)
        }

        carrito.products = req.body
        const result = await cartService.addAllProcuct(cid, carrito)
        return res
            .status(200)
            .send({
                status: 'success',
                payload: `Se agregaron todos los productos al carrito Id ${cid}`,
            })
    }
}

export default CartController
