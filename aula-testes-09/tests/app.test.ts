import supertest from "supertest";

import app from "./../src/app";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should create a user", async () => {
    const { status, body } = await api.post("/users").send({
      email: "naty@gmail.com",
      password: "naty1234"
    });

    expect(status).toBe(201);
    expect(body).toEqual({
      id: body.id,
      email: "naty@gmail.com",
      password: expect.any(String)
    })
  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {
    const user = {
      email: 'naty@gmail.com',
      password: 'naty1234',
    };

    // Create the first user
    await api.post('/users').send(user);

    // Try to create the second user with the same email
    const response = await api.post('/users').send(user);

    expect(response.status).toBe(409);
  });

});

describe("GET /users tests", () => {
  it("should return a single user", async () => {
    const user = {
      email: 'naty@gmail.com',
      password: 'naty1234',
    };

    // Create a user
    const createUserResponse = await api.post('/users').send(user);

    // Retrieve the user by ID
    const userId = createUserResponse.body.id;
    const getUserResponse = await api.get(`/users/${userId}`);

    expect(getUserResponse.status).toBe(200);
    expect(getUserResponse.body).toEqual(createUserResponse.body);
  });

  it("should return 404 when can't find a user by id", async () => {
    const userId = 89; // Assuming this ID doesn't exist

    const response = await api.get(`/users/${userId}`);

    expect(response.status).toBe(404);
  });

  it("should return all users", async () => {
    const users = [
      {
        email: 'user1@gmail.com',
        password: 'user11234',
      },
      {
        email: 'user2@gmail.com',
        password: 'user21234',
      },
    ];

    // Create two users
    await api.post('/users').send(users[0]);
    await api.post('/users').send(users[1]);

    // Retrieve all users
    const response = await api.get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

})