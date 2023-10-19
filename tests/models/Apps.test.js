const mongoose = require('mongoose');
const App = require('../../models/Apps.js');

const mockSave = jest.fn();
const mockFindById = jest.fn();

mongoose.Model.prototype.save = mockSave;
mongoose.Model.findById = mockFindById;

describe('App Model Test', () => {
    afterEach(() => {
        mockSave.mockClear();
        mockFindById.mockClear();
    });

    it('create & save app successfully', async () => {
        const validApp = new App({
            title: "Test App",
            commentEnabled: true,
            eventEnabled: true,
            visibleEnabled: true
        });
        mockSave.mockResolvedValueOnce(validApp);
        const savedApp = await validApp.save();
        expect(savedApp).toMatchObject(validApp);
    });

    it('find app by id', async () => {
        const findApp = {
            _id: "5f4f5f450f3f3f3f3f3f3f3f",
            title: "Test App",
            commentEnabled: true,
            eventEnabled: true,
            visibleEnabled: true
        };
        mockFindById.mockResolvedValueOnce(findApp);
        const foundApp = await App.findById("5f4f5f450f3f3f3f3f3f3f3f");
        expect(foundApp).toMatchObject(findApp);
    });
});

