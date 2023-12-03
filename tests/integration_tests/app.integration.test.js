// // sample integration test case to-do
// const request = require('supertest');
// // const app = require('../app');
// const app = require('../../models/Apps');


// const server = app.listen(4000); // Start the app on a test port

// describe('Basic Server Response', () => {
//     it('responds to a simple GET request', async () => {
//         const res = await request(server).get('/'); // Ensure this is a valid route
//         expect(res.statusCode).toEqual(200); // Expected status code
//     });

//     // Close the server after tests
//     afterAll((done) => {
//         server.close(done);
//     });
// });


// // describe('Basic Server Response', () => {
// //     it('responds to a simple GET request', async () => {
// //       const res = await request(app).get('/'); // Replace with a simple GET endpoint you know works
// //       expect(res.statusCode).toEqual(200); // Replace with the expected status code for this endpoint
// //     });
// //   });

// // describe('User Authentication', () => {
// //   it('should register a new user', async () => {
// //     const res = await request(app)
// //       .post('/api/users/register') // Adjust API endpoint as needed
// //       .send({
// //         username: 'testuser',
// //         password: 'password123',
// //         email: 'test@example.com'
// //       });
// //     expect(res.statusCode).toEqual(201);
// //     expect(res.body).toHaveProperty('token');
// //   });

// //   it('should login the user', async () => {
// //     const res = await request(app)
// //       .post('/api/users/login') // Adjust API endpoint as needed
// //       .send({
// //         username: 'testuser',
// //         password: 'password123'
// //       });
// //     expect(res.statusCode).toEqual(200);
// //     expect(res.body).toHaveProperty('token');
// //   });
// // });

// // describe('Event Management', () => {
// //     it('should create an event', async () => {
// //       // Assuming you have a user token from authentication
// //       const userToken = 'Bearer yourUserTokenHere';
// //       const res = await request(app)
// //         .post('/api/events') // Adjust API endpoint as needed
// //         .set('Authorization', userToken)
// //         .send({
// //           title: 'New Event',
// //           description: 'Event Description',
// //           date: '2023-12-25'
// //         });
// //       expect(res.statusCode).toEqual(201);
// //       expect(res.body).toHaveProperty('eventId');
// //     });
  
// //     it('should retrieve an event', async () => {
// //       const eventId = 'yourEventIdHere';
// //       const res = await request(app)
// //         .get(`/api/events/${eventId}`) // Adjust API endpoint as needed
// //         .send();
// //       expect(res.statusCode).toEqual(200);
// //       expect(res.body).toHaveProperty('title', 'New Event');
// //     });
// //   });
