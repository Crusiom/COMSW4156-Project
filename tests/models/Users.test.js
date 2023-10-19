const mongoose = require('mongoose');
const User = require('../../models/Users.js');

describe('User Model Dry Run Tests', () => {

    it('should be invalid if name is empty', () => {
        const user = new User();
        user.validateSync();
        expect(user.errors.name).toBeDefined();
    });

    it('should be invalid if email is empty', () => {
        const user = new User();
        user.validateSync();
        expect(user.errors.email).toBeDefined();
    });

    it('should be invalid if password is empty', () => {
        const user = new User();
        user.validateSync();
        expect(user.errors.password).toBeDefined();
    });

    it('should be valid when name, email, and password are provided', () => {
        const user = new User({ 
            email: 'test@example.com', 
            password: 'testPassword123',
            app: 'SomeAppValue',
            name: 'Test User'
        });
        
        expect(user.email).toBe('test@example.com');
        expect(user.password).toBe('testPassword123');
        expect(user.app).toBe('SomeAppValue');
        expect(user.name).toBe('Test User');
    });

});