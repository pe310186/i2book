<template>
    <v-container>
        <top></top>
        <br>
        <br>
        <middle :path="path"></middle>
        <bottom></bottom>
    </v-container>
</template>

<script>
export default {
    props:['path']
}
</script>

<style>

</style>
