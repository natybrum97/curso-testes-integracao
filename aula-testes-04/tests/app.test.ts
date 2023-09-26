import supertest from "supertest";
import app from "../src/app"

const server = supertest(app);

describe ("API", () => {
    it("/health", async () => {
        const result = await server.get("/health");
        console.log(result);

        const { statusCode } = result;
        
        expect(statusCode).toBe(200);
    })
})