<script setup>
import BookingComponent from "../components/BookingComponent.vue";
const props = defineProps({
  isLoggedIn: {
    type: Boolean,
  }
})


</script>


<template>
    <div class="py-6 md:py-12 h-screen">
        <div class="container py-6 h-full flex flex-row px-4 pb-8 mx-auto mb-8 justify-center">
            <div class="w-1/2 md:px-4 xl:px-6 mt-8 md:mt-0 shrink justify-end">
                <img src="@/assets/AfterwitInterior__ColossalXPro50-min.jpg" alt="booking-image" class="block h-full max-w-full rounded overflow-hidden">
            </div>
            <div v-if="!isLoggedIn" class="w-1/2 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
                <p class="text-gray-600 mb-3">Log on first</p>
            </div>
            <BookingComponent v-if="isLoggedIn"/>
        </div>
    </div>
</template>
           

<style>

</style>