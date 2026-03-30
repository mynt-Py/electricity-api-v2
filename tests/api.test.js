const request = require('supertest');
const app = require('../index');

describe('Electricity API 12 Test', () => {

    it('1. usage total', async () => {
        const res = await request(app).get('/api/usage/total-by-year');
        expect(res.status).toBe(200);
    });

    it('2. users total', async () => {
        const res = await request(app).get('/api/users/total-by-year');
        expect(res.status).toBe(200);
    });

    it('3. usage valid', async () => {
        const res = await request(app).get('/api/usage/bangkok/2020');
        expect(res.status).toBe(200);
    });

    it('4. usage invalid', async () => {
        const res = await request(app).get('/api/usage/xxx/0000');
        expect(res.body.message).toBeDefined();
    });

    it('5. users valid', async () => {
        const res = await request(app).get('/api/users/bangkok/2020');
        expect(res.status).toBe(200);
    });

    it('6. users invalid', async () => {
        const res = await request(app).get('/api/users/xxx/0000');
        expect(res.body.message).toBeDefined();
    });

    it('7. usage history', async () => {
        const res = await request(app).get('/api/usage-history/bangkok');
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('8. usage history empty', async () => {
        const res = await request(app).get('/api/usage-history/xxx');
        expect(res.body.length).toBe(0);
    });

    it('9. users history', async () => {
        const res = await request(app).get('/api/users-history/bangkok');
        expect(res.status).toBe(200);
    });

    it('10. users history empty', async () => {
        const res = await request(app).get('/api/users-history/xxx');
        expect(res.body.length).toBe(0);
    });

    it('11. wrong endpoint', async () => {
        const res = await request(app).get('/api/test');
        expect(res.status).toBe(404);
    });

    it('12. case insensitive', async () => {
        const res = await request(app).get('/api/usage/BANGKOK/2020');
        expect(res.status).toBe(200);
    });

});