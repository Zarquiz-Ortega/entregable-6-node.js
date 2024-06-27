require('../models')
const request = require("supertest");
const app = require('../app.js')

const BASE_URL = '/api/v1/categorys'
const BASE_URL_USERS ='/api/v1/users'

let categoryId, TOKEN

const category = {
    name: 'Hogar'
}

beforeAll(async () => {
    const body = {
        email: "user@email.com",
        password: "user123",
    }

    const res = await request(app)
        .post(`${BASE_URL_USERS}/login`)
        .send(body)

    TOKEN = res.body.token
    console.log(res.body)
})

//? CREATE 
test("POST -> 'BASE_URL', should return status code 201 and res.body.name === category.name", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(category)
        .set('Authorization', `Bearer ${TOKEN}`)

    categoryId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)
});

//? GET ALL
test("GET -> 'BASE_URL' should return status code 200 , res.body.length = 1 and res.body[0].name === category.name", async () => {
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].name).toBe(category.name)
});

//? DELETE
test("DELETE -> 'BASE_URL/:id', should return status code 204 ", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${categoryId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
});