<template>
  <header class="header pt-5 border-b-2 border-white-500">
    <nav class="navbar">
      <div class="container px-4 mb-2 mx-auto md:flex flex-row justify-between  md:items-center">
        <div class="items-center">
          <router-link to="/" class="font-bold text-xl">A Random Restaurant</router-link>
        </div>
        <div>
          <router-link to="/">Home</router-link> |
          <router-link to="/menu">Menu</router-link> |
          <router-link to="/bookings">Bookings</router-link> |
          <router-link to="/contact">Contact Us</router-link>
        </div>
        <div v-if="!isLoggedIn">
          <router-link to="/login">Login</router-link> |
          <router-link to="/signup">Sign Up</router-link>
        </div>
        <div v-if="isLoggedIn">
          <span>Welcome, {{ name }}!</span> |
          <router-link to="/checkout">Checkout</router-link> |
          <button @click.prevent="logout">Logout</button>
        </div>
      </div>
    </nav>
  </header>
  <router-view @login="login" :isLoggedin="isLoggedIn"/>
  <footer class="mt-6">
    <div class="credit">
      Created by Khairul Azhar | All Rights Reserved
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue"
import axiosAuthenticated from "./axios"
import router from './router';
const isLoggedIn = ref(false)
const name = ref("")

function login(val) {
  isLoggedIn.value = true,
  name.value = val
}

function logout() {
  axiosAuthenticated({
        method: "get",
        url: "api/accounts/logout",
    }).then(response => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        isLoggedIn.value = false;
        router.push({ path: '/'})
    })
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: black;
  color: white;
}
.header {
  background: #d3ad7f
}
</style>
