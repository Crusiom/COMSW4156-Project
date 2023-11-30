const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const User = require('../../models/Users.js');
describe('UserSchema', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should encrypt the password field using bcrypt when modified', async () => {
        const userData = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            app: 'TestApp',
        };

        const user = new User(userData);

        // Stub isModified to return true for password modification
        sandbox.stub(user, 'isModified').withArgs('password').returns(true);

        // Stub genSalt and hash
        sandbox.stub(bcrypt, 'genSalt').resolves('salt');
        sandbox.stub(bcrypt, 'hash').resolves('hashedPassword123');

        user.save();

        //expect(bcrypt.genSalt).to.have.been.calledOnceWith();
        //expect(bcrypt.hash).to.have.been.calledOnceWith('password123', 'salt');
        //expect(user.password).to.equal('hashedPassword123');
    });
    

    it('should get a signed JWT token', () => {
        const userData = {
            _id: '12345',
            name: 'Test User',
        };

        // Stub process.env values
        process.env.JWT_SECRET = 'testsecret';
        process.env.JWT_EXPIRE = '30d';

        sandbox.stub(jwt, 'sign').returns('token123');

        const user = new User(userData);

        const token = user.getSignedJwtToken();

        expect(token).to.equal('token123');

        // Clean up process.env
        delete process.env.JWT_SECRET;
        delete process.env.JWT_EXPIRE;
    });

    it('should generate and hash password token', () => {
        const userData = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            app: 'TestApp',
        };

        const user = new User(userData);

        // Stub randomBytes and createHash
        sandbox.stub(crypto, 'randomBytes').returns({ toString: () => 'randomToken' });
        sandbox.stub(crypto, 'createHash').returns({ update: () => ({ digest: () => 'hashedToken' }) });

        const resetToken = user.getResetPasswordToken();

        expect(crypto.randomBytes).to.have.been.calledOnceWith(20);
        expect(crypto.createHash).to.have.been.calledOnceWith('sha256');
        expect(user.resetPasswordToken).to.equal('hashedToken');
        expect(user.resetPasswordExpire).to.be.a('Date');
        expect(resetToken).to.equal('randomToken');
    });

    it('should not encrypt the password field if not modified', async () => {
        const userData = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            app: 'TestApp',
        };
    
        const user = new User(userData);
    
        // Stub isModified to return false
        sandbox.stub(user, 'isModified').withArgs('password').returns(false);
    
        // Stub genSalt and hash
        sandbox.spy(bcrypt, 'genSalt');
        sandbox.spy(bcrypt, 'hash');
    
        try {
            user.save();
            
            // Assert that bcrypt.genSalt and bcrypt.hash were not called
            expect(bcrypt.genSalt).to.not.have.been.called;
            expect(bcrypt.hash).to.not.have.been.called;
        } catch (error) {
            // Fail the test if an error occurs
            assert.fail("Test failed with error: " + error.message);
        }
    });

    it('should match user entered password to hashed password in database', async () => {
        const userData = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            app: 'TestApp',
        };
    
        const user = new User(userData);
    
        // Simulate saving the user which hashes the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        
        // Attempt to match the password
        const isMatch = await user.matchPassword('password123');
    
        expect(isMatch).to.be.true;
    });
    
});
