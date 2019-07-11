<template>
    <v-container >
        <top></top>
        <br>
        <br>
        <v-layout row>
            <v-text-field placeholder="找好書..." solo  v-model="search"></v-text-field>
            <v-flex xs2 md2 lg2>
                <v-select attach :items="filterType" solo v-model="filter.type"></v-select>
            </v-flex>
            <v-btn icon color="green darken-3" @click="searching()"><v-icon color="white">search</v-icon></v-btn> 
        </v-layout>
        <v-layout row >
            <v-flex xs2>
                <ShoppingType :type="type"></ShoppingType>
            </v-flex>
            <v-flex xs10>
                <v-card>
                    <v-layout row wrap>
                        <v-flex xs2 v-for="n in 50" v-bind:key=n>
                            <v-card>
                                <v-layout column v-if="((page-1)*50)+n-1 < products.length">
                                    <center>
                                        <br>
                                        <p>{{products[n-1].title}}</p>
                                        <v-img contain height="100px" v-bind:src=products[n-1].pic[0].url></v-img>
                                        <br>
                                    </center>
                                </v-layout>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
        <bottom></bottom>
    </v-container>
</template>

<script>
import api from '../../store/api.js'
export default {
    props:['type'],
    data() {
        return {
            filterType:['全文','書名','作者','出版社'],
            search:'',
            filter:{
                type:'全文'
            },
            page:1,
            products:[],
            allProductItems:[],
            allTypeItems:[],
        }
    },
    methods:{
        searching(){
            if(this.search !=''){
                this.$router.push('/search/'+ this.filter.type + '/' + this.search)
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
    },
    beforeMount(){

        let self = this
        api.getAllProduct().then(res=>{
            self.allProductItems = res.data.products
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
            }).catch(error=>{
            })
        }).catch(error=>{
        })
    }
}
</script>

<style>

</style>
