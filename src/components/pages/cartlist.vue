<template>
    <v-container>
        <top :rerender=rerender></top>
        <br>
        <br>
        <br>
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
                            &nbsp;&nbsp;
                            <v-divider vertical></v-divider>
                        </v-layout>
                    </td>
                    <td>
                        <v-btn @click="deleteShoppingCartItem(props.item.id)"><v-icon>cancel</v-icon>刪除</v-btn>
                    </td>
                </template>
            </v-data-table>
            <br>
            <v-card color="green lighten-5">
                <br>
                <v-layout row>
                    <b><font size="4">&nbsp;&nbsp;&nbsp;總消費金額:</font></b>
                    <v-spacer></v-spacer>
                    <b><font size="4">共&nbsp;<font color="red">{{numOfList}}</font>&nbsp;件商品，總計&nbsp;NT$&nbsp;<font color="red">{{numOfPrice}}&nbsp;</font>元</font>&nbsp;&nbsp;&nbsp;</b>
                </v-layout>
                <v-layout row>
                    <v-spacer></v-spacer>
                    <b><font color="red">*不包含已售罄商品&nbsp;&nbsp;&nbsp;</font></b>    
                </v-layout>   
                <br>
                <center>
                    <v-btn round color="pink account-2" @click="checkOut()"><v-icon color="white">shopping_cart</v-icon><b><font color="white">我要結帳</font></b></v-btn>
                </center>
                <br>
            </v-card>
        </v-card>
        <v-dialog v-model="dialog" width="300px" persistent>
            <v-card color="grey lighten-5">
                <center style="background-color:#EEEEEE;">
                    <br>
                    <font size="4">
                        <p>確認視窗</p>
                    </font>
                    <v-divider></v-divider>
                </center>
                <br>
                <v-flex offset-xs1 xs10>
                <font size="4">
                    <p>購物車中有已售罄商品，已售罄商品將自動從購物車中移除</p>
                </font>
                </v-flex>
                <center>
                    <v-btn @click='removeNullProduct()' color="gray lighten-4">確定</v-btn>
                    <br>
                    <br>
                </center>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import api from '../../store/api.js'
export default {
    data() {
        return {
            pagination:{
                rowsPerPage: 10
            },
            headers:[
                {text:'書名',align:'center',sortable:false,value:'title'},
                {text:'封面',align:'center',sortable:false,value:'picture'},
                {text:'優惠價',align:'center',sortable:false,value:'price'},
                {text:'貨品狀況',align:"center",sortable:false,value:'state'},
                {text:'刪除',align:'center',sortable:false,value:'cancel'},
            ],
            shoppingCart:[],
            shoppingCartView:[],
            numOfPrice:0,
            numOfList:0,
            rerender:false,
            dialog:false,
        }
    },
    methods:{
        deleteShoppingCartItem(id){
            for(var i in this.shoppingCartView){
                if(this.shoppingCartView[i].id == id){
                    this.numOfPrice -= parseInt(this.shoppingCartView[i].sell)
                    this.shoppingCartView.splice(i,1)
                    localStorage.setItem('shoppingCart',JSON.stringify(this.shoppingCartView))
                    this.numOfList--
                    this.rerender = true
                    break
                }
            }
        },
        checkOut(){
            if(this.numOfList != this.shoppingCartView.length){
                this.dialog = true
                return
            }
            if(this.numOfList == 0){
               alert('購物車內沒有商品')
               return 
            }
            let token = localStorage.getItem('token')
            let self = this
            let loginFlag = true
            api.getAccount(token).then(res=>{
                if(res.data.account.mailCheck !='' ){
                    alert('帳號信箱驗證未通過')
                    loginFlag = false
                    this.$router.push('/member/information')
                    return
                }
            }).catch(error=>{
                alert('請先登入')
                loginFlag = false
                self.$router.push('./login')
            }).then(()=>{
                if(loginFlag == true){
                    this.$router.push('/checkout')
                }
            })
        },
        removeNullProduct(){
            for(var i=0;i<this.shoppingCartView.length;i++){
                if(this.shoppingCartView[i].state == false){
                    this.shoppingCartView.splice(i,1)
                    i--
                }
            }
            localStorage.setItem('shoppingCart',JSON.stringify(this.shoppingCartView))
            this.rerender = true
            this.dialog = false
            this.checkOut()
        }
    },
    beforeMount(){
        this.numOfPrice = 0
        this.numOfList = 0
        let self = this
        this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
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
    }
}
</script>

<style>
</style>
