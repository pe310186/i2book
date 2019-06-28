<template>
    <v-container>
        <v-card v-if="path=='about'" flat>
            <about></about>
        </v-card>
        <v-card v-if="path=='sell'" flat>
            <sell></sell>
        </v-card>
    </v-container>
</template>

<script>
export default {
    props:['path']
}
</script>

<style>

</style>
