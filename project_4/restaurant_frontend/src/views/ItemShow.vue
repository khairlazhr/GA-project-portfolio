<script>
// import axios from "axios";
// export default {
//     data() {
//         return {
//             results: [],
//             url_data = null
//         };
//     },
//     methods: {

//     },
//     mounted() {
//         // this.url_data=this.$route.params.id;
//         axios.get("api/restaurant/menu/" + this.url_data)
//             .then(response => this.results = response.data);
//     },
// }
</script>

<template>
    <div class="py-6 md:py-12 h-screen">
        <div class="container py-6 h-full flex flex-row px-4 pb-8 mx-auto mb-8 justify-center">
            <div class="w-1/2 md:px-4 xl:px-6 mt-8 md:mt-0 shrink justify-end">
                <!-- <img :src="this.results.imageURL" alt="item-image" class="block h-full max-w-full rounded overflow-hidden"> -->
            </div>
            <div v-if="isLoggedIn" class="w-1/2 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
                <p class="text-gray-600 mb-3">Want to know how to reach us? Or even find us? Well, here you go. We're not hiding!</p>
            </div>
        </div>
    </div>
</template>