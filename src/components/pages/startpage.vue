<template>
    <v-container>
        <top></top>
        <br>
        <br>
        <v-layout row>
            <v-text-field placeholder="找好書..." solo  v-model="search"></v-text-field>
            <v-flex xs2 md2 lg2>
                <v-select attach :items="filterType" solo v-model="filter.value" item-text="text" item-value="value"></v-select>
            </v-flex>
            <v-btn icon color="green darken-3" @click="searching()"><v-icon color="white">search</v-icon></v-btn> 
        </v-layout>
        <v-carousel height="480px" hide-delimiters>
            <v-carousel-item v-for="(item,i) in carouselItems" :key="i" next-icon="mdi-dark mdi-arrow-right">
                <v-layout fill-height justify-center align-center>
                    <v-img :src="item.url" contain></v-img> 
                </v-layout>
            </v-carousel-item>
        </v-carousel>
        <br>
        <v-card>
            <v-layout row>
                <v-card-text>特價商品:</v-card-text>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap justify-space-around>
                <v-flex xs2 v-for="n in 5" v-bind:key=n>
                    <br>
                    <v-card v-if="n-1 < onSaleProducts.length" height="220px" :href="'#/product/' + onSaleProducts[n-1].id" color="grey lighten-5">
                        <v-layout column>
                            <center>
                                <br>
                                <br>
                                <b>{{onSaleProducts[n-1].title}}</b>
                                <v-img contain height="100px" width="90%" v-bind:src=onSaleProducts[n-1].pic[0].url></v-img>
                                <br>
                                <s>售價:{{onSaleProducts[n-1].price}}</s>
                                <b><font size="4" color="red">&nbsp;{{onSaleProducts[n-1].sell}}</font></b>
                            </center>
                        </v-layout>
                    </v-card>
                    <br>
                </v-flex>
            </v-layout>
        </v-card>
        <br>
        <v-card>
            <v-layout row>
                <v-card-text>最新上架:</v-card-text>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap justify-space-around>
                <v-flex xs2 v-for="n in 5" v-bind:key=n>
                    <br>
                    <v-card v-if="n-1 < lastestProducts.length" height="220px" :href="'#/product/' + lastestProducts[n-1].id">
                        <v-layout column>
                            <center>
                                <br>
                                <br>
                                <b>{{lastestProducts[n-1].title}}</b>
                                <v-img contain height="100px" width="90%" v-bind:src=lastestProducts[n-1].pic[0].url></v-img>
                                <br>
                                <s>售價:{{lastestProducts[n-1].price}}</s>
                                <b><font size="4" color="red">&nbsp;{{lastestProducts[n-1].sell}}</font></b>
                            </center>
                        </v-layout>
                    </v-card>
                    <br>
                </v-flex>
            </v-layout>
        </v-card>
        <br>
        <v-card>
            <v-card-text>熱賣推薦:</v-card-text>
            <v-divider></v-divider>
            <v-layout row wrap justify-space-around>
                <v-flex xs2 v-for="n in 5" v-bind:key=n>
                    <br>
                    <v-card v-if="n-1 < hotProducts.length" height="220px" :href="'#/product/' + hotProducts[n-1].id" style="background-color:rgba(255,255,255,0.5);">
                        <v-layout column>
                            <center>
                                <br>
                                <br>
                                <b>{{hotProducts[n-1].title}}</b>
                                <v-img contain height="100px" width="90%" v-bind:src=hotProducts[n-1].pic[0].url></v-img>
                                <br>
                                <s>售價:{{hotProducts[n-1].price}}</s>
                                <b><font size="4" color="red">&nbsp;{{hotProducts[n-1].sell}}</font></b>
                            </center>
                        </v-layout>
                    </v-card>
                    <br>
                </v-flex>
            </v-layout>
        </v-card>
        <br>
        <v-card>
            <v-card-text>百元有找:</v-card-text>
            <v-divider></v-divider>
            <v-layout row wrap justify-space-around>
                <v-flex xs2 v-for="n in 5" v-bind:key=n>
                    <br>
                    <v-card v-if="n-1 < hundProducts.length" height="220px" :href="'#/product/' + hundProducts[n-1].id">
                        <v-layout column>
                            <center>
                                <br>
                                <br>
                                <b>{{hundProducts[n-1].title}}</b>
                                <v-img contain height="100px" width="90%" v-bind:src=hundProducts[n-1].pic[0].url></v-img>
                                <br>
                                <s>售價:{{hundProducts[n-1].price}}</s>
                                <b><font size="4" color="red">&nbsp;{{hundProducts[n-1].sell}}</font></b>
                            </center>
                        </v-layout>
                    </v-card>
                    <br>
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
import api from '../../store/api.js'
export default {
    data(){
        return{
            carouselItems:[],
            filterType:[{text:'全文',value:0},{text:'書名',value:1},{text:'作者',value:2},{text:'出版社',value:3}],
            click:false,
            search:'',
            filter:{
                value: 0
            },
            onSaleProducts:[],//特價
            lastestProducts:[],//最新上架
            hotProducts:[],//熱買推薦
            hundProducts:[],//百元有找
        }
    },
    methods:{
        searching(){
            if(this.search !=''){
                this.$router.push('/search/'+ this.filter.value + '/' + this.search)
            }
        },
        shuffle(array){
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
            return array;
        }
    },
    beforeMount(){
        let self = this
        api.getCarousel().then(res=>{
            self.carouselItems = res.data.pics
        }).catch(error=>{
        })

        api.getOnsale().then(res=>{
            self.onSaleProducts = res.data.products
            for(var i in self.onSaleProducts){
                if(self.onSaleProducts[i].pics == 0){
                    let obj = {
                        url:"http://localhost:3000/uploadedFile/null.png"
                    }
                    self.onSaleProducts[i].pic.push(obj)
                }
            }
        }).catch(error=>{
        })

        api.getAllProduct().then(res=>{
            self.lastestProducts = res.data.products.reverse()
            
            for(var i in self.lastestProducts){
                if(self.lastestProducts[i].pics == 0){
                    let obj = {
                        url:"http://localhost:3000/uploadedFile/null.png"
                    }
                    self.lastestProducts[i].pic.push(obj)
                }
            }

            for(var i in res.data.products){
                if(parseInt(res.data.products[i].sell) < 100){
                    self.hundProducts.push(res.data.products[i])
                }
            }

            for(var i in self.hundProducts){
                if(self.hundProducts[i].pics == 0){
                    let obj = {
                        url:"http://localhost:3000/uploadedFile/null.png"
                    }
                    self.hundProducts[i].pic.push(obj)
                }
            }

            self.hundProducts  = self.shuffle(self.hundProducts)

        }).catch(error=>{
        })

        api.getHot().then(res=>{
            self.hotProducts = res.data.products
            console.log(res.data.products)

            for(var i in self.hotProducts){
                if(self.hotProducts[i].pics == 0){
                    let obj = {
                        url:"http://localhost:3000/uploadedFile/null.png"
                    }
                    self.hotProducts[i].pic.push(obj)
                }
            }
            self.hotProducts = self.shuffle(self.hundProducts)
            console.log(self.hotProducts)

        }).catch(error=>{
        })

    },
    
}
</script>

<style>
.context-menu {
    cursor: context-menu;
}
/* body {
    background: -webkit-linear-gradient(top,rgba(255, 241, 169, 0.7),rgba(176, 255, 127, 0.5));
    background: -o-linear-gradient(bottom,rgba(255, 241, 169, 0.7),rgba(176, 255, 127, 0.5));
    background: -moz-linear-gradient(bottom,rgba(255, 241, 169, 0.7),rgba(176, 255, 127, 0.5));
    background: linear-gradient(to bottom,rgba(255, 241, 169, 0.7),rgba(176, 255, 127, 0.5));
} */
</style>
