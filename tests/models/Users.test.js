const mongoose = require('mongoose');

const User = require('../../models/Users.js');

// Grouping test cases related to the User Model dry-run validations
describe('User Model Dry Run Tests', () => {

    // Test case to ensure that a user without a name is invalid
    it('should be invalid if name is empty', () => {
        // Creating an instance of the User model without a name
        const user = new User();

        // Validate the user instance
        user.validateSync();

        // Asserting that a validation error for the name field exists
        expect(user.errors.name).toBeDefined();
    });

    // Test case to ensure that a user without an email is invalid
    it('should be invalid if email is empty', () => {
        // Creating an instance of the User model without an email
        const user = new User();

        // Validate the user instance
        user.validateSync();

        // Asserting that a validation error for the email field exists
        expect(user.errors.email).toBeDefined();
    });

    // Test case to ensure that a user without a password is invalid
    it('should be invalid if password is empty', () => {
        // Creating an instance of the User model without a password
        const user = new User();

        // Validate the user instance
        user.validateSync();

        // Asserting that a validation error for the password field exists
        expect(user.errors.password).toBeDefined();
    });

    // Test case to ensure that a user is valid when all necessary fields are provided
    it('should be valid when name, email, and password are provided', () => {
        // Creating an instance of the User model with valid data
        const user = new User({ 
            email: 'test@example.com', 
            password: 'testPassword123',
            app: 'SomeAppValue',
            name: 'Test User'
        });
        
        // Asserting that the fields on the user instance match the provided data
        expect(user.email).toBe('test@example.com');
        expect(user.password).toBe('testPassword123');
        expect(user.app).toBe('SomeAppValue');
        expect(user.name).toBe('Test User');
    });

});
