<template>
    <v-container>
        <top></top>
        <br>
        <br>
        <v-layout row>
            <v-flex xs5 md5 lg5>
                <v-layout column>
                    <v-card ref="form">
                        <center>
                            <v-card color="green accent-1" height="60px">
                                <br>
                                <b><font size="5" class="context-menu">會員註冊</font></b>
                            </v-card>
                            <br>
                            <br>
                            <v-flex xs10 md10 lg10>
                                <v-text-field label="姓名"  outline v-model="name" :rules="[() => !!name || '請輸入姓名']" required ref="name"></v-text-field>
                                <v-text-field label="帳號" :error-messages="errorMessages1" outline v-model="account" :rules="[() => !!account || '請輸入帳號']" required ref="account"></v-text-field>
                                <v-text-field label="密碼" outline v-model="password" type='password' :rules="[() => !!password || '請輸入密碼']" required ref="password"></v-text-field>
                                <v-text-field label="確認密碼" outline v-model="passwordCheck" type='password' :rules="[() => !!passwordCheck || '請輸入確認密碼']" required ref="passwordCheck"></v-text-field>
                                <v-text-field label="電子信箱" :error-messages="errorMessages2" outline v-model="email" :rules="[() => !!email || '請輸入電子信箱']" required ref="email"></v-text-field>
                                <v-layout row>
                                    <v-text-field label="驗證碼" outline v-model="code"></v-text-field><div class="verify-box pointer" @click="createCode()"><identify :identifyCode="checkCode"></identify></div>
                                </v-layout>
                                <v-checkbox v-model="agreement" label="我同意i2books服務條款" hide-details></v-checkbox>
                                <v-checkbox v-model="newsletter" label="我願意收到i2books電子報及相關優惠通知" hide-details></v-checkbox>
                                <br>
                                <center>
                                    <v-btn @click="register()">註冊</v-btn>
                                </center>
                                <br>
                                <v-layout row align-center>
                                    <v-divider></v-divider>
                                    <font size="4" class="context-menu"><p class="dividerText">&nbsp;&nbsp;您也可以使用以下方式登入:&nbsp;&nbsp;</p></font>
                                    <v-divider></v-divider>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs10 md10 lg10 offset-xs1 offset-md1 offset-lg1>
                                        <v-btn>facebook</v-btn>
                                        <v-btn>google</v-btn>
                                    </v-flex>
                                </v-layout>
                                <br>
                            </v-flex>
                        </center>
                    </v-card>
                </v-layout>
            </v-flex>
            <v-flex offset-xs1 offset-md1 offset-lg1 xs7 md7 lg7>
                <v-card>
                    <br>
                    <center>
                        <b><font size="6" class="context-menu">個人資料授權/取得使用同意書</font></b>
                    </center>
                    <v-flex xs10 md10 lg10 offset-xs1 offset-md1 offset-lg1>
                        <font size="4" class="context-menu"><br><br>
                            本人為申請參加杏文勤閱國際有限公司實體店面(一手茶飲/二手書供需流通)會員及/或加入網路會員，同意提供貴單位蒐集保存、電腦處理、利用本人之個人資料進行單向/雙向互動，並同意以下各條款:<br><br>
                            1.貴單位取得本人之個人資料，目的在於個人資料保護法及相關法令之規定下，為提供良好服務及業務之必要範圍內，蒐集、處理及利用本人之個人資料。<br><br>
                            2.本人可依需要提供以下資料:姓名、生日、聯絡地址、電話、電子信箱、身分證字號等相關資料或其他得以直接或間接辨別本人個人之資料。<br><br>
                            3.本人同意貴單位以本人所提供的個人資料確認身份、進行聯絡、提供相關服務及資訊，包括各種活動舉辦通知、電子報、Line生活圈、或EDM發送、特別活動、獎項兌換等用途，以及其他隱私權保護政策規範之使用方式。<br><br>
                            4.本人同意如後「附件」本人申請會員填用之表格資料。<br><br>
                            5.本人可依個人資料保護法，就本人資料向貴單位(1)請求查詢或閱覽、(2)請求製給複製本、(3)請求補充或更正、(4)請求停止蒐集、處理及利用、(5)請求刪除<br><br>
                            6.同意貴單位利用處理本人的個人資料之期間為加入會員起，至本人主動告知刪除個人資料止；利用本人資料的地區僅限於國境內。<br><br>
                            此致<br><br>
                            杏文勤閱國際有限公司(及如下關係企業)<br>
                            昶特有限公司(www.5118.com.tw)<br>
                            亞帝國際有限公司(www.5117.com.tw)<br><br>
                        </font>
                    </v-flex>
                </v-card>
            </v-flex>
        </v-layout>
        <back-to-top text="back to top" visibleoffset="0">
            <v-btn icon large flat><v-icon large>keyboard_arrow_up</v-icon></v-btn>
        </back-to-top>
        <bottom></bottom>
    </v-container>
