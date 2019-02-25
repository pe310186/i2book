<template>
    <v-container>
        <v-toolbar fixed flat  height="80">
            <v-spacer></v-spacer>
            <v-toolbar-items>           
                <v-layout align-center><a href="/#/"><v-img contain class="pointer" width="120px" src="http://localhost:3000/uploadedFile/i2books.png"></v-img></a></v-layout>
            </v-toolbar-items>
            &nbsp;&nbsp;
            <v-toolbar-items>
                <v-btn flat large href="#/home/about">關於我們</v-btn>
                <v-btn flat large href="#/home/shopping">買二手書</v-btn>
                <v-btn flat large href="#/home/sell">賣二手書</v-btn>
                <v-btn flat large href="#/member/information">會員專區</v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-toolbar-items v-if="loginFlag==false">
                <v-btn flat small @click="login()">登入</v-btn>
                <v-btn flat small @click="register()">註冊</v-btn>
                <v-btn flat icon href="#/home/cartlist"><v-icon large  class="pointer" light>shopping_cart</v-icon></v-btn>
            </v-toolbar-items>
            <v-toolbar-items v-else-if="loginFlag==true">
                <v-layout align-center>
                <v-card-text><font size="3" class="context-menu">歡迎!&nbsp;&nbsp;&nbsp;<b>{{account.name}}</b></font></v-card-text>
                </v-layout>
                <v-btn flat small @click="logout">登出</v-btn>
                <v-btn flat icon href="#/home/cartlist"><v-icon large  class="pointer" light>shopping_cart</v-icon></v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
        </v-toolbar>
    </v-container>
</template>

<script>
import api from '../store/api.js'
export default {
    data(){
        return{
            loginFlag:false,
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
    },
    beforeMount(){
        let self = this
        let token = localStorage.getItem('token')
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
