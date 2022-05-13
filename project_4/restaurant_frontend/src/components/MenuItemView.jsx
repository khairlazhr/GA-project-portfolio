import { useEffect, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import useQuantity from "../utils/useQuantity"
import axiosToken from "../utils/axios"

function MenuItemView({ currentUser }) {
    let location = useLocation()
    let navigate = useNavigate()
    let { id } = useParams()

    const [menuItem, setMenuItem] = useState({})
    const [quantity, quantityDecrement, quantityIncrement] = useQuantity()

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
    })

    return (
        <div className="normal">
            <img src={menuItem.imageURL} />
                <h2>{menuItem.food_name}</h2>

                <p>{menuItem.description}</p>
                <div>
                    <button className="" onClick={quantityDecrement}><i className="ri-subtract-fill ri-1x"></i></button>
                    <p>{quantity}</p>
                    <button className="" onClick={quantityIncrement}><i className="ri-add-fill ri-1x"></i></button>
                </div>
                <button className="" onClick={addItem}>Add</button>
        </div>
    )
   
}

export default MenuItemView