import axiosToken from "../utils/axios"
import { useEffect, useState } from "react"
import CartComponent from "../components/CartComponent"
import { useNavigate, useLocation } from "react-router-dom"

function Cart() {
    const navigate = useNavigate
    const location = useLocation()
    const [cart, setCart] = useState({})

    async function checkOut() {
        const response = await axiosToken({
            url: `/api/delivery/checkout`,
            method: "POST",
            data: 
        })
        if (response.status === 200) {
            navigate(-1)
        }
    }

    useEffect(() => {
        async function fetchCart() {
            try {
                const response = await axiosToken("/api/delivery/cart")
                setCart(response.data)
            } catch {
                navigate("/login")
            }
        }
        fetchCart()
    }, [])

    return (
        <div>
            <div className="cart">
                {cart.cart_items
                    ? cart.cart_items.map((cartItem) => (
                        <CartComponent {...cartItem} />
                    ))
                    : <div>
                        <h1>Cart</h1>
                        <p>Your cart is empty</p>
                    </div>
                }
            </div>
            <div className="cartSummary">
                <h3>Your Order</h3>
                <hr />
                <p>Delivery Address</p>
                <button className="">Checkout</button>
            </div>
        </div>
    )
}

export default Cart