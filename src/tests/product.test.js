require('../models')
const request = require('supertest')
const app = require('../app')

let productId, TOKEN

const BASE_URL = '/api/v1/products'
const BASE_URL_LOGIN = '/api/v1/users/login'

const product = {
    title: "Telefono",
    description: "LOREM....",
    price: 1000
}

beforeAll( async () => {
    const body = {
        email: "user@email.com",
        password: "user123",
    }

    const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(body)
    
    TOKEN = res.body.token
})

//? CREATE
test("POST -> 'BASE_URL', should return status code 201 and res.body.title === product.title", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(product)
        .set('Authorization', `Bearer ${TOKEN}`)

    userId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
})