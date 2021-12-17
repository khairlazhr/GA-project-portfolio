<script>
export default {
    data() {
        return {
            imgPostUrl: this.src
        };
    },
    props: ['name', "price", "src"]
}
</script>

<template>
    <div class="card rounded md:w-1/4  text-center mb-4 mx-4">
        <img class="w-full" src="'http://localhost:8000' + imgPostUrl" alt="Food pic">
        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ name }}</div>
        </div>
        <div class="px-6 pt-4 pb-2">
            <span>${{ price }}</span>
        </div>
    </div>
</template>

<style scoped>
.card {
    background: burlywood;
}
</style>