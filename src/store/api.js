import axios from 'axios'

let client = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 60000
})

export default {
    register (data) {
        return client.post('/account/register', {account: data.account,
                                                password: data.password,
                                                name: data.name, 
                                                email: data.email})
    },
    login: function (account, password) {
        return client.post('/account/login', {account: account, 
                                              password: password})
    },
    checkAccount (account) {
        return client.post('/account/checkAccount', {account:account})
    },
    checkEmail (email){
        return client.post('/account/checkEmail', {email:email})
    },
    getAccount(token){
        return client.get('/account',{headers: {'Auth': token}})
    },
    search(type,search){
        return client.get()
    },
    sendCode(token){
        return client.post('/account/sendCertification',{headers:{'Auth':token}})
    },
    checkCode(token,code){
        return client.post('/account/checkCertification',{code:code},{headers:{'Auth':token}})
    },
    updateAccount(token,id,data){
        return client.put('/account/'+id,data,{headers:{"Auth":token}})
    },
    changePass(token,id,data){
        return client.put('/account/password/'+id,data,{headers:{"Auth":token}})
    },
    getCarousel(){
        return client.get('./carousel')
    }
}