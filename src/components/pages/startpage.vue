<template>
    <v-container>
        <top></top>
        <v-layout row>
            <v-text-field placeholder="找好書..." solo  v-model="search"></v-text-field>
            <v-flex xs2 md2 lg2>
                <v-select attach :items="filterType" solo v-model="filter.type"></v-select>
            </v-flex>
            <v-btn icon color="green darken-3"><v-icon color="white">search</v-icon></v-btn> 
        </v-layout>
        <v-carousel>
            <v-carousel-item v-for="i in carouselItems" :key="i" :src="carouselItems[i-1].src"></v-carousel-item>
        </v-carousel>
        <br>
        <v-card height="300px">
            <v-card-text>特價商品:</v-card-text>
        </v-card>
        <br>
        <v-card height="300px">
            <v-layout row>
                &nbsp;
                <v-btn light small icon><v-icon>arrow_forward</v-icon></v-btn>
                <v-card-text>最新上架:</v-card-text>
            </v-layout>
        </v-card>
        <br>
        <v-card height="300px">
            <v-card-text>熱賣推薦:</v-card-text>
        </v-card>
        <bottom></bottom>
    </v-container>
</template>

<script>
import api from '../../store/api.js'
export default {
    data(){
        return{
            carouselItems:[],
            filterType:['全文','書名','作者','出版社'],
            click:false,
            search:'',
            panel:false,
            filter:{
                type:'全文'
            },
        }
    },
    methods:{
    },
    created() {
        this.$nextTick(() => {
        document.oncontextmenu = new Function("event.returnValue=false");
        document.onselectstart = new Function("event.returnValue=false");
      });
    },
    beforeMount(){

    },
    
}
</script>

<style>
.context-menu {
    cursor: context-menu;
}
</style>
