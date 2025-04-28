const request = require('supertest');
const app = require('../app'); // adjust path if needed

describe('Simple Web Game Tests', () => {
    it('should load the homepage (GET /)', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });

    it('should return 404 on unknown routes', async () => {
        const response = await request(app).get('/nonexistentroute');
        expect(response.statusCode).toBe(404);
    });
});