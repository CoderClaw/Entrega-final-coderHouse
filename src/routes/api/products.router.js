import { Router } from 'express'
import ProductController from '../../controllers/products.controllers.js'
import { passportCall } from '../../middlewares/passportCall.middleware.js'

const router = Router()
const { getProduct, getProducts, createProduct, updateProduct, deleteProduct } =
    new ProductController()

router.get('/', getProducts)
router.get('/:pid', getProduct)
router.post('/', passportCall('jwt'), createProduct)
router.put('/:pid', updateProduct)
router.delete('/:pid', passportCall('jwt'), deleteProduct)

export default router
