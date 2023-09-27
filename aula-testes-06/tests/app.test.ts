import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("Deve retornar o status 200 se a requisição der certo", async () => {
    const result = await api.get("/event");
    expect(result.status).toBe(200);
  })

  it("Deve retornar o objeto correto", async () => {
    const result = await api.get("/event");
    expect(result.body).toEqual({
      id: 1,
      title: "Super Event!",
      image: "https://img.freepik.com/fotos-gratis/publico-animado-assistindo-fogos-de-artificio-de-confete-e-se-divertindo-no-festival-de-musica-a-noite-copiar-espaco_637285-559.jpg",
      date: "2023-07-21T00:00:00.000Z"
    })
  })

  it("Deve retornar o objeto correto - Não considera o id", async () => {
    const result = await api.get("/event");
    expect(result.body).toMatchObject({
      title: "Super Event!",
      image: "https://img.freepik.com/fotos-gratis/publico-animado-assistindo-fogos-de-artificio-de-confete-e-se-divertindo-no-festival-de-musica-a-noite-copiar-espaco_637285-559.jpg",
      date: "2023-07-21T00:00:00.000Z"
    })
  })

  it("Deve retornar o objeto correto - Considera o id um número qualquer", async () => {
    const result = await api.get("/event");
    expect(result.body).toEqual({
      id: expect.any(Number),
      title: "Super Event!",
      image: "https://img.freepik.com/fotos-gratis/publico-animado-assistindo-fogos-de-artificio-de-confete-e-se-divertindo-no-festival-de-musica-a-noite-copiar-espaco_637285-559.jpg",
      date: "2023-07-21T00:00:00.000Z"
    })
  })

  it("Deve retornar o objeto correto - Considera o id um número qualquer", async () => {
    const result = await api.get("/event");
    expect(result.body).toEqual({
      id: expect.any(Number),
      title: expect.any(String),
      image: expect.any(String),
      date: expect.any(String)
    })
  })
});