import './App.css';
import {useState} from "react"
import Header from "./components/Header"
import {Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Menu from "./pages/Menu"
import Register from "./pages/Register"
import MenuItemModal from "./components/MenuItemModal"
import Login from "./pages/Login"
import NoMatch from "./pages/NoMatch"
import CartItemModal from './components/CartItemModal';
import MenuItemView from './components/MenuItemView';
import ProtectedRoute from './components/ProtectedRoute';
import axiosToken from './utils/axios';

function App() {
	let location = useLocation()
	let navigate = useNavigate()
	let state = location.state && location.state.background;
	const accessObject = JSON.parse(localStorage.getItem("accessObject"))
	
	const [currentUser, setCurrentUser] = useState(
		accessObject ? accessObject.name : ""
	)

	function loginCurrentUser(username) {
		setCurrentUser(username)
	}

	async function logout() {
		const response = await axiosToken("/api/accounts/logout", {
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

  return (
    <div className="App">
		<Header currentUser={currentUser} logout={logout}/>
        <Routes location={state || location}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={currentUser ? <Navigate to="/" /> : <Register />} />
            <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login loginCurrentUser={loginCurrentUser}/>} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:id" element={<MenuItemView currentUser={currentUser} />} />
			<Route element={<ProtectedRoute />}>
				<Route path="/cart" element={<Cart />} />
			</Route>
            <Route path="*" element={<NoMatch />} />
        </Routes>

		{state && (
			<Routes>
				<Route path="/menu/:id" element={<MenuItemModal currentUser={currentUser} />} />
				<Route path="/cart/:id/edit" element={<CartItemModal />} />
		  	</Routes>
		)}
    </div>
  );
}

export default App;
