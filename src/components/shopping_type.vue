<template>
    <v-container>
        <v-layout column v-for="n in types" v-bind:key=n.id>
            <v-btn :href="'#/shopping/' + n.id" @click="changeRoute(n.id)">{{n.name}}</v-btn>
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
            typeItems:[],
        }
    },
    methods:{
        getType(id){

        },
        changeRoute(url){
            location.href = '#/shopping/' + url
            window.location.reload()
        }
    },
    beforeMount(){
        let self = this
        api.getAllProductType().then(res=>{
            self.types = []
            for(var i in res.data.types){
                if(res.data.types[i].super_id == self.type){
                    self.types.push(res.data.types[i])
                }
            }
            if(self.type != 0){
                let obj  = {
                    name:'回上層',
                    id:null,
                }
                for(var i in res.data.types){
                    if(res.data.types[i].id == self.type){
                        obj.id = res.data.types[i].super_id
                    }
                }
                if(obj.id == null)
                obj.id = 0
                self.types.push(obj)
            }
        })
    }
}
</script>

<style>

</style>
