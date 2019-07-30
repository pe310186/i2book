<template>
    <v-container>
        <top></top>
        <br>
        <v-card flat>
            <br>
            <v-layout row align-center justify-center>
                <font size="4">
                    <p v-bind:key=item.title v-for="item in list" v-if="item.link==path">會員專區 >{{item.title}}</p>
                </font>
            </v-layout>
            <br>
            <v-layout row>
                <v-flex xs2>
                    <v-layout column >
                        <v-btn flat v-bind:key=item.title v-for="item in list" :href="item.hf" small ><v-icon></v-icon>{{item.title}}</v-btn>
                    </v-layout>
                </v-flex>
                <v-flex xs8 offset-xs1>
                    <v-layout column>
                        <v-card flat v-if="path=='information'">
                            <font size="4">
                                <p>名稱:&nbsp;{{account.name}}</p>
                                <p v-if="account.level=='0'">會員等級:&nbsp;一般會員</p>
                                <p v-else-if="account.level=='1'">會員等級:&nbsp;高級會員</p>
                                <p>帳號:&nbsp;{{account.account}}</p>
                                <p>
                                    <v-layout row align-center="">
                                        email:&nbsp;{{account.email}}
                                        &nbsp;&nbsp;&nbsp;
                                        <v-icon v-if="account.mailCheck==''">check_circle_outline</v-icon>
                                        <font size="3" color="darkgray" v-if="account.mailCheck==''">已通過認證</font>
                                    </v-layout>
                                </p>
                                <div v-if="account.mailCheck!=''">
                                    <v-layout row>
                                        <v-text-field label="信箱認證碼" outline v-model="codeCheck"></v-text-field>
                                        <v-btn @click="checkCode()">認證</v-btn>
                                        <v-btn @click="sendCode()"><v-icon>send</v-icon>重發驗證信</v-btn>
                                    </v-layout>    
                                </div>
                                <p>手機:&nbsp;{{account.cellphone}}</p>
                                <p>地址:&nbsp;{{account.address}}</p>
                            </font>
                        </v-card>
                        <v-card flat v-else-if="path=='update'">
                            <font size="4">
                                 <p>帳號:&nbsp;{{account.account}}</p>
                                <v-flex xs6><v-text-field label="名稱" v-model="account.name"></v-text-field></v-flex>
                                <v-flex xs6><v-text-field label="email" v-model="account.email" hint="信箱修改後需要重新認證"></v-text-field></v-flex>
                                <v-flex xs6><v-text-field label="手機" v-model="account.cellphone"></v-text-field></v-flex>
                                <v-flex xs6><v-text-field label="地址" v-model="account.address"></v-text-field></v-flex>
                            </font>
                            <v-btn @click="save()"><v-icon>save</v-icon>&nbsp;保存</v-btn>
                        </v-card>
                        <v-card flat v-else-if="path=='password'">
                            <v-flex xs5>
                                <v-text-field label="舊密碼" type='password' outline v-model="password.oldPass" :rules="[() => !!password.oldPass || '請輸入密碼']" required ref="password.oldPass"></v-text-field>
                            </v-flex>
                            <v-flex xs5>
                            <v-text-field label="新密碼" type='password' outline v-model="password.newPass" :rules="[() => !!password.newPass || '請輸入密碼']" required ref="password.newPass"></v-text-field>
                            </v-flex>
                            <v-flex xs5>
                            <v-text-field label="確認新密碼" type='password' outline v-model="password.checkPass" :rules="[() => !!password.checkPass || '請輸入密碼']" required ref="password.checkPass"></v-text-field>
                            </v-flex>
                            <v-btn @click="changePassword()"><v-icon>vpn_key</v-icon>&nbsp;確認變更</v-btn>
                        </v-card>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-card>
        <back-to-top text="back to top" visibleoffset="0">
            <v-btn icon large flat><v-icon large>keyboard_arrow_up</v-icon></v-btn>
        </back-to-top>
        <bottom></bottom>
    </v-container>
</template>

<script>
import api from '../../store/api'
export default {
    props:['path'],
    data(){
        return{
            list:[
                {link:'information',title:'會員資料',hf:"#/member/information"},
                {link:'update',title:'修改會員資料',hf:"#/member/update"},
                {link:'password',title:'修改密碼',hf:'#/member/password'},
                {link:'order',title:'訂單查詢',hf:"#/member/order"},
                {link:'like',title:'我的最愛',hf:"#/member/like"}
            ],
            account:null,
            codeCheck:'',
            password:{
                oldPass:'',
                newPass:'',
                checkPass:''
            },
        }
    },
    methods:{
        sendCode(){
            let token = localStorage.getItem('token')
            api.sendCode(token).then(res=>{
                alert('發送成功,請至信箱查收驗證碼')
            }).catch(error=>{
                alert('操作逾時')
                window.location.reload()
            })
        },
        checkCode(){
            let token = localStorage.getItem('token')
            api.checkCode(token,this.codeCheck).then(res=>{
                alert('認證成功')
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                window.location.reload()
            }).catch(error=>{
                alert('認證碼錯誤')
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                window.location.reload()
            })
        },
        save(){
            let token = localStorage.getItem('token')
            let self = this
            let obj={
                email:this.account.email,
                cellphone:this.account.cellphone,
                address:this.account.address,
                name:this.account.name,
            }
            api.updateAccount(token,this.account.id,obj).then(res=>{
                alert('保存成功')
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                self.$router.push('/member/information')
                window.location.reload()
            }).catch(error=>{
                alert('操作逾時')
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                window.location.reload()
            })
        },
        changePassword(){
            let token = localStorage.getItem('token')
            let self = this
            if(this.password.oldPass == '' || this.password.newPass == '' || this.password.checkPass == ''){
                alert('有選項未填')
            }
            if(this.newPass != this.checkPass){
                alert('2次密碼不相同')
            }
            api.changePass(token,this.account.id,this.password).then(res=>{
                alert('變更成功')
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                self.$router.push('/member/information')
                window.location.reload()
            }).catch(error=>{ 
                alert('舊密碼不正確')
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                window.location.reload()
            })
        }
    },
    beforeMount(){
        let token = localStorage.getItem('token')
        let self = this
        api.getAccount(token).then(res=>{
            self.account = res.data.account
        }).catch(error=>{
            localStorage.removeItem('token')
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
            self.$router.push('/login')
        })
    }
}
</script>

<style>

</style>
