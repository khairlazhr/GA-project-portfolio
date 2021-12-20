<script setup>
import { ref, computed } from 'vue'
import axios from "axios";
import router from '../router';

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const firstName = ref("")
const lastName = ref("")
const mobileNumber = ref("")
const deliveryAddress = ref('')
const postalCode = ref("")
const unitNo = ref("")

const isEmailAndPasswordPresent = computed(() => email.value.length > 0 && password.value.length > 0)

function handleSubmit() {
    axios({
        method: "post",
        url: "api/accounts/signup",
        data: {
            "email": email.value,
            "password": password.value,
            "confirm_password": confirmPassword.value,
            "first_name": firstName.value,
            "last_name": lastName.value,
            "mobile_number": mobileNumber.value,
            "address": deliveryAddress.value,
            "postal_code": postalCode.value,
            "unit_no": unitNo.value
        }
    }).then(response => {
        router.push({ path: '/'})
    })
}
</script>

<template>
    <div class="w-full min-h-screen flex flex-col mb-auto items-center">
        <form @submit.prevent="handleSubmit"  class="w-full max-w-lg mt-6">
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
            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3">
                <label class="block text-lg font-bold text-white-700 mb-2" for="confirmPassword">
                    Confirm Password
                </label>
                <input 
                class="appearance-none block w-full text-black-700 rounded py-3 px-4 mb-3" id="confirmPassword" type="password" v-model="confirmPassword" placeholder="Please enter your password again.">
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block text-white-700 text-lg font-bold mb-2" for="grid-first-name">
                        First Name
                    </label>
                    <input class="appearance-none block w-full border border-red-500 rounded py-3 px-4 mb-3 " id="grid-first-name" type="text" v-model="lastName" placeholder="Khairul">
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block text-white-700 text-lg font-bold mb-2" for="grid-last-name">
                        Last Name
                    </label>
                    <input class="appearance-none block w-full border border-gray-200 rounded py-3 px-4" id="grid-last-name" type="text" v-model="firstName" placeholder="Azhar">
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3">
                <label class="block text-lg font-bold text-white-700 mb-2" for="deliveryAddress">
                    Delivery Address
                </label>
                <input 
                class="appearance-none block w-full text-black-700 rounded py-3 px-4 mb-3" id="deliveryAddress" type="text" v-model="deliveryAddress" placeholder="Please enter your address.">
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3">
                <label class="block text-lg font-bold text-white-700 mb-2" for="mobileNumber">
                    Mobile Number
                </label>
                <input 
                class="appearance-none block w-full text-black-700 rounded py-3 px-4 mb-3" id="mobileNumber" type="text" v-model="mobileNumber" placeholder="Mobile Number">
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block text-white-700 text-lg font-bold mb-2" for="postalCode">
                        Postal Code
                    </label>
                    <input class="appearance-none block w-full border border-red-500 rounded py-3 px-4 mb-3 " id="postalCode" type="text" v-model="postalCode" placeholder="Postal Code">
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block text-white-700 text-lg font-bold mb-2" for="unitNo">
                        Unit No.
                    </label>
                    <input class="appearance-none block w-full border border-gray-200 rounded py-3 px-4" id="unitNo" type="text" v-model="unitNo" placeholder="Unit No.">
                </div>
            </div>
            <div class="flex self-end">
                <button 
                class="hover:outline text-white font-bold py-2 px-4 rounded mr-8">
                Sign Up!
                </button>
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
