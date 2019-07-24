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
        <v-layout row >
            <v-flex xs2>
                <ShoppingType :type="type"></ShoppingType>
            </v-flex>
            <v-flex xs10>
                <br>
                <br>
                <p><v-icon color=#2E7D32>directions</v-icon>&nbsp;&nbsp;<font size="4">買二手書</font><font size="4" v-for="n in typeList.length" v-bind:key=n>   &nbsp;>&nbsp; {{typeList[n-1].name}} </font></p>
                <v-card>
                    <v-layout row wrap>
                        <v-flex xs2 v-for="n in 50" v-bind:key=n>
                            <v-card v-if="((page-1)*50)+n-1 < products.length" height="250px" flat :href="'#/product/' + products[n-1].id">
                                <v-layout column>
                                    <center>
                                    <br>
                                    <b>{{products[n-1].title}}</b>
                                    <v-img contain height="100px" width="90%" v-bind:src=products[n-1].pic[0].url></v-img>
                                    <br>
                                    <s>售價:{{products[n-1].price}}</s>
                                    <b><font size="4" color="red">&nbsp;{{products[n-1].sell}}</font></b>
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
    props:['type'],
    data() {
        return {
            filterType:[{text:'全文',value:0},{text:'書名',value:1},{text:'作者',value:2},{text:'出版社',value:3}],
            search:'',
            filter:{
                value:0
            },
            page:1,
            pages:1,
            products:[],
            allProductItems:[],
            allTypeItems:[],
            typeList:[],
        }
    },
    methods:{
        searching(){
            if(this.search !=''){
                this.$router.push('/search/'+ this.filter.value + '/' + this.search)
            }
        },
        getSubType(typeID){    
            let subType = []
            for(var i in this.allTypeItems){
                if(this.allTypeItems[i].super_id == typeID){
                    subType.push(this.allTypeItems[i])
                }
            }

            if(subType.length!=0){
                let tmpSubType = []
                for(var i in subType){
                    let tmpType = this.getSubType(subType[i].id)
                    tmpSubType  = tmpSubType.concat(tmpType)
                }
                subType = subType.concat(tmpSubType)
            }
            return subType
        },
        getSuperType(typeID){//generate typeList
            if(typeID!=0){
                for(var i in this.allTypeItems){
                    if(this.allTypeItems[i].id == typeID){
                        this.typeList.splice(0,0,this.allTypeItems[i])
                        this.getSuperType(this.allTypeItems[i].super_id)
                        return
                    }
                }
            }
        }
    },
    beforeMount(){
        let self = this
        api.getAllProduct().then(res=>{
            self.allProductItems = res.data.products.reverse()
            api.getAllProductType().then(res=>{
                self.allTypeItems = res.data.types
                let subType = self.getSubType(self.type)
                self.products = []
                for(var i in subType){
                    for(var j in self.allProductItems){
                        if(self.allProductItems[j].type == subType[i].id)
                            self.products.push(self.allProductItems[j])
                    }
                }
                for(var i in self.products)
                {
                    if(self.products[i].pics == 0){
                        let obj = {
                            url:"http://localhost:3000/uploadedFile/null.png"
                        }
                        self.products[i].pic.push(obj)
                    }
                }
                self.typeList = []
                self.getSuperType(self.type)
                self.pages = Math.ceil(self.products.length/50)
                self.page = 1
            }).catch(error=>{
            })
        }).catch(error=>{
        })
    }
}
</script>

<style>

</style>
