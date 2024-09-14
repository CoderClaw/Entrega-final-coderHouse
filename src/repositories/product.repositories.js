import { sendEmail } from '../utils/sendEmail.js'

export default class ProductRepositories {
    constructor(ProductDao) {
        this.productDao = ProductDao
    }

    async getProducts(limit, nropage, sort, status, category) {
        try {
            return await this.productDao.getProducts(
                limit,
                nropage,
                sort,
                status,
                category
            )
        } catch (error) {
            return error
        }
    }

    async getProduct(pid) {
        try {
            return await this.productDao.getProduct(pid)
        } catch (error) {
            return error
        }
    }

    async addProduct(newProduct) {
        try {
            return await this.productDao.addProduct(newProduct)
        } catch (error) {
            return error
        }
    }

    async updateProduct(pid, prodUpdate) {
        try {
            return await this.productDao.updateProduct(pid, prodUpdate)
        } catch (error) {
            return error
        }
    }

    async deleteProduct(pid,role="",name="",mail="") {
        let response = ""
        try {            
            response = await this.productDao.deleteProduct(pid)
        } catch (error) {
            response = error
        }
        try {
            if (role === 'premium') {                
                const subject = 'Se ha eliminado un producto de la tienda'
                const html = `
            <p> Saludos ${name}!, </p>
            <p> El producto con ID: ${pid} ha sido eliminado de la tienda</p>  `
                const emailResponse = await sendEmail({
                    mail,
                    subject,
                    html,
                })
                if(emailResponse.acknowledged){
                    console.log("Email enviado con exito")
                }
                
            }
        } catch (error) {
            return error;
        }
        console.log(response)
       return response
    }

    async getProductStock(pid) {
        try {
            return await this.productDao.getProductStock(pid)
        } catch (error) {
            return error
        }
    }
}

//export default ProductRepositories
