import { expect, assert } from 'chai'
import supertest from 'supertest'

//const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('E-Commerce - Products', function () {
    let pid
    it('The GET /api/products endpoint should retrieve all products correctly', async () => {
        const { statusCode, ok, _body } = await requester.get('/api/products')
        expect(ok).to.be.equal(true)
        expect(statusCode).to.be.equal(200)
    })

    it('The POST /api/products endpoint should create a product correctly', async () => {
        const productTest = {
            title: 'Prod test',
            description: 'test product description',
            price: 500,
            thumbnail: 'No Image',
            code: 'ABX-01',
            stock: 25,
            category: 'Category 3',
            owner: '6641336980145a0e20cde83d',
        }

        const { statusCode, _body } = await requester
            .post('/api/products')
            .send(productTest)
        console.log('Product created', _body.payload._id)
        pid = _body.payload._id
        expect(_body.payload).to.have.property('_id')
    })

    it('The DELETE /api/products endpoint should delete the product correctly', async () => {
        console.log('Product to delete', pid)
        const { statusCode, _body } = await requester.delete(
            `/api/products/${pid}`
        )

        expect(statusCode).to.be.equal(200)
    })
})

describe('E-Commerce - Cart', function () {
    const cid = '6641336980145a0e20cde83d'
    it('The GET /api/carts endpoint should retrieve all products in the specified cart', async () => {
        const { statusCode, ok, _body } = await requester.get(
            `/api/carts/${cid}`
        )
        console.log(statusCode, _body)
        expect(statusCode).to.be.equal(200)
    })

    it('The POST /api/carts endpoint should add a product to the specified cart', async () => {
        const pid = '6641336980145a0e20cde83d'
        const { statusCode, ok, _body } = await requester.post(
            `/api/carts/${cid}/product/${pid}`
        )
        console.log(statusCode, _body)
        expect(statusCode).to.be.equal(200)
    })

    it('The DELETE /api/carts endpoint should remove a product from the cart', async () => {
        const pid = '6641336980145a0e20cde83d'
        const { statusCode, ok, _body } = await requester.delete(
            `/api/carts/${cid}/product/${pid}`
        )
        console.log(statusCode, _body)
        expect(_body.payload).to.be.ok.and.eql(
            'Product ID 6641336980145a0e20cde83d was removed from cart ID 6641336980145a0e20cde83d'
        )
    })
})

describe('E-Commerce - Sessions', function () {
    let cookie
    it('The POST /api/sessions/register endpoint should register a new user', async () => {
        const userTest = {
            first_name: 'User',
            last_name: 'test',
            age: 55,
            email: 'test@gmail.com',
            password: '123456',
            role: 'user',
        }
        const result = await requester
            .post('/api/sessions/register')
            .send(userTest)
        const cookieResult = result.headers['set-cookie'][0]

        expect(cookieResult).to.be.ok
    })

    it('Should successfully log in a user and RETURN A COOKIE', async () => {
        const mockUser = {
            email: 'adminCoder@coder.com',
            password: 'adminCod3r123',
        }

        const result = await requester
            .post('/api/sessions/login')
            .send(mockUser)

        const cookieResult = result.headers['set-cookie'][0]

        expect(cookieResult).to.be.ok
        cookie = {
            name: cookieResult.split('=')[0],
            value: cookieResult.split('=')[1],
        }
        console.log('Result', cookie)
        expect(cookie.name).to.be.ok.and.eql('token')
        expect(cookie.value).to.be.ok
    })

    it('Should send the cookie containing the user and destructure it correctly', async () => {
        console.log('Cookie', cookie)
        const { statusCode, ok, _body } = await requester
            .get('/api/sessions/current')
            .set('cookie', [`${cookie.name}=${cookie.value}`])

        console.log(_body)
        expect(statusCode).to.be.equal(200)
    })
})
