<script>
import router from '../router';
import axiosAuthenticated from "../axios"
export default {
    data() {
        return {
            results: [],
            count: 1,
            total: 0
        };
    },
    methods: {
        handleSubmit() {
            axiosAuthenticated({
                method: "post",
                url: "api/delivery/cart",
                baseURL: 'http://localhost:3000/',
                data: {
                    "item_id": url_data,
                    "quantity": this.count
                }
            }).then(response => {
                router.push({ path: ''})
            }).catch(error => {
                if (error.response.status ===  401) {
                router.push({ path: "login"})
                }                    
            })
        },
        calculateTotal() {
            for (const cartItem in this.results.cart_items) {
                this.total += cartItem.item.price*item.quantity
            }
            return this.total
        }
    },
    mounted() {
        axiosAuthenticated({
            url: "api/delivery/cart",
            method: 'get',
            baseURL: 'http://localhost:3000/'
        }).then(response => this.results = response.data);
    },
}
</script>

<template>
    <div class="py-6 md:py-12 h-screen">
        <div class="container py-6 h-full flex flex-row px-4 pb-8 mx-auto mb-8 justify-center">
            <div class="w-2/3 md:px-4 xl:px-6 mt-8 md:mt-0 flex flex-col justify-end">
                <h1>{{ this.results }}</h1>
            </div>
            <div class="card w-1/3 md:px-4 xl:px-6 mt-8 md:mt-0 text-center rounded">
                <p class="text-gray-600 mb-3">{{ calculateTotal() }}</p>
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