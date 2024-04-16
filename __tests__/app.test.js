const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data");
const request = require("supertest");

beforeAll(() => {
    return seed(data);
  });
  
afterAll(() => {
    return db.end();
  });

    describe ('/api/i-do-not-exist', () => {
        test('get error message 404 when given a non existant endpoint', () => {
            return request(app)
            .get('/api/does-not-exist')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Not found')
            })
        })
    })

    describe ('GET /api/topics', () => {
        test('Get response message 200 and an array with slug and description properties', () => {
            return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({ body }) => {
                const { topics } = body
                expect(topics.length).toBe(3)
                topics.forEach((topic) => {
                    expect(typeof topic.slug).toBe('string')
                    expect(typeof topic.description).toBe('string')
                    
                })
            })
        })
    })
