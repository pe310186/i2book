<template>
    <v-container>
        <v-toolbar fixed flat  height="120" color="gray lighten-4">
            <v-spacer></v-spacer>
            <v-toolbar-items>           
                <v-layout align-center><a href="/#/"><v-img contain class="pointer" width="120px" src="http://localhost:3000/uploadedFile/i2books.png"></v-img></a></v-layout>
            </v-toolbar-items>
            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            <v-toolbar-items>
                <v-layout align-center>
                    <a href="/#/home/about">
                        <v-img contain class="pointer" width="120px" src="http://localhost:3000/uploadedFile/關於我.png"> </v-img>
                    </a>
                </v-layout>
                 &nbsp;&nbsp;
                 <v-layout align-center>
                    <a href="/#/shopping/0">
                        <v-img contain class="pointer" width="120px" src="http://localhost:3000/uploadedFile/買二手書.png"></v-img>
                    </a>
                </v-layout>
                 &nbsp;&nbsp;
                 <v-layout align-center>
                    <a href="/#/home/sell">
                        <v-img contain class="pointer" width="120px" src="http://localhost:3000/uploadedFile/賣二手書.png"></v-img>
                    </a>
                </v-layout>
                 &nbsp;&nbsp;
                <v-layout align-center>
                    <a href="/#/member/information">
                        <v-img contain class="pointer" width="120px" src="http://localhost:3000/uploadedFile/會員專區.png"></v-img>
                    </a>
                </v-layout>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-toolbar-items v-if="loginFlag==false">
                <v-btn flat small @click="login()">登入</v-btn>
                <v-btn flat small @click="register()">註冊</v-btn>
                <v-menu open-on-hover offset-y attach close-delay="100" left :close-on-content-click="false">
                    <v-btn flat href="#/cartlist" slot="activator">
                        <v-layout column>
                            <v-icon large  class="pointer" light>shopping_cart</v-icon>
                            <center>購物車({{shoppingCart.length}})</center>
                        </v-layout>
                    </v-btn>
                    <div v-if="shoppingCart.length!=0">
                    <v-list>
                        <v-layout justify-space-around v-if="shoppingCartPage>1">
                            <v-spacer></v-spacer>
                            <v-btn block round @click="pageUp()"><v-icon>arrow_drop_up</v-icon></v-btn>
                            <v-spacer></v-spacer>
                        </v-layout>
                        <br>
                        <v-divider></v-divider>
                        <br>
                        <div v-for="n in shoppingCartNumPerPage" v-bind:key=n>
                            <div v-if="(n-1)<shoppingCartView.length">
                            <br>
                            <v-card flat width="300px">
                                <v-layout row justify-center>
                                    &nbsp;&nbsp;
                                    <v-btn icon @click="deleteShoppingCartItem(shoppingCartView[n-1].id)"><v-icon>cancel</v-icon></v-btn>
                                    &nbsp;&nbsp;
                                    <a :href='"/#/product/" + shoppingCartView[(n-1)].id'>
                                        <v-img contain class="pointer" width="80px" :src='shoppingCartView[(n-1)].pic.url'></v-img>
                                    </a>
                                    <v-spacer></v-spacer>
                                    <v-layout column align-center>
                                        <a :href='"/#/product/" + shoppingCartView[(n-1)].id' style="text-decoration:none;color:black;"><p>{{shoppingCartView[(n-1)].title}}</p></a>
                                        <div>
                                            售價:&nbsp;NT$&nbsp;
                                            <s>{{shoppingCartView[(n-1)].price}}</s>
                                            <b><font color="red" size="3">&nbsp;{{shoppingCartView[(n-1)].sell}}</font></b>
                                        </div>
                                        <br>
                                    </v-layout>
                                    <v-spacer></v-spacer>
                                </v-layout>
                            </v-card>
                            <br>
                            <v-divider></v-divider>
                            <br>
                            </div>
                        </div>
                        <v-layout justify-space-around v-if="shoppingCartPage<shoppingCartNumOfPage">
                            <v-spacer></v-spacer>
                            <v-btn block round @click="pageDown()"><v-icon>arrow_drop_down</v-icon></v-btn>
                            <v-spacer></v-spacer>
                        </v-layout>
                        <br>
                        <center>
                            <p>共&nbsp;<b><font size="3" color="red">{{shoppingCart.length}}</font></b>&nbsp;件商品,&nbsp;NT$&nbsp;<b><font size="3" color="red">{{numOfPrice}}</font></b>&nbsp;元</p>
                            <p></p>
                        </center>
                        <v-layout justify-end>
                            <v-spacer></v-spacer>
                            <v-btn round href="#/cartlist">
                                <v-layout row align-center>
                                    <v-icon>attach_money</v-icon>
                                    前往結帳
                                </v-layout>
                            </v-btn>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        </v-layout>
                        <br>
                    </v-list>
                    </div>
                </v-menu>
            </v-toolbar-items>
            <v-toolbar-items v-else-if="loginFlag==true">
                <v-layout align-center>
                    <v-card-text><font size="3" class="context-menu">歡迎!&nbsp;&nbsp;&nbsp;<b>{{account.name}}</b></font></v-card-text>
                </v-layout>
                <v-btn flat small @click="logout">登出</v-btn>
                <v-btn flat href="#/home/cartlist">
                    <v-layout column>
                        <v-icon large  class="pointer" light>shopping_cart</v-icon>
                        <center>購物車({{shoppingCart.length}})</center>
                    </v-layout>
                </v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
        </v-toolbar>
    </v-container>
