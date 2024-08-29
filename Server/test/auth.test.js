const config = require('../src/config');
const services = require('../src/api/Users/Service');
const hash = require('hash.js');
const auth = require('../src/api/services/auth');
const User = require('../src/api/Users/Model');

jest.mock('hash.js');
jest.mock('../src/api/services/auth');
jest.mock('../src/config');
jest.mock('../src/api/Users/Model');

describe('User integration tests', () => {
    let req, res;


    beforeEach(async () => {
        // Mock the request and response objects
        req = {body: {email:'email', password:'password'}};
        res = {json: jest.fn(), status: jest.fn().mockReturnThis({json: jest.fn()})};

        // Mock the hash function
        hash.sha256.mockReturnValue({
            update: jest.fn().mockReturnValue({
                digest: jest.fn().mockReturnValue('hashedpassword')
            })
        });

        // Mock the generateToken function
        auth.generateToken.mockReturnValue('token');
        config.role = {user: 'user'};
    });

    afterEach((done) => {
        jest.clearAllMocks();
        setTimeout(done);
    });

    describe('Authenticate a user', () => {
        test('return an error if email, username, or password are not provided', async () => {
            req.body.email = '';

            await services.authentication(req, res);
            expect(res.json).toHaveBeenCalledWith({  message: "Login Failed - Invalid input",
                                                    success: false });
        });

        test('return a error if the user does not exist', async () => {
            User.findOne.mockResolvedValue(null);

            await services.authentication(req, res);
            expect(res.json).toHaveBeenCalledWith({  message: "Login Failed - User Not Found",
                                                    success: false });
        });

        test('return an error if the password is incorrect', async () => {
            User.findOne.mockResolvedValue({email: 'email', password: 'incorrectpassword'});

            await services.authentication(req, res);
            expect(res.json).toHaveBeenCalledWith({  message: "Login Failed - Password Incorrect",
                                                    success: false });
        });

        test('return a token if the user is authenticated', async () => {
            User.findOne.mockResolvedValue({email: 'email', password: 'hashedpassword'});

            await services.authentication(req, res);
            expect(res.json).toHaveBeenCalledWith({ message: "Logged in Successfully",
                                                    user: {
                                                        createdAt: undefined,
                                                        email: 'email',
                                                        id: undefined,
                                                        role: undefined,
                                                        updatedAt: undefined,
                                                        username: undefined
                                                    },
                                                    token: 'token',
                                                    success: true });
        });
    });
});