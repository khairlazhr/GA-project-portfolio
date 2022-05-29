import { useEffect, useState } from "react"
import axiosToken from "../utils/axios"
import { useParams } from "react-router-dom"

function ProfileOrder() {
    const { id } = useParams()
    const [orders, setOrders] = useState("")

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await axiosToken({
                    url: `/api/accounts/profile/${id}/orders`,
                    method: "GET"
                })
                if (response.status === 200) {
                    setOrders(response.data)
                }
            } catch(error) {
                if (error.request){
    
                }
            }
        }
        fetchOrders()
    }, [id])

    return (
        <div className="profile-container">
            <div className="profile-container__title">
                <h2>Your Past Orders</h2>
            </div>
            {orders
            && orders.length > 0
            ? orders.map((order, i) => (
                <div className="profile-container__order" key={i}>
                    <h3>{`Order ID: ${order.id}`}</h3>
                    <div className="profile-container__order-container">
                        <div className="profile-container__order-details">
                            <h4>Order Details:</h4>
                            <p>Order Status: {order.order_status}</p>
                            <p>Ordered on: {`${order.created_on.slice(8, 10)}-${order.created_on.slice(5,7)}-${order.created_on.slice(0,4)}`} {order.created_on.slice(11,16)}</p>
                            <p>Total Cost: ${order.total}</p>
                        </div>
                        <div>
                            <h4>Order Summary:</h4>
                            {order.order_items.map((item) => <p>{item.item.food_name} x{item.quantity}</p>)}
                        </div>
                    </div>
                </div>
            ))
            : <p>You have no past orders</p>
            }
        </div>
    )
}

export default ProfileOrder