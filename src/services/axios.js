import http from '../http-common.js'

class axios {
    getUsers() {
        console.log('axios get all users')
        return http.get('/users')
    }
    addUser(user) {
        console.log('axios add a user')
        return http.post('/users', user)
    }
    getOneUser(id) {
        return http.get(`/users/${id}`)
    }
    getTemplates() {
        return http.get('/templates')
    }
    addTemplate(data) {
        return http.post('/templates', data)
    }
    UpdateTemplate(id, data) {
        http.post(`/templates/${id}`, data)
    }
    checkName(name) {
        console.log('check name axios', name)
        return http.get(`templateName?name=${name}`)
    }
    deleteTemplate(id) {
        return http.delete(`templates/${id}`)
    }
    getTemplateById(id) {
        console.log('axios id = ', id)
        return http.get(`templates/${id}`)
    }
    pritamFuncMe() {
        return http.get('users/me', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
                    // "Bearer "+"token"
            }
        })
    }
    getTemplateUser(id) {
        console.log('axios user', id)
        return http.get(`usertemplate?id=${id}`)
    }
}

export default new axios()