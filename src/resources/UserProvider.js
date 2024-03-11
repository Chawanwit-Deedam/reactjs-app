import api from '../config/index.js'

class userService {
    getAll() {
        return api.get('/api/user')
    }
    getOne(id) {
        return api.get(`/api/user/${id}`)
    }
    
    create(payload) {
        return api.post('/api/user', payload)
    }
    update(id, payload) {
        return api.patch(`/api/user/${id}`, payload)
    }

    delete(id) {
        return api.delete(`/api/user/${id}`)
    }
}

export default userService