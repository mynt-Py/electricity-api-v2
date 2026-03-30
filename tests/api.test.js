const request = require('supertest');
const app = require('../index');

describe('Electricity API 12 Test', () => {

    // 1. API: Total electricity usage for each year
    it('usage total', async () => {
        const res = await request(app).get('/api/usage/total-by-year');
        expect(res.status).toBe(200);
    });

    // 2. API: Total electricity users for each year
    it('users total', async () => {
        const res = await request(app).get('/api/users/total-by-year');
        expect(res.status).toBe(200);
    });

    // 3. API: Usage by province and year
    it('3. usage valid', async () => {
        const res = await request(app).get('/api/usage/bangkok/2020');
        expect(res.status).toBe(200);
    });

    // 4. API: Usage by province and year invalid
    it('4. usage invalid', async () => {
        const res = await request(app).get('/api/usage/xxx/0000');
        expect(res.body.message).toBeDefined();
    });

    // 5. API: Users by province and year valid
    it('5. users valid', async () => {
        const res = await request(app).get('/api/users/bangkok/2020');
        expect(res.status).toBe(200);
    });

    // 6. API: Users by province and year invalid
    it('6. users invalid', async () => {
        const res = await request(app).get('/api/users/xxx/0000');
        expect(res.body.message).toBeDefined();
    });

    // 7. API: Usage history for a specific province
    it('7. usage history', async () => {
        const res = await request(app).get('/api/usage-history/bangkok');
        expect(Array.isArray(res.body)).toBe(true);
    });

    // 8. API: Usage history for a specific province empty
    it('8. usage history empty', async () => {
        const res = await request(app).get('/api/usage-history/xxx');
        expect(res.body.length).toBe(0);
    });

    // 9. API: User history for a specific province
    it('9. users history', async () => {
        const res = await request(app).get('/api/users-history/bangkok');
        expect(res.status).toBe(200);
    });

    // 10. API: User history for a specific province empty
    it('10. users history empty', async () => {
        const res = await request(app).get('/api/users-history/xxx');
        expect(res.body.length).toBe(0);
    });

    // 11. API: Wrong endpoint
    it('11. wrong endpoint', async () => {
        const res = await request(app).get('/api/test');
        expect(res.status).toBe(404);
    });

    // 12. API: Case insensitive province name
    it('12. case insensitive', async () => {
        const res = await request(app).get('/api/usage/BANGKOK/2020');
        expect(res.status).toBe(200);
    });

});