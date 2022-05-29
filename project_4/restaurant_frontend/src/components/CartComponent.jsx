import { useLocation, Link } from "react-router-dom"
import axiosToken from "../utils/axios"

function CartComponent({ id, item, quantity, price, fetchCart }) {
    const location = useLocation()

    async function removeItem() {
        const response = await axiosToken({
            url: "/api/delivery/cart",
            method: "DELETE",
            data: {
                "id": parseInt(id)
            }
        })
        if (response.status === 200) {
            fetchCart()
        }
    }

    return (
        <div className="cart-item">
            <img className="cart-item__image" src={item.imageURL} alt="Cart Product" />
            <h4 className="cart-item__product">{item.food_name}</h4>
            <p className="cart-item__quantity">x{quantity}</p>
            <h4 className="cart-item__price">${price}</h4>
            <div className="cart-item__button-container">
                <button type="button" className="cart-item__button">
                    <Link className="link" to={`${id}/edit`} state= {{ background: location, name: item.food_name, quantity: quantity }}>
                        <i className="ri-edit-line"></i>
                    </Link>
                </button>
                <button type="submit" className="cart-item__button" onClick={removeItem}><i className="ri-delete-bin-line"></i></button>
            </div>
       
        </div>
    )
}

export default CartComponent