</template>

<script>
import api from '../../store/api.js'
export default {
    data(){
        return{
            name:null,
            account:null,
            password:null,
            passwordCheck:null,
            email:null,
            code:'',
            checkCode:'',
            agreement:null,
            newsletter:null,
            formHasErrors: false,
            errorMessages1: '',
            errorMessages2: '',
        }
    },
    watch: {
        'account' (newAccount,oldAccount){
            api.checkAccount(newAccount).then(()=>{
                this.errorMessages1 = '此帳號已被使用'
            }).catch(error=>{
                this.errorMessages1 = ''
            })
        },
        'email' (newEmail,oldMail){
            api.checkEmail(newEmail).then(()=>{
                this.errorMessages2 = '此信箱已被使用'
            }).catch(error=>{
                this.errorMessages2 = ''
            })
        }
    },
    computed:{
        form(){
            return {
                name: this.name,
                account: this.account,
                password: this.password,
                passwordCheck: this.passwordCheck,
                email: this.email
            }
        }
    },
    methods:{
        createCode(){
            var code = "";    
            var codeLength = 4;  
            var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',   
                        'S','T','U','V','W','X','Y','Z');  
            for(var i = 0; i < codeLength; i++) {  
                var index = Math.floor(Math.random()*36);   
                code += random[index]; 
            }   
            this.checkCode = code;
        },
        register(){
            const checkList=['name','account','password','passwordCheck','email','code']

            this.formHasErrors = false
            Object.keys(this.form).forEach(f => {
                if (!this.form[f] || this.form[f]=='') {
                    this.formHasErrors = true
                }
                this.$refs[f].validate(true)
            })

            for(var i of checkList){
                if(this[i] == '' || this[i]==null){
                    alert("有選項未填寫")
                    document.body.scrollTop = 0
                    document.documentElement.scrollTop = 0
                    this.createCode()
                    return
                }
            }
            
            if(this.password !== this.passwordCheck){
                alert("2次密碼不相同")
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                this.createCode()
                return
            }

            if(this.errorMessages1 !='' || this.errorMessages2 !=''){
                alert("帳號或信箱已被使用")
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                this.createCode()
                return
            }

            if(this.checkCode !== this.code){
                alert("驗證碼錯誤")
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                this.createCode()
                return
            }
            if(this.agreement == null){
                alert("請同意會員服務條款")
                return
            }
            let obj = {
                name: this.name,
                account : this.account,
                password: this.password,
                email: this.email,
                newsletter: this.newsletter
            }
            api.register(obj).then(()=>{
                alert("註冊成功")
                window.location.reload();
            }).catch(error=>{
                alert("操作逾時")
                window.location.reload();
            })
        }
    },
    beforeMount(){
        this.createCode()
    }
}
</script>

<style>
.pointer{
    cursor: pointer;
}
.context-menu {
    cursor: context-menu;
}
</style>
