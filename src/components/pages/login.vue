<template>
    <v-container>
        <top></top>

        <center>
            <v-card width="600px">
                <br>
                <v-flex xs10 md10 lg10>
                    <font size="6"><p><b>登入</b></p></font>
                    <v-text-field label="帳號" outline v-model="account"></v-text-field>
                    <v-text-field label="密碼" outline v-model="password"></v-text-field>
                </v-flex>
                <v-btn color="green accent-4" class="white--text" large @click="login()"><b>I2BOOKS會員登入</b></v-btn>
                <v-btn flat small @click="forget()">忘記密碼?</v-btn>
                <b>/</b>
                <v-btn flat small @click="register()">註冊</v-btn>
                <br>
                <br>
                <v-flex xs10>
                <v-layout row align-center>
                    <v-divider></v-divider>
                        <font size="4" class="context-menu"><p class="dividerText">&nbsp;&nbsp;或使用其他方式登入:&nbsp;&nbsp;</p></font>
                    <v-divider></v-divider>
                </v-layout>
                </v-flex>
                <v-flex xs8 md8 lg8>
                    <v-btn block large>google</v-btn>
                    <br>
                    <v-btn block large>facebook</v-btn>
                </v-flex>
                <br>
            </v-card>
        </center>
        <bottom></bottom>
    </v-container>
</template>

<script>
import api from '../../store/api.js'
export default {
    data(){
        return{
            account:'',
            password:'',
        }
    },
    methods:{
        login(){
            api.login(this.account,this.password).then(res=>{
                localStorage.setItem('token', res.data.token)
                alert('登入成功')
                this.$router.push('/')
            }).catch(error=>{
                alert('帳號或密碼不正確')
                window.location.reload();
            })
        },
        register(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
            this.$router.push('/register')
        },
        forget(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
            this.$router.push('/')
        }
    },
    beforeMount(){

    }
}
</script>

<style>
.dividerText{
    color:darkgray
}
.loginText{
    color: white;
    height:100%;
    vertical-align:middle;
    display:inline-block;
}
</style>
