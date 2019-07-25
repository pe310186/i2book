<template>
    <v-container>
        <v-card flat>
            <center><font size="4"><b>關於我們</b></font></center>
            <br>
            <div v-html="article" style="word-break: break-all;"></div>
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
        api.getArticle(1).then(res=>{
            self.article = res.data.article.content
        }).catch(error=>{
        })
    }
}
</script>

<style>

</style>
