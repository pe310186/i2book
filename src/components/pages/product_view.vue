<template>
    <v-container>
        <top></top>
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
                            <v-layout column>
                                <font size="4">
                                    <p>書名:{{product.title}}</p>
                                    <p>作者:{{product.authors}}</p>
                                    <p>出版社:{{product.publisher}}</p>
                                </font>
                                <v-layout row>
                                    <v-btn @click="buy()"><v-icon>shopping_cart</v-icon>加入購物車</v-btn>
                                    <v-btn @click="like()"><v-icon>favorite</v-icon>我有興趣</v-btn>
                                </v-layout>
                            </v-layout>
                        </v-flex>
                    </v-layout>
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
            console.log(self.product)
        })
    }
}
</script>

<style>

</style>
