<template>
    <v-container>
        <br>
        <br>
        <v-layout align-content-start column>
            <v-treeview  :items="treeData">
                <template slot="label" slot-scope="props">
                    <a :href='"/#/shopping/" + props.item.id' @click="changeRoute(props.item.id)" style="text-decoration:none;"><v-btn block flat>{{props.item.name}}</v-btn></a>
                </template>
            </v-treeview>
        </v-layout>
    </v-container>
</template>

<script>
import api from '../store/api.js'
export default {
    props:['type'],
    data(){
        return {
            types:[],
            treeData:[],
        }
    },
    methods:{
        getType(id){

        },
        changeRoute(url){
            location.href = '#/shopping/' + url
            window.location.reload()
        },
        treeGen()
        {
            this.treeData = this.getSubTree(0)

        },
        getSubTree(superTypeID)
        {
            let subTree = []
            for(var i in this.types){
                if(this.types[i].super_id == superTypeID){
                    let obj = {
                    }
                    obj.name = this.types[i].name
                    obj.id = this.types[i].id
                    subTree.push(obj)
                }
            }

            if(subTree.length!=0){
                for(var i in subTree){
                    subTree[i].children = this.getSubTree(subTree[i].id)
                }
                return subTree
            }
        },
    },
    beforeMount(){
        let self = this
        api.getAllProductType().then(res=>{
            self.types = res.data.types
            self.treeGen()
        })
    }
}
</script>

<style>

</style>
