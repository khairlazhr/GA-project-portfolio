import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Menu from '@/views/Menu.vue'
import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import Booking from '@/views/Booking.vue'
import ItemShow from '@/views/ItemShow.vue'
import Checkout from '@/views/Checkout.vue'
import Contact from '@/views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu,
  },
  {
    path: "/menu/:id",
    name: 'MenuItem',
    component: ItemShow,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: "/bookings",
    name: 'Bookings',
    component: Booking
  },
  {
    path: "/checkout",
    name: 'Checkout',
    component: Checkout
  },
  {
    path: "/contact",
    name: 'Contact',
    component: Contact
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
