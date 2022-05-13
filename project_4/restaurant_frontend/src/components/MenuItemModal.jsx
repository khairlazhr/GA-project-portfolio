import { useEffect, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import axiosToken from "../utils/axios"
import useQuantity from "../utils/useQuantity"

function MenuItemModal({ currentUser }) {
    let navigate = useNavigate()
    let { id } = useParams()
    let location = useLocation()
    
    const [quantity, quantityDecrement, quantityIncrement] = useQuantity()
    const [menuItem, setMenuItem] = useState({})
    

    function closeModal(e) {
        if (e.currentTarget.matches(".close-modal") || e.target.matches(".overlay")) {
            e.stopPropagation()
            navigate(-1)
        }
    }

    async function addItem() {
        if (currentUser) {
            try {
                const response = await axiosToken({
                    url: `/api/restaurant/menu/${id}`,
                    method: "POST",
                    data: {
                        item_id: parseInt(id),
                        quantity: quantity
                    }
                })
                if (response.status === 200) {
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
            const response = await fetch(`/api/restaurant/menu/${id}`)
            const data = await response.json()

            setMenuItem(data)
        }
        fetchMenuItem()
    }, [])

    return (
        <div className="overlay" onClick={closeModal}>
            <div className="modal">
                <img src={menuItem.imageURL} />
                <h2>{menuItem.food_name}</h2>
                <p>{menuItem.description}</p>
                <div>
                    <button className="" onClick={quantityDecrement}><i className="ri-subtract-fill ri-1x"></i></button>
                    <p>{quantity}</p>
                    <button className="" onClick={quantityIncrement}><i className="ri-add-fill ri-1x"></i></button>
                </div>
                <button className="" onClick={addItem}>Add</button>
                <button className="close-icon close-modal" onClick={closeModal}><i className="ri-close-line ri-2x"></i></button>
            </div>
        </div>
    )
   
}

export default MenuItemModal