const chai = require('chai');
const advancedResults = require('./advancedResults');

chai.use(require('chai-http'));
const { expect } = chai;

describe('Advanced Results Middleware', () => {
  it('should correctly enhance query results', () => {
    // Mock request and response objects
    const req = {
      query: {
        select: 'name,age',
        sort: 'age',
        page: 1,
        limit: 10,
        otherParam: 'value',
      },
    };

    const res = {
      advancedResults: {},
    };

    // Mock Mongoose model
    const mockModel = {
      find: (query) => {
        // Check if the query was enhanced correctly
        expect(query).to.deep.equal({
          otherParam: 'value',
        });

        // Return a mock result
        return Promise.resolve([{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]);
      },
    };


  });
});
