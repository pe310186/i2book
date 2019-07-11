<template>
    <v-container>
        <top></top>
        <v-layout row>
            <v-flex xs2>
            <shoppingType :type=0></shoppingType>
            </v-flex>
            <v-flex xs10></v-flex>
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
            product:null,

        }
    },
    methods:{

    },
    beforeMount(){

    }
}
</script>

<style>

</style>
