<script setup>
import { ref } from 'vue';
const number = ref(null)
const date = ref("")
</script>
<script>
export default {
    mounted() {
        axios.get("api/restaurant/menu")
            .then(response => this.results = response.data);
    }
}
</script>

<template>
    <div class="w-1/2 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3">
                    <label class="block text-lg font-bold text-white-700 mb-2" for="number">
                        No. of People
                    </label>
                    <input 
                        class="appearance-none block w-full text-black-700 rounded py-3 px-4 mb-3" id="number" type="number" v-model="number" placeholder="Indicate number of people">
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3">
                    <label class="block text-lg font-bold text-white-700 mb-2" for="password">
                        Input Date
                    </label>
                    <input 
                    class="appearance-none block w-full text-black-700 rounded py-3 px-4 mb-3" id="date" type="date" v-model="date" placeholder="*******">
                </div>
             </div>
        </form>
    </div>
</template>