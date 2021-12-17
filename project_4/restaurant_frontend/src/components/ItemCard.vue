<script>
export default {
    data() {
        return {
        };
    },
    props: ['name', "price", "src", "item_id"]
}
</script>

<template>
    <div class="card rounded md:w-1/4  text-center mb-4 mx-4">
        <img class="w-full max-h-96" :src="src" alt="Food pic">
        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ name }}</div>
        </div>
        <div class="px-6 pt-4 pb-2 text-xl text-bold">
            <span>${{ price }}</span>
        </div>
        <router-link :to="{ name: 'MenuItem', params: { id: item_id } }">
            <button 
                class="border border-black-500 text-white font-bold py-2 px-4 rounded mr-8">
                Add
            </button>
        </router-link>
    </div>
</template>

<style scoped>
.card {
    background: burlywood;
}
button {
  background: #d3ad7f;
}
</style>