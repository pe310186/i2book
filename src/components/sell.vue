<template>
    <v-container>
        <v-card flat>
            <center><font size="4"><b>賣二手書</b></font></center>
            <br>
            <div v-html="article"></div>
        </v-card>
    </v-container>
</template>

<script>
import api from '../store/api.js'
export default {
    data(){
        return{
            article:''
        }
    },
    beforeMount(){
        let self = this
        api.getArticle(2).then(res=>{
            self.article = res.data.article.content
            console.log(self.article)
        }).catch(error=>{
        })
    }
}
</script>

<style>

</style>
