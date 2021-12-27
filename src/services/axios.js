import http from '../http-common.js'

class axios{
    getUsers(){
        console.log('axios get all users')
        return http.get('/users')
    }
    addUser(user){
        console.log('axios add a user')
        return http.post('/users',user)
    }
    getOneUser(id){
        return http.get(`/users/${id}`)
    }
    getTemplates(){
        return http.get('/templates')
    }
    addTemplate(data){
        http.post('templates',data)
    }  
}

export default new axios()
