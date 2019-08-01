const expect = require('chai').expect
const request = require('supertest')
const { app } = require('../index.js')

describe('get playstore', () => {
    it('returns array of apps', () => {
        return request(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body)
                    .to.be.an('array')
            })
    })
    it('Status 400 on invalid sort value', () => {
        return request(app)
            .get('/apps')
            .query({ sort: 'butts' })
            .expect(400, 'Please enter a sort value of either Rating or App')
    })
    it('Status 200 on valid sort value', () => {
        return request(app)
            .get('/apps')
            .query({ sort: 'Rating' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(
                res => {
                    expect(res.body).to.be.an('array');
                    let app = 0;
                    let sorted = true;
                    while (sorted && app < res.body.length - 1) {
                        sorted = sorted && res.body[app].Rating <= res.body[app + 1].Rating;
                        app++;
                    }
                    expect(sorted).to.be.true;
                }
            )
    })
})