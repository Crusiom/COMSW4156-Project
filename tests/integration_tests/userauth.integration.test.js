const chai = require('chai');
const nock = require('nock');
const expect = chai.expect;

describe('User Authentication', () => {
    const baseApi = 'http://localhost:6000';

    beforeEach(() => {
        nock.cleanAll();
    });

    // User Registration Test
    describe('/POST Register', () => {
        it('it should mock successful registration', (done) => {
            nock(baseApi).post('/api/v1/auth/register').reply(200, {
                success: true,
                token: 'mockToken',
            });
            done();
        });

        it('it should mock registration failure due to existing email', (done) => {
            nock(baseApi).post('/api/v1/auth/register').reply(400, {
                success: false,
                error: 'User with this email already exists',
            });
            done();
        });
    });

    // User Login Test
    describe('/POST Login', () => {
        it('it should mock successful login', (done) => {
            nock(baseApi).post('/api/v1/auth/login').reply(200, {
                success: true,
                token: 'mockToken',
            });
            done();
        });

        it('it should mock login failure with incorrect credentials', (done) => {
            nock(baseApi).post('/api/v1/auth/login').reply(401, {
                success: false,
                error: 'Invalid Credentials',
            });
            done();
        });
    });
});
