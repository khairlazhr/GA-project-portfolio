<script setup>


</script>


<template>
  <div class="bg-white-100 py-6 md:py-12">
    <div class="container px-4 mx-auto">
      <div class="text-center max-w-2xl mx-auto">
        <div class="mt-4">
          <img src="@/assets/AfterwitInterior__ColossalXPro13-min.jpg" alt="homepage-image" class="d-block max-w-full rounded shadow-md">
        </div>
      </div>

      <div class="md:flex md:flex-wrap md:-mx-4 mt-6 md:mt-12">
        <div class="md:w-1/3 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
          <span class="w-20 border-t-2 border-solid border-white-200 inline-block mb-3"></span>
          <h5 class="text-xl font-medium uppercase mb-4">Menu</h5>
          <p class="text-gray-600 mb-3">Sate your appetite and pamper your tastebuds. Here, you can check out our diverse menu and order from the comfort of your own homes!</p>
          <router-link to="/menu">
              <button class="text-white font-bold py-2 px-4 rounded">Check it out!</button>
          </router-link>
        </div>
        <div class="md:w-1/3 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
          <span class="w-20 border-t-2 border-solid border-white-200 inline-block mb-3"></span>
          <h5 class="text-xl font-medium uppercase mb-4">Bookings</h5>
          <p class="text-gray-600 mb-3">Scared if we might be full? Too lazy to queue? Want to be shown straight to your table? Don't worry! We have you covered! You can book up to two weeks in advance!</p>
          <router-link to="/bookings">
              <button class="text-white font-bold py-2 px-4 rounded">Reserve Now!</button>
          </router-link>
        </div>
        <div class="md:w-1/3 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
          <span class="w-20 border-t-2 border-solid border-white-200 inline-block mb-3"></span>
          <h5 class="text-xl font-medium uppercase mb-4">Contact Us</h5>
          <p class="text-gray-600 mb-3">Want to know how to reach us? Or even find us? Well, here you go. We're not hiding!</p>
          <router-link to="/contact-us">
              <button class="text-white font-bold py-2 px-4 rounded">Reach us!</button>
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
h5 {
    color: #d3ad7f;
}
button {
    background: #d3ad7f;
}
</style>