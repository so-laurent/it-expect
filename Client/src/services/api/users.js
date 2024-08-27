import API from '../config'

const Users = {
    async get() {
        const response = await API.get('/user')
        return response.data
    },

    async getOne(id) {
        const response = await API.get(`/user/${id}`)
        return response.data
    },

    async update({id, username, email, password}) {
        const response = await API.put(`/user/${id}`, {
            username: username,
            email: email,
            password: password
        })
        return response.data
    },

    async delete(id) {
        const response = await API.delete(`/user/${id}`)
        return response.data
    },
}

export default Users