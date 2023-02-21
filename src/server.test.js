const request = require('supertest');
const { MongoClient } = require('mongodb');
const app = require('./server.js');

describe('POST /api/login', () => {
    let client;
    let database;

    beforeAll(async () => {
        const uri = 'mongodb+srv://admin:haha@cluster0.42agqtn.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        database = client.db('alleansatte');
    });

    afterAll(async () => {
        await client.close();
    });

    it('returns 404 when the user does not exist', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ username: 'nonexistent', password: 'password' })
            .set('Accept', 'application/json');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toEqual('User do not exist');
    });

    it('returns 404 when the password is incorrect', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ username: 'employee1', password: 'incorrect' })
            .set('Accept', 'application/json');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toEqual('Wrong password');
    });

    it('returns a token and role when the user exists and password is correct', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ username: 'employee1', password: 'employee1' })
            .set('Accept', 'application/json');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('role');
    });
});