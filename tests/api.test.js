const request = require('supertest');
const app = require('../index');

describe('Electricity API Comprehensive Test Suite', () => {

    let sampleUsage;
    let sampleUsers;

    beforeAll(async () => {
        const usageRes = await request(app).get('/api/usage-history/bangkok');
        if (usageRes.body.length > 0) {
            sampleUsage = usageRes.body[0];
        }

        const usersRes = await request(app).get('/api/users-history/bangkok');
        if (usersRes.body.length > 0) {
            sampleUsers = usersRes.body[0];
        }
    });

    // 1
    it('GET /api/usage/total-by-year', async () => {
        const res = await request(app).get('/api/usage/total-by-year');

        expect(res.statusCode).toBe(200);
        expect(typeof res.body).toBe('object');
    });

    // 2
    it('GET /api/users/total-by-year', async () => {
        const res = await request(app).get('/api/users/total-by-year');

        expect(res.statusCode).toBe(200);
        expect(typeof res.body).toBe('object');
    });

    // 3
    it('GET /api/usage/:province/:year', async () => {
        if (!sampleUsage) return;

        const res = await request(app).get(
            `/api/usage/${sampleUsage.province_name}/${sampleUsage.year}`
        );

        expect(res.statusCode).toBe(200);
        expect(res.body.province_name).toBe(sampleUsage.province_name);
    });

    // 4
    it('GET /api/users/:province/:year', async () => {
        if (!sampleUsers) return;

        const res = await request(app).get(
            `/api/users/${sampleUsers.province_name}/${sampleUsers.year}`
        );

        expect(res.statusCode).toBe(200);
        expect(res.body.province_name).toBe(sampleUsers.province_name);
    });

    // 5
    it('GET /api/usage-history/:province', async () => {
        const res = await request(app).get('/api/usage-history/bangkok');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // 6
    it('GET /api/users-history/:province', async () => {
        const res = await request(app).get('/api/users-history/bangkok');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // 7
    it('Error handling', async () => {
        const res = await request(app).get('/api/usage/invalid/9999');

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBeDefined();
    });

});