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
        <v-carousel height="480px" hide-delimiters>
            <v-carousel-item v-for="(item,i) in carouselItems" :key="i" next-icon="mdi-dark mdi-arrow-right">
                <v-layout fill-height justify-center align-center>
                    <v-img :src="item.url" contain></v-img> 
                </v-layout>
            </v-carousel-item>
        </v-carousel>
        <br>
        <v-card height="300px">
            <v-card-text>特價商品:</v-card-text>
                <v-layout row wrap>
                    <v-flex xs2 v-for="n in 5" v-bind:key=n>
                        <v-card v-if="n-1 < onSaleProducts.length" height="250px" flat :href="'#/product/' + onSaleProducts[n-1].id">
                            <v-layout column>
                                <center>
                                    <br>
                                    <b>{{onSaleProducts[n-1].title}}</b>
                                    <v-img contain height="100px" width="90%" v-bind:src=onSaleProducts[n-1].pic[0].url></v-img>
                                    <br>
                                    <s>售價:{{onSaleProducts[n-1].price}}</s>
                                    <b><font size="4" color="red">&nbsp;{{onSaleProducts[n-1].sell}}</font></b>
                                </center>
                            </v-layout>
                        </v-card>
                    </v-flex>
                </v-layout>
        </v-card>
        <br>
        <v-card height="300px">
            <v-card-text>最新上架:</v-card-text>
            <v-layout row wrap>
                    <v-flex xs2 v-for="n in 5" v-bind:key=n>
                        <v-card v-if="n-1 < lastestProducts.length" height="250px" flat :href="'#/product/' + lastestProducts[n-1].id">
                            <v-layout column>
                                <center>
                                    <br>
                                    <b>{{lastestProducts[n-1].title}}</b>
                                    <v-img contain height="100px" width="90%" v-bind:src=lastestProducts[n-1].pic[0].url></v-img>
                                    <br>
                                    <s>售價:{{lastestProducts[n-1].price}}</s>
                                    <b><font size="4" color="red">&nbsp;{{lastestProducts[n-1].sell}}</font></b>
                                </center>
                            </v-layout>
                        </v-card>
                    </v-flex>
                </v-layout>
        </v-card>
        <br>
        <v-card height="300px">
            <v-card-text>熱賣推薦:</v-card-text>
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
            onSaleProducts:[],
            lastestProducts:[],
        }
    },
    methods:{
        searching(){
            if(this.search !=''){
                this.$router.push('/search/'+ this.filter.value + '/' + this.search)
            }
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
        }).catch(error=>{
        })
    },
    
}
</script>

<style>
.context-menu {
    cursor: context-menu;
}
</style>
