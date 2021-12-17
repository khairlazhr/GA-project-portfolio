<script>
import axios from "axios";
import ItemCard from "../components/ItemCard.vue";
export default {
    data() {
        return {
            results: [],
            imgPreUrl: "http://localhost:8000/api/images"
        };
    },
    methods: {
      category(category) {
        return this.results.filter((item) => {
          return item.category === category
        })
      }
    },
    mounted() {
        axios.get("api/restaurant/menu")
            .then(response => this.results = response.data);
    },
    components: { ItemCard }
}
</script>

<template>
  <div class="menu">
    <img src='@/assets/AZ3I0115text.png' alt='menu-image' class='d-block max-w-full rounded shadow-md'>
    <h1 class="block">Bites</h1>
    <div class="md:flex md:flex-wrap md:-mx-4 mt-6 md:mt-12 justify-center">
        <ItemCard v-for="(item, i) in category('Bites')" :key="i" :name="item.food_name" :price="item.price" :src="item.image"/>
    </div>
    <h1 class="block">Tacos</h1>
    <div class="md:flex md:flex-wrap md:-mx-4 mt-6 md:mt-12 justify-center">
        <ItemCard v-for="(item, i) in category('Tacos')" :key="i" :name="item.food_name" :price="item.price" :src="item.image"/>
    </div>
    <h1 class="block">Burritos</h1>
    <div class="md:flex md:flex-wrap md:-mx-4 mt-6 md:mt-12 justify-center">
        <ItemCard v-for="(item, i) in category('Burritos')" :key="i" :name="item.food_name" :price="item.price" :src="item.image"/>
    </div>
    <h1 class="block">Mains</h1>
    <div class="md:flex md:flex-wrap md:-mx-4 mt-6 md:mt-12 justify-center">
        <ItemCard v-for="(item, i) in category('Mains')" :key="i" :name="item.food_name" :price="item.price" :src="item.image"/>
    </div>
    <h1 class="block">Nachos</h1>
    <div class="md:flex md:flex-wrap md:-mx-4 mt-6 md:mt-12 justify-center">
        <ItemCard v-for="(item, i) in category('Nachos')" :key="i" :name="item.food_name" :price="item.price" :src="item.image"/>
    </div>
    <h1 class="block">Desserts</h1>
    <div class="md:flex md:flex-wrap md:-mx-4 mt-6 md:mt-12 justify-center">
        <ItemCard v-for="(item, i) in category('Desserts')" :key="i" :name="item.food_name" :price="item.price" :src="item.image"/>
    </div>
    <h1 class="block">Drinks</h1>
    <div class="md:flex md:flex-wrap md:-mx-4 mt-6 md:mt-12 justify-center">
        <ItemCard v-for="(item, i) in category('Drinks')" :key="i" :name="item.food_name" :price="item.price" :src="item.image"/>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 50px
}
</style>