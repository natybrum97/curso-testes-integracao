import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should return 200 when ask /health", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  })
})

describe('Testes de integração para /fibonacci', () => {
  it('Deve retornar um status 400 se o parâmetro "elements" for inválido', async () => {
    const response = await api.get('/fibonacci?elements=invalid');

    expect(response.status).toBe(400);
  });

  it('Deve retornar um status 400 se o parâmetro "elements" for menor que 1', async () => {
    const response = await api.get('/fibonacci?elements=0');

    expect(response.status).toBe(400);
  });

  it('Deve retornar um status 400 se o parâmetro "elements" for maior que Number.MAX_VALUE', async () => {
    const response = await api.get(`/fibonacci?elements=${Number.MAX_VALUE + 1}`);

    expect(response.status).toBe(400);
  });

  it('Deve retornar a sequência de Fibonacci para um valor válido de "elements"', async () => {
    const response = await api.get('/fibonacci?elements=5');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([0, 1, 1, 2, 3]);
  });
});