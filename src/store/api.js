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
        return client.post('/account/check', {account:account})
    },
    getAccount(token){
        return client.get('/account',{headers: {'Auth': token}})
    }
}