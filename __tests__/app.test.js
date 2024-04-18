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

 describe('API Endpoints', () => {
    test('Get /api return all endpoints that are available', () => {
        const endpoints = require('../endpoints.json')
        return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
            expect(body).toEqual(endpoints)
        })
    })
})

describe('/api/articles/:article_id', () => {
    test('GET 200: responds with the correct article information when given an article id', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(({ body }) => {
            const { article } = body
            const { author,  title, article_id, topic, created_at, votes, article_img_url } = article
            expect(article_id).toBe(1)
            expect(title).toBe('Living in the shadow of a great man')
            expect(author).toBe('butter_bridge')
            expect(topic).toBe('mitch')
            expect(article.body).toBe('I find this existence challenging')
            expect(created_at).toBe('2020-07-09T20:11:00.000Z')
            expect(votes).toBe(100)
            expect(article_img_url).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700')
        })
    })
    test('GET 404: responds with article not found when given an article id that can exist but is not currently occupied', () => {
        return request(app)
        .get('/api/articles/9999')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('Article not found');
        });
    })
    test('GET 400: responds with Bad request when given an article ', () => {
        return request(app)
          .get('/api/articles/bannana')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Bad request');
          });
      });
})
