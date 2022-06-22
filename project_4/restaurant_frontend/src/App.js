import './App.css';
import {useEffect, useState } from "react"
import Header from "./components/Header"
import {Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Menu from "./pages/Menu"
import Register from "./pages/Register"
import Login from "./pages/Login"
import NoMatch from "./pages/NoMatch"
import ProfilePage from "./pages/ProfilePage"
import Booking from "./pages/Booking"
import axiosToken from './utils/axios';

import ProtectedRoute from './components/ProtectedRoute';
import MenuItemView from './components/MenuItemView';
import MenuItemModal from "./components/MenuItemModal"
import CartItemModal from './components/CartItemModal';

import Profile from "./components/Profile"
import ProfileChangePw from "./components/ProfileChangePw"
import ProfileEdit from "./components/ProfileEdit"
import ProfileAddress from "./components/ProfileAddress"
import ProfileAddressAdd from "./components/ProfileAddressAdd"
import ProfileAddressEdit from "./components/ProfileAddressEdit"
import ProfileOrder from "./components/ProfileOrder"

function App() {
	let location = useLocation()
	let navigate = useNavigate()
	
	let state = location?.state?.background;

	const [cart, setCart] = useState({})
	const [currentUser, setCurrentUser] = useState("")
	const [userId, setUserId] = useState("")

	// Click Functions
	async function fetchCart() {
        try {
            const response = await axiosToken("https://cafenacoffee.herokuapp.com/api/delivery/cart")
            setCart(response.data)
        } catch {
            navigate("/login")
        }
    }

	
	function loginCurrentUser(username, userId) {
		setCurrentUser(username)
		setUserId(userId)
	}

	async function logout() {
		const response = await axiosToken("https://cafenacoffee.herokuapp.com/api/accounts/logout", {
			method: "POST"
		})
		if (response.status === 200) {
			setCurrentUser("")
			localStorage.clear()
			navigate("/")
		} else {
			navigate("login")
		}
	}

	// useEffect Functions

	useEffect(() => {
		const refreshDuration = 4 * 60 * 60 * 1000
		const now = new Date().getTime()

		const accessObject = localStorage.getItem("accessObject")
		const accessData = JSON.parse(accessObject)
		
		if (accessObject) {
			function checkExpiryTime() {
				if ((now - accessData.timeStamp) > refreshDuration) {
					setCart({})
					setCurrentUser("")
					setUserId("")
					localStorage.clear()
				}
			}

			setCurrentUser(accessData.name)
			setUserId(accessData.userId)
			fetchCart()

			checkExpiryTime()
		}
	}, [])

  return (
    <div className="App">
		<Header currentUser={currentUser} logout={logout} userId={userId}/>
        <Routes location={state || location}>
			/* Public Routes */ 
            <Route path="/" element={<Home />} />
            <Route path="/register" element={currentUser ? <Navigate to="/" /> : <Register />} />
            <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login loginCurrentUser={loginCurrentUser} fetchCart={fetchCart}/>} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:id" element={<MenuItemView currentUser={currentUser} fetchCart={fetchCart}/>} />
			<Route path="/bookings" element={<Booking currentUser={currentUser} />}></Route>

			/* ProtectedRoutes */
			<Route element={<ProtectedRoute />}>
				<Route path="/cart" element={<Cart cart={cart} fetchCart={fetchCart} />} />
				<Route path="/profile/:id/" element={<ProfilePage />}>
					<Route index element={<Profile />} />
					<Route path="changepw" element={<ProfileChangePw />} />
					<Route path="edit" element={<ProfileEdit />} />
					<Route path="addresses" element={<ProfileAddress />} />
					<Route path="addresses/add" element={<ProfileAddressAdd />} />
					<Route path="addresses/:addressId/edit" element={<ProfileAddressEdit />} />
					<Route path="orders" element={<ProfileOrder />} />
				</Route>
			</Route>

			<Route path="*" element={<NoMatch />} />
        </Routes>

		{state && (
			<Routes>
				<Route path="/menu/:id" element={<MenuItemModal currentUser={currentUser} fetchCart={fetchCart}/>} />
				<Route path="/cart/:id/edit" element={<CartItemModal fetchCart={fetchCart}/>} />
		  	</Routes>
		)}
    </div>
  );
}

export default App;
