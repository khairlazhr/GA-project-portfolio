import { useNavigate } from "react-router-dom"

function CartEmpty() {
    const navigate = useNavigate()
    

    return (
        <>
            <div className="cart__empty">
                <h2 className="cart__title">Cart</h2>
                <hr className="hr"/>
                <p>Your cart is empty</p>
            </div>
            <button type="button" className="button cart__add-button" onClick={() => navigate("/menu")}>Add items</button>
        </>
    )
}

export default CartEmpty

