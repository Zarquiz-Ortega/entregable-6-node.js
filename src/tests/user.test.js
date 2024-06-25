const request = require("supertest");
const app = require('../app')

const BASE_URL = '/api/v1/users'

let userId
let token

const user = {
    firstName: "Zarquiz",
    lastName: "Ortega",
    email: "luis@email.com",
    password: "250800",
    phone: "5620860800"
}

test("POST -> 'BASE_URL', should return status code 201 and res.body.firstName === user.firstName", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(user)

    userId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
})

test("POST -> 'BASE_URL/login' should return status code 201 and res.body.user.firstName === user.firstName", async () => {
    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send({ email: user.email, password: user.password })

    token = res.body.token

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.user.firstName).toBe(user.firstName)
});

test("GET -> 'BASE_URL' should return status code 200 , res.body.length = 1 and res.body[0].firstName === user.firstName", async () => {
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].firstName).toBe(user.firstName)
});


