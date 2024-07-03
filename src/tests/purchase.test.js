require("../models")
const request = require("supertest")
const app = require("../app")
const Product = require("../models/Product")

const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = "/api/v1/purchase"

let TOKEN, product, cart

beforeAll(async () => {
    const body = {
        email: "user@email.com",
        password: "user123",
    }

    const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(body)

    TOKEN = res.body.token

    product = await Product.create({
        title: "Telefono",
        description: "LOREM....",
        price: 1000,
    })

    cart = {
        quantity: 1,
        productId: product.id
    }

    await request(app)
        .post('/api/v1/cart')
        .send(cart)
        .set("Authorization", `Bearer ${TOKEN}`)
})

afterAll(async () => {
    //! eliminamos el producto
    await product.destroy()
})

test("POST 'BASE_URL'should return status code 201 and res.body.quantity ===bodyCart.quantity", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(201)
    expect(res.body[0].quantity).toBe(cart.quantity)

})

test("GET -> 'BASE_URL'should return status code 200 res.body.length === 1", async () => {

    const res = await request(app)
        .get(BASE_URL)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].product).toBeDefined()
    expect(res.body[0].productId).toBe(product.id)

})
