<template>
    <v-container>
        <top></top>
        <bottom></bottom>
    </v-container>
</template>

<script>
import api from '../../store/api'
export default {
    props:['type','searchname'],
    data(){
        return{
            products:[],
        }
    },
    methods:{

    },
    beforeMount(){
        if(this.type == ''){
            this.$router.push('/')
        }
        let self = this
        api.search(this.type,this.searchname).then(res=>{
            this.products = res.data.products
        }).catch(error=>{
            alert('查無結果')
            self.$router.push('/')
        })
    }
}
</script>

<style>

</style>
