import { useEffect, useState, useRef } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import axiosToken from "../utils/axios"
import useQuantity from "../utils/useQuantity"
import { DialogOverlay, DialogContent } from "@reach/dialog";


function MenuItemModal({ currentUser, fetchCart }) {
    const navigate = useNavigate()
    const { id } = useParams()
    const location = useLocation()
    const buttonRef = useRef()
    const [quantity, quantityDecrement, quantityIncrement] = useQuantity(1)
    const [menuItem, setMenuItem] = useState({})
    
    function closeModal() {
        navigate(-1)
    }

    async function addItem() {
        if (currentUser) {
            try {
                const response = await axiosToken({
                    url: `https://cafenacoffee.herokuapp.com/api/restaurant/menu/${id}`,
                    method: "POST",
                    data: {
                        item_id: parseInt(id),
                        quantity: quantity
                    }
                })
                if (response.status === 200) {
                    fetchCart()
                    navigate(-1)
                }
            } catch (error) {
                if (error.request) {
                    
                }
            }
        } else {
            navigate("/login", { state: { from: location }})
        }
    } 


    useEffect(() => {
        async function fetchMenuItem() {
            const response = await fetch(`https://cafenacoffee.herokuapp.com/api/restaurant/menu/${id}`)
            const data = await response.json()
            setMenuItem(data)
        }
        fetchMenuItem()
    }, [id])

    return (
        <DialogOverlay
        aria-labelledby="label"
        onDismiss={closeModal}
        initialFocusRef={buttonRef}
        >
            <DialogContent
            aria-labelledby="dialog-content"
            className="dialog-content"
            >
                <div className="menu-dialog__container">
                    <img className="menu-dialog__image" src={menuItem.imageURL} alt={menuItem.food_name}/>
                    <h3 className="menu-dialog__title">{menuItem.food_name}</h3>
                    <p className="menu-dialog__description">{menuItem.description}</p>
                    <div className="menu-dialog__counter">
                        <button className="menu-dialog__button" onClick={quantityDecrement}><i className="ri-subtract-fill ri-1x"></i></button>
                        <p>{quantity}</p>
                        <button className="menu-dialog__button" onClick={quantityIncrement}><i className="ri-add-fill ri-1x"></i></button>
                    </div>
                    <button className="menu-dialog__add-button" onClick={addItem}>Add</button>
                    <button ref={buttonRef} className="close-icon" onClick={closeModal}><i className="ri-close-line ri-2x"></i></button>
                </div>
                
            </DialogContent>
        </DialogOverlay>
    )
   
}

export default MenuItemModal