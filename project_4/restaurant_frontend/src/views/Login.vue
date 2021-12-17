<script setup>
import { ref, computed } from 'vue'
import axios from "axios";
import router from '../router';

const email = ref('')
const password = ref('')

const emit = defineEmits('login')

const isEmailPasswordPresent= computed(() => email.value.length > 0 && password.value.length > 0)

function handleSubmit() {
    axios({
        method: "post",
        url: "api/accounts/login",
        data: {
            "email": email.value,
            "password": password.value
        }
    }).then(response => {
        localStorage.setItem("access", response.data["access"]);
        localStorage.setItem("refresh", response.data["refresh"]);
        emit('login', response.data["first_name"])
        router.push({ path: '/'})
    })
    // .catch(error => {
    //     console.log(error.response.data)
    // })
}

</script>


<template>
    <div class="w-full h-screen flex flex-col justify-start items-center">
        <form @submit.prevent="handleSubmit" class="w-full max-w-lg mt-6">
            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3">
                <label class="block text-lg font-bold text-white-700 mb-2" for="email">
                    Email
                </label>
                <input 
                class="appearance-none block w-full text-black-700 rounded py-3 px-4 mb-3" id="email" type="email" v-model="email" placeholder="Email">
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3">
                <label class="block text-lg font-bold text-white-700 mb-2" for="password">
                    Password
                </label>
                <input 
                class="appearance-none block w-full text-black-700 rounded py-3 px-4 mb-3" id="password" type="password" v-model="password" placeholder="*******">
                </div>
            </div>
            <div class="flex items-center justify-between">
                <button 
                :disabled="!isEmailPasswordPresent"
                class="hover:outline text-white font-bold py-2 px-4 rounded mr-8">
                Login
                </button>
                <router-link to="/bookings">
                    <span 
                    class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-burlywood-800">
                    Forgot your password?
                    </span>
                </router-link>
            </div>
        </form>
    </div>
</template>


<style scoped>
input {
    color: black
}
button {
  background: #d3ad7f;
}
</style>
