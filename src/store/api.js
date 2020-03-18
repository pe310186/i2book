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
        return client.get('/product/search/' + type + '/' + search)
    },
    sendCode(token){
        return client.post('/account/sendCertification',null,{headers:{'Auth':token}})
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
        return client.get('/carousel')
    },
    getArticle(id){
        return client.get('/article/'+id)
    },
    getAllProductType(){
        return client.get('/product/type')
    },
    getAllProduct(){
        return client.get('product/all/visible')
    },
    getProduct(id){
        return client.get('/product/' + id)
    },
    getOnsale(){
        return client.get('/product/onsale')
    },
    getHot(){
        return client.get('/product/hot')
    },
    facebook(id){
        return client.get('/account/auth/facebook/callback?code=' + id)
    },
    fblogin(access_token){
        console.log(access_token)
        return client.post('/account/fblogin', {"access_token": access_token })
    }
}