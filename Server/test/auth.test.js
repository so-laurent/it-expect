const config = require('../src/config');
const services = require('../src/api/Users/Service');
const hash = require('hash.js');
const auth = require('../src/api/services/auth');
const User = require('../src/api/Users/Model');


jest.mock('hash.js');
jest.mock('../src/api/services/auth');
jest.mock('../src/config');
jest.mock('../src/api/Users/Model', () => {
    const SequelizeMock = require('sequelize-mock');
    const dbMock = new SequelizeMock();
    const UserMock = dbMock.define('user', {
        id: 'id',
        username: 'test',
        email: 'test5@test.tst',
        password: 'test$jdsfmlk1234!!',
        role: 'user'
    });

    UserMock.findOne = jest.fn((query) => {
        const email = query.where.email;
        if (email === 'test5@test.tst') {
            return Promise.resolve(UserMock.build());
        } else {
            return Promise.resolve(null);
        }
    });

    return UserMock;
});

describe('User integration tests', () => {
    let req, res;

    beforeEach(async () => {
        // Mock the hash function
        hash.sha256.mockReturnValue({
            update: jest.fn().mockReturnValue({
                digest: jest.fn().mockReturnValue('test$jdsfmlk1234!!')
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

    // Authentication tests
    describe('Authenticate a user', () => {

        beforeEach(() => {
            // Mock the request and response objects
            req = {body: {email:'test5@test.tst', password:'test$jdsfmlk1234!!'}};
            res = {json: jest.fn(), status: jest.fn().mockReturnThis({json: jest.fn()})};
        });
        test('return an error if email, username, or password are not provided', async () => {
            req.body.email = '';

            await services.authentication(req, res);
            expect(res.json).toHaveBeenCalledWith({  message: "Login Failed - Invalid input", success: false });
        });

        test('return a error if the user does not exist', async () => {
            req.body.email = 'nonexistentemail@test.tst';

            await services.authentication(req, res);
            expect(res.json).toHaveBeenCalledWith({  message: "Login Failed - User Not Found", success: false });
        });

        test('return an error if the password is incorrect', async () => {
            hash.sha256.mockReturnValue({
                update: jest.fn().mockReturnValue({
                    digest: jest.fn().mockReturnValue('incorrectpassword')
                })
            });
            await services.authentication(req, res);
            expect(res.json).toHaveBeenCalledWith({ message: "Login Failed - Password Incorrect", success: false });
        });

        test('return a token if the user is authenticated', async () => {

            await services.authentication(req, res);
            expect(res.json).toHaveBeenCalledWith({ 
                message: "Logged in Successfully",
                user: {
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date),
                    id: 'id',
                    email: 'test5@test.tst',
                    role: 'user',
                    username: 'test'
                },
                token: 'token',
                success: true });
        });
    });


    // Registration tests
    describe('Register a user', () => {

        beforeEach(() => {
            req.body = {username: 'username', email:'email@test.tst', password:'password34!!'};
            res = {json: jest.fn(), status: jest.fn().mockReturnThis({json: jest.fn()})};
        });

        test('return an error if email, username, or password are not provided', async () => {
            req.body.email = '';

            await services.register(req, res);
            expect(res.json).toHaveBeenCalledWith({ message: "Register failed - Invalid input",
                                                    success: false });
        });

        test('return an error if the user already exists', async () => {
            req.body.email = 'test5@test.tst';
            await services.register(req, res);
            expect(res.json).toHaveBeenCalledWith({  message: "Register failed - User already exist", success: false });
        });

        test('return an error if the user is invalid', async () => {
            req.body.username = 'te';
            await services.register(req, res);
            expect(User.build).toThrow();
        });

        test('return a success message if the user is registered', async () => {
            await services.register(req, res);
            expect(res.json).toHaveBeenCalledWith({  message: "Registered Succesfully", success: true });
        });
    });
});