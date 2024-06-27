const request = require("supertest");
const app = require('../app')

const BASE_URL = '/api/v1/users'

let userId, TOKEN

const user = {
    firstName: "luis",
    lastName: "Ortega",
    email: "luis@email.com",
    password: "luis123",
    phone: "5620860800"
}

beforeAll(async () => {
    const body = {
        email: "user@email.com",
        password: "user123",
    }

    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(body)

    TOKEN = res.body.token
})

//? CREATE
test("POST -> 'BASE_URL', should return status code 201 and res.body.firstName === user.firstName", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(user)

    userId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
})

//? LOGIN
test("POST -> 'BASE_URL/login' should return status code 201 and res.body.user.firstName === user.firstName", async () => {
    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send({ email: user.email, password: user.password })

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.user.firstName).toBe(user.firstName)
});

//? GET ALL
test("GET -> 'BASE_URL' should return status code 200 , res.body.length = 2 and res.body[1].firstName === user.firstName", async () => {
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(2)
    expect(res.body[1].firstName).toBe(user.firstName)
});

//? UPDATE
test("PUT -> 'BASE_URL/:id' should return status code 200 , res.body.firstName === userUpdate.firstName", async () => {

    const userUpdate = {
        firstName: "Luis",
        lastName: "Ortega Chavez",
        phone: "+525620860800"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${userId}`)
        .send(userUpdate)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(userUpdate.firstName)
});

//? DELETE
test("DELETE -> 'BASE_URL/:id', should return status code 204 ", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
});

