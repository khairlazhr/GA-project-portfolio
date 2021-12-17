<script>
import router from '../router';
import axios from "axios";
import axiosAuthenticated from "../axios"
export default {
    data() {
        return {
            results: {},
            count: 1
        };
    },
    methods: {
        increment() {
            this.count += 1
        },
        decrement() {
            if (this.count === 1) return
            this.count -= 1
        },
        handleSubmit() {
            const url_data=this.$route.params.id
            axiosAuthenticated({
                method: "post",
                url: "api/restaurant/menu/" + url_data,
                baseURL: 'http://localhost:3000/',
                data: {
                    "item_id": url_data,
                    "quantity": this.count
                }
            }).then(response => {
                router.push({ path: '/menu'})
            }).catch(error => {
                if (error.response.status ===  401) {
                router.push({ path: "login"})
                }                    
            })
        }
    },
    mounted() {
        const url_data=this.$route.params.id;
        axios({
            url: "api/restaurant/menu/" + url_data,
            method: 'get',
            baseURL: 'http://localhost:3000/'
        }).then(response => this.results = response.data);
    },
}
</script>

<template>
    <div class="py-6 md:py-12 h-screen">
        <div class="container py-6 h-full flex flex-row px-4 pb-8 mx-auto mb-8 justify-center">
            <div class="w-1/2 md:px-4 xl:px-6 mt-8 md:mt-0 shrink justify-end">
                <img :src="this.results.imageURL" alt="item-image" class="block h-full max-w-full rounded overflow-hidden">
            </div>
            <div class="card w-1/2 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
                <h1 class="mt-4 mb-8">{{ this.results.food_name }}</h1>
                <p class="text-gray-600 mb-8">{{this.results.description}}</p>
                <h1 class="mb-8">${{this.results.price}}</h1>
                <div class="flex flex-row mb-8 justify-center">
                    <button class="mx-4" @click="decrement">-</button>
                    <h1 class="mx-4">{{this.count}}</h1>
                    <button class="mx-4" @click="increment">+</button>
                </div>
                <form @submit.prevent="handleSubmit">
                    <button 
                    class="border border-black-500 text-white font-bold py-2 px-4 rounded mt-4">
                    Add
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    background: burlywood;
    font-size: 30px;
}

</style>