</template>

<script>
import api from '../store/api.js'
export default {
    props:{
        rerender:{
            type:Boolean,
            default:false,
        }
    },
    data(){
        return{
            loginFlag:false,
            shoppingCart:[],
            shoppingCartPage:1,
            shoppingCartNumPerPage:3,
            shoppingCartNumOfPage:0,
            numOfPrice:0,
            shoppingCartView:[],
        }
    },
    watch:{
        rerender (val){
            if(val){
                let self = this
                let token = localStorage.getItem('token')
                this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
                if(this.shoppingCart == null)
                    this.shoppingCart = []
                this.shoppingCartNumOfPage = Math.ceil(this.shoppingCart.length/this.shoppingCartNumPerPage)
                this.numOfPrice = 0
                for(var i in this.shoppingCart){
                    this.numOfPrice += parseInt(this.shoppingCart[i].sell)
                }
                this.render()
                api.getAccount(token).then(res=>{
                    self.loginFlag = true;
                    self.account = res.data.account
                }).catch(error=>{
                    self.loginFlag = false;
                })
            }
        }
    },
    methods:{
        login(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
            this.$router.push('/login')
        },
        register(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
            this.$router.push('/register')
        },
        logout(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
            localStorage.removeItem('token')
            this.$router.push('/')
            window.location.reload()
        },
        pageUp(){
            this.shoppingCartPage--
            this.render()
        },
        pageDown(){
            this.shoppingCartPage++
            this.render()
        },
        render(){
            if(this.shoppingCart.length>this.shoppingCartNumPerPage){
                var shift = 0
                while(this.shoppingCartNumPerPage*(this.shoppingCartPage)-shift>this.shoppingCart.length){
                    shift++
                }
                for(var i=0; i<this.shoppingCartNumPerPage; i++){
                    this.shoppingCartView[i] = this.shoppingCart[this.shoppingCartNumPerPage*(this.shoppingCartPage-1)-shift+i]
                }
            }
            else{
                this.shoppingCartView = this.shoppingCart
            }
        },
        deleteShoppingCartItem(id){
            for(var i in this.shoppingCart){
                if(this.shoppingCart[i].id == id){
                    this.numOfPrice -= parseInt(this.shoppingCart[i].sell)
                    this.shoppingCart.splice(i,1)
                    this.shoppingCartNumOfPage = Math.ceil(this.shoppingCart.length/this.shoppingCartNumPerPage)
                    localStorage.setItem('shoppingCart',JSON.stringify(this.shoppingCart))
                    this.render()
                    break
                }
            }
        }
    },
    beforeMount(){
        let self = this
        let token = localStorage.getItem('token')
        this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
        if(this.shoppingCart == null)
            this.shoppingCart = []
        this.shoppingCartNumOfPage = Math.ceil(this.shoppingCart.length/this.shoppingCartNumPerPage)
        for(var i in this.shoppingCart){
            this.numOfPrice += parseInt(this.shoppingCart[i].sell)
        }
        this.render()
        api.getAccount(token).then(res=>{
            self.loginFlag = true;
            self.account = res.data.account
        }).catch(error=>{
            self.loginFlag = false;
        })
    }
}
</script>

<style>
.pointer {
    cursor: pointer;
}
.barText{
    color: green darken-4
}
.accountName{
    color: green 
}
.context-menu {
    cursor: context-menu;
}
</style>
