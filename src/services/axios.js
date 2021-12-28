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
        http.post('/templates',data)
    }
    UpdateTemplate(id,data){
        http.post(`/templates/${id}`,data)
    }
    checkName(name){
        return http.get(`templates/name`)
    }
    deleteTemplate(id){
        return http.delete(`templates/${id}`)
    }
    getTemplateById(id){
        console.log('axios id = ',id)
        return http.get(`templates/${id}`)
    }
    pritamFuncMe(){
        return http.get('http://localhost:5000/users/me',{
            headers: {
                'Authorization': localStorage.getItem('token')
              }
        })
    }

}

export default new axios()
