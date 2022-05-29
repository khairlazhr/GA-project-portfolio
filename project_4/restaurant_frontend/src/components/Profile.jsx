import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosToken from "../utils/axios"

function Profile() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [userProfile, setUserProfile] = useState("")

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await axiosToken({
                    url: `/api/accounts/profile/${id}`,
                    method: "GET"
                })
                if (response.status === 200) {
                    setUserProfile(response.data)
                }
            } catch(error) {
                if (error.request){
    
                }
            }
        }
        fetchProfile()
    }, [])

    async function deleteBooking(booking_id) {
        try {
            const response = await axiosToken({
                url: `/api/bookings/booking/${booking_id}`,
                method: "DELETE",
            })
            if (response.status === 200) {
                navigate(`/profile/${id}`)
            }
        } catch(error) {
            if (error.request){

            }
        }
    }

    function editProfile() {
        navigate(`/profile/${id}/edit`, {state: {
            name: userProfile.first_name,
            email: userProfile.email,
            mobile_number: userProfile.mobile_number
        }})
    }

    function changePassword(){
        navigate(`/profile/${id}/changepw`)
    }

    return (
        <div className="profile-container">
            <div className="profile-container__title">
                <h2>Profile Details</h2>
                <div>
                    <button type="button" className="button profile-container__button" onClick={editProfile}>Edit Profile</button>
                    <button type="button" className="button" onClick={changePassword}>Change Password</button>
                </div>
                
            </div>
            <div>
                <p className="profile-container__info"><span className="span-bold">Name: </span>{userProfile.first_name}</p>
                <p className="profile-container__info"><span className="span-bold">Email: </span>{userProfile.email}</p>
                <p className="profile-container__info"><span className="span-bold">Password: </span>********</p>
                <p className="profile-container__info"><span className="span-bold">Mobile Number: </span>{userProfile.mobile_number}</p>
            </div>
            <div className="profile-container__booking">
                <h2>Bookings</h2>
                {userProfile
                && userProfile.active_booking.length > 0 
                ? userProfile.active_booking.map((booking, i) => (
                    <div key={i}>
                        <p className="profile-container__info">Your booking has been confirmed. Details are shown below.</p>
                        
                        <p className="profile-container__info">Date: {`${booking.date_slot.slice(8, 10)}-${booking.date_slot.slice(5,7)}-${booking.date_slot.slice(0,4)}`}</p>
                        <p className="profile-container__info">Time: {booking.time_slot.slice(0,5)}</p>
                        <p className="profile-container__info">Tables booked: {booking.tables_booked}</p>

                        <button type="button" className="button" onClick={() => deleteBooking(booking.id)}>Cancel Booking</button>
                    </div>
                ))
                : <p>You have no bookings</p>
                }
            </div>
            <div className="profile-container__orders">
                <h2 className="profile-container__orders-title">Active Orders</h2>
                {userProfile
                && userProfile.outstanding_orders.length > 0 
                ? userProfile.outstanding_orders.map((order, i) => (
                    <div className="profile-container__order" key={i}>
                        <h3>{`Order ID: ${order.id}`}</h3>
                        <div className="profile-container__order-container">
                            <div>
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
                : <p>You have no outstanding orders</p>
                }
            </div>
            
        </div>
    )
}

export default Profile