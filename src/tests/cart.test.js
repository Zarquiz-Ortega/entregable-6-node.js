require("../models")
const request = require("supertest")
const app = require("../app")
const Product = require("../models/Product")

const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = "/api/v1/cart"

let TOKEN, cart, product, cartId


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
})

afterAll(async () => {
    //! eliminamos el producto
    await product.destroy()
})


test("POST -> 'BASE_URL' should return status code 201 and res.body.quantity === cart.quantity", async () => {

    const res = await request(app)
        .post(BASE_URL)
        .send(cart)
        .set("Authorization", `Bearer ${TOKEN}`)

    cartId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cart.quantity)
})

test("GET -> 'BASE_URL' should return status code 200 and res.body.length === 1", async () => {
    const res = await request(app)
        .get(BASE_URL)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].product).toBeDefined()
    expect(res.body[0].productId).toBe(product.id)
    expect(res.body[0].product.id).toBe(product.id)

})

test("GET -> 'BASE_URL/:id' should return status code 200 and res.body.quantity === cart.quantity", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${cartId}`)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cart.quantity)

    expect(res.body.product).toBeDefined()
    expect(res.body.productId).toBe(product.id)
    expect(res.body.product.id).toBe(product.id)

})

test("PUT -> 'BASE_URL/:id' should return status code 200 and res.body.quantity === cartUpdate.quantity", async () => {
    const cartUpdate = {
        quantity: 2
    }

    const res = await request(app)
        .put(`${BASE_URL}/${cartId}`)
        .send(cartUpdate)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cartUpdate.quantity)
})


test("DELETE -> 'BASE_URL/:id',should return status code 204", async () => {

    const res = await request(app)
        .delete(`${BASE_URL}/${cartId}`)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
})

