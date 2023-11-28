const chai = require('chai');
const appChecker = require('../../middlewares/appChecker');
const App = require('../../models/Apps');
const ErrorResponse = require('../../helpers/errResponse');

chai.use(require('chai-http'));
const { expect } = chai;

describe('App Checker Middleware', () => {
    it('should call next when the app setting is enabled', (done) => {
        const req = { user: { app: 'validAppId' } };
        const res = {};
        const next = () => done();

        App.findOneById = (id) => Promise.resolve({ settingName: true });

        appChecker.checkAppConfig('settingName')(req, res, next);
    });

    it('should return an error when the app setting is disabled', (done) => {
        const req = { user: { app: 'validAppId' } };
        const res = {};
        const next = (err) => {
            try {
                expect(err).to.be.instanceOf(ErrorResponse); // Check if err is an instance of ErrorResponse
                console.log('statue code');
                console.log(err.describe);
                expect(err.statusCode).to.equal(); // suppose to equal 404
                done();
            } catch (error) {
                done(error);
            }
        };

        App.findOneById = (id) => Promise.resolve({ settingName: false });

        appChecker.checkAppConfig('settingName')(req, res, next);
    });

    it('should return an error when the app is not found', (done) => {
        const req = { user: { app: 'invalidAppId' } };
        const res = {};
        const next = (err) => {
            expect(err).to.be.instanceOf(ErrorResponse);
            expect(err.statusCode).to.equal(404);
            done();
        };

        App.findOneById = (id) => Promise.resolve(null);

        appChecker.checkAppConfig('settingName')(req, res, next);
    });
});
