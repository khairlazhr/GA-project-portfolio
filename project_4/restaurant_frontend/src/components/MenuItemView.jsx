import { useEffect, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import useQuantity from "../utils/useQuantity"
import axiosToken from "../utils/axios"

function MenuItemView({ currentUser, fetchCart }) {
    let location = useLocation()
    let navigate = useNavigate()
    let { id } = useParams()

    const [menuItem, setMenuItem] = useState({})
    const [quantity, quantityDecrement, quantityIncrement] = useQuantity(1)

    async function addItem() {
        if (currentUser) {
            const response = await axiosToken({
                url: `/api/restaurant/menu/${id}`,
                method: "POST",
                data: {
                    item_id: parseInt(id),
                    quantity: quantity
                }
            })
            if (response.status === 200) {
                fetchCart()
                navigate("/menu")
            }
        } else {
            navigate("/login", { state: { from: location }})
        }
    } 

    useEffect(() => {
        async function fetchMenuItem() {
            const response = await fetch(`/api/restaurant/menu/${id}`)
            const data = await response.json()

            setMenuItem(data)
        }
        fetchMenuItem()
    }, [id])

    return (
        <div className="menu-dialog__container page-container menu-dialog__container--item">
            <img className="menu-dialog__image" src={menuItem.imageURL} alt={menuItem.food_name}/>
            <h3 className="menu-dialog__title">{menuItem.food_name}</h3>
            <p className="menu-dialog__description">{menuItem.description}</p>
            <div className="menu-dialog__counter">
                <button className="menu-dialog__button" onClick={quantityDecrement}><i className="ri-subtract-fill ri-1x"></i></button>
                <p>{quantity}</p>
                <button className="menu-dialog__button" onClick={quantityIncrement}><i className="ri-add-fill ri-1x"></i></button>
            </div>
            <button className="menu-dialog__add-button" onClick={addItem}>Add</button>
        </div>
    )
   
}

export default MenuItemView