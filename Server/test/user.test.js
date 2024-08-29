const User = require('../src/api/Users/Model');

describe('User tests', () => {

    afterEach(done =>{
        setTimeout(done);
    });

    it('create valid user', async () => {
        const user = {
            username: 'test',
            email: 'test5@test.tst',
            password: 'test$jdsfmlk1234!!',
            role: 'user'
        };

        const newUser = await User.create(user);
        expect(newUser.username).toBe('test');
        expect(newUser.email).toBe('test5@test.tst');
        expect(newUser.role).toBe('user');
    });

    it('create invalid user', async () => {
        const user = {
            username: 'te',
            email: 'test465465@test.tst',
            password: 'test',
            role: 'user'
        };

        try {
            await User.create(user);
        }
        catch (error) {
            expect(error.errors[0].message).toBe('Username must be at least 3 characters long');
        }
    });

    it('find user', async () => {
        const user = await User.findOne({ where: { email: 'test5@test.tst' } });
        expect(user.username).toBe('test');
        expect(user.email).toBe('test5@test.tst');
        expect(user.role).toBe('user');
    });

    it('update user', async () => {
        const user = await User.findOne({ where: { email: 'test5@test.tst' } });
        user.username = 'test2';
        await user.save();

        const updatedUser = await User.findOne({ where: { email: 'test5@test.tst' } });
        expect(updatedUser.username).toBe('test2');
    });

    it('delete user', async () => {
        const user = await User.findOne({ where: { email: 'test5@test.tst' } });
        await user.destroy();

        const deletedUser = await User.findOne({ where: { email: 'test5@test.tst' } });
        expect(deletedUser).toBeNull();
    });
});
    