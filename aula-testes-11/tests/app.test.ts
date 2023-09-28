import supertest from "supertest";

import app from "./../src/app";
import prisma from "../src/database";
import { UserInput } from "../src/repository";
import { createManyUsers, createUser, testeUser } from "./factories/accesses-factory";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should create a user", async () => {
    
    const user = testeUser("teste@teste.com.br","teste");

    const { status } = await api.post("/users").send(user);
    expect(status).toBe(201);
  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {

    const userData = testeUser("teste@teste.com.br","teste");

    await createUser("teste@teste.com.br","teste");

    const { status } = await api.post("/users").send(userData);
    expect(status).toBe(409);
  });

});

describe("GET /users tests", () => {
  it("should return a single user", async () => {
    
    const userData = testeUser("teste@teste.com.br","teste");

    const createdUser = await createUser("teste@teste.com.br","teste");

    const { status, body } = await api.get(`/users/${createdUser.id}`);
    expect(status).toBe(200);
    expect(body).toEqual({
      ...userData,
      id: createdUser.id
    });
  });

  it("should return 404 when can't find a user by id", async () => {
    const { status } = await api.get("/users/1234");
    expect(status).toBe(404);
  });

  it("should return all users", async () => {
    
    const userData = testeUser("teste@teste.com.br","teste");

    await createManyUsers (userData,"teste2@teste.com.br");

    const { status, body } = await api.get("/users");
    expect(status).toBe(200);
    expect(body).toHaveLength(2);
    expect(body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        email: expect.any(String)
      })
    ]))
  });

})