<template>
    <v-container>
        <top></top>
        <br>
        <br>
        <v-layout column>
            <v-card>
                <v-data-table
            :headers="headers"
            :items="shoppingCartView"
            item-key="id"
            :pagination.sync="pagination"
            :rowsPerPageItems="[10]"
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
                    <td><a  :href="'#/product/' + props.item.id" style="text-decoration:none;color:black;">{{ props.item.title }}</a></td>
                    <td>
                        <v-layout row>
                            <v-divider vertical></v-divider>
                            &nbsp;&nbsp;
                            <br><v-img contain :src='props.item.pic.url' width="80"></v-img><br>
                            &nbsp;&nbsp;
                            <v-divider vertical></v-divider>
                        </v-layout>
                    </td>
                    <td>
                        <s>售價:{{props.item.price}}</s>
                        <b><font size="3" color="red">優惠價:&nbsp;{{props.item.sell}}</font></b>
                    </td>
                    <td>
                        <v-layout row>
                            <v-divider vertical></v-divider>
                            &nbsp;&nbsp;
                            <v-layout column>
                                <br>
                                <br>
                                <center>
                                    <p v-if="props.item.state == true">可供貨</p>
                                    <p v-else><font color="red">已售罄</font></p>
                                </center>
                                <br>
                                <br>
                            </v-layout>
                        </v-layout>
                    </td>
                </template>
            </v-data-table>
            </v-card>
            <v-flex>
                <v-card>
                    <font size="4">
                        <center style="background-color:#66BB6A;">
                            <br>
                            <p>購買人資料</p>
                            <v-divider></v-divider>
                        </center>
                        <v-flex offset-xs2 xs8 align-center>
                            <br>
                            <br>
                            <v-text-field label="*姓名" outline v-model="sendData.name" :rules="[() => !!sendData.name || '請輸入姓名']" required></v-text-field>
                            <v-text-field label="*手機" outline v-model="sendData.cellphone" :rules="[() => !!sendData.cellphone || '請輸入手機']" required></v-text-field>
                            <v-text-field label="*地址" outline v-model="sendData.address" :rules="[() => !!sendData.address || '請輸入地址']" required></v-text-field>
                            <v-layout row>
                               <v-select label="運送方式" outline chips :items="selectItems" v-model="sendData.ship_type" attach item-value="type" item-text="text"></v-select>
                            </v-layout>
                            <br>
                        </v-flex>
                    </font>
                    <v-divider></v-divider>
                    <v-card color="green lighten-5">
                <br>
                <v-layout row>
                    <b><font size="4">&nbsp;&nbsp;&nbsp;總消費金額:</font></b>
                    <v-spacer></v-spacer>
                    <b><font size="4">共&nbsp;<font color="red">{{numOfList}}</font>&nbsp;件商品，總計&nbsp;NT$&nbsp;<font color="red">{{numOfPrice+selectItems[sendData.ship_type].price}}&nbsp;</font>元</font>&nbsp;&nbsp;&nbsp;</b>
                </v-layout>
                <v-layout row>
                    <v-spacer></v-spacer>
                </v-layout>   
                <br>
                <center>
                    <v-btn round color="pink account-2" @click="buy()"><v-icon color="white">shopping_cart</v-icon><b><font color="white">確認下單</font></b></v-btn>
                </center>
                <br>
            </v-card>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import api from '../../store/api.js'
export default {
    data(){
        return{
            pagination:{
                rowsPerPage: 10
            },
            headers:[
                {text:'書名',align:'center',sortable:false,value:'title'},
                {text:'封面',align:'center',sortable:false,value:'picture'},
                {text:'優惠價',align:'center',sortable:false,value:'price'},
                {text:'貨品狀況',align:"center",sortable:false,value:'state'},
            ],
            account:{},
            selectItems:[{type:0,text:'宅配+30',price:30}],
            sendData:{
                name:'',
                cellphone:'',
                address:'',
                ship_type:0,
            },
            numOfPrice:0,
            numOfList:0,
            shoppingCart:[],
            shoppingCartView:[],
        }
    },
    methods:{
        buy(){
            let self = this
            let token = localStorage.getItem('token')
            let shoppingData = this.sendData
            shoppingData.cartlist = []
            for(var i in this.shoppingCart){
                shoppingData.cartlist.push(this.shoppingCart[i].id)
            }
            api.buy(token,shoppingData).then(res=>{
                alert('購買成功')
                let shoppingCart = []
                localStorage.setItem('shoppingCart',JSON.stringify(shoppingCart))
                self.$router.push('/')
            }).catch(error=>{
                alert('有商品已售罄')
                self.$router.push('/cartlist')
            })
        }
    },
    beforeMount(){
        let self = this
        this.numOfPrice = 0
        this.numOfList = 0
        this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
        if(this.shoppingCart == null || this.shoppingCart.length==0)
        {
            alert('購物車內沒有商品')
            this.$router.push('./')
        }
        for(var i in this.shoppingCart){
            api.getProduct(this.shoppingCart[i].id).then(res=>{
                let obj = {}
                for(var i in self.shoppingCart)
                {
                    if(self.shoppingCart[i].id == res.data.product.id){
                        obj = self.shoppingCart[i]
                        if(res.data.product.number>=1){
                            obj.state = true
                            self.numOfList++
                            self.numOfPrice += parseInt(res.data.product.sell)
                        }
                        else
                            obj.state = false
                        break
                    }
                }
                self.shoppingCartView.push(obj)
            }).catch(error=>{
            })
        }

        let token = localStorage.getItem('token')
        api.getAccount(token).then(res=>{
            self.account = res.data.account
            self.sendData.name = res.data.account.name
            self.sendData.cellphone = res.data.account.cellphone
            self.sendData.address = res.data.account.address
        }).catch(error=>{
            alert('請先登入')
            self.$router.push('/login')
        })
               
    }
}
</script>

<style>

</style>
