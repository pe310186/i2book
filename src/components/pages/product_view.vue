<template>
    <v-container>
        <top></top>
        <v-layout row>
            <v-text-field placeholder="找好書..." solo  v-model="search"></v-text-field>
            <v-flex xs2 md2 lg2>
                <v-select attach :items="filterType" solo v-model="filter.value" item-text="text" item-value="value"></v-select>
            </v-flex>
            <v-btn icon color="green darken-3" @click="searching()"><v-icon color="white">search</v-icon></v-btn> 
        </v-layout>
        <v-layout row>
            <v-flex xs2>
            <shoppingType :type = 0></shoppingType>
            </v-flex>
            <v-flex xs10>
                <br>
                <br>
                <v-card>
                    <br>
                    <br>
                    <v-layout row>
                        <v-flex xs4 offset-xs1>
                            <v-carousel :cycle=Cycle hide-delimiters height="400px">
                                <v-carousel-item v-for="(item,i) in product.pic" :key="i" next-icon="mdi-dark mdi-arrow-right">
                                    <v-layout align-center fill-height justify-center>
                                    <v-img :src="item.url" contain></v-img> 
                                    </v-layout>
                                </v-carousel-item>
                            </v-carousel>
                        </v-flex>
                        <v-flex xs4 offset-xs1>
                            <br>
                            <v-layout column>
                                <font size="4">
                                    <p>書名:&nbsp;{{product.title}}</p>
                                    <p>作者:&nbsp;{{product.authors}}</p>
                                    <p>出版社:&nbsp;{{product.publisher}}</p>
                                    <p>ISBN:&nbsp;{{product.isbn}}</p>
                                    <p>運送方式:&nbsp;</p>
                                    <p>定價:&nbsp;NT$&nbsp;<s>{{product.price}}</s></p>
                                    <p style="color:red;"><b>優惠價:&nbsp;NT$&nbsp;{{product.sell}}</b></p>
                                </font>
                                <br>
                                <v-layout row>
                                    <v-btn @click="buy()"><v-icon>shopping_cart</v-icon>加入購物車</v-btn>
                                    <v-btn @click="like()"><v-icon color="red">favorite</v-icon>我有興趣</v-btn>
                                </v-layout>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <br>
                    <br>
                    <v-flex xs10 offset-xs1>
                        <v-divider></v-divider>
                    </v-flex>
                    <br>
                    <v-flex offset-xs1 xs10>
                        <font size="4">
                            <p><b>內容簡介:</b></p>
                            <p style="word-break: break-all;">{{product.description}}</p>
                            <p><b>商品備註:</b></p>
                            <p style="word-break: break-all;">{{product.ps}}</p>
                        </font>
                    </v-flex>
                    <v-flex xs10 offset-xs1>
                        <v-divider></v-divider>
                    </v-flex>
                    <br>
                    <v-flex offset-xs1 xs10>
                        <font size="4"><p>其他二手書推薦:</p></font>
                        <v-layout row wrap justify-space-around>
                            <v-flex xs2 v-for="n in 5" v-bind:key=n>
                                <v-card v-if="n-1 < otherProducts.length" height="250px" flat :href="'#/product/' + otherProducts[n-1].id">
                                    <v-layout column>
                                        <center>
                                            <br>
                                            <b>{{otherProducts[n-1].title}}</b>
                                            <v-img contain height="100px" width="90%" v-bind:src=otherProducts[n-1].pic[0].url></v-img>
                                            <br>
                                            <s>售價:{{otherProducts[n-1].price}}</s>
                                            <b><font size="4" color="red">&nbsp;{{otherProducts[n-1].sell}}</font></b>
                                        </center>
                                    </v-layout>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <br>
                </v-card>
            </v-flex>
        </v-layout>
        <bottom></bottom>
    </v-container>
</template>

<script>
import api from '../../store/api.js'
export default {
    props:['id'],
    data(){
        return{
            product:{
                pic:[],
            },
            Cycle:false,
            filterType:[{text:'全文',value:0},{text:'書名',value:1},{text:'作者',value:2},{text:'出版社',value:3}],    
            search:'',
            filter:{
                value: 0
            },
            otherProducts:[],
        }
    },
    methods:{
        buy(){

        },
        like(){

        }
    },
    beforeMount(){
        let self = this
        api.getProduct(this.id).then(res=>{
            self.product = res.data.product
            if(self.product.pics == 0){
                let obj = {
                    url:"http://localhost:3000/uploadedFile/null.png"
                }
                self.product.pic.push(obj)
            }
        }).catch(error=>{
        })

        api.getAllProduct().then(res=>{
            self.otherProducts = []
            for(var i =0; i<5;i++){
                if(i >= res.data.products.length)
                    break
                self.otherProducts.push(res.data.products[Math.floor(Math.random()*res.data.products.length)])
            }
            for(var i =0; i < self.otherProducts.length;i++){
                if(self.otherProducts[i].pics == 0){
                    let obj = {
                        url:"http://localhost:3000/uploadedFile/null.png"
                    }
                    self.otherProducts[i].pic.push(obj)
                }
            }
        }).catch(error=>{
        })
    }
}
</script>

<style>

</style>
