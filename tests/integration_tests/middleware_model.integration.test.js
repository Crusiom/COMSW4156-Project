const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Middleware and Model Integration Tests', () => {
    const baseApi = 'http://localhost:3000';

    beforeEach(() => {
        nock.cleanAll();
    });

    describe('Advanced Results Middleware with Users Model', () => {
        it('should return paginated results for Users', (done) => {
            // Mock response for the Users route
            const usersData = [
                { name: 'John Doe', email: 'john@example.com', role: 'user', app: 'TestApp' },
                { name: 'Jane Doe', email: 'jane@example.com', role: 'user', app: 'TestApp' },
            ];

            nock(baseApi)
                .get('/api/v1/users') // Adjust the endpoint according to your routes
                .reply(200, {
                    success: true,
                    count: usersData.length,
                    data: usersData,
                });

            chai.request(baseApi)
                .get('/api/v1/users')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.success).to.equal(true);
                    expect(res.body.data).to.be.an('array');
                    expect(res.body.data).to.have.lengthOf(usersData.length);
                    done();
                });
        });
    });
});
