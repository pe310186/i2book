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
        <v-layout row>
            <v-flex xs3>
                <shoppingType :type=0></shoppingType>
            </v-flex>
            <v-flex xs9>
                <br>
                <br>
                <p><v-icon color=#2E7D32>directions</v-icon>&nbsp;&nbsp;<font size="4">買二手書 > 搜尋 > {{searchname}}</font></p>
                <!-- <v-card>
                    <v-layout row wrap>
                        <v-flex xs2 v-for="n in 50" v-bind:key=n>
                            <v-card v-if="((page-1)*50)+n-1 < products.length" height="250px" flat>
                                <v-layout column>
                                    <center>
                                        <br>
                                        <p>{{products[n-1].title}}</p>
                                        <v-img contain height="100px" v-bind:src=products[n-1].pic[0].url></v-img>
                                        <br>
                                            <p>售價:{{products[n-1].sell}}</p>
                                    </center>
                                </v-layout>
                            </v-card>
                        </v-flex>
                    </v-layout>   
                    <center>                     
                        <v-pagination v-model="page" :length="pages" color=#2E7D32></v-pagination>
                        <br>
                        <br>
                    </center>
                </v-card> -->
                <v-card>
                    <br>
                    <br>
                    <v-layout row wrap justify-space-around>
                        <v-flex md3 sm4 v-for="n in numPerPage" v-bind:key=n>
                            <br>
                            <v-card v-if="((page-1)*numPerPage)+n-1 < products.length" height="250px"  :href="'#/product/' + products[n-1].id">
                                <v-layout column>
                                    <center>
                                    <br>
                                    <b>{{products[n-1].title}}</b>
                                    <br>
                                    <br>
                                    <v-img contain height="100px" width="90%" v-bind:src=products[n-1].pic[0].url></v-img>
                                    <br>
                                    <s>售價:{{products[n-1].price}}</s>
                                    <b><font size="4" color="red">&nbsp;{{products[n-1].sell}}</font></b>
                                </center>
                                </v-layout>
                            </v-card>
                            <br>
                        </v-flex>
                    </v-layout>
                    <v-flex offset-xs1 xs10>
                        <v-divider></v-divider>
                    </v-flex>
                    <br>
                    <center>                     
                        <v-pagination v-model="page" :length="pages" color=#2E7D32></v-pagination>
                        <br>
                        <br>
                    </center>
                </v-card>
            </v-flex>
        </v-layout>
        <bottom></bottom>
    </v-container>
</template>

<script>
import api from '../../store/api'
export default {
    props:['type','searchname'],
    data(){
        return{
            filterType:[{text:'全文',value:0},{text:'書名',value:1},{text:'作者',value:2},{text:'出版社',value:3}],
            page:1,
            pages:1,
            search:'',
            numPerPage:40,
            filter:{
                value:0
            },
            products:[],
            
        }
    },
    methods:{
        searching(){
            if(this.search !=''){
                this.$router.push('/search/'+ this.filter.value + '/' + this.search)
                window.location.reload()
            }
        }
    },
    beforeMount(){
        if(this.type == ''){
            this.$router.push('/')
        }
        let self = this
        api.search(this.type,this.searchname).then(res=>{
            self.products = res.data.products
            console.log(self.products)
            for(var i in self.products)
                {
                    if(self.products[i].pics == 0){
                        let obj = {
                            url:"http://localhost:3000/uploadedFile/null.png"
                        }
                        self.products[i].pic.push(obj)
                    }
                }
                self.pages = Math.ceil(self.products.length/50)
                self.page = 1
        }).catch(error=>{
            alert('查無結果')
            self.$router.push('/')
        })
        
    }
}
</script>

<style>

</style>
