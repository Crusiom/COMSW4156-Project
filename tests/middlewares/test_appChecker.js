const chai = require('chai');
const appChecker = require('./appChecker');
const App = require('../models/Apps');

chai.use(require('chai-http'));
const { expect } = chai;

describe('App Checker Middleware', () => {
    it('should call next when the app setting is enabled', (done) => {
        // Mock a user with an app and a setting that is enabled
        const req = {
            user: {
                app: 'validAppId',
            },
        };

        // Mock the App.findOneById function to return an app with the setting enabled
        App.findOneById = (id) => {
            return Promise.resolve({ [setting]: true });
        };

        const res = {};
        const next = () => {
            done(); // Call done to complete the async test
        };

        // Call the appChecker middleware with the mock request
        appChecker.checkAppConfig('settingName')(req, res, next);
    });
});
