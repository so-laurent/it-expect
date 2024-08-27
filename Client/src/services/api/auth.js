import API from '../config'

const Auth = {
    async login ({
        email,
        password
    }) {
        const response = await API.post('/user/auth', {
            email: email,
            password: password
        })
        return response.data
    },

    async register ({
        username,
        email,
        password
    }) {
        const response = await API.post('/user/register', {
            username: username,
            email: email,
            password: password
        })
        return response.data
    }
}

export default Auth