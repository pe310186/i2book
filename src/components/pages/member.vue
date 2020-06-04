<template>
    <v-container>
        <top></top>
        <br>
        <br>
        <v-card flat>
            <br>
            <v-layout row align-center justify-center>
                <font size="4">
                    <div v-bind:key=item.title v-for="item in list"> 
                        <p v-if="item.link==path">會員專區 >{{item.title}}</p>
                    </div>
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
                            <div v-if="account.fb != 1">
                                <font size="4">
                                    <p>帳號:&nbsp;{{account.account}}</p>
                                    <v-flex xs6><v-text-field label="名稱" v-model="account.name"></v-text-field></v-flex>
                                    <v-flex xs6><v-text-field label="email" v-model="account.email" hint="信箱修改後需要重新認證"></v-text-field></v-flex>
                                    <v-flex xs6><v-text-field label="手機" v-model="account.cellphone"></v-text-field></v-flex>
                                    <v-flex xs6><v-text-field label="地址" v-model="account.address"></v-text-field></v-flex>
                                </font>
                                <v-btn @click="save()"><v-icon>save</v-icon>&nbsp;保存</v-btn>
                            </div>
                            <div v-else>
                                <center>
                                    <br>
                                    <font size="5">
                                        <b>此為facebook帳戶因此無法修改會員資料</b>
                                    </font>
                                </center>
                            </div>
                        </v-card>
                        <v-card flat v-else-if="path=='password'">
                            <div v-if="account.fb !=1">
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
                            </div>
                            <div v-else>
                                <center>
                                    <br>
                                    <font size="5">
                                        <b>此為facebook帳戶因此無法修改密碼</b>
                                    </font>
                                </center>
                            </div>
                        </v-card>
                        <v-card flat v-else-if="path=='order'">
                            <v-data-table 
                                :headers="order.headers"
                                :items="order.list"
                                :search="order.search"
                                item-key="id"
                                :pagination.sync="order.detail.pagination"
                                class="elevation-1"
                            >
                                <template slot="headerCell" slot-scope="props">
                                    <v-tooltip bottom>
                                        <span slot="activator">
                                        {{ props.header.text }}
                                        </span>
                                        <span>
                                        {{ props.header.text }}
                                        </span>
                                    </v-tooltip>
                                </template>
                                <template slot="items" slot-scope="props">
                                    <td>{{props.item.id}}</td>
                                    <td>{{props.item.date}}</td>
                                    <td>{{order.shipState[props.item.ship_type].text}}</td>
                                    <td>{{props.item.money+order.shipState[props.item.ship_type].price}}</td>
                                    <td>{{state[props.item.state]}}</td>
                                    <td><v-btn small @click="orderDetail(props.item.id)">訂單內容</v-btn></td>
                                    <td><v-btn small @click="cancelOrder(props.item.id)">取消訂單</v-btn></td>
                                </template>
                            </v-data-table>
                            <br>
                            <v-divider></v-divider>
                            <v-dialog v-model="order.cancelDialog" width="300">
                                <v-card width="300" height="200">
                                    <center>
                                        <br>
                                        <br>
                                        <font size="4">確定要取消此訂單?</font>
                                    </center>
                                    <br>
                                    <br>
                                    <v-layout row justify-center>
                                        <v-btn @click="cancelOrderCheck(order.cancelID)">是</v-btn><v-btn @click="order.cancelDialog=false">否</v-btn>
                                    </v-layout>
                                    <br>
                                </v-card>
                            </v-dialog>
                            <br>
                            <v-card flat v-if="this.order.detail.list.length!=0">
                                <center><font size="4"><p>訂單內容</p></font></center>
                                <v-data-table 
                                    :headers="order.detail.headers"
                                    :items="order.detail.list"
                                    item-key="id"
                                    :pagination.sync="order.pagination"
                                    class="elevation-1"
                                >
                                <template slot="headerCell" slot-scope="props">
                                    <v-tooltip bottom>
                                        <span slot="activator">
                                        {{ props.header.text }}
                                        </span>
                                        <span>
                                        {{ props.header.text }}
                                        </span>
                                    </v-tooltip>
                                </template>
                                <template slot="items" slot-scope="props">
                                    <td @click="changeRoute(props.item.id)" class="pointer">{{props.item.title}}</td>
                                    <td @click="changeRoute(props.item.id)" class="pointer"><v-img contain :src='props.item.pic[0].url' width="180"></v-img></td>
                                    <td @click="changeRoute(props.item.id)" class="pointer">{{props.item.sell}}</td>
                                </template>
                                </v-data-table>
                            </v-card>
                        </v-card>
                        <v-card flat v-else-if="path=='like'">
                            <v-data-table 
                                    :headers="like.headers"
                                    :items="like.list"
                                    item-key="id"
                                    :pagination.sync="like.pagination"
                                    class="elevation-1"
                                >
                                <template slot="headerCell" slot-scope="props">
                                    <v-tooltip bottom>
                                        <span slot="activator">
                                        {{ props.header.text }}
                                        </span>
                                        <span>
                                        {{ props.header.text }}
                                        </span>
                                    </v-tooltip>
                                </template>
                                <template slot="items" slot-scope="props">
                                    <td @click="changeRoute(props.item.id)" class="pointer">{{props.item.title}}</td>
                                    <td @click="changeRoute(props.item.id)" class="pointer"><v-img contain :src='props.item.pic[0].url' width="180"></v-img></td>
                                    <td><v-btn  icon @click="cancelLike(props.item.id)"><v-icon>close</v-icon></v-btn></td>
                                </template>
                            </v-data-table>
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
            account:{},
            codeCheck:'',
            password:{
                oldPass:'',
                newPass:'',
                checkPass:''
            },
            state:['訂單處理中','已出貨','訂單完成'],
            order:{
                headers:[
                    {text:'訂單編號',align: 'left',sortable: false,value: 'id'},
                    {text:'下單日期',align: 'left',sortable: true,value: 'date'},
                    {text:'運送方式',align:'left',sortable:false,value:'ship_type'},
                    {text:'金額',align: 'left',sortable: false,value: 'price'},
                    {text:'貨品狀況',align: 'left',sortable: false,value: 'state'},
                    {text:'詳細',align: 'center',sortable: false,value: 'content'},
                    {text:'取消訂單',align: 'center',sortable: false,value: 'cancel'},
                ],
                shipState:[{type:0,text:'宅配+30',price:30}],
                pagination:{
                    sortBy: 'date',
                    rowsPerPage: 5
                },
                search:'',
                list:[],
                detail:{
                    headers:[
                        {text:'書名',align:'left',sortable:false,value:'title'},
                        {text:'封面',align:'center',sortable:false,value:'picture'},
                        {text:'優惠價',align:'left',sortable:false,value:'price'},
                    ],
                    list:[],
                },
                cancelDialog:false,
                cancelID:-1
            },
            like:{
                headers:[
                    {text:'標題',align:'left',sortable:false,value:'title'},
                    {text:'封面',align:'left',sortable:false,value:'picture'},
                    {text:'取消',align:'left',sortable:false,value:'cancel'}
                ],
                list:[],
                pagination:{
                    rowsPerPage: 5
                },
            }
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
        },
        cancelOrder(id){
            for(var i in this.order.list){
                if(this.order.list[i].id == id){
                    if(this.order.list[i].state==0){
                        this.order.cancelID = id
                        this.order.cancelDialog = true
                    }
                    else{
                        this.order.cancelID = -1
                        alert('此訂單無法取消')
                    }
                    break
                }
            }
        },
        cancelOrderCheck(id){
            let token = localStorage.getItem('token')
            let self = this
            api.cancelOrder(token,id).then(res=>{
                alert('取消成功')
            }).catch(error=>{
                alert('取消失敗')
            }).then(()=>{
                location.reload()
            })
        },
        orderDetail(id){
            this.order.detail.list = []
            for(var i in this.order.list){
                if(this.order.list[i].id == id){
                    var cartlists =  JSON.parse(this.order.list[i].cartlist)
                    for(var j in cartlists){
                        let self = this
                        api.getProduct(cartlists[j]).then(res=>{
                            if(res.data.product.pics!=0){
                                self.order.detail.list.push(res.data.product)
                            }
                            else{
                                let prod = res.data.product
                                let obj ={
                                        url:"http://210.61.46.101:8888//uploadedFile/null.png"
                                    }
                                prod.pic.push(obj)
                                self.order.detail.list.push(prod)
                            }
                        }).catch(error=>{
                        })
                    }
                    break
                }
            }
        },
        changeRoute(id){
            this.$router.push('/product/'+id)
        },
        cancelLike(id){
            let token = localStorage.getItem('token')
            api.cancelLike(token,id).then(()=>{
                alert('刪除成功')
                window.location.reload()
            }).catch(error=>{

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

        api.getOrder(token).then(res=>{
            self.order.list = res.data.orders
            for(var i in self.order.list){
                self.order.list[i].id = self.order.list[i].id.toString(16)
            }
        }).catch(error=>{
        })

        api.getLike(token).then(res=>{
            self.like.list = res.data.list
            
            console.log(self.like.list)
            for(var i in self.like.list){
                if(self.like.list[i].pics==0){
                    let obj = {
                        url:"http://210.61.46.101:8888//uploadedFile/null.png"
                    }
                    self.like.list[i].pics=1
                    self.like.list[i].pic.push(obj)
                }
            }
        }).catch(error=>{
        })
    }
}
</script>

<style>
.pointer {
    cursor: pointer;
}
</style>
