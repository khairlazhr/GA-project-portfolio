import { useNavigate, useParams, useLocation } from "react-router-dom"
import { useRef } from "react";
import axiosToken from "../utils/axios"
import useQuantity from "../utils/useQuantity"
import { DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";

function CartItemModal({fetchCart}) {
    const navigate = useNavigate()
    let { id } = useParams()
    const location = useLocation()
    const buttonRef = useRef()
    const cartItemQuantity = location.state?.quantity
    const foodName = location.state?.name
    const [quantity, quantityDecrement, quantityIncrement] = useQuantity(cartItemQuantity)

    function closeModal() {
        navigate(-1)

    }

    async function editQuantity() {
        const response = await axiosToken({
            url: "https://cafenacoffee.herokuapp.com/api/delivery/cart",
            method: "PATCH",
            data: {
                "id": parseInt(id),
                "quantity": quantity
            }
        })
        if (response.status === 200) {
            fetchCart()
            navigate(-1)
        }
    }


    return (
        <DialogOverlay
        aria-labelledby="label"
        className="dialogOverlay"
        onDismiss={closeModal}
        initialFocusRef={buttonRef}
        >
            <DialogContent
            className="dialog-content"
            aria-labelledby="dialog-content"
            >
                <div className="cart-modal">
                    <h2>{`Edit Quantity (${foodName})`}</h2>
                    <hr className="hr"/>
                    <div className="menu-dialog__counter">
                        <button className="menu-dialog__button" onClick={quantityDecrement}><i className="ri-subtract-fill ri-1x"></i></button>
                        <p>{quantity}</p>
                        <button className="menu-dialog__button" onClick={quantityIncrement}><i className="ri-add-fill ri-1x"></i></button>
                    </div>
                    <button className="button cart-modal__button" onClick={editQuantity}>Edit</button>
                    <button ref={buttonRef} className="close-icon" onClick={closeModal}><i className="ri-close-line ri-2x"></i></button>
                </div>
                
            </DialogContent>
        </DialogOverlay>
    )
}

export default CartItemModal