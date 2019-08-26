<template>
    <v-container>
        <top></top>
        <br>
        <br>
        <br>
        <v-data-table
        :headers="headers"
        :items="shoppingCart"
        item-key="id"
        :pagination.sync="pagination"
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
                <td>{{ props.item.title }}</td>
                <td>
                    <v-layout row>
                        <v-divider vertical></v-divider>
                        &nbsp;&nbsp;
                        <br><v-img contain :src='props.item.pic.url' width="60"></v-img><br>
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
                            <p>{{stateMap(props.item.id)}}</p>
                            <br>
                            <br>
                        </v-layout>
                        &nbsp;&nbsp;
                        <v-divider vertical></v-divider>
                    </v-layout>
                </td>
            </template>
        </v-data-table>
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
        }
    },
    methods:{
        stateMap(id){
            return new Promise((resolve,reject)=>{
                api.getProduct(id).then(res=>{
                }).catch(error=>{
                    
                })
            })
            
        }
    },
    beforeMount(){
        let self = this
        this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
        for(var i in this.shoppingCart){
            api.getProduct(this.shoppingCart[i].id).then(res=>{
                self.shoppingCart[i].state = true
            }).catch(error=>{
                self.shoppingCart[i].state = false
            })
        }
    }
}
</script>

<style>

</style>
