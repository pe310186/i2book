<template>
    <v-container>
        <top></top>
        <v-layout row>
            <v-text-field placeholder="找好書..." solo  v-model="search"></v-text-field>
            <v-flex xs2 md2 lg2>
                <v-select attach :items="filterType" solo v-model="filter.type"></v-select>
            </v-flex>
            <v-btn icon color="green darken-3" @click="searching()"><v-icon color="white">search</v-icon></v-btn> 
        </v-layout>
        <v-carousel height="480px">
            <v-carousel-item v-for="(item,i) in carouselItems" :key="i" next-icon="mdi-dark mdi-arrow-right">
                <v-img :src="item.url" contain></v-img> 
            </v-carousel-item>
        </v-carousel>
        <br>
        <v-card height="300px">
            <v-card-text>特價商品:</v-card-text>
        </v-card>
        <br>
        <v-card height="300px">
            <v-card-text>最新上架:</v-card-text>
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
        searching(){
            if(this.search !=''){
                this.$router.push('/search/'+ this.filter.type + '/' + this.search)
            }
        }
    },
    beforeMount(){
        let self = this
        api.getCarousel().then(res=>{
            self.carouselItems = res.data.pics
